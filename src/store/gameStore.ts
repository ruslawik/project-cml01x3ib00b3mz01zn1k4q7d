import { create } from 'zustand';
import { GameState, Player, CellPosition } from '../types';

interface GameStore extends GameState {
  makeMove: (position: CellPosition) => void;
  resetGame: () => void;
  resetScore: () => void;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameOver: false,
  score: {
    X: 0,
    O: 0,
    ties: 0,
  },
};

const checkWinner = (board: Player[]): Player | 'tie' | null => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'tie';
  }

  return null;
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  makeMove: (position: CellPosition) => {
    const { board, currentPlayer, gameOver } = get();
    
    if (gameOver || board[position]) {
      return;
    }

    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    
    const winner = checkWinner(newBoard);
    const isGameOver = winner !== null;
    
    const newScore = { ...get().score };
    if (winner === 'X') {
      newScore.X += 1;
    } else if (winner === 'O') {
      newScore.O += 1;
    } else if (winner === 'tie') {
      newScore.ties += 1;
    }

    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      winner,
      gameOver: isGameOver,
      score: newScore,
    });
  },

  resetGame: () => {
    set({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      gameOver: false,
    });
  },

  resetScore: () => {
    set({
      ...initialState,
    });
  },
}));