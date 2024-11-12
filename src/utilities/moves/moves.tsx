import { Square } from "./types/square";

export const move = (
  squareOne: Square,
  squareTwo: Square,
  currentBoardState: Square[][]
): Square[][] => {
  // Check if squareOne has a piece to move
  if (!squareOne.piece) return currentBoardState;

  const pieceToMove = squareOne.piece;

  // Create a copy of the board state to avoid mutating the original state
  const updatedBoardState = currentBoardState.map((row) =>
    row.map((square) => ({ ...square }))
  );

  const fromSquare =
    updatedBoardState[squareOne.position.row][squareOne.position.col];
  const toSquare =
    updatedBoardState[squareTwo.position.row][squareTwo.position.col];

  // Case 1: Move to an empty square
  if (!toSquare.piece) {
    toSquare.piece = pieceToMove;
    toSquare.piece.position = toSquare.position;
    fromSquare.piece = null;
    return updatedBoardState;
  }

  // Case 2: Capture opponent's piece
  if (toSquare.piece.color !== pieceToMove.color) {
    toSquare.piece = pieceToMove;
    toSquare.piece.position = toSquare.position;
    fromSquare.piece = null;
    return updatedBoardState;
  }

  // Case 3: Invalid move (same color piece in the destination square)
  // Do nothing and return the original board state
  return currentBoardState;
};
