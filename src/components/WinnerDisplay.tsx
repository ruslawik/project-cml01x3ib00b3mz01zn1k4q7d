import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Player } from '../types';
import { theme } from '../constants/theme';

interface WinnerDisplayProps {
  winner: Player | 'tie' | null;
}

export const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (winner) {
      // Victory animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 3,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(sparkleAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(sparkleAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ])
        ),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      sparkleAnim.setValue(0);
    }
  }, [winner]);

  if (!winner) return null;

  const getWinnerText = () => {
    if (winner === 'tie') return "It's a Tie! 🤝";
    return `Player ${winner} Wins! 🎉`;
  };

  const getWinnerColor = () => {
    if (winner === 'tie') return theme.colors.tie;
    return winner === 'X' ? theme.colors.playerX : theme.colors.playerO;
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.winnerContainer,
        {
          backgroundColor: getWinnerColor(),
          transform: [{ scale: scaleAnim }, { rotate: rotation }],
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.winnerText,
          { opacity: sparkleOpacity },
        ]}
      >
        {getWinnerText()}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  winnerContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  winnerText: {
    color: theme.colors.text,
    fontSize: theme.typography.h2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});