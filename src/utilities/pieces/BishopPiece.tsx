import { Bishop, Position } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForBishop = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): Position[] => {
  const validPositions: Position[] = [];
  const directions = [
    { row: 1, col: 1 }, // bottom-right
    { row: 1, col: -1 }, // bottom-left
    { row: -1, col: 1 }, // top-right
    { row: -1, col: -1 }, // top-left
  ];

  const boardSize = board.length; // Assuming an 8x8 board

  // Helper function to check if a position is within bounds
  const isInBounds = (row: number, col: number) =>
    row >= 0 && row < boardSize && col >= 0 && col < boardSize;

  for (const direction of directions) {
    let newRow = currentLocation.row + direction.row;
    let newCol = currentLocation.col + direction.col;

    // Move diagonally in the current direction until we hit the board edge or a piece
    while (isInBounds(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];

      if (targetSquare.piece) {
        if (targetSquare.piece.color !== color) {
          // Capture opponent's piece
          validPositions.push({ row: newRow, col: newCol });
        }
        // Stop further movement in this direction after hitting any piece
        break;
      }

      // If there is no piece, add the position as valid
      validPositions.push({ row: newRow, col: newCol });

      // Move one square further in the same direction
      newRow += direction.row;
      newCol += direction.col;
    }
  }

  return validPositions;
};

// A function to initialize a bishop piece when setting up a board
export const createBishop = (
  color: "white" | "black",
  position: Position
): Bishop => ({
  type: "bishop",
  color,
  materialValue: 3,
  findNextValidPositions: findNextValidPositionsForBishop,
  position,
});
