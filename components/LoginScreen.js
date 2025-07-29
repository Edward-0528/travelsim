import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import OptimizedInput from './common/OptimizedInput';
import OptimizedButton from './common/OptimizedButton';
import SocialLoginButtons from './SocialLoginButtons';

const LoginScreen = ({ 
  loading, 
  onLogin,
  onBackToLanding,
  onSwitchToSignUp,
  onSocialLogin,
  styles 
}) => {
  const { formData, updateFormData } = useAppContext();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.modernAuthContainer}>
        <ScrollView contentContainerStyle={styles.modernAuthScrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.modernAuthHeader}>
            <TouchableOpacity onPress={onBackToLanding} style={styles.modernBackButton}>
              <Text style={styles.modernBackText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.modernAuthTitle}>Welcome Back</Text>
          </View>

          <View style={styles.modernFormContainer}>
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernLabel}>Email</Text>
              <OptimizedInput
                value={formData.email}
                onChangeText={(text) => updateFormData({ email: text })}
                style={styles.modernInput}
                placeholder="john@example.com"
                placeholderTextColor="#a0aec0"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.modernInputGroup}>
              <Text style={styles.modernLabel}>Password</Text>
              <OptimizedInput
                value={formData.password}
                onChangeText={(text) => updateFormData({ password: text })}
                style={styles.modernInput}
                placeholder="••••••••"
                placeholderTextColor="#a0aec0"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.modernButtonContainer}>
            <OptimizedButton 
              style={[styles.modernContinueButton, loading && styles.modernContinueButtonDisabled]} 
              onPress={onLogin}
              disabled={loading}
            >
              <Text style={styles.modernContinueText}>
                {loading ? 'Signing in...' : 'Login'}
              </Text>
            </OptimizedButton>

            <SocialLoginButtons 
              onSocialLogin={onSocialLogin}
              loading={loading}
              styles={styles}
            />
            
            <TouchableOpacity onPress={onSwitchToSignUp} style={styles.modernSwitchContainer}>
              <Text style={styles.modernSwitchText}>
                Don't have an account? <Text style={styles.modernSwitchLink}>Sign Up Here</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default LoginScreen;
