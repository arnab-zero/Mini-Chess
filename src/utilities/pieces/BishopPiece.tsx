import { Piece, valueOfPiece } from "../types/pieces";

export const Bishop = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | null)[][],
  turn: string
) => {
  let importance: number = 150; // Initial importance for bishop.
  const maxRow = 6; // Set maximum row boundary for 6x5 board.
  const maxCol = 5; // Set maximum column boundary for 6x5 board.

  // Helper function to check if a move puts the current player under check.
  const isUnderCheckIfThisMoveHappens = (newI: number, newJ: number) => {
    const newBoard = Board.map(row => row.slice());
    newBoard[newI][newJ] = newBoard[i][j];
    newBoard[i][j] = null;
    return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
  };

  // Move in four diagonal directions.

  // Up-right direction
  for (let r = 1; r < maxRow; r++) {
    if (i - r >= 0 && j + r < maxCol) {
      const piece = Board[i - r][j + r];
      if (piece && piece.color === Board[i][j].color) break;
      if (!piece && isUnderCheckIfThisMoveHappens(i - r, j + r)) continue;

      canMoveTo[i - r][j + r] = true;
      if (piece && piece.color !== turn) {
        importance += valueOfPiece(piece.type);
        break;
      }
    } else break;
  }

  // Down-right direction
  for (let r = 1; r < maxRow; r++) {
    if (i + r < maxRow && j + r < maxCol) {
      const piece = Board[i + r][j + r];
      if (piece && piece.color === Board[i][j].color) break;
      if (!piece && isUnderCheckIfThisMoveHappens(i + r, j + r)) continue;

      canMoveTo[i + r][j + r] = true;
      if (piece && piece.color !== turn) {
        importance += valueOfPiece(piece.type);
        break;
      }
    } else break;
  }

  // Down-left direction
  for (let r = 1; r < maxRow; r++) {
    if (i + r < maxRow && j - r >= 0) {
      const piece = Board[i + r][j - r];
      if (piece && piece.color === Board[i][j].color) break;
      if (!piece && isUnderCheckIfThisMoveHappens(i + r, j - r)) continue;

      canMoveTo[i + r][j - r] = true;
      if (piece && piece.color !== turn) {
        importance += valueOfPiece(piece.type);
        break;
      }
    } else break;
  }

  // Up-left direction
  for (let r = 1; r < maxRow; r++) {
    if (i - r >= 0 && j - r >= 0) {
      const piece = Board[i - r][j - r];
      if (piece && piece.color === Board[i][j].color) break;
      if (!piece && isUnderCheckIfThisMoveHappens(i - r, j - r)) continue;

      canMoveTo[i - r][j - r] = true;
      if (piece && piece.color !== turn) {
        importance += valueOfPiece(piece.type);
        break;
      }
    } else break;
  }

  // Adjust importance for minimax scoring
  importance *= turn === "W" ? 1 : -1;
  Board[i][j].importance = importance;
};

export const BishopGivesCheck = (i: number, j: number, Board: (Piece | null)[][]) => {
  const maxRow = 6; // Set max row for 6x5 board.
  const maxCol = 5; // Set max col for 6x5 board.

  // Check in all four diagonal directions.

  // Up-right direction
  for (let r = 1; r < maxRow; r++) {
    if (i - r >= 0 && j + r < maxCol) {
      const piece = Board[i - r][j + r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      ) break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King") return true;
    } else break;
  }

  // Down-right direction
  for (let r = 1; r < maxRow; r++) {
    if (i + r < maxRow && j + r < maxCol) {
      const piece = Board[i + r][j + r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      ) break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King") return true;
    } else break;
  }

  // Down-left direction
  for (let r = 1; r < maxRow; r++) {
    if (i + r < maxRow && j - r >= 0) {
      const piece = Board[i + r][j - r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      ) break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King") return true;
    } else break;
  }

  // Up-left direction
  for (let r = 1; r < maxRow; r++) {
    if (i - r >= 0 && j - r >= 0) {
      const piece = Board[i - r][j - r];
      if (
        piece &&
        (piece.color === Board[i][j].color ||
          (piece.color !== Board[i][j].color && piece.type !== "King"))
      ) break;
      if (piece && piece.color !== Board[i][j].color && piece.type === "King") return true;
    } else break;
  }

  return false; // No check detected by the bishop in any direction.
};


