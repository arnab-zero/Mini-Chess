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

  for (const { row: dRow, col: dCol } of directions) {
    let row = currentLocation.row + dRow;
    let col = currentLocation.col + dCol;

    // Continue moving in the current direction until reaching the edge of the board or an occupied square
    while (
      row >= 0 &&
      row < board.length &&
      col >= 0 &&
      col < board[0].length
    ) {
      const targetSquare = board[row][col];

      if (!targetSquare) break; // Stop if out of bounds

      if (targetSquare.piece) {
        // If there's an opponent's piece, it's a valid capture position; add and stop in this direction
        if (targetSquare.piece.color !== color) validPositions.push({ row, col });
        break;
      } else {
        // Add empty squares to valid moves
        validPositions.push({ row, col });
      }

      // Move further in the same direction
      row += dRow;
      col += dCol;
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
});
