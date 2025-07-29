import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const OnboardingStep3 = ({ 
  onboardingData, 
  formatDateForDisplay, 
  formatHeightDisplay, 
  setShowDatePicker,
  setShowHeightPicker,
  setShowWeightPicker,
  onNext, 
  onPrev, 
  styles 
}) => {
  return (
    <>
      <View style={styles.onboardingHeader}>
        <Text style={styles.onboardingTitle}>Personal Info 📊</Text>
        <Text style={styles.onboardingSubtitle}>Help us personalize your plan</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 3 of 4</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.modernInputGroup}>
          <Text style={styles.modernLabel}>Date of Birth</Text>
          <TouchableOpacity 
            style={styles.modernDropdown}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.modernDropdownText, !onboardingData.dateOfBirth && styles.modernDropdownPlaceholder]}>
              {onboardingData.dateOfBirth ? formatDateForDisplay(onboardingData.dateOfBirth) : 'Select date of birth'}
            </Text>
            <Text style={styles.modernDropdownArrow}>📅</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modernInputGroup}>
          <Text style={styles.modernLabel}>Height</Text>
          <TouchableOpacity 
            style={styles.modernDropdown}
            onPress={() => setShowHeightPicker(true)}
          >
            <Text style={[styles.modernDropdownText, !onboardingData.heightFeet && !onboardingData.heightInches && styles.modernDropdownPlaceholder]}>
              {formatHeightDisplay(onboardingData.heightFeet, onboardingData.heightInches)}
            </Text>
            <Text style={styles.modernDropdownArrow}>📏</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modernInputGroup}>
          <Text style={styles.modernLabel}>Current Weight</Text>
          <TouchableOpacity 
            style={styles.modernDropdown}
            onPress={() => setShowWeightPicker(true)}
          >
            <Text style={[styles.modernDropdownText, !onboardingData.weight && styles.modernDropdownPlaceholder]}>
              {onboardingData.weight ? `${onboardingData.weight} lbs` : 'Select weight'}
            </Text>
            <Text style={styles.modernDropdownArrow}>⚖️</Text>
          </TouchableOpacity>
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
              (!onboardingData.dateOfBirth || !onboardingData.heightFeet || !onboardingData.weight) && 
              styles.onboardingButtonDisabled
            ]}
            onPress={onNext}
            disabled={!onboardingData.dateOfBirth || !onboardingData.heightFeet || !onboardingData.weight}
          >
            <Text style={styles.onboardingButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OnboardingStep3;
