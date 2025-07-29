import React, { memo, useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';

const OptimizedInput = memo(({ 
  label,
  value,
  onChangeText,
  style,
  inputStyle,
  labelStyle,
  ...props 
}) => {
  const handleTextChange = useCallback((text) => {
    onChangeText?.(text);
  }, [onChangeText]);

  return (
    <View style={style}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        style={inputStyle}
        {...props}
      />
    </View>
  );
});

OptimizedInput.displayName = 'OptimizedInput';

export default OptimizedInput;
