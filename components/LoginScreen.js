import React, { memo, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import AnimatedBackground from './common/AnimatedBackground';
import { biometricService } from '../biometricService';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = memo(({ 
  loading, 
  onLogin,
  onBackToLanding,
  onSwitchToSignUp,
  onSocialLogin,
  onBiometricLogin,
  styles 
}) => {
  const { formData, updateFormData } = useAppContext();
  const [biometricInfo, setBiometricInfo] = useState({
    isAvailable: false,
    isEnabled: false,
    biometricType: 'Biometric'
  });

  // Check biometric availability when component mounts
  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    try {
      const info = await biometricService.getBiometricInfo();
      setBiometricInfo(info);
      
      // If biometric is available and enabled, show a prompt to use it
      if (info.isAvailable && info.isEnabled) {
        setTimeout(() => {
          Alert.alert(
            'Quick Login Available',
            `You can sign in quickly using ${info.biometricType}. Would you like to use it now?`,
            [
              { text: 'Use Password', style: 'cancel' },
              { text: `Use ${info.biometricType}`, onPress: handleBiometricLogin }
            ]
          );
        }, 500); // Small delay to let the screen render first
      }
    } catch (error) {
      console.error('Error checking biometric status:', error);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      if (onBiometricLogin) {
        await onBiometricLogin();
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric login failed. Please try again.');
    }
  };

  const handleEmailChange = useCallback((text) => {
    updateFormData({ email: text });
  }, [updateFormData]);

  const handlePasswordChange = useCallback((text) => {
    updateFormData({ password: text });
  }, [updateFormData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedBackground />
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.compactHeader}>        
        <Text style={styles.compactTitle}>Welcome Back</Text>
        <Text style={styles.compactSubtitle}>we are happy to see you back again!</Text>
      </View>

      {/* Form Container */}
      <View style={styles.compactFormContainer}>
        {/* Email Input */}
        <View style={styles.compactInputContainer}>
          <Text style={styles.compactInputLabel}>Email</Text>
          <View style={styles.compactInputWrapper}>
            <TextInput
              style={styles.compactInput}
              value={formData.email}
              onChangeText={handleEmailChange}
              placeholder="CorePlus@gmail.com"
              placeholderTextColor="#a0aec0"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {formData.email && !formData.email.includes('@') && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorDot}>●</Text>
              <Text style={styles.errorText}>Invalid email format</Text>
            </View>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.compactInputContainer}>
          <Text style={styles.compactInputLabel}>Password</Text>
          <View style={styles.compactInputWrapper}>
            <TextInput
              style={styles.compactInput}
              value={formData.password}
              onChangeText={handlePasswordChange}
              placeholder="••••••••••"
              placeholderTextColor="#a0aec0"
              secureTextEntry
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={[styles.compactSignUpButton, loading && styles.compactButtonDisabled]}
          onPress={onLogin}
          disabled={loading}
        >
          <Text style={styles.compactSignUpText}>
            {loading ? "Signing in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Biometric Login Button - Show if available and enabled */}
        {biometricInfo.isAvailable && biometricInfo.isEnabled && (
          <TouchableOpacity 
            style={[styles.compactBiometricButton]}
            onPress={handleBiometricLogin}
            disabled={loading}
          >
            <Text style={styles.compactBiometricIcon}>
              {biometricInfo.biometricType === 'Face ID' ? '👤' : '👆'}
            </Text>
            <Text style={styles.compactBiometricText}>
              Sign in with {biometricInfo.biometricType}
            </Text>
          </TouchableOpacity>
        )}

        {/* OR divider - only show if biometric is available */}
        {biometricInfo.isAvailable && biometricInfo.isEnabled && (
          <Text style={styles.compactOrText}>or</Text>
        )}

        {/* Social Login */}
        <Text style={styles.compactOrText}>Sign in with</Text>
        
        <View style={styles.compactSocialContainer}>
          <TouchableOpacity 
            style={[styles.compactSocialButton, styles.compactAppleButton]}
            onPress={() => onSocialLogin('apple')}
          >
            <Text style={styles.compactSocialIcon}>A</Text>
            <Text style={[styles.compactSocialText, styles.compactAppleText]}>Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.compactSocialButton, styles.compactGoogleButton]}
            onPress={() => onSocialLogin('google')}
          >
            <Text style={styles.compactSocialIconGoogle}>G</Text>
            <Text style={styles.compactSocialText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <TouchableOpacity onPress={onSwitchToSignUp} style={styles.compactLoginContainer}>
          <Text style={styles.compactLoginText}>
            Don't have an account? <Text style={styles.compactLoginLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

LoginScreen.displayName = 'LoginScreen';

export default LoginScreen;
