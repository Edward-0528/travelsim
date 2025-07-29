import React, { memo } from 'react';
import { SafeAreaView, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../contexts/AppContext';
import ScreenFittedStep1 from './optimized/ScreenFittedStep1';
import ScreenFittedStep2 from './optimized/ScreenFittedStep2';
import ScreenFittedStep3 from './optimized/ScreenFittedStep3';
import ScreenFittedStep4 from './optimized/ScreenFittedStep4';
import ImprovedDatePickerModal from './modals/ImprovedDatePickerModal';
import ImprovedHeightPickerModal from './modals/ImprovedHeightPickerModal';
import ImprovedWeightPickerModal from './modals/ImprovedWeightPickerModal';

const ScreenFittedOnboardingScreen = memo(({ 
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* No ScrollView - each step manages its own layout */}
        <View style={{ flex: 1 }}>
          
          {onboardingStep === 1 && (
            <ScreenFittedStep1
              onboardingData={onboardingData}
              mainGoals={mainGoals}
              onGoalSelect={selectGoal}
              onNext={nextOnboardingStep}
            />
          )}

          {onboardingStep === 2 && (
            <ScreenFittedStep2
              onboardingData={onboardingData}
              activityOptions={activityOptions}
              onActivityToggle={toggleActivity}
              onNext={nextOnboardingStep}
              onPrev={prevOnboardingStep}
            />
          )}

          {onboardingStep === 3 && (
            <ScreenFittedStep3
              onboardingData={onboardingData}
              formatDateForDisplay={formatDateForDisplay}
              formatHeightDisplay={formatHeightDisplay}
              setShowDatePicker={setShowDatePicker}
              setShowHeightPicker={setShowHeightPicker}
              setShowWeightPicker={setShowWeightPicker}
              onNext={nextOnboardingStep}
              onPrev={prevOnboardingStep}
            />
          )}

          {onboardingStep === 4 && (
            <ScreenFittedStep4
              onboardingData={onboardingData}
              mainGoals={mainGoals}
              loading={loading}
              setOnboardingData={setOnboardingData}
              onCompleteOnboarding={onCompleteOnboarding}
              onPrev={prevOnboardingStep}
            />
          )}

        </View>
        
        {/* Modals */}
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

ScreenFittedOnboardingScreen.displayName = 'ScreenFittedOnboardingScreen';

export default ScreenFittedOnboardingScreen;
