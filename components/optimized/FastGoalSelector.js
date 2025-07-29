import React, { memo, useCallback } from 'react';
import { View, Text } from 'react-native';
import OptimizedButton from '../common/OptimizedButton';

const GoalCard = memo(({ goal, isSelected, onSelect, styles }) => {
  const handlePress = useCallback(() => {
    onSelect(goal.id);
  }, [goal.id, onSelect]);

  return (
    <OptimizedButton
      style={[
        styles.goalCard,
        isSelected && styles.goalCardSelected
      ]}
      onPress={handlePress}
    >
      <Text style={styles.goalEmoji}>{goal.emoji}</Text>
      <Text style={[
        styles.goalTitle,
        isSelected && styles.goalTitleSelected
      ]}>
        {goal.title}
      </Text>
      <Text style={[
        styles.goalDescription,
        isSelected && styles.goalDescriptionSelected
      ]}>
        {goal.description}
      </Text>
    </OptimizedButton>
  );
});

const FastGoalSelector = memo(({ goals, selectedGoal, onGoalSelect, styles }) => {
  return (
    <View style={styles.goalContainer}>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          isSelected={selectedGoal === goal.id}
          onSelect={onGoalSelect}
          styles={styles}
        />
      ))}
    </View>
  );
});

GoalCard.displayName = 'GoalCard';
FastGoalSelector.displayName = 'FastGoalSelector';

export default FastGoalSelector;
