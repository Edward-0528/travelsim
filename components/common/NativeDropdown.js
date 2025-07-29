import React, { memo, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const NativeDropdown = memo(({ 
  options, 
  selectedValue, 
  onSelect, 
  placeholder = "Select option",
  style,
  textStyle,
  dropdownStyle,
  optionStyle,
  optionTextStyle,
  selectedOptionStyle,
  selectedOptionTextStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = useCallback(() => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    setIsOpen(!isOpen);
  }, [isOpen, animation]);

  const handleSelect = useCallback((option) => {
    onSelect(option);
    toggleDropdown();
  }, [onSelect, toggleDropdown]);

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(options.length * 50, 200)],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={style}>
      {/* Main Selector Button */}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          {
            backgroundColor: '#f8f9fa',
            borderWidth: 1,
            borderColor: '#e2e8f0',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 50,
          },
          dropdownStyle
        ]}
      >
        <Text style={[
          {
            fontSize: 16,
            color: selectedValue ? '#2d3748' : '#a0aec0',
            flex: 1,
          },
          textStyle,
          !selectedValue && { color: '#a0aec0' }
        ]}>
          {selectedValue || placeholder}
        </Text>
        
        <Animated.Text style={[
          {
            fontSize: 16,
            color: '#718096',
            transform: [{
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              })
            }]
          }
        ]}>
          ▼
        </Animated.Text>
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <Animated.View style={[
          {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: '#e2e8f0',
            borderRadius: 12,
            marginTop: 4,
            maxHeight: 200,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            zIndex: 1000,
          },
          {
            height: dropdownHeight,
            opacity: opacity,
          }
        ]}>
          <View style={{ flex: 1 }}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: index < options.length - 1 ? 1 : 0,
                    borderBottomColor: '#f1f5f9',
                    backgroundColor: selectedValue === option ? '#f0f9ff' : 'transparent',
                  },
                  optionStyle,
                  selectedValue === option && selectedOptionStyle
                ]}
              >
                <Text style={[
                  {
                    fontSize: 16,
                    color: selectedValue === option ? '#0369a1' : '#4a5568',
                  },
                  optionTextStyle,
                  selectedValue === option && selectedOptionTextStyle
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
});

NativeDropdown.displayName = 'NativeDropdown';

export default NativeDropdown;
