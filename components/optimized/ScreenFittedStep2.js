import React, { memo, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

// Compact activity card for screen fitting
const CompactActivityCard = memo(({ activity, isSelected, isDisabled, onToggle, screenHeight }) => {
  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onToggle(activity.id);
    }
  }, [activity.id, onToggle, isDisabled]);

  // Adjust sizes based on screen height
  const cardHeight = screenHeight < 700 ? 70 : 85;
  const emojiSize = screenHeight < 700 ? 20 : 24;
  const fontSize = screenHeight < 700 ? 12 : 14;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelected ? '#007AFF' : '#F8F9FA',
        borderColor: isSelected ? '#007AFF' : '#E9ECEF',
        borderWidth: 2,
        borderRadius: 10,
        height: cardHeight,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
        opacity: isDisabled ? 0.5 : 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      }}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: emojiSize, marginBottom: 4 }}>
        {activity.emoji}
      </Text>
      <Text style={{
        fontSize: fontSize,
        fontWeight: '600',
        textAlign: 'center',
        color: isSelected ? '#FFFFFF' : '#1A1A1A',
        numberOfLines: 1
      }}>
        {activity.title}
      </Text>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected && 
         prevProps.isDisabled === nextProps.isDisabled &&
         prevProps.activity.id === nextProps.activity.id;
});

const ScreenFittedStep2 = memo(({ 
  onboardingData, 
  activityOptions, 
  onActivityToggle, 
  onNext, 
  onPrev 
}) => {
  const { height: screenHeight } = useWindowDimensions();
  
  // Memoize selected activities and calculations
  const selectedActivities = useMemo(() => onboardingData.activities, [onboardingData.activities]);
  const selectionCount = useMemo(() => selectedActivities.length, [selectedActivities]);
  const canContinue = useMemo(() => selectionCount > 0, [selectionCount]);
  const maxActivities = 3;
  
  // Adjust font sizes based on screen height
  const titleSize = screenHeight < 700 ? 24 : 28;
  const subtitleSize = screenHeight < 700 ? 14 : 16;
  const stepTitleSize = screenHeight < 700 ? 18 : 22;
  
  // Calculate layout
  const headerHeight = screenHeight < 700 ? 120 : 140;
  const buttonHeight = 130; // Increased for extra padding (50px button + 90px padding)
  const activitiesPerRow = 3;
  const rows = Math.ceil(activityOptions.length / activitiesPerRow);
  const activityCardHeight = screenHeight < 700 ? 70 : 85;
  const gridHeight = (activityCardHeight + 8) * rows; // 8 for margins

  // Organize activities into rows
  const activityRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < activityOptions.length; i += activitiesPerRow) {
      rows.push(activityOptions.slice(i, i + activitiesPerRow));
    }
    return rows;
  }, [activityOptions]);

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
          Choose Activities 🏃‍♀️
        </Text>
        <Text style={{ 
          fontSize: subtitleSize, 
          color: '#6C757D', 
          textAlign: 'center',
          marginBottom: 16 
        }}>
          Select up to 3 activities you enjoy
        </Text>
        
        {/* Progress Bar */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#6C757D', marginBottom: 8 }}>
            Step 2 of 4
          </Text>
          <View style={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: '#E9ECEF', 
            borderRadius: 3 
          }}>
            <View style={{ 
              width: '50%', 
              height: '100%', 
              backgroundColor: '#007AFF', 
              borderRadius: 3 
            }} />
          </View>
        </View>
      </View>

      {/* Content Area */}
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
            What activities do you enjoy?
          </Text>
          <Text style={{ 
            fontSize: subtitleSize - 2, 
            color: '#6C757D', 
            marginBottom: 16 
          }}>
            Selected: {selectionCount}/{maxActivities}
          </Text>
          
          {/* Activity Grid - Fitted */}
          <View style={{ height: gridHeight }}>
            {activityRows.map((row, rowIndex) => (
              <View 
                key={rowIndex} 
                style={{ 
                  flexDirection: 'row', 
                  marginHorizontal: -4,
                  marginBottom: 8 
                }}
              >
                {row.map((activity) => {
                  const isSelected = selectedActivities.includes(activity.id);
                  const isDisabled = selectionCount >= maxActivities && !isSelected;
                  
                  return (
                    <CompactActivityCard
                      key={activity.id}
                      activity={activity}
                      isSelected={isSelected}
                      isDisabled={isDisabled}
                      onToggle={onActivityToggle}
                      screenHeight={screenHeight}
                    />
                  );
                })}
                {/* Fill empty slots in last row */}
                {row.length < activitiesPerRow && Array.from(
                  { length: activitiesPerRow - row.length }, 
                  (_, i) => <View key={`empty-${i}`} style={{ flex: 1, margin: 4 }} />
                )}
              </View>
            ))}
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
  return JSON.stringify(prevProps.onboardingData.activities) === 
         JSON.stringify(nextProps.onboardingData.activities);
});

ScreenFittedStep2.displayName = 'ScreenFittedStep2';
CompactActivityCard.displayName = 'CompactActivityCard';

export default ScreenFittedStep2;
