# Supabase Setup Guide for Core+

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account if you don't have one
3. Create a new project
4. Wait for the project to be provisioned (usually takes 1-2 minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Project API Key (anon, public)** (a long string starting with `eyJ...`)

## 3. Update Your Configuration

1. Open `supabaseConfig.js` in your project
2. Replace the placeholder values:
   ```javascript
   const supabaseUrl = 'https://your-project-ref.supabase.co';
   const supabaseAnonKey = 'eyJ...your-anon-key...';
   ```

## 4. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URLs:
   - `http://localhost:19006` (for web development)
   - `exp://your-local-ip:19000` (for Expo Go, replace with your actual IP)
3. Enable email confirmation if desired (recommended for production)

## 5. Authentication Features Included

- ✅ User registration with email/password
- ✅ User login
- ✅ Persistent sessions across app restarts
- ✅ User profile data (name, gender)
- ✅ Secure logout
- ✅ Email verification (optional)

## 6. Testing

1. Start your Expo development server: `npm start`
2. Test the sign-up flow - create a new account
3. Check your Supabase dashboard under **Authentication** → **Users** to see the new user
4. Test logging out and logging back in
5. Close and reopen the app to verify persistent sessions

## 7. Next Steps (Optional)

- Add password reset functionality
- Implement social login (Google, Apple, etc.)
- Add user profile editing
- Set up Row Level Security (RLS) for user data
- Add real-time features

## Troubleshooting

- **"Invalid API key"**: Make sure you copied the anon key correctly
- **"Invalid URL"**: Ensure the project URL is correct and includes `https://`
- **User not persisting**: Check that AsyncStorage is properly installed
- **Email not confirmed**: Check spam folder or disable email confirmation in Supabase settings for testing
