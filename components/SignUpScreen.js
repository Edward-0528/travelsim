import React, { memo, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import OptimizedButton from './common/OptimizedButton';
import AnimatedBackground from './common/AnimatedBackground';
import { 
  scaleFont, 
  spacing, 
  responsivePadding,
  SCREEN_HEIGHT
} from '../utils/responsive';

const SignUpScreen = memo(({ 
  loading, 
  genderOptions,
  onSignUp,
  onBackToLanding,
  onSwitchToLogin,
  onSocialLogin,
  onGenderSelect,
  styles 
}) => {
  const { formData, updateFormData } = useAppContext();

  const handleNameChange = useCallback((text) => {
    updateFormData({ firstName: text });
  }, [updateFormData]);

  const handleEmailChange = useCallback((text) => {
    updateFormData({ email: text });
  }, [updateFormData]);

  const handlePasswordChange = useCallback((text) => {
    updateFormData({ password: text });
  }, [updateFormData]);

  return (
    <SafeAreaView style={styles.compactSignupContainer}>
      <AnimatedBackground />
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.compactHeader}>        
        <Text style={styles.compactTitle}>Sign up</Text>
        <Text style={styles.compactSubtitle}>Nice to meet you!</Text>
      </View>

      {/* Form Container */}
      <View style={styles.compactFormContainer}>
        {/* Name Input */}
        <View style={styles.compactInputContainer}>
          <Text style={styles.compactInputLabel}>Name</Text>
          <View style={styles.compactInputWrapper}>
            <TextInput
              style={styles.compactInput}
              value={formData.firstName}
              onChangeText={handleNameChange}
              placeholder="Edward"
              placeholderTextColor="#a0aec0"
            />
          </View>
        </View>

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

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={[styles.compactSignUpButton, loading && styles.compactButtonDisabled]}
          onPress={onSignUp}
          disabled={loading}
        >
          <Text style={styles.compactSignUpText}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Social Login */}
        <Text style={styles.compactOrText}>Sign up with</Text>
        
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

        {/* Login Link */}
        <TouchableOpacity onPress={onSwitchToLogin} style={styles.compactLoginContainer}>
          <Text style={styles.compactLoginText}>
            Already have an account? <Text style={styles.compactLoginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

SignUpScreen.displayName = 'SignUpScreen';

export default SignUpScreen;
