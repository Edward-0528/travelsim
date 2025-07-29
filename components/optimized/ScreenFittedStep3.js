import React, { memo } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

const ScreenFittedStep3 = memo(({ 
  onboardingData, 
  formatDateForDisplay, 
  formatHeightDisplay, 
  setShowDatePicker,
  setShowHeightPicker,
  setShowWeightPicker,
  onNext, 
  onPrev
}) => {
  const { height: screenHeight } = useWindowDimensions();
  
  // Adjust sizes based on screen height
  const titleSize = screenHeight < 700 ? 24 : 28;
  const subtitleSize = screenHeight < 700 ? 14 : 16;
  const stepTitleSize = screenHeight < 700 ? 18 : 22;
  const labelSize = screenHeight < 700 ? 14 : 16;
  const dropdownHeight = screenHeight < 700 ? 50 : 60;
  
  const headerHeight = screenHeight < 700 ? 120 : 140;
  const buttonHeight = 130; // Increased for extra padding (50px button + 90px padding)
  const inputSpacing = screenHeight < 700 ? 16 : 24;

  const canContinue = onboardingData.dateOfBirth && 
                      onboardingData.heightFeet && 
                      onboardingData.weight;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Fixed Header */}
      <View style={{ 
        height: headerHeight,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'center'
      }}>
        <Text style={{ 
          fontSize: titleSize, 
          fontWeight: 'bold', 
          color: '#1A1A1A', 
          textAlign: 'center',
          marginBottom: 8 
        }}>
          Personal Info 📊
        </Text>
        <Text style={{ 
          fontSize: subtitleSize, 
          color: '#6C757D', 
          textAlign: 'center',
          marginBottom: 16 
        }}>
          Help us personalize your plan
        </Text>
        
        {/* Progress Bar */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#6C757D', marginBottom: 8 }}>
            Step 3 of 4
          </Text>
          <View style={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: '#E9ECEF', 
            borderRadius: 3 
          }}>
            <View style={{ 
              width: '75%', 
              height: '100%', 
              backgroundColor: '#007AFF', 
              borderRadius: 3 
            }} />
          </View>
        </View>
      </View>

      {/* Content Area - Fitted */}
      <View style={{ 
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between'
      }}>
        {/* Input Fields - Evenly Spaced */}
        <View>
          {/* Date of Birth */}
          <View style={{ marginBottom: inputSpacing }}>
            <Text style={{
              fontSize: labelSize,
              fontWeight: '600',
              color: '#1A1A1A',
              marginBottom: 8
            }}>
              Date of Birth
            </Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#F8F9FA',
                borderColor: '#E9ECEF',
                borderWidth: 2,
                borderRadius: 12,
                height: dropdownHeight,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16
              }}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: labelSize,
                color: onboardingData.dateOfBirth ? '#1A1A1A' : '#ADB5BD',
                flex: 1
              }}>
                {onboardingData.dateOfBirth ? formatDateForDisplay(onboardingData.dateOfBirth) : 'Select date of birth'}
              </Text>
              <Text style={{ fontSize: 20 }}>📅</Text>
            </TouchableOpacity>
          </View>

          {/* Height */}
          <View style={{ marginBottom: inputSpacing }}>
            <Text style={{
              fontSize: labelSize,
              fontWeight: '600',
              color: '#1A1A1A',
              marginBottom: 8
            }}>
              Height
            </Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#F8F9FA',
                borderColor: '#E9ECEF',
                borderWidth: 2,
                borderRadius: 12,
                height: dropdownHeight,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16
              }}
              onPress={() => setShowHeightPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: labelSize,
                color: (onboardingData.heightFeet || onboardingData.heightInches) ? '#1A1A1A' : '#ADB5BD',
                flex: 1
              }}>
                {formatHeightDisplay(onboardingData.heightFeet, onboardingData.heightInches)}
              </Text>
              <Text style={{ fontSize: 20 }}>📏</Text>
            </TouchableOpacity>
          </View>

          {/* Weight */}
          <View style={{ marginBottom: inputSpacing }}>
            <Text style={{
              fontSize: labelSize,
              fontWeight: '600',
              color: '#1A1A1A',
              marginBottom: 8
            }}>
              Current Weight
            </Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#F8F9FA',
                borderColor: '#E9ECEF',
                borderWidth: 2,
                borderRadius: 12,
                height: dropdownHeight,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16
              }}
              onPress={() => setShowWeightPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: labelSize,
                color: onboardingData.weight ? '#1A1A1A' : '#ADB5BD',
                flex: 1
              }}>
                {onboardingData.weight ? `${onboardingData.weight} lbs` : 'Select weight'}
              </Text>
              <Text style={{ fontSize: 20 }}>⚖️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fixed Bottom Navigation - Higher up from bottom */}
        <View style={{ 
          height: buttonHeight,
          flexDirection: 'row', 
          justifyContent: 'space-between',
          paddingBottom: 60,
          paddingTop: 30,
          alignItems: 'center'
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F8F9FA',
              borderColor: '#E9ECEF',
              borderWidth: 1,
              height: 50,
              borderRadius: 12,
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onPrev}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#6C757D'
            }}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: canContinue ? '#007AFF' : '#E9ECEF',
              height: 50,
              borderRadius: 12,
              flex: 0.55,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onNext}
            disabled={!canContinue}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: canContinue ? '#FFFFFF' : '#ADB5BD'
            }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.onboardingData.dateOfBirth === nextProps.onboardingData.dateOfBirth &&
         prevProps.onboardingData.heightFeet === nextProps.onboardingData.heightFeet &&
         prevProps.onboardingData.heightInches === nextProps.onboardingData.heightInches &&
         prevProps.onboardingData.weight === nextProps.onboardingData.weight;
});

ScreenFittedStep3.displayName = 'ScreenFittedStep3';

export default ScreenFittedStep3;
