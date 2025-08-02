import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const BIOMETRIC_CREDENTIALS_KEY = 'biometric_credentials';
const BIOMETRIC_ENABLED_KEY = 'biometric_enabled';

export const biometricService = {
  // Check if biometric authentication is available on the device
  isAvailable: async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      return {
        isAvailable: hasHardware && isEnrolled,
        hasHardware,
        isEnrolled,
        supportedTypes,
        biometricType: supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) 
          ? 'Face ID' 
          : supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
          ? 'Fingerprint'
          : 'Biometric'
      };
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return {
        isAvailable: false,
        hasHardware: false,
        isEnrolled: false,
        supportedTypes: [],
        biometricType: 'Biometric'
      };
    }
  },

  // Authenticate with biometrics
  authenticate: async (reason = 'Please verify your identity') => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      return {
        success: biometricAuth.success,
        error: biometricAuth.error,
        warning: biometricAuth.warning
      };
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return {
        success: false,
        error: 'Biometric authentication failed'
      };
    }
  },

  // Enable biometric login and store credentials securely
  enableBiometricLogin: async (email, password) => {
    try {
      const biometricInfo = await biometricService.isAvailable();
      
      if (!biometricInfo.isAvailable) {
        return {
          success: false,
          error: 'Biometric authentication is not available on this device'
        };
      }

      // Authenticate first to confirm user wants to enable biometrics
      const authResult = await biometricService.authenticate(
        `Enable ${biometricInfo.biometricType} login for faster access`
      );

      if (!authResult.success) {
        return {
          success: false,
          error: 'Biometric authentication required to enable this feature'
        };
      }

      // Store credentials securely
      const credentials = {
        email,
        password,
        enabledAt: new Date().toISOString()
      };

      await SecureStore.setItemAsync(
        BIOMETRIC_CREDENTIALS_KEY, 
        JSON.stringify(credentials)
      );
      
      await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, 'true');

      return {
        success: true,
        biometricType: biometricInfo.biometricType
      };
    } catch (error) {
      console.error('Error enabling biometric login:', error);
      return {
        success: false,
        error: 'Failed to enable biometric login'
      };
    }
  },

  // Disable biometric login
  disableBiometricLogin: async () => {
    try {
      await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIALS_KEY);
      await SecureStore.deleteItemAsync(BIOMETRIC_ENABLED_KEY);
      return { success: true };
    } catch (error) {
      console.error('Error disabling biometric login:', error);
      return {
        success: false,
        error: 'Failed to disable biometric login'
      };
    }
  },

  // Check if biometric login is enabled
  isBiometricLoginEnabled: async () => {
    try {
      const isEnabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
      const hasCredentials = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIALS_KEY);
      
      return isEnabled === 'true' && hasCredentials !== null;
    } catch (error) {
      console.error('Error checking biometric login status:', error);
      return false;
    }
  },

  // Get stored credentials after biometric authentication
  getBiometricCredentials: async () => {
    try {
      const isEnabled = await biometricService.isBiometricLoginEnabled();
      
      if (!isEnabled) {
        return {
          success: false,
          error: 'Biometric login is not enabled'
        };
      }

      const biometricInfo = await biometricService.isAvailable();
      
      if (!biometricInfo.isAvailable) {
        return {
          success: false,
          error: 'Biometric authentication is not available'
        };
      }

      // Authenticate with biometrics
      const authResult = await biometricService.authenticate(
        `Use ${biometricInfo.biometricType} to sign in to Core+`
      );

      if (!authResult.success) {
        return {
          success: false,
          error: 'Biometric authentication failed'
        };
      }

      // Retrieve stored credentials
      const credentialsString = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIALS_KEY);
      
      if (!credentialsString) {
        return {
          success: false,
          error: 'No stored credentials found'
        };
      }

      const credentials = JSON.parse(credentialsString);
      
      return {
        success: true,
        credentials: {
          email: credentials.email,
          password: credentials.password
        }
      };
    } catch (error) {
      console.error('Error getting biometric credentials:', error);
      return {
        success: false,
        error: 'Failed to retrieve credentials'
      };
    }
  },

  // Get biometric info for display purposes
  getBiometricInfo: async () => {
    const info = await biometricService.isAvailable();
    const isEnabled = await biometricService.isBiometricLoginEnabled();
    
    return {
      ...info,
      isEnabled
    };
  }
};
