import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
    } else {
      baseStyle.push(styles.secondaryButton);
    }
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButtonText);
    }
    if (disabled) {
      baseStyle.push(styles.disabledButtonText);
    }
    return baseStyle;
  };

  return (
    <View style={[styles.buttonContainer, { overflow: 'hidden', borderRadius: theme.borderRadius.md }]}>
      <Pressable
        style={getButtonStyle()}
        onPress={onPress}
        disabled={disabled}
        android_ripple={{ color: theme.colors.accent }}
      >
        <Text style={getTextStyle()}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: theme.spacing.xs,
  },
  button: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: theme.colors.accent,
  },
  disabledButtonText: {
    color: theme.colors.textSecondary,
  },
});