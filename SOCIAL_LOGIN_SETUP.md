# Social Login Setup Guide for Core+

## 🎯 Difficulty: EASY (2-3 hours total setup)

Social logins with Supabase are surprisingly simple! Here's exactly what you need to do:

## 1. Supabase Dashboard Configuration (30 minutes)

### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add these redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `core-plus://auth/callback` (for mobile)
6. Copy your Google Client ID and Secret
7. In Supabase Dashboard → Authentication → Providers → Google:
   - Enable Google provider
   - Paste Client ID and Secret

### Apple Sign In (iOS):
1. Apple Developer Account required
2. Create App ID with Sign In with Apple capability
3. Create Service ID for web authentication
4. In Supabase Dashboard → Authentication → Providers → Apple:
   - Enable Apple provider
   - Add your Service ID and Key

### Facebook Login:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Get App ID and App Secret
5. In Supabase Dashboard → Authentication → Providers → Facebook:
   - Enable Facebook provider
   - Add App ID and Secret

## 2. Code Integration (15 minutes)

### Add to your sign-up screen:
```javascript
import { SocialLoginButtons } from './SocialLoginButtons';

// Inside your sign-up screen JSX, add this after the form:
<SocialLoginButtons
  onLoading={setLoading}
  onError={(error) => Alert.alert('Error', error)}
  onSuccess={(data) => {
    // User is automatically signed in via auth state listener
    console.log('Social login successful!', data);
  }}
/>
```

### Add to your login screen:
```javascript
// Same component, same usage
<SocialLoginButtons
  onLoading={setLoading}
  onError={(error) => Alert.alert('Error', error)}
  onSuccess={(data) => console.log('Login successful!', data)}
/>
```

## 3. Deep Link Configuration (10 minutes)

### Update app.json:
```json
{
  "expo": {
    "scheme": "core-plus",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "core-plus"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### Handle OAuth callback in App.js:
```javascript
import { Linking } from 'react-native';
import { socialAuthService } from './socialAuthService';

// Add to your useEffect:
useEffect(() => {
  const handleUrl = async (event) => {
    if (event.url.includes('auth/callback')) {
      const result = await socialAuthService.handleOAuthCallback(event.url);
      if (!result.success) {
        Alert.alert('Login Error', result.error);
      }
    }
  };

  const subscription = Linking.addEventListener('url', handleUrl);
  return () => subscription?.remove();
}, []);
```

## 4. Benefits of Social Login

✅ **Faster user onboarding** - No manual form filling
✅ **Higher conversion rates** - Users prefer one-click login
✅ **Better security** - OAuth providers handle security
✅ **User trust** - Familiar login methods
✅ **Profile data** - Get user's name, photo automatically

## 5. User Experience Flow

1. User taps "Continue with Google"
2. Browser/WebView opens with Google login
3. User authorizes your app
4. Redirects back to your app
5. User is automatically logged in
6. Profile data is saved to Supabase

## 6. Testing

- Test each provider on both iOS and Android
- Verify deep link redirects work correctly
- Check that user data is properly saved
- Test logout and re-login flows

## 7. Production Considerations

- Add proper error handling
- Implement loading states
- Test on real devices (not just simulator)
- Configure production OAuth credentials
- Set up proper redirect URIs for app store versions

## 8. Cost: FREE! 🎉

- Google OAuth: Free
- Apple Sign In: Free (requires Apple Developer account)
- Facebook Login: Free
- Supabase: Free tier includes social auth

The hardest part is just the initial OAuth app setup with each provider. The actual code integration is super simple!
