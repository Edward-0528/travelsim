import React, { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { authService } from './authService';
import { socialAuthService } from './socialAuthService';
import { styles } from './styles/AppStyles';
import { AppProvider, useAppContext } from './contexts/AppContext';

// Import components
import LandingScreen from './components/LandingScreen';
import SignUpScreen from './components/SignUpScreen';
import LoginScreen from './components/LoginScreen';
import ScreenFittedOnboardingScreen from './components/ScreenFittedOnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import LoadingScreen from './components/LoadingScreen';

// Constants moved outside component to prevent recreation
const GENDER_OPTIONS = [
  'Male', 'Female', 'Trans', 'Fluid', 'Non-binary', 'Other', 'Prefer not to say'
];

function AppContent() {
  const {
    showLanding,
    showLogin,
    showSignUp,
    showOnboarding,
    onboardingStep,
    showDatePicker,
    showHeightPicker,
    showWeightPicker,
    isAuthenticated,
    user,
    loading,
    authLoading,
    count,
    formData,
    onboardingData,
    // Actions from context
    handleGetStarted,
    handleSwitchToLogin,
    handleSwitchToSignUp,
    handleBackToLanding,
    setShowDatePicker,
    setShowHeightPicker,
    setShowWeightPicker,
    nextOnboardingStep,
    prevOnboardingStep,
    selectGoal,
    toggleActivity,
    selectDate,
    selectHeight,
    selectWeight,
    setUser,
    setIsAuthenticated,
    setAuthLoading,
    setLoading,
    setShowOnboarding,
    setShowLanding,
    setShowLogin,
    setShowSignUp,
    setFormData,
    setOnboardingData,
    setCount,
    updateFormData
  } = useAppContext();

  // Check authentication state on app load
  useEffect(() => {
    checkAuthState();
    
    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        setShowLanding(false);
        setShowLogin(false);
        setShowSignUp(false);
        
        // For new signups, we need to check onboarding with loading
        // For returning users, we want a quick check
        const isNewSession = event === 'SIGNED_IN';
        
        if (isNewSession) {
          // Keep loading screen for new signups
          setLoading(true);
        }
        
        // Check if user needs onboarding
        const needsOnboarding = await checkIfUserNeedsOnboarding(session.user.id);
        setShowOnboarding(needsOnboarding);
        
        // Clear loading after check
        setLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setShowLanding(true);
        setShowOnboarding(false);
        // Clear loading states
        setAuthLoading(false);
        setLoading(false);
      }
      
      // Clear auth loading state
      setAuthLoading(false);
    });

    // Handle OAuth callback from social logins
    const handleUrl = async (event) => {
      if (event.url.includes('auth/callback')) {
        setLoading(true);
        const result = await socialAuthService.handleOAuthCallback(event.url);
        setLoading(false);
        if (!result.success) {
          Alert.alert('Login Error', result.error);
        }
      }
    };

    const linkingSubscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription?.unsubscribe();
      linkingSubscription?.remove();
    };
  }, []);

  const checkAuthState = async () => {
    setAuthLoading(true);
    try {
      const { data: { user } } = await authService.getCurrentUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setShowLanding(false);
        
        // For existing users, check if they have completed onboarding
        // This reduces unnecessary database calls
        const needsOnboarding = await checkIfUserNeedsOnboarding(user.id);
        setShowOnboarding(needsOnboarding);
        
        // Only show loading briefly for returning users
        if (!needsOnboarding) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
    setAuthLoading(false);
  };

  const checkIfUserNeedsOnboarding = async (userId) => {
    try {
      const { supabase } = await import('./supabaseConfig');
      
      // Fast query - only check if record exists
      const { data, error } = await supabase
        .from('user_fitness_profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        // 42P01 = Table doesn't exist
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('user_fitness_profiles table does not exist. Please run the SQL script to create it.');
          return true; // Show onboarding since table doesn't exist
        }
        console.error('Error checking user profile:', error);
        return true; // Default to showing onboarding if error
      }
      
      // If data exists, user has completed onboarding
      const hasProfile = !!data;
      
      if (hasProfile) {
        console.log('✅ User has fitness profile, going to dashboard');
        return false; // No onboarding needed
      } else {
        console.log('📝 User needs onboarding');
        return true; // Show onboarding
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return true; // Default to onboarding on error
    }
  };

  const calculateBMI = (heightInches, weightPounds) => {
    // BMI = (weight in pounds / (height in inches)²) × 703
    const bmi = (weightPounds / (heightInches * heightInches)) * 703;
    return Math.round(bmi * 10) / 10; // Round to 1 decimal place
  };

  const getBMICategory = (bmi, age) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3182ce', advice: 'Consider gaining weight through healthy eating and exercise.' };
    if (bmi < 25) return { category: 'Normal weight', color: '#38a169', advice: 'Great! Maintain your current healthy weight.' };
    if (bmi < 30) return { category: 'Overweight', color: '#d69e2e', advice: 'Consider losing weight through diet and exercise.' };
    return { category: 'Obese', color: '#e53e3e', advice: 'Consult with a healthcare provider about weight management.' };
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid date format:', dateOfBirth);
      return 0;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date format for display:', dateString);
      return 'Invalid Date';
    }
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const convertHeightToInches = (feet, inches) => {
    return (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
  };

  const formatHeightDisplay = (feet, inches) => {
    if (!feet && !inches) return 'Select height';
    return `${feet || 0}' ${inches || 0}"`;
  };

  const handleGenderSelect = (selectedGender) => {
    updateFormData({ gender: selectedGender });
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    
    try {
      // Calculate BMI and age
      const heightInches = convertHeightToInches(onboardingData.heightFeet, onboardingData.heightInches);
      const weightPounds = parseFloat(onboardingData.weight);
      const age = calculateAge(onboardingData.dateOfBirth);
      const bmi = calculateBMI(heightInches, weightPounds);
      const bmiInfo = getBMICategory(bmi, age);
      
      // Prepare the data for insertion
      const profileData = {
        id: user.id,
        main_goal: onboardingData.mainGoal,
        activities: onboardingData.activities || [], // Ensure it's an array
        date_of_birth: onboardingData.dateOfBirth,
        age: age, // Include calculated age
        height_inches: heightInches,
        weight_pounds: weightPounds,
        goal_weight_pounds: parseFloat(onboardingData.goalWeight) || weightPounds, // Default to current weight if not set
        bmi: bmi, // Include calculated BMI
        created_at: new Date().toISOString()
      };
      
      console.log('Saving fitness profile:', profileData);
      
      // Save to Supabase
      const { supabase } = await import('./supabaseConfig');
      const { data, error } = await supabase
        .from('user_fitness_profiles')
        .insert(profileData)
        .select(); // Return the inserted data
      
      if (error) {
        console.error('Error saving fitness profile:', error);
        Alert.alert('Error', `Failed to save your fitness profile: ${error.message}`);
        setLoading(false);
        return;
      }
      
      console.log('Fitness profile saved successfully:', data);
      
      // Smooth transition to dashboard without popup
      setShowOnboarding(false);
      setLoading(false);
      // User will automatically see the dashboard since they're authenticated
      // and no longer need onboarding
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert('Error', `Something went wrong: ${error.message}`);
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.firstName) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    console.log('Starting sign-up with:', {
      email: formData.email,
      firstName: formData.firstName,
      gender: formData.gender
    });

    // Store email and password before clearing form data
    const signupEmail = formData.email;
    const signupPassword = formData.password;

    setLoading(true);
    const result = await authService.signUp(
      formData.email, 
      formData.password, 
      formData.firstName, 
      formData.gender
    );

    console.log('Sign-up result:', result);

    if (result.success) {
      // Clear form data
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: ''
      });
      
      // Auto-login the user after successful signup using stored credentials
      console.log('Auto-logging in user after signup...');
      const loginResult = await authService.signIn(signupEmail, signupPassword);
      
      if (loginResult.success) {
        console.log('Auto-login successful, user will be redirected to onboarding');
        // Keep loading state active - let the auth state listener handle the rest
        // Don't set loading to false here
      } else {
        console.error('Auto-login failed:', loginResult.error);
        setLoading(false); // Only set loading false on error
        Alert.alert(
          'Account Created', 
          'Your account was created successfully, but there was an issue logging you in automatically. Please log in manually.',
          [{ text: 'OK', onPress: () => setShowLogin(true) }]
        );
      }
    } else {
      console.error('Sign-up error:', result.error);
      setLoading(false); // Only set loading false on error
      Alert.alert('Error', result.error);
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    const result = await authService.signIn(formData.email, formData.password);
    
    if (result.success) {
      // Clear form data
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: ''
      });
      // Keep loading state active - let the auth state listener handle the rest
      // Don't set loading to false here
    } else {
      setLoading(false); // Only set loading false on error
      Alert.alert('Error', result.error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const result = await authService.signOut();
    setLoading(false);

    if (!result.success) {
      Alert.alert('Error', result.error);
    }
  };

  const handleSocialLogin = async (provider) => {
    console.log(`Starting ${provider} login...`);
    setLoading(true);
    let result;
    
    try {
      switch (provider) {
        case 'google':
          console.log('Calling Google OAuth...');
          result = await socialAuthService.signInWithGoogle();
          break;
        case 'apple':
          console.log('Calling Apple OAuth...');
          result = await socialAuthService.signInWithApple();
          break;
        case 'github':
          console.log('Calling GitHub OAuth...');
          result = await socialAuthService.signInWithGitHub();
          break;
      }
      
      console.log(`${provider} login result:`, result);
      
      if (!result.success) {
        console.error(`${provider} login error:`, result.error);
        Alert.alert('Social Login Error', result.error);
      } else {
        console.log(`${provider} login successful!`);
      }
    } catch (error) {
      console.error(`${provider} login exception:`, error);
      Alert.alert('Social Login Error', error.message || 'An unexpected error occurred');
    }
    
    setLoading(false);
    // Success is handled by the auth state listener
  };

  // Show loading screen while checking authentication or during user setup
  if (authLoading) {
    return <LoadingScreen styles={styles} message="Loading..." />;
  }
  
  // Show friendly loading for new users during setup
  if (isAuthenticated && loading) {
    return <LoadingScreen styles={styles} message="Thanks for joining us! Setting up your experience..." />;
  }

  if (showLanding) {
    return (
      <LandingScreen
        onGetStarted={handleGetStarted}
        styles={styles}
      />
    );
  }

  // Sign Up Screen
  if (showSignUp) {
    return (
      <SignUpScreen
        loading={loading}
        genderOptions={GENDER_OPTIONS}
        onSignUp={handleSignUp}
        onBackToLanding={handleBackToLanding}
        onSwitchToLogin={handleSwitchToLogin}
        onSocialLogin={handleSocialLogin}
        onGenderSelect={handleGenderSelect}
        styles={styles}
      />
    );
  }

  // Login Screen
  if (showLogin) {
    return (
      <LoginScreen
        loading={loading}
        onLogin={handleLogin}
        onBackToLanding={handleBackToLanding}
        onSwitchToSignUp={handleSwitchToSignUp}
        onSocialLogin={handleSocialLogin}
        styles={styles}
      />
    );
  }

  // Onboarding Flow
  if (showOnboarding) {
    return (
      <ScreenFittedOnboardingScreen
        onboardingStep={onboardingStep}
        showDatePicker={showDatePicker}
        showHeightPicker={showHeightPicker}
        showWeightPicker={showWeightPicker}
        loading={loading}
        onCompleteOnboarding={handleCompleteOnboarding}
        formatDateForDisplay={formatDateForDisplay}
        formatHeightDisplay={formatHeightDisplay}
        styles={styles}
      />
    );
  }

  // Main App Content (after authentication and onboarding check)
  if (isAuthenticated && user && !showOnboarding && !authLoading && !loading) {
    return (
      <DashboardScreen
        user={user}
        onLogout={handleLogout}
        loading={loading}
        styles={styles}
      />
    );
  }

  // Show landing page by default
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <StatusBar style="auto" />
    </AppProvider>
  );
}