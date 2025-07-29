import React, { memo } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import PerformanceOptimizedStep1 from './optimized/PerformanceOptimizedStep1';
import PerformanceOptimizedStep2 from './optimized/PerformanceOptimizedStep2';
import OnboardingStep3 from './onboarding/OnboardingStep3';
import OnboardingStep4 from './onboarding/OnboardingStep4';
import ImprovedDatePickerModal from './modals/ImprovedDatePickerModal';
import ImprovedHeightPickerModal from './modals/ImprovedHeightPickerModal';
import ImprovedWeightPickerModal from './modals/ImprovedWeightPickerModal';

const OnboardingScreen = memo(({ 
  onboardingStep,
  showDatePicker,
  showHeightPicker,
  showWeightPicker,
  loading,
  onCompleteOnboarding,
  formatDateForDisplay,
  formatHeightDisplay,
  styles 
}) => {
  const { 
    onboardingData,
    mainGoals,
    activityOptions,
    nextOnboardingStep,
    prevOnboardingStep,
    selectGoal,
    toggleActivity,
    selectDate,
    selectHeight,
    selectWeight,
    setShowDatePicker,
    setShowHeightPicker,
    setShowWeightPicker,
    setOnboardingData
  } = useAppContext();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.modernAuthContainer}>
        <ScrollView contentContainerStyle={styles.modernAuthScrollContent} showsVerticalScrollIndicator={false}>
          
          {onboardingStep === 1 && (
            <PerformanceOptimizedStep1
              onboardingData={onboardingData}
              mainGoals={mainGoals}
              onGoalSelect={selectGoal}
              onNext={nextOnboardingStep}
            />
          )}

          {onboardingStep === 2 && (
            <PerformanceOptimizedStep2
              onboardingData={onboardingData}
              activityOptions={activityOptions}
              onActivityToggle={toggleActivity}
              onNext={nextOnboardingStep}
              onPrev={prevOnboardingStep}
            />
          )}

          {onboardingStep === 3 && (
            <OnboardingStep3
              onboardingData={onboardingData}
              formatDateForDisplay={formatDateForDisplay}
              formatHeightDisplay={formatHeightDisplay}
              setShowDatePicker={setShowDatePicker}
              setShowHeightPicker={setShowHeightPicker}
              setShowWeightPicker={setShowWeightPicker}
              onNext={nextOnboardingStep}
              onPrev={prevOnboardingStep}
              styles={styles}
            />
          )}

          {onboardingStep === 4 && (
            <OnboardingStep4
              onboardingData={onboardingData}
              mainGoals={mainGoals}
              loading={loading}
              setOnboardingData={setOnboardingData}
              onCompleteOnboarding={onCompleteOnboarding}
              onPrev={prevOnboardingStep}
              styles={styles}
            />
          )}

        </ScrollView>
        
        <ImprovedDatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onDateSelect={selectDate}
          styles={styles}
        />

        <ImprovedHeightPickerModal
          visible={showHeightPicker}
          onClose={() => setShowHeightPicker(false)}
          onHeightSelect={selectHeight}
          styles={styles}
        />

        <ImprovedWeightPickerModal
          visible={showWeightPicker}
          onClose={() => setShowWeightPicker(false)}
          onWeightSelect={selectWeight}
          styles={styles}
        />
        
        <StatusBar style="dark" />
      </SafeAreaView>
    </PaperProvider>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the current step changes or related modals change
  return prevProps.onboardingStep === nextProps.onboardingStep &&
         prevProps.showDatePicker === nextProps.showDatePicker &&
         prevProps.showHeightPicker === nextProps.showHeightPicker &&
         prevProps.showWeightPicker === nextProps.showWeightPicker &&
         prevProps.loading === nextProps.loading;
});

OnboardingScreen.displayName = 'OnboardingScreen';

export default OnboardingScreen;
