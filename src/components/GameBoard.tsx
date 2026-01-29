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
  );
};

const styles = StyleSheet.create({
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
  },
});