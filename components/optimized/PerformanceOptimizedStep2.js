import React, { memo, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Ultra-fast activity card component
const ActivityCard = memo(({ activity, isSelected, isDisabled, onToggle }) => {
  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onToggle(activity.id);
    }
  }, [activity.id, onToggle, isDisabled]);

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: isSelected ? '#007AFF' : '#F8F9FA',
          borderColor: isSelected ? '#007AFF' : '#E9ECEF',
          borderWidth: 2,
          borderRadius: 12,
          padding: 16,
          alignItems: 'center',
          flex: 1,
          margin: 6,
          minHeight: 100,
          opacity: isDisabled ? 0.5 : 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        }
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 28, marginBottom: 8 }}>
        {activity.emoji}
      </Text>
      <Text style={[
        {
          fontSize: 14,
          fontWeight: '600',
          textAlign: 'center',
          color: isSelected ? '#FFFFFF' : '#1A1A1A'
        }
      ]}>
        {activity.title}
      </Text>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.isDisabled === nextProps.isDisabled &&
         prevProps.activity.id === nextProps.activity.id;
});

const PerformanceOptimizedStep2 = memo(({ 
  onboardingData, 
  activityOptions, 
  onActivityToggle, 
  onNext, 
  onPrev 
}) => {
  // Memoize selected activities
  const selectedActivities = useMemo(() => onboardingData.activities, [onboardingData.activities]);
  
  // Memoize selection count and validation
  const selectionCount = useMemo(() => selectedActivities.length, [selectedActivities]);
  const canContinue = useMemo(() => selectionCount > 0, [selectionCount]);
  const maxActivities = 3;
  
  // Memoize activity cards to prevent re-rendering
  const activityCards = useMemo(() => {
    const cards = [];
    for (let i = 0; i < activityOptions.length; i += 2) {
      const row = [];
      for (let j = 0; j < 2 && i + j < activityOptions.length; j++) {
        const activity = activityOptions[i + j];
        const isSelected = selectedActivities.includes(activity.id);
        const isDisabled = selectionCount >= maxActivities && !isSelected;
        
        row.push(
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onToggle={onActivityToggle}
          />
        );
      }
      cards.push(
        <View key={i} style={{ flexDirection: 'row', marginHorizontal: -6 }}>
          {row}
        </View>
      );
    }
    return cards;
  }, [activityOptions, selectedActivities, selectionCount, onActivityToggle]);

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
          Choose Activities 🏃‍♀️
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#6C757D', 
          textAlign: 'center',
          marginBottom: 20 
        }}>
          Select up to 3 activities you enjoy
        </Text>
        
        {/* Progress Bar */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6C757D', marginBottom: 8 }}>
            Step 2 of 4
          </Text>
          <View style={{ 
            width: '100%', 
            height: 8, 
            backgroundColor: '#E9ECEF', 
            borderRadius: 4 
          }}>
            <View style={{ 
              width: '50%', 
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
          What activities do you enjoy?
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#6C757D', 
          marginBottom: 24 
        }}>
          Selected: {selectionCount}/{maxActivities}
        </Text>
        
        {/* Activity Grid */}
        <View style={{ flex: 1 }}>
          {activityCards}
        </View>

        {/* Navigation Buttons */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          marginTop: 20 
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F8F9FA',
              borderColor: '#E9ECEF',
              borderWidth: 1,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
              flex: 0.4,
              alignItems: 'center',
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
            style={[
              {
                backgroundColor: canContinue ? '#007AFF' : '#E9ECEF',
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                flex: 0.55,
                alignItems: 'center',
              }
            ]}
            onPress={onNext}
            disabled={!canContinue}
            activeOpacity={0.7}
          >
            <Text style={[
              {
                fontSize: 16,
                fontWeight: '600',
                color: canContinue ? '#FFFFFF' : '#ADB5BD'
              }
            ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Only re-render if selected activities change
  return JSON.stringify(prevProps.onboardingData.activities) === 
         JSON.stringify(nextProps.onboardingData.activities);
});

PerformanceOptimizedStep2.displayName = 'PerformanceOptimizedStep2';
ActivityCard.displayName = 'ActivityCard';

export default PerformanceOptimizedStep2;
