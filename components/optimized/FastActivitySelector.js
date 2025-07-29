import React, { memo, useCallback } from 'react';
import { View, Text } from 'react-native';
import OptimizedButton from '../common/OptimizedButton';

const ActivityCard = memo(({ activity, isSelected, isDisabled, onToggle, styles }) => {
  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onToggle(activity.id);
    }
  }, [activity.id, onToggle, isDisabled]);

  return (
    <OptimizedButton
      style={[
        styles.activityCard,
        isSelected && styles.activityCardSelected,
        isDisabled && styles.activityCardDisabled
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <Text style={styles.activityEmoji}>{activity.emoji}</Text>
      <Text style={[
        styles.activityTitle,
        isSelected && styles.activityTitleSelected
      ]}>
        {activity.title}
      </Text>
    </OptimizedButton>
  );
});

const FastActivitySelector = memo(({ 
  activities, 
  selectedActivities, 
  onActivityToggle, 
  maxActivities = 3,
  styles 
}) => {
  return (
    <View style={styles.activitiesGrid}>
      {activities.map((activity) => {
        const isSelected = selectedActivities.includes(activity.id);
        const isDisabled = selectedActivities.length >= maxActivities && !isSelected;
        
        return (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onToggle={onActivityToggle}
            styles={styles}
          />
        );
      })}
    </View>
  );
});

ActivityCard.displayName = 'ActivityCard';
FastActivitySelector.displayName = 'FastActivitySelector';

export default FastActivitySelector;
