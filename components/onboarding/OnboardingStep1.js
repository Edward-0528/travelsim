import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OptimizedButton from '../common/OptimizedButton';

const OnboardingStep1 = memo(({ onboardingData, mainGoals, onGoalSelect, onNext, styles }) => {
  return (
    <>
      <View style={styles.onboardingHeader}>
        <Text style={styles.onboardingTitle}>Welcome to Core+! 🎯</Text>
        <Text style={styles.onboardingSubtitle}>Let's create your personalized fitness plan</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 1 of 4</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>What's your main goal?</Text>
        <Text style={styles.stepDescription}>Choose your primary fitness objective</Text>
        
        <View style={styles.goalContainer}>
          {mainGoals?.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                onboardingData.mainGoal === goal.id && styles.goalCardSelected
              ]}
              onPress={() => onGoalSelect(goal.id)}
            >
              <Text style={styles.goalEmoji}>{goal.emoji}</Text>
              <Text style={[
                styles.goalTitle,
                onboardingData.mainGoal === goal.id && styles.goalTitleSelected
              ]}>
                {goal.title}
              </Text>
              <Text style={[
                styles.goalDescription,
                onboardingData.mainGoal === goal.id && styles.goalDescriptionSelected
              ]}>
                {goal.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.onboardingButtonContainer}>
          <OptimizedButton
            style={[
              styles.onboardingButton,
              styles.onboardingButtonFullWidth,
              !onboardingData.mainGoal && styles.onboardingButtonDisabled
            ]}
            textStyle={styles.onboardingButtonText}
            onPress={onNext}
            disabled={!onboardingData.mainGoal}
            title="Continue"
          />
        </View>
      </View>
    </>
  );
});

OnboardingStep1.displayName = 'OnboardingStep1';

export default OnboardingStep1;
