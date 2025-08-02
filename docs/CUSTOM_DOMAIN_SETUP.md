# Custom Domain Setup for Core Plus

To show "Core Plus" instead of the Supabase URL during Google OAuth, you need to set up a custom domain for your Supabase project.

## Step 1: Set up Custom Domain in Supabase

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/fsuixjjgtyvcwdkbpgta

2. **Access Custom Domains**
   - Go to Settings → General → Custom Domains
   - Or: Settings → API → Custom Domains

3. **Add Your Custom Domain**
   - Enter your domain: `api.coreplus.app` or `auth.coreplus.app`
   - Follow Supabase's verification process

## Step 2: Update DNS Records

Add the following DNS records to your domain:

```
Type: CNAME
Name: api (or auth)
Value: fsuixjjgtyvcwdkbpgta.supabase.co
TTL: Auto or 3600
```

## Step 3: Update Supabase Config

Once your custom domain is verified, update `supabaseConfig.js`:

```javascript
// Replace with your custom domain
const supabaseUrl = 'https://api.coreplus.app'; // Instead of supabase.co URL
const supabaseAnonKey = 'your-anon-key'; // Keep the same key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 4: Update Google OAuth Configuration

1. **Google Cloud Console**
   - Go to: https://console.cloud.google.com/
   - Navigate to APIs & Services → Credentials

2. **Update OAuth 2.0 Client**
   - Find your OAuth 2.0 client ID for Core Plus
   - Update "Authorized redirect URIs":
     - Add: `https://api.coreplus.app/auth/v1/callback`
     - Remove: `https://fsuixjjgtyvcwdkbpgta.supabase.co/auth/v1/callback`

## Step 5: Update App Store/Play Store Settings

When submitting your app, use your custom domain in:
- Privacy Policy URL: `https://coreplus.app/privacy`
- Terms of Service URL: `https://coreplus.app/terms`
- Support URL: `https://coreplus.app/support`

## Alternative: Use App Name in OAuth

If you can't set up a custom domain immediately, you can:

1. **Update Google OAuth App Name**
   - In Google Cloud Console → OAuth consent screen
   - Set "Application name" to "Core Plus"
   - Set "Application logo" to Core Plus logo
   - This will show "Core Plus" in the consent screen

2. **Update Support Email**
   - Use: `support@coreplus.app` or your branded email

## Benefits of Custom Domain

✅ **Professional branding** - Users see "coreplus.app" instead of Supabase URL
✅ **Trust and credibility** - Branded domain looks more professional
✅ **Consistent experience** - Matches your app's branding
✅ **Better analytics** - Easier to track and manage
✅ **Future-proof** - Can move providers without changing URLs

## Quick Fix (Immediate)

For immediate improvement without custom domain:

1. Update Google OAuth consent screen with:
   - Application name: "Core Plus"
   - Logo: Core Plus logo
   - Homepage URL: Your website/landing page

This will make the consent screen more branded even with Supabase URL.
