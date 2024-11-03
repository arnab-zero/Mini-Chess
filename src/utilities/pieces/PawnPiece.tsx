import { move } from "../moves";
import { Piece, Position } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForPawn = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): Position[] => {
  const validMoves: Position[] = [];
  const direction = color === "white" ? -1 : 1; // White moves up, Black moves down

  // Check the move directly ahead
  const forwardMove: Position = {
    row: currentLocation.row + direction,
    col: currentLocation.col,
  };
  if (forwardMove.row >= 0 && forwardMove.row < board.length) {
    // Only add if the square is empty
    if (!board[forwardMove.row][forwardMove.col].hasPiece) {
      validMoves.push(forwardMove);
    }
  }

  // Check diagonal captures
  const leftCapture: Position = {
    row: currentLocation.row + direction,
    col: currentLocation.col - 1,
  };
  const rightCapture: Position = {
    row: currentLocation.row + direction,
    col: currentLocation.col + 1,
  };

  if (leftCapture.row >= 0 && leftCapture.row < board.length) {
    const leftSquare = board[leftCapture.row][leftCapture.col];
    if (leftSquare.hasPiece && leftSquare.hasPiece.color !== color) {
      validMoves.push(leftCapture); // Valid capture
    }
  }

  if (rightCapture.row >= 0 && rightCapture.row < board.length) {
    const rightSquare = board[rightCapture.row][rightCapture.col];
    if (rightSquare.hasPiece && rightSquare.hasPiece.color !== color) {
      validMoves.push(rightCapture); // Valid capture
    }
  }

  // En Passant logic
  const enPassantRow =
    color === "white" ? currentLocation.row + 1 : currentLocation.row - 1;
  const enPassantLeft: Position = {
    row: enPassantRow,
    col: currentLocation.col - 1,
  };
  const enPassantRight: Position = {
    row: enPassantRow,
    col: currentLocation.col + 1,
  };
  
// Check for left en passant move
if (
    enPassantLeft.col >= 0 &&
    enPassantLeft.col < board[0].length &&
    board[enPassantRow][enPassantLeft.col] !== null && // Ensure not null
    board[enPassantRow][enPassantLeft.col].hasPiece !== null && // Ensure hasPiece is not null
    board[enPassantRow][enPassantLeft.col].hasPiece.color !== color &&
    board[enPassantRow][enPassantLeft.col].hasPiece.type === "pawn" &&
    board[enPassantRow][enPassantLeft.col].hasPiece.position.row ===
      (color === "white" ? 3 : 4)
  ) {
    validMoves.push({ row: enPassantRow, col: enPassantLeft.col }); // Valid en passant move
  }
  
  // Check for right en passant move
  if (
    enPassantRight.col < board[0].length &&
    board[enPassantRow][enPassantRight.col] !== null && // Ensure not null
    board[enPassantRow][enPassantRight.col].hasPiece !== null && // Ensure hasPiece is not null
    board[enPassantRow][enPassantRight.col].hasPiece.color !== color &&
    board[enPassantRow][enPassantRight.col].hasPiece.type === "pawn" &&
    board[enPassantRow][enPassantRight.col].hasPiece.position.row ===
      (color === "white" ? 3 : 4)
  ) {
    validMoves.push({ row: enPassantRow, col: enPassantRight.col }); // Valid en passant move
  }

  return validMoves;
};

// New function for handling promotion logic
export const checkPawnPromotion = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): boolean => {
  const promotionRow = color === "white" ? board.length - 1 : 0; // Last row for promotion
  return currentLocation.row === promotionRow; // Returns true if the pawn can promote
};

export const createPawn = (
  color: "white" | "black",
  position: Position
): Piece => ({
  type: "pawn",
  color,
  materialValue: 1,
  position,
  findNextValidPositions: findNextValidPositionsForPawn,
  move,
});
