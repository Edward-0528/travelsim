import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const OptimizedButton = memo(({ 
  onPress, 
  title, 
  style, 
  textStyle, 
  disabled = false,
  loading = false,
  loadingText,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[style, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={textStyle}>
        {loading ? (loadingText || 'Loading...') : title}
      </Text>
    </TouchableOpacity>
  );
});

OptimizedButton.displayName = 'OptimizedButton';

export default OptimizedButton;
