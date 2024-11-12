import { isUnderCheck, Piece, valueOfPiece } from "../types/pieces";

export const King = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | null)[][],
  turn: string
) => {
  let importance: number = 10000;
  const maxRow = 6;
  const maxCol = 5;
  const opponentColor = turn === "W" ? "B" : "W";

  // Possible moves in all eight directions for the king
  const directions = [
    [-1, 0],   // Up
    [1, 0],    // Down
    [0, -1],   // Left
    [0, 1],    // Right
    [-1, -1],  // Up-left
    [-1, 1],   // Up-right
    [1, -1],   // Down-left
    [1, 1],    // Down-right
  ];

  for (const [dx, dy] of directions) {
    const newRow = i + dx;
    const newCol = j + dy;

    // Ensure within board bounds
    if (newRow >= 0 && newRow < maxRow && newCol >= 0 && newCol < maxCol) {
      const piece = Board[newRow][newCol];

      if (!piece || piece.color !== turn) {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[newRow][newCol] = Board[i][j];
        newBoard[i][j] = null;
        
        if (!isUnderCheck(newBoard, opponentColor)) {
          canMoveTo[newRow][newCol] = true;
          if (piece) importance += valueOfPiece(piece.type); // Increase importance for capturing valuable pieces
        }
      }
    }
  }

  // Adjust importance based on turn for use with minimax
  importance *= turn === "W" ? 1 : -1;
  Board[i][j].importance = importance;
};

export const KingGivesCheck = (
  i: number,
  j: number,
  Board: (Piece | any)[][],
  turn: string
) => {
  const maxRow = 6; // 6 rows for 6x5 board
  const maxCol = 5; // 5 columns for 6x5 board
  const opponentColor = turn === "W" ? "B" : "W";

  // Possible directions to check for opponent's king
  const directions = [
    [-1, 0],   // Up
    [1, 0],    // Down
    [0, -1],   // Left
    [0, 1],    // Right
    [-1, -1],  // Up-left
    [-1, 1],   // Up-right
    [1, -1],   // Down-left
    [1, 1],    // Down-right
  ];

  for (const [dx, dy] of directions) {
    const newRow = i + dx;
    const newCol = j + dy;

    // Ensure within board bounds
    if (newRow >= 0 && newRow < maxRow && newCol >= 0 && newCol < maxCol) {
      const piece = Board[newRow][newCol];

      // Check if the piece is the opponent's king
      if (piece && piece.color === opponentColor && piece.type === "King") {
        return true;
      }
    }
  }

  return false;
};

