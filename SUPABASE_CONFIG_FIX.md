# Supabase Configuration Fix

## The Issue
You're getting "Database error saving new user" which is a common Supabase configuration issue.

## Quick Fix Steps

### 1. Check Email Confirmation Settings
Go to your Supabase Dashboard → Authentication → Settings:

- **Disable "Enable email confirmations"** temporarily for testing
- OR ensure your **Site URL** is configured correctly

### 2. Site URL Configuration
In your Supabase Dashboard → Authentication → URL Configuration:

Set the **Site URL** to one of these:
- For Expo Go: `exp://192.168.1.173:8082` (your current IP)
- For development: `http://localhost:3000`
- For production: your actual domain

### 3. Redirect URLs
Add these to your **Redirect URLs** list:
- `core-plus://auth/callback`
- `exp://192.168.1.173:8082`
- `http://localhost:3000` (if testing on web)

### 4. Row Level Security (RLS)
Go to Database → Tables → auth.users:
- **Disable RLS** temporarily for testing
- OR ensure proper policies are in place

### 5. Check Auth Settings
In Authentication → Settings:
- Enable "Enable database webhooks" should be ON
- "Enable phone confirmations" should be OFF for email-only signup

## Testing Order
1. First disable email confirmations
2. Test signup with the "Test Sign Up" button
3. If it works, re-enable email confirmations and configure URLs properly

## Common Issues
- **Email confirmation is enabled** but redirect URLs are wrong
- **Site URL is not set** or incorrect
- **RLS policies** are blocking user creation
- **Password requirements** not met (minimum 6 characters)

The most common fix is simply **disabling email confirmations** in the Auth settings.
