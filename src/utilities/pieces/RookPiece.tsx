import { isUnderCheck, Piece, valueOfPiece } from "../types/pieces";

export const Rook = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | null)[][],
  turn: string
) => {
  let importance = 150;

  const doesThisHorizontalMoveResultInCheck = (i: number, r: number) => {
    // If the new state of the board after the move happens results in the player being under check,
    // then that move will not be possible.
    const newBoard = Board.map((inner) => inner.slice());
    newBoard[i][r] = newBoard[i][j];
    newBoard[i][j] = null;
    return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
  };

  const doesThisVerticalMoveResultInCheck = (r: number, j: number) => {
    // If the new state of the board after the move happens results in the player being under check,
    // then that move will not be possible.
    const newBoard = Board.map((inner) => inner.slice());
    newBoard[r][j] = newBoard[i][j];
    newBoard[i][j] = null;
    return isUnderCheck(newBoard, turn === "W" ? "B" : "W");
  };

  // Vertical movement check (upward and downward)
  if (i > 0) {
    for (let r = i - 1; r >= 0; r--) {
      const piece = Board[r][j];
      if (piece) {
        if (piece.color === turn) break;
        if (doesThisVerticalMoveResultInCheck(r, j)) break;
      } else if (doesThisVerticalMoveResultInCheck(r, j)) continue;

      if (piece === null) canMoveTo[r][j] = true;
      else {
        if (piece.color !== turn) {
          canMoveTo[r][j] = true;
          importance += valueOfPiece(piece.type);
        }
        break;
      }
    }
  }

  if (i < 5) {
    for (let r = i + 1; r <= 5; r++) {
      const piece = Board[r][j];
      if (piece) {
        if (piece.color === turn) break;
        if (doesThisVerticalMoveResultInCheck(r, j)) break;
      } else if (doesThisVerticalMoveResultInCheck(r, j)) continue;

      if (piece === null) canMoveTo[r][j] = true;
      else {
        if (piece.color !== turn) {
          canMoveTo[r][j] = true;
          importance += valueOfPiece(piece.type);
        }
        break;
      }
    }
  }

  // Horizontal movement check (left and right)
  if (j > 0) {
    for (let r = j - 1; r >= 0; r--) {
      const piece = Board[i][r];
      if (piece) {
        if (piece.color === turn) break;
        if (doesThisHorizontalMoveResultInCheck(i, r)) break;
      } else if (doesThisHorizontalMoveResultInCheck(i, r)) continue;

      if (piece === null) canMoveTo[i][r] = true;
      else {
        if (piece.color !== turn) {
          canMoveTo[i][r] = true;
          importance += valueOfPiece(piece.type);
        }
        break;
      }
    }
  }

  if (j < 4) {
    for (let r = j + 1; r <= 4; r++) {
      const piece = Board[i][r];
      if (piece) {
        if (piece.color === turn) break;
        if (doesThisHorizontalMoveResultInCheck(i, r)) break;
      } else if (doesThisHorizontalMoveResultInCheck(i, r)) continue;

      if (piece === null) canMoveTo[i][r] = true;
      else {
        if (piece.color !== turn) {
          canMoveTo[i][r] = true;
          importance += valueOfPiece(piece.type);
        }
        break;
      }
    }
  }

  // Adjust the importance based on the color of the turn
  importance *= turn === "W" ? 1 : -1;

  // Save the importance of the Rook piece at the current position
  Board[i][j].importance = importance;
};

export const RookGivesCheck = (i: number, j: number, Board: (Piece | null)[][]) => {
  if (i !== 0) {
    for (let r = i - 1; r >= 0; r--) {
      const unit = Board[r][j];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (i !== 7) {
    for (let r = i + 1; r <= 7; r++) {
      const unit = Board[r][j];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (j !== 0) {
    for (let r = j - 1; r >= 0; r--) {
      const unit = Board[i][r];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  if (j !== 7) {
    for (let r = j + 1; r <= 7; r++) {
      const unit = Board[i][r];
      if (
        unit &&
        (unit.color === Board[i][j].color ||
          (unit.color !== Board[i][j].color && unit.type !== "King"))
      )
        break;
      if (unit && unit.color !== Board[i][j].color && unit.type === "King")
        return true;
    }
  }
  return false;
};
