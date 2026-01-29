export type Player = 'X' | 'O' | null;

export type GameState = {
  board: Player[];
  currentPlayer: Player;
  winner: Player | 'tie' | null;
  gameOver: boolean;
  score: {
    X: number;
    O: number;
    ties: number;
  };
};

export type CellPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;