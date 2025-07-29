import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import SocialLoginButtons from './SocialLoginButtons';
import OptimizedInput from './common/OptimizedInput';
import OptimizedButton from './common/OptimizedButton';
import SegmentedPicker from './common/SegmentedPicker';

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
    <PaperProvider>
      <SafeAreaView style={styles.modernAuthContainer}>
        <ScrollView contentContainerStyle={styles.modernAuthScrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.modernAuthHeader}>
            <OptimizedButton onPress={onBackToLanding} style={styles.modernBackButton}>
              <Text style={styles.modernBackText}>←</Text>
            </OptimizedButton>
            <Text style={styles.modernAuthTitle}>Sign Up</Text>
          </View>

          {/* Large cute typography */}
          <View style={styles.cuteMessageContainer}>
            <Text style={styles.cuteMessageText}>Nice to meet you!</Text>
          </View>

          <View style={styles.modernFormContainer}>
            <OptimizedInput
              label="Name"
              value={formData.firstName}
              onChangeText={handleNameChange}
              style={styles.modernInputGroup}
              labelStyle={styles.modernLabel}
              inputStyle={styles.modernInput}
              placeholder="John"
              placeholderTextColor="#a0aec0"
            />

            <OptimizedInput
              label="Email"
              value={formData.email}
              onChangeText={handleEmailChange}
              style={styles.modernInputGroup}
              labelStyle={styles.modernLabel}
              inputStyle={styles.modernInput}
              placeholder="john@example.com"
              placeholderTextColor="#a0aec0"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.modernInputGroup}>
              <SegmentedPicker
                label="Gender"
                options={genderOptions}
                selectedValue={formData.gender}
                onSelect={onGenderSelect}
                style={{ marginBottom: 4 }}
              />
            </View>

            <OptimizedInput
              label="Password"
              value={formData.password}
              onChangeText={handlePasswordChange}
              style={styles.modernInputGroup}
              labelStyle={styles.modernLabel}
              inputStyle={styles.modernInput}
              placeholder="••••••••"
              placeholderTextColor="#a0aec0"
              secureTextEntry
            />

            <View style={styles.modernButtonContainer}>
              <OptimizedButton 
                style={[styles.modernContinueButton, loading && styles.modernContinueButtonDisabled]} 
                textStyle={styles.modernContinueText}
                onPress={onSignUp}
                disabled={loading}
                loading={loading}
                title="Continue"
                loadingText="Creating Account..."
              />

              <SocialLoginButtons 
                onSocialLogin={onSocialLogin}
                loading={loading}
                styles={styles}
              />
              
              <OptimizedButton onPress={onSwitchToLogin} style={styles.modernSwitchContainer}>
                <Text style={styles.modernSwitchText}>
                  Already have an account? <Text style={styles.modernSwitchLink}>Login Here</Text>
                </Text>
              </OptimizedButton>
            </View>
          </View>
        </ScrollView>
        
        <StatusBar style="dark" />
      </SafeAreaView>
    </PaperProvider>
  );
});

SignUpScreen.displayName = 'SignUpScreen';

export default SignUpScreen;
