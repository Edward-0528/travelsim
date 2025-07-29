-- Create user_fitness_profiles table for Core+ app
-- This table stores user fitness data collected during onboarding

CREATE TABLE IF NOT EXISTS user_fitness_profiles (
    -- Primary key matching Supabase auth.users.id
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Main fitness goal
    main_goal TEXT NOT NULL,
    
    -- Selected activities (stored as JSON array)
    activities JSONB DEFAULT '[]'::jsonb,
    
    -- Personal information
    date_of_birth DATE NOT NULL,
    age INTEGER,
    
    -- Physical measurements
    height_inches DECIMAL(5,2) NOT NULL,
    weight_pounds DECIMAL(6,2) NOT NULL,
    goal_weight_pounds DECIMAL(6,2) NOT NULL,
    
    -- Calculated BMI (calculated by app)
    bmi DECIMAL(4,1),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_fitness_profiles_updated_at 
    BEFORE UPDATE ON user_fitness_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_fitness_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only read their own profile
CREATE POLICY "Users can view own fitness profile" ON user_fitness_profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can only insert their own profile
CREATE POLICY "Users can insert own fitness profile" ON user_fitness_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own fitness profile" ON user_fitness_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can only delete their own profile
CREATE POLICY "Users can delete own fitness profile" ON user_fitness_profiles
    FOR DELETE USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_fitness_profiles_created_at ON user_fitness_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_user_fitness_profiles_main_goal ON user_fitness_profiles(main_goal);

-- Insert some example data (optional - remove if not needed)
-- INSERT INTO user_fitness_profiles (
--     id, 
--     main_goal, 
--     activities, 
--     date_of_birth, 
--     height_inches, 
--     weight_pounds, 
--     goal_weight_pounds
-- ) VALUES (
--     -- Replace with actual user ID
--     '00000000-0000-0000-0000-000000000000',
--     'Lose Weight',
--     '["Running", "Weight Training"]'::jsonb,
--     '1990-01-01',
--     70.0,
--     180.0,
--     160.0
-- );
