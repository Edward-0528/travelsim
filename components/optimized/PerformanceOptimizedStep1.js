import React, { memo, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Ultra-fast goal card component with minimal re-renders
const GoalCard = memo(({ goal, isSelected, onPress }) => {
  const handlePress = useCallback(() => onPress(goal.id), [goal.id, onPress]);
  
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isSelected ? '#007AFF' : '#F8F9FA',
          borderColor: isSelected ? '#007AFF' : '#E9ECEF',
          borderWidth: 2,
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 32, marginRight: 16 }}>
        {goal.emoji}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={[
          {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 4,
            color: isSelected ? '#FFFFFF' : '#1A1A1A'
          }
        ]}>
          {goal.title}
        </Text>
        <Text style={[
          {
            fontSize: 14,
            color: isSelected ? '#E6F2FF' : '#6C757D'
          }
        ]}>
          {goal.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.goal.id === nextProps.goal.id;
});

const PerformanceOptimizedStep1 = memo(({ 
  onboardingData, 
  mainGoals, 
  onGoalSelect, 
  onNext 
}) => {
  // Memoize the selected goal to prevent unnecessary re-calculations
  const selectedGoal = useMemo(() => onboardingData.mainGoal, [onboardingData.mainGoal]);
  
  // Memoize the continue button state
  const canContinue = useMemo(() => Boolean(selectedGoal), [selectedGoal]);
  
  // Memoize the goal cards to prevent re-rendering unless selection changes
  const goalCards = useMemo(() => 
    mainGoals.map((goal) => (
      <GoalCard
        key={goal.id}
        goal={goal}
        isSelected={selectedGoal === goal.id}
        onPress={onGoalSelect}
      />
    )), [mainGoals, selectedGoal, onGoalSelect]
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Header */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: '#1A1A1A', 
          textAlign: 'center',
          marginBottom: 8 
        }}>
          Welcome to Core+! 🎯
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#6C757D', 
          textAlign: 'center',
          marginBottom: 20 
        }}>
          Let's create your personalized fitness plan
        </Text>
        
        {/* Progress Bar */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6C757D', marginBottom: 8 }}>
            Step 1 of 4
          </Text>
          <View style={{ 
            width: '100%', 
            height: 8, 
            backgroundColor: '#E9ECEF', 
            borderRadius: 4 
          }}>
            <View style={{ 
              width: '25%', 
              height: '100%', 
              backgroundColor: '#007AFF', 
              borderRadius: 4 
            }} />
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ 
          fontSize: 22, 
          fontWeight: '600', 
          color: '#1A1A1A', 
          marginBottom: 8 
        }}>
          What's your main goal?
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#6C757D', 
          marginBottom: 24 
        }}>
          Choose your primary fitness objective
        </Text>
        
        {/* Goal Cards */}
        <View style={{ flex: 1 }}>
          {goalCards}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            {
              backgroundColor: canContinue ? '#007AFF' : '#E9ECEF',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginTop: 20,
            }
          ]}
          onPress={onNext}
          disabled={!canContinue}
          activeOpacity={0.7}
        >
          <Text style={[
            {
              fontSize: 18,
              fontWeight: '600',
              color: canContinue ? '#FFFFFF' : '#ADB5BD'
            }
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for the entire component
  return prevProps.onboardingData.mainGoal === nextProps.onboardingData.mainGoal;
});

PerformanceOptimizedStep1.displayName = 'PerformanceOptimizedStep1';
GoalCard.displayName = 'GoalCard';

export default PerformanceOptimizedStep1;
