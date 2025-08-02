import React, { memo, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { responsivePadding, fonts, spacing, scaleWidth, scaleHeight } from '../../utils/responsive';

// Screen-fitted goal card component
const CompactGoalCard = memo(({ goal, isSelected, onPress, screenHeight }) => {
  const handlePress = useCallback(() => onPress(goal.id), [goal.id, onPress]);
  
  // Adjust card size based on screen height
  const cardHeight = screenHeight < 700 ? 60 : 80;
  const fontSize = screenHeight < 700 ? 16 : 18;
  const emojiSize = screenHeight < 700 ? 24 : 32;
  
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelected ? '#007AFF' : '#F8F9FA',
        borderColor: isSelected ? '#007AFF' : '#E9ECEF',
        borderWidth: 2,
        borderRadius: 12,
        height: cardHeight,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: emojiSize, marginRight: 12 }}>
        {goal.emoji}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: fontSize,
          fontWeight: '600',
          marginBottom: 2,
          color: isSelected ? '#FFFFFF' : '#1A1A1A'
        }}>
          {goal.title}
        </Text>
        <Text style={{
          fontSize: fontSize - 2,
          color: isSelected ? '#E6F2FF' : '#6C757D',
          numberOfLines: 1
        }}>
          {goal.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.goal.id === nextProps.goal.id;
});

const ScreenFittedStep1 = memo(({ 
  onboardingData, 
  mainGoals, 
  onGoalSelect, 
  onNext 
}) => {
  const { height: screenHeight } = useWindowDimensions();
  
  // Memoize the selected goal
  const selectedGoal = useMemo(() => onboardingData.mainGoal, [onboardingData.mainGoal]);
  const canContinue = useMemo(() => Boolean(selectedGoal), [selectedGoal]);
  
  // Adjust font sizes based on screen height
  const titleSize = screenHeight < 700 ? 24 : 28;
  const subtitleSize = screenHeight < 700 ? 14 : 16;
  const stepTitleSize = screenHeight < 700 ? 18 : 22;
  
  // Calculate available space for content
  const headerHeight = screenHeight < 700 ? 120 : 140;
  const buttonHeight = 50;
  const contentHeight = screenHeight - headerHeight - buttonHeight - 140; // 140 for increased padding/margins

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
          Welcome to Core+! 🎯
        </Text>
        <Text style={{ 
          fontSize: subtitleSize, 
          color: '#6C757D', 
          textAlign: 'center',
          marginBottom: 16 
        }}>
          Let's create your personalized fitness plan
        </Text>
        
        {/* Progress Bar */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#6C757D', marginBottom: 8 }}>
            Step 1 of 4
          </Text>
          <View style={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: '#E9ECEF', 
            borderRadius: 3 
          }}>
            <View style={{ 
              width: '25%', 
              height: '100%', 
              backgroundColor: '#007AFF', 
              borderRadius: 3 
            }} />
          </View>
        </View>
      </View>

      {/* Content Area - Fixed Height */}
      <View style={{ 
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{ 
            fontSize: stepTitleSize, 
            fontWeight: '600', 
            color: '#1A1A1A', 
            marginBottom: 6 
          }}>
            What's your main goal?
          </Text>
          <Text style={{ 
            fontSize: subtitleSize - 2, 
            color: '#6C757D', 
            marginBottom: 16 
          }}>
            Choose your primary fitness objective
          </Text>
          
          {/* Goal Cards - Fitted to available space */}
          <View>
            {mainGoals.map((goal) => (
              <CompactGoalCard
                key={goal.id}
                goal={goal}
                isSelected={selectedGoal === goal.id}
                onPress={onGoalSelect}
                screenHeight={screenHeight}
              />
            ))}
          </View>
        </View>

        {/* Fixed Bottom Button - Higher up from bottom */}
        <View style={{ paddingBottom: 60, paddingTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: canContinue ? '#007AFF' : '#E9ECEF',
              height: buttonHeight,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onNext}
            disabled={!canContinue}
            activeOpacity={0.7}
          >
            <Text style={{
              fontSize: 18,
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
  return prevProps.onboardingData.mainGoal === nextProps.onboardingData.mainGoal;
});

ScreenFittedStep1.displayName = 'ScreenFittedStep1';
CompactGoalCard.displayName = 'CompactGoalCard';

export default ScreenFittedStep1;
