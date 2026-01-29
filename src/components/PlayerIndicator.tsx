import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Player } from '../types';
import { theme } from '../constants/theme';

interface PlayerIndicatorProps {
  currentPlayer: Player;
  gameOver: boolean;
}

export const PlayerIndicator: React.FC<PlayerIndicatorProps> = ({
  currentPlayer,
  gameOver,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!gameOver) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [currentPlayer, gameOver]);

  if (gameOver) return null;

  const getPlayerColor = () => {
    return currentPlayer === 'X' ? theme.colors.playerX : theme.colors.playerO;
  };

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          backgroundColor: getPlayerColor(),
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <Text style={styles.indicatorText}>
        Player {currentPlayer}'s Turn
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.lg,
  },
  indicatorText: {
    color: theme.colors.text,
    fontSize: theme.typography.h3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});