import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const SegmentedPicker = memo(({ 
  options, 
  selectedValue, 
  onSelect, 
  style,
  buttonStyle,
  selectedButtonStyle,
  textStyle,
  selectedTextStyle,
  label
}) => {
  return (
    <View style={style}>
      {label && (
        <Text style={{
          fontSize: 16,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 8,
        }}>
          {label}
        </Text>
      )}
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {options.map((option, index) => {
          const isSelected = selectedValue === option;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(option)}
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isSelected ? '#3b82f6' : '#d1d5db',
                  backgroundColor: isSelected ? '#3b82f6' : '#f9fafb',
                  minWidth: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                buttonStyle,
                isSelected && selectedButtonStyle
              ]}
            >
              <Text style={[
                {
                  fontSize: 14,
                  fontWeight: '500',
                  color: isSelected ? '#ffffff' : '#6b7280',
                  textAlign: 'center',
                },
                textStyle,
                isSelected && selectedTextStyle
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
});

SegmentedPicker.displayName = 'SegmentedPicker';

export default SegmentedPicker;
