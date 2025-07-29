-- Database Fix SQL Commands
-- Run these in your Supabase SQL Editor one by one

-- 1. Check if auth.users table exists and its structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth' AND table_name = 'users'
ORDER BY ordinal_position;

-- 2. Check for any RLS policies that might be blocking
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'auth' AND tablename = 'users';

-- 3. Check if the handle_new_user function exists (this is often the issue)
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%user%';

-- 4. Create the missing handle_new_user function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, gender)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'gender');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 8. Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;

-- 10. Create user fitness profiles table for onboarding data
CREATE TABLE IF NOT EXISTS public.user_fitness_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  main_goal TEXT NOT NULL,
  activities TEXT[] NOT NULL,
  date_of_birth DATE NOT NULL,
  height_inches DECIMAL(5,2) NOT NULL,
  weight_pounds DECIMAL(6,2) NOT NULL,
  goal_weight_pounds DECIMAL(6,2) NOT NULL,
  bmi DECIMAL(4,1) NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Enable RLS on fitness profiles table
ALTER TABLE public.user_fitness_profiles ENABLE ROW LEVEL SECURITY;

-- 12. Create RLS policies for fitness profiles
CREATE POLICY "Users can view own fitness profile" ON public.user_fitness_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own fitness profile" ON public.user_fitness_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own fitness profile" ON public.user_fitness_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 13. Grant permissions on fitness profiles table
GRANT ALL ON public.user_fitness_profiles TO anon, authenticated;
