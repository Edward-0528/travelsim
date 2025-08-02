-- Create user_streaks table for tracking daily workout streaks
CREATE TABLE IF NOT EXISTS user_streaks (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_workout_date DATE,
    total_workouts INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create unique index on user_id to ensure one streak record per user
CREATE UNIQUE INDEX IF NOT EXISTS user_streaks_user_id_idx ON user_streaks(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own streak data
CREATE POLICY "Users can view their own streak data" ON user_streaks
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own streak data
CREATE POLICY "Users can insert their own streak data" ON user_streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own streak data
CREATE POLICY "Users can update their own streak data" ON user_streaks
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own streak data
CREATE POLICY "Users can delete their own streak data" ON user_streaks
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_streaks_updated_at 
    BEFORE UPDATE ON user_streaks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
