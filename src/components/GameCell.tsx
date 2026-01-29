import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
import { Player, CellPosition } from '../types';
import { theme } from '../constants/theme';

interface GameCellProps {
  value: Player;
  position: CellPosition;
  onPress: (position: CellPosition) => void;
  isWinning?: boolean;
  disabled?: boolean;
}

export const GameCell: React.FC<GameCellProps> = ({
  value,
  position,
  onPress,
  isWinning = false,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;
  const winAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (value) {
      // Animate cell when value is set
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  useEffect(() => {
    if (isWinning) {
      // Pulse animation for winning cells
      Animated.loop(
        Animated.sequence([
          Animated.timing(winAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(winAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [isWinning]);

  const handlePress = () => {
    if (!disabled && !value) {
      onPress(position);
    }
  };

  const getTextColor = () => {
    if (value === 'X') return theme.colors.playerX;
    if (value === 'O') return theme.colors.playerO;
    return theme.colors.text;
  };

  const getCellStyle = () => {
    let backgroundColor = theme.colors.surface;
    if (isWinning) {
      backgroundColor = theme.colors.win;
    }
    return [
      styles.cell,
      { backgroundColor },
      !value && !disabled && styles.pressable,
    ];
  };

  return (
    <View style={[styles.cellContainer, { overflow: 'hidden', borderRadius: theme.borderRadius.md }]}>
      <Pressable
        style={getCellStyle()}
        onPress={handlePress}
        android_ripple={{ color: theme.colors.accent }}
      >
        <Animated.View
          style={[
            styles.cellContent,
            {
              transform: [
                { scale: scaleAnim },
                { scale: isWinning ? winAnim : 1 },
              ],
              opacity: value ? opacityAnim : 0.3,
            },
          ]}
        >
          <Text style={[styles.cellText, { color: getTextColor() }]}>
            {value || ''}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: theme.spacing.xs,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  pressable: {
    opacity: 0.8,
  },
  cellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});