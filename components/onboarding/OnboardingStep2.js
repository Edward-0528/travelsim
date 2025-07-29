import React, { memo } from 'react';
import { View, Text } from 'react-native';
import OptimizedButton from '../common/OptimizedButton';
import FastActivitySelector from '../optimized/FastActivitySelector';

const OnboardingStep2 = memo(({ onboardingData, activityOptions, onActivityToggle, onNext, onPrev, styles }) => {
  return (
    <>
      <View style={styles.onboardingHeader}>
        <Text style={styles.onboardingTitle}>Choose Activities 🏃‍♀️</Text>
        <Text style={styles.onboardingSubtitle}>Select up to 3 activities you enjoy</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 2 of 4</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>What activities do you enjoy?</Text>
        <Text style={styles.stepDescription}>
          Selected: {onboardingData.activities.length}/3
        </Text>
        
        <FastActivitySelector
          activities={activityOptions}
          selectedActivities={onboardingData.activities}
          onActivityToggle={onActivityToggle}
          maxActivities={3}
          styles={styles}
        />

        <View style={styles.onboardingNavigation}>
          <OptimizedButton
            style={styles.onboardingBackButton}
            textStyle={styles.onboardingBackText}
            onPress={onPrev}
            title="Back"
          />
          
          <OptimizedButton
            style={[
              styles.onboardingButton,
              onboardingData.activities.length === 0 && styles.onboardingButtonDisabled
            ]}
            textStyle={styles.onboardingButtonText}
            onPress={onNext}
            disabled={onboardingData.activities.length === 0}
            title="Continue"
          />
        </View>
      </View>
    </>
  );
});

OnboardingStep2.displayName = 'OnboardingStep2';

export default OnboardingStep2;
