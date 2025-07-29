-- Create user_fitness_profiles table for Core+ app
-- Run this in your Supabase SQL Editor

-- First, create the table
CREATE TABLE IF NOT EXISTS public.user_fitness_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    main_goal TEXT NOT NULL,
    activities TEXT[] NOT NULL DEFAULT '{}',
    date_of_birth DATE NOT NULL,
    height_inches DECIMAL(5,2) NOT NULL,
    weight_pounds DECIMAL(6,2) NOT NULL,
    goal_weight_pounds DECIMAL(6,2) NOT NULL,
    bmi DECIMAL(4,1) NOT NULL,
    age INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_fitness_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see and modify their own fitness profile
CREATE POLICY "Users can view own fitness profile" ON public.user_fitness_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own fitness profile" ON public.user_fitness_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own fitness profile" ON public.user_fitness_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own fitness profile" ON public.user_fitness_profiles
    FOR DELETE USING (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS on_user_fitness_profiles_updated ON public.user_fitness_profiles;
CREATE TRIGGER on_user_fitness_profiles_updated
    BEFORE UPDATE ON public.user_fitness_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Grant necessary permissions
GRANT ALL ON public.user_fitness_profiles TO authenticated;
GRANT ALL ON public.user_fitness_profiles TO service_role;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_fitness_profiles_id_idx ON public.user_fitness_profiles(id);
CREATE INDEX IF NOT EXISTS user_fitness_profiles_created_at_idx ON public.user_fitness_profiles(created_at);

-- Verify the table was created
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_fitness_profiles' 
ORDER BY ordinal_position;
