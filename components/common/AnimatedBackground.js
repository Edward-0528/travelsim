import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight } from '../../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dumbbell Component
const Dumbbell = ({ size, color, opacity }) => {
  const weightSize = size * 0.4;
  const barWidth = size * 0.6;
  const barHeight = size * 0.15;
  
  return (
    <View style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: opacity,
    }}>
      {/* Left weight */}
      <View style={{
        position: 'absolute',
        left: 0,
        width: weightSize,
        height: weightSize,
        backgroundColor: color,
        borderRadius: weightSize / 2,
      }} />
      
      {/* Center bar */}
      <View style={{
        width: barWidth,
        height: barHeight,
        backgroundColor: color,
        borderRadius: barHeight / 2,
      }} />
      
      {/* Right weight */}
      <View style={{
        position: 'absolute',
        right: 0,
        width: weightSize,
        height: weightSize,
        backgroundColor: color,
        borderRadius: weightSize / 2,
      }} />
    </View>
  );
};

const AnimatedBackground = () => {
  const animValue1 = useRef(new Animated.Value(0)).current;
  const animValue2 = useRef(new Animated.Value(0)).current;
  const animValue3 = useRef(new Animated.Value(0)).current;
  const animValue4 = useRef(new Animated.Value(0)).current;
  const animValue5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animValue, duration, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start multiple animations with different timings
    const animation1 = createAnimation(animValue1, 8000, 0);
    const animation2 = createAnimation(animValue2, 12000, 2000);
    const animation3 = createAnimation(animValue3, 10000, 4000);
    const animation4 = createAnimation(animValue4, 15000, 1000);
    const animation5 = createAnimation(animValue5, 9000, 3000);

    animation1.start();
    animation2.start();
    animation3.start();
    animation4.start();
    animation5.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
      animation4.stop();
      animation5.stop();
    };
  }, []);

  const createFloatingDumbbell = (animValue, startY, endY, startX, endX, size, opacity, color) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [startY, endY, startY],
    });

    const translateX = animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [startX, endX, startX],
    });

    const scale = animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1],
    });

    const rotate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const elementOpacity = animValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [opacity, opacity * 1.3, opacity * 1.3, opacity],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          opacity: elementOpacity,
          transform: [
            { translateX },
            { translateY },
            { scale },
            { rotate },
          ],
        }}
      >
        <Dumbbell size={size} color={color} opacity={1} />
      </Animated.View>
    );
  };

  const createFloatingMiniDumbbell = (animValue, startY, endY, startX, endX, size, opacity, color, rotationSpeed = 180) => {
    const translateY = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [startY, endY],
    });

    const translateX = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [startX, endX],
    });

    const rotate = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', `${rotationSpeed}deg`],
    });

    const elementOpacity = animValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [opacity, opacity * 1.2, opacity * 1.2, opacity],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          opacity: elementOpacity,
          transform: [
            { translateX },
            { translateY },
            { rotate },
          ],
        }}
      >
        <Dumbbell size={size} color={color} opacity={1} />
      </Animated.View>
    );
  };

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      {/* Large floating dumbbells with circular motion */}
      {createFloatingDumbbell(
        animValue1, 
        scaleHeight(-30), 
        scaleHeight(150), 
        scaleWidth(-20), 
        scaleWidth(80), 
        scaleWidth(50), 
        0.04, 
        '#4A90E2'
      )}
      
      {createFloatingDumbbell(
        animValue2, 
        scaleHeight(SCREEN_HEIGHT + 30), 
        scaleHeight(SCREEN_HEIGHT - 200), 
        scaleWidth(SCREEN_WIDTH - 30), 
        scaleWidth(SCREEN_WIDTH - 150), 
        scaleWidth(60), 
        0.035, 
        '#FF6B6B'
      )}
      
      {createFloatingDumbbell(
        animValue3, 
        scaleHeight(250), 
        scaleHeight(80), 
        scaleWidth(-30), 
        scaleWidth(100), 
        scaleWidth(45), 
        0.045, 
        '#50C878'
      )}

      {/* Medium floating dumbbells */}
      {createFloatingMiniDumbbell(
        animValue4, 
        scaleHeight(-80), 
        scaleHeight(300), 
        scaleWidth(SCREEN_WIDTH - 80), 
        scaleWidth(SCREEN_WIDTH - 250), 
        scaleWidth(35), 
        0.03, 
        '#7B68EE',
        270
      )}
      
      {createFloatingMiniDumbbell(
        animValue5, 
        scaleHeight(SCREEN_HEIGHT), 
        scaleHeight(SCREEN_HEIGHT - 400), 
        scaleWidth(40), 
        scaleWidth(200), 
        scaleWidth(40), 
        0.04, 
        '#4ECDC4',
        -180
      )}

      {/* Small floating dumbbells for subtle background fill */}
      {createFloatingDumbbell(
        animValue1, 
        scaleHeight(120), 
        scaleHeight(300), 
        scaleWidth(SCREEN_WIDTH - 60), 
        scaleWidth(SCREEN_WIDTH - 200), 
        scaleWidth(30), 
        0.025, 
        '#FFD93D'
      )}

      {createFloatingMiniDumbbell(
        animValue3, 
        scaleHeight(400), 
        scaleHeight(150), 
        scaleWidth(150), 
        scaleWidth(50), 
        scaleWidth(35), 
        0.03, 
        '#FF8C94',
        90
      )}

      {/* Extra tiny dumbbells for depth */}
      {createFloatingDumbbell(
        animValue2, 
        scaleHeight(50), 
        scaleHeight(250), 
        scaleWidth(200), 
        scaleWidth(80), 
        scaleWidth(25), 
        0.02, 
        '#9B59B6'
      )}
    </View>
  );
};

export default AnimatedBackground;
