import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LandingScreen = ({ onGetStarted, styles }) => {
  const [termsAccepted, setTermsAccepted] = useState(true);

  return (
    <SafeAreaView style={styles.landingContainer}>
      <ImageBackground 
        source={require('../assets/Athleticman.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.landingContent}>
            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              {/* Hero Content */}
              <View style={styles.heroContentBottom}>
                <Text style={styles.newHeroTitle}>Fitness, Just the{'\n'}Way You Like It.</Text>
                <Text style={styles.newHeroSubtitle}>
                  Tailored routines, exciting moves, and the tools to crush your goals—every step of the way.
                </Text>
              </View>

              {/* Page Indicators */}
              <View style={styles.pageIndicators}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>

              {/* Get Started Button */}
              <TouchableOpacity 
                style={[styles.newGetStartedButton, !termsAccepted && styles.buttonDisabled]} 
                onPress={termsAccepted ? onGetStarted : null}
                disabled={!termsAccepted}
              >
                <Text style={styles.newGetStartedText}>Get Started</Text>
                <Text style={styles.buttonArrows}>»»»</Text>
              </TouchableOpacity>

              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <TouchableOpacity 
                  style={styles.checkboxContainer}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                >
                  <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                    {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>I have read and agree to the terms and conditions.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default memo(LandingScreen);
