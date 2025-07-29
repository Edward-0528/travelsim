import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const LoadingScreen = ({ styles, message = "Loading..." }) => {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <View style={styles.loadingContent}>
        <Text style={styles.logoText}>Core+</Text>
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
