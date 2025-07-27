# Supabase Configuration Instructions

## To Fix the Foreign Key Constraint Error:

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `setup_supabase.sql` and run it
4. This will create the proper profiles table structure and triggers

## To Disable Email Confirmation:

### Method 1: Dashboard (Recommended)
1. Go to your Supabase Dashboard
2. Navigate to Authentication > Settings
3. Scroll down to "Email Auth" section
4. Turn OFF "Enable email confirmations"
5. Click "Save"

### Method 2: Project Configuration (Alternative)
If you prefer to configure this via project settings, add this to your Supabase project configuration:

```
GOTRUE_MAILER_AUTOCONFIRM=true
```

## Testing the Signup Flow:

After making these changes:
1. The signup process will immediately create an authenticated user
2. The database trigger will automatically create a profile record
3. Users can start using the app immediately without email verification
4. The foreign key constraint error should be resolved

## Notes:
- The SQL script includes Row Level Security (RLS) policies for data protection
- Users can only access their own profile data
- The trigger automatically handles profile creation and updates
