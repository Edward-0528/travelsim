# 🔧 URGENT: Fix Redirect URI Mismatch

## 🚨 The Error You're Seeing:
**"Access blocked: invalid request redirect uri mismatch"**

## ✅ Good News:
- Your Google OAuth is working!
- Your Supabase configuration is correct!
- This is just a redirect URI configuration issue

## 🎯 Quick Fix (5 minutes):

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com/
2. Select your project (the one you created for Core+)
3. Go to: **APIs & Services** → **Credentials**

### Step 2: Edit Your OAuth Client ID
1. Find your **OAuth 2.0 Client IDs** section
2. Click the **pencil/edit icon** next to your client ID
3. Scroll down to **Authorized redirect URIs**

### Step 3: Add These Exact URIs
Copy and paste each of these URIs (one per line):

```
https://fsuixjjgtyvcwdkbpgta.supabase.co/auth/v1/callback
http://localhost:8082
http://localhost:19006
exp://localhost:19000
core-plus://auth/callback
```

### Step 4: Save
1. Click **Save** at the bottom
2. Wait 1-2 minutes for changes to propagate

### Step 5: Test Again
1. Go back to your Core+ app
2. Try the Google login button again
3. It should now open Google's login page successfully!

## 🔍 What Was Happening:
- Google OAuth was working
- Supabase was generating the correct OAuth URL
- But Google rejected it because the redirect URI wasn't whitelisted
- Now it will be whitelisted and work perfectly!

## 🎉 After the Fix:
1. Google button opens browser
2. You sign in with Google
3. Browser redirects back to your app
4. You're automatically logged into Core+

Try it now - the fix should work immediately!
