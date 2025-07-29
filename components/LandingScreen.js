import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LandingScreen = ({ onGetStarted, styles }) => {
  return (
    <SafeAreaView style={styles.landingContainer}>
      <ImageBackground 
        source={require('../assets/GlossySkinCloseUp.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.landingContent}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.logoText}>Core+</Text>
              <Text style={styles.tagline}>Unleash Your Potential</Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              <Text style={styles.heroTitle}>Ready to Win?</Text>
              <Text style={styles.heroSubtitle}>
                Transform your potential into power.
              </Text>
            </View>

            {/* Get Started Button */}
            <View style={styles.buttonSection}>
              <TouchableOpacity 
                style={styles.getStartedButton} 
                onPress={onGetStarted}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default LandingScreen;
