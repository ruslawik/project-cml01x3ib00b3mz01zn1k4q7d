import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface ScoreBoardProps {
  score: {
    X: number;
    O: number;
    ties: number;
  };
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <View style={styles.scoreBoard}>
      <View style={[styles.scoreItem, { backgroundColor: theme.colors.playerX }]}>
        <Text style={styles.scoreLabel}>X</Text>
        <Text style={styles.scoreValue}>{score.X}</Text>
      </View>
      <View style={[styles.scoreItem, { backgroundColor: theme.colors.tie }]}>
        <Text style={styles.scoreLabel}>Ties</Text>
        <Text style={styles.scoreValue}>{score.ties}</Text>
      </View>
      <View style={[styles.scoreItem, { backgroundColor: theme.colors.playerO }]}>
        <Text style={styles.scoreLabel}>O</Text>
        <Text style={styles.scoreValue}>{score.O}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  scoreItem: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 80,
    alignItems: 'center',
  },
  scoreLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: 'bold',
  },
  scoreValue: {
    color: theme.colors.text,
    fontSize: theme.typography.h2,
    fontWeight: 'bold',
    marginTop: theme.spacing.xs,
  },
});