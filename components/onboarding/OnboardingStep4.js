import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const OnboardingStep4 = ({ 
  onboardingData, 
  mainGoals,
  loading,
  setOnboardingData,
  onCompleteOnboarding,
  onPrev, 
  styles 
}) => {
  return (
    <>
      <View style={styles.onboardingHeader}>
        <Text style={styles.onboardingTitle}>Goal Weight 🎯</Text>
        <Text style={styles.onboardingSubtitle}>Set your target weight</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 4 of 4</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.modernInputGroup}>
          <Text style={styles.modernLabel}>Goal Weight (lbs)</Text>
          <TextInput
            value={onboardingData.goalWeight}
            onChangeText={(text) => setOnboardingData({...onboardingData, goalWeight: text})}
            style={styles.modernInput}
            placeholder="e.g., 140"
            placeholderTextColor="#a0aec0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Your Plan Summary:</Text>
          <Text style={styles.summaryItem}>
            🎯 Goal: {mainGoals.find(g => g.id === onboardingData.mainGoal)?.title}
          </Text>
          <Text style={styles.summaryItem}>
            🏃‍♀️ Activities: {onboardingData.activities.length} selected
          </Text>
          <Text style={styles.summaryItem}>
            📊 Current: {onboardingData.weight} lbs
          </Text>
          <Text style={styles.summaryItem}>
            🎯 Target: {onboardingData.goalWeight} lbs
          </Text>
        </View>

        <View style={styles.onboardingNavigation}>
          <TouchableOpacity 
            style={styles.onboardingBackButton}
            onPress={onPrev}
          >
            <Text style={styles.onboardingBackText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.onboardingButton,
              !onboardingData.goalWeight && styles.onboardingButtonDisabled,
              loading && styles.onboardingButtonDisabled
            ]}
            onPress={onCompleteOnboarding}
            disabled={!onboardingData.goalWeight || loading}
          >
            <Text style={styles.onboardingButtonText}>
              {loading ? 'Creating Plan...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OnboardingStep4;
