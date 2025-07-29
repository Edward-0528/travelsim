import { supabase } from './supabaseConfig';

export const testSupabaseProviders = async () => {
  try {
    // This will help us see what providers are actually configured
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'core-plus://auth/callback',
      },
    });

    console.log('Test OAuth Response:', { data, error });
    
    if (error) {
      console.error('OAuth Error Details:', error);
      
      // Common error messages and what they mean:
      if (error.message.includes('provider not found') || error.message.includes('not enabled')) {
        return {
          success: false,
          message: 'Google OAuth is not enabled in Supabase. Please configure it in your Supabase dashboard.',
          needsConfiguration: true
        };
      } else if (error.message.includes('client_id') || error.message.includes('client_secret')) {
        return {
          success: false,
          message: 'Google OAuth is enabled but missing credentials. Check your Google Client ID and Secret in Supabase.',
          needsConfiguration: true
        };
      } else {
        return {
          success: false,
          message: error.message,
          needsConfiguration: false
        };
      }
    }

    if (data?.url) {
      return {
        success: true,
        message: 'Google OAuth is properly configured!',
        url: data.url,
        needsConfiguration: false
      };
    } else {
      return {
        success: false,
        message: 'OAuth succeeded but no URL received. This is unusual.',
        needsConfiguration: false
      };
    }
  } catch (error) {
    console.error('Test OAuth Exception:', error);
    return {
      success: false,
      message: error.message,
      needsConfiguration: false
    };
  }
};
