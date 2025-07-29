import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import { socialAuthService } from './socialAuthService';

export const SocialLoginButtons = ({ onLoading, onError, onSuccess }) => {
  const handleSocialLogin = async (provider) => {
    onLoading(true);
    let result;
    
    switch (provider) {
      case 'google':
        result = await socialAuthService.signInWithGoogle();
        break;
      case 'apple':
        result = await socialAuthService.signInWithApple();
        break;
      case 'facebook':
        result = await socialAuthService.signInWithFacebook();
        break;
      case 'github':
        result = await socialAuthService.signInWithGitHub();
        break;
    }
    
    onLoading(false);
    
    if (result.success) {
      onSuccess(result.data);
    } else {
      onError(result.error);
    }
  };

  return (
    <View style={styles.socialContainer}>
      <Text style={styles.orText}>or continue with</Text>
      
      <View style={styles.socialButtonsRow}>
        {/* Google */}
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => handleSocialLogin('google')}
        >
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        {/* Apple (iOS only) */}
        {Platform.OS === 'ios' && (
          <TouchableOpacity 
            style={[styles.socialButton, styles.appleButton]}
            onPress={() => handleSocialLogin('apple')}
          >
            <Text style={[styles.socialButtonText, styles.appleButtonText]}>Apple</Text>
          </TouchableOpacity>
        )}

        {/* Facebook */}
        <TouchableOpacity 
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => handleSocialLogin('facebook')}
        >
          <Text style={[styles.socialButtonText, styles.facebookButtonText]}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  orText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
    fontWeight: '400',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 80,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3748',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  appleButtonText: {
    color: '#ffffff',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
  },
  facebookButtonText: {
    color: '#ffffff',
  },
});
