import { supabase } from './supabaseConfig';
import { Linking } from 'react-native';

export const socialAuthService = {
  // Google Sign In
  signInWithGoogle: async () => {
    try {
      console.log('Initiating Google OAuth with Supabase...');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'core-plus://auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            hd: 'coreplus.app', // Optional: restrict to specific domain
          },
          scopes: 'openid email profile',
        },
      });

      console.log('Google OAuth response:', { data, error });

      if (error) throw error;

      // Open the OAuth URL in the device's browser
      if (data?.url) {
        console.log('Opening OAuth URL:', data.url);
        const canOpen = await Linking.canOpenURL(data.url);
        console.log('Can open URL:', canOpen);
        
        if (canOpen) {
          await Linking.openURL(data.url);
        } else {
          throw new Error('Cannot open OAuth URL');
        }
      } else {
        throw new Error('No OAuth URL received from Supabase');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Google OAuth error:', error);
      return { success: false, error: error.message };
    }
  },

  // Apple Sign In (iOS only)
  signInWithApple: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'core-plus://auth/callback',
        },
      });

      if (error) throw error;

      // Open the OAuth URL in the device's browser
      if (data?.url) {
        const canOpen = await Linking.canOpenURL(data.url);
        if (canOpen) {
          await Linking.openURL(data.url);
        } else {
          throw new Error('Cannot open OAuth URL');
        }
      } else {
        throw new Error('No OAuth URL received from Supabase');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Facebook Sign In
  signInWithFacebook: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: 'core-plus://auth/callback',
        },
      });

      if (error) throw error;

      // Open the OAuth URL in the device's browser
      if (data?.url) {
        const canOpen = await Linking.canOpenURL(data.url);
        if (canOpen) {
          await Linking.openURL(data.url);
        } else {
          throw new Error('Cannot open OAuth URL');
        }
      } else {
        throw new Error('No OAuth URL received from Supabase');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // GitHub Sign In
  signInWithGitHub: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: 'core-plus://auth/callback',
        },
      });

      if (error) throw error;

      // Open the OAuth URL in the device's browser
      if (data?.url) {
        const canOpen = await Linking.canOpenURL(data.url);
        if (canOpen) {
          await Linking.openURL(data.url);
        } else {
          throw new Error('Cannot open OAuth URL');
        }
      } else {
        throw new Error('No OAuth URL received from Supabase');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Handle OAuth callback
  handleOAuthCallback: async (url) => {
    try {
      const { data, error } = await supabase.auth.getSessionFromUrl({ url });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
