# Database Debug Steps

Since email confirmations are now disabled but sign-up still fails with "Database error saving new user", let's check the database setup:

## 1. Check Your Supabase Database Tables

Go to your Supabase Dashboard → SQL Editor and run this query to check if the auth schema is properly set up:

```sql
-- Check if the auth.users table exists and has the right structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth' AND table_name = 'users'
ORDER BY ordinal_position;
```

## 2. Check RLS (Row Level Security) Policies

The error might be due to Row Level Security policies. Run this in SQL Editor:

```sql
-- Check RLS policies on auth.users
SELECT * FROM pg_policies WHERE tablename = 'users' AND schemaname = 'auth';
```

## 3. Check Database Permissions

In your Supabase Dashboard:
1. Go to **Settings** → **Database**
2. Check if "Enable Row Level Security" is turned ON for the auth.users table
3. Go to **Authentication** → **Settings** → **Advanced Settings**
4. Make sure "Enable database webhooks" is enabled

## 4. Create Custom User Profile Table (Optional)

If auth.users is having issues, we can create a custom profile table. Run this in SQL Editor:

```sql
-- Create a custom user profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 5. Test Simple Sign-Up

In your Supabase Dashboard → Authentication → Users, try manually creating a user to see if it works.

## Next Steps

1. First, try the **"Test No Confirm"** green button in the app
2. Check the database structure with the SQL queries above
3. Let me know what error messages you see in the Supabase logs (Dashboard → Logs)
