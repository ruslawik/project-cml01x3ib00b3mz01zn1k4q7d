import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GameCell } from './GameCell';
import { Player, CellPosition } from '../types';
import { theme } from '../constants/theme';

interface GameBoardProps {
  board: Player[];
  onCellPress: (position: CellPosition) => void;
  winningCells?: number[];
  disabled?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellPress,
  winningCells = [],
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            position={index as CellPosition}
            onPress={onCellPress}
            isWinning={winningCells.includes(index)}
            disabled={disabled}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  board: {
    width: 312,
    height: 312,
    backgroundColor: theme.colors.gridBackground,
    borderRadius: theme.borderRadius.lg,
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...theme.shadows.card,
  },
});