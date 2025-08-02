# Biometric Authentication Guide

## Overview

Core+ now supports biometric authentication (Face ID, Touch ID, Fingerprint) for faster and more secure login on supported devices.

## Features

### For Users
- **Quick Login**: Sign in instantly using Face ID, Touch ID, or Fingerprint
- **Secure Storage**: Credentials are encrypted and stored securely on device
- **Easy Setup**: Enable biometric login during first successful password login
- **Settings Control**: Enable/disable biometric login anytime in profile settings

### For Developers
- **Cross-Platform**: Works on both iOS and Android
- **Fallback Support**: Gracefully falls back to password login if biometrics fail
- **Security First**: Uses Expo SecureStore for credential encryption

## How It Works

### First Time Setup
1. User logs in with email/password as usual
2. If device supports biometrics, user is prompted to enable biometric login
3. If enabled, credentials are securely stored and linked to biometric authentication

### Subsequent Logins
1. Login screen detects biometric capability and shows biometric option
2. User can choose between biometric or password login
3. Biometric authentication retrieves stored credentials and signs user in automatically

### Security Features
- Credentials are stored using Expo SecureStore (hardware-backed on supported devices)
- Biometric authentication required before credential retrieval
- Users can disable biometric login anytime
- Fallback to password always available

## Implementation Details

### Key Files
- `biometricService.js` - Core biometric authentication logic
- `LoginScreen.js` - UI for biometric login options
- `DashboardScreen.js` - Settings to manage biometric preferences

### Dependencies
- `expo-local-authentication` - Biometric hardware detection and authentication
- `expo-secure-store` - Secure credential storage

### API Methods
- `biometricService.isAvailable()` - Check device capability
- `biometricService.enableBiometricLogin()` - Setup biometric authentication
- `biometricService.getBiometricCredentials()` - Retrieve credentials after biometric auth
- `biometricService.disableBiometricLogin()` - Remove stored credentials

## Testing

### On Device
- Biometric authentication requires physical device (iOS/Android)
- iOS Simulator and Android Emulator will show "not available"

### Fallbacks
- If biometrics fail, user can use password
- If biometrics not supported, standard login flow continues
- If stored credentials become invalid, user prompted to re-login

## Security Considerations

- Credentials are never stored in plain text
- Biometric data never leaves the device
- Stored credentials are tied to device biometric enrollment
- Disabling biometrics immediately removes stored credentials
- Credential storage follows platform security best practices

## User Experience

### Quick Access Flow
1. Open app → Login screen appears
2. If biometrics enabled, automatic prompt: "Use Face ID to sign in?"
3. User authenticates → Instant login

### Manual Control
1. Profile Settings → Security Settings
2. Toggle biometric login on/off
3. Enable requires password confirmation
4. Disable provides confirmation dialog

This creates a seamless, secure, and user-friendly authentication experience that significantly reduces login friction while maintaining security standards.
