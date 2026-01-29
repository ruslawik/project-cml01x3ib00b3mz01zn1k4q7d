import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '../store/gameStore';
import { GameBoard } from '../components/GameBoard';
import { PlayerIndicator } from '../components/PlayerIndicator';
import { WinnerDisplay } from '../components/WinnerDisplay';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameButton } from '../components/GameButton';
import { CellPosition } from '../types';
import { theme } from '../constants/theme';

const getWinningCells = (board: any[], winner: any): number[] => {
  if (!winner || winner === 'tie') return [];
  
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  
  return [];
};

export default function GameScreen() {
  const {
    board,
    currentPlayer,
    winner,
    gameOver,
    score,
    makeMove,
    resetGame,
    resetScore,
  } = useGameStore();

  const handleCellPress = (position: CellPosition) => {
    makeMove(position);
  };

  const handleNewGame = () => {
    resetGame();
  };

  const handleResetScore = () => {
    resetScore();
  };

  const winningCells = getWinningCells(board, winner);

  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.primary]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Tic-Tac-Toe</Text>
          
          <ScoreBoard score={score} />
          
          <PlayerIndicator currentPlayer={currentPlayer} gameOver={gameOver} />
          
          <WinnerDisplay winner={winner} />
          
          <View style={styles.gameContainer}>
            <GameBoard
              board={board}
              onCellPress={handleCellPress}
              winningCells={winningCells}
              disabled={gameOver}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <GameButton
              title="New Game"
              onPress={handleNewGame}
              variant="primary"
            />
            <GameButton
              title="Reset Score"
              onPress={handleResetScore}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.h1,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  gameContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: theme.spacing.lg,
  },
});