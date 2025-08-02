import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Animated } from 'react-native';
import { 
  scaleFont, 
  spacing, 
  fonts 
} from '../utils/responsive';

const LoadingScreen = ({ styles, message = "Loading..." }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for logo
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  return (
    <SafeAreaView style={[styles.loadingContainer, { backgroundColor: '#1a1a1a' }]}>
      <Animated.View 
        style={[
          styles.loadingContent,
          { 
            opacity: fadeAnim,
            alignItems: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        <Animated.Text 
          style={[
            styles.logoText,
            { 
              fontSize: scaleFont(48),
              fontWeight: 'bold',
              color: '#5DADE2',
              letterSpacing: 2,
              textShadowColor: 'rgba(93, 173, 226, 0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
              transform: [{ scale: pulseAnim }],
              marginBottom: spacing.lg
            }
          ]}
        >
          Core+
        </Animated.Text>
        <Text 
          style={[
            styles.loadingText,
            { 
              fontSize: fonts.regular,
              color: '#ffffff',
              textAlign: 'center',
              opacity: 0.9,
              letterSpacing: 0.5
            }
          ]}
        >
          {message}
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
