import { move } from "../moves";
import { Position, Queen } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForQueen = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): Position[] => {
  const validPositions: Position[] = [];
  const directions = [
    { row: 1, col: 0 }, // down
    { row: -1, col: 0 }, // up
    { row: 0, col: 1 }, // right
    { row: 0, col: -1 }, // left
    { row: 1, col: 1 }, // down-right
    { row: 1, col: -1 }, // down-left
    { row: -1, col: 1 }, // up-right
    { row: -1, col: -1 }, // up-left
  ];

  const boardSize = board.length;

  // Helper function to check if a position is within bounds
  const isInBounds = (row: number, col: number) =>
    row >= 0 && row < boardSize && col >= 0 && col < boardSize;

  for (const direction of directions) {
    let newRow = currentLocation.row + direction.row;
    let newCol = currentLocation.col + direction.col;

    // Continue in the current direction until we hit the edge or a piece
    while (isInBounds(newRow, newCol)) {
      const targetSquare = board[newRow][newCol];

      if (targetSquare.piece) {
        if (
          targetSquare.piece.color !==
          board[currentLocation.row][currentLocation.col].piece?.color
        ) {
          // If it's an opponent's piece, add it as a valid position (capture move)
          validPositions.push({ row: newRow, col: newCol });
        }
        // Stop further movement in this direction after encountering any piece
        break;
      }

      // If there's no piece, add the square as a valid position
      validPositions.push({ row: newRow, col: newCol });

      // Move one step further in the current direction
      newRow += direction.row;
      newCol += direction.col;
    }
  }

  return validPositions;
};

export const createQueen = (
  color: "white" | "black",
  position: Position
): Queen => ({
  type: "queen",
  color,
  materialValue: 1000,
  findNextValidPositions: findNextValidPositionsForQueen,
  position,
  move: move,
});
