import { King, Position } from "./types/pieces";

function specificMove() {}

export const findNextValidPositionsForKing = (
  currentLocation: Position,
  color: "white" | "black"
): Position[] => {
  const possibleMoves = [
    { row: currentLocation.row - 1, col: currentLocation.col }, // Up
    { row: currentLocation.row + 1, col: currentLocation.col }, // Down
    { row: currentLocation.row, col: currentLocation.col - 1 }, // Left
    { row: currentLocation.row, col: currentLocation.col + 1 }, // Right
    { row: currentLocation.row - 1, col: currentLocation.col - 1 }, // Up Left
    { row: currentLocation.row - 1, col: currentLocation.col + 1 }, // Up Right
    { row: currentLocation.row + 1, col: currentLocation.col - 1 }, // Down Left
    { row: currentLocation.row + 1, col: currentLocation.col + 1 }, // Down Right
  ];

  // Filter valid moves within the bounds of the chessboard (0 to 7)
  const validMoves = possibleMoves.filter(
    (move) => move.row >= 0 && move.row < 6 && move.col >= 0 && move.col < 5
  );

  return validMoves;
};

export const createKing = (color: "white" | "black"): King => ({
  type: "king",
  color,
  materialValue: 1000,
  findNextValidPositions: findNextValidPositionsForKing,
  position: { row: 5, col: 3 },
  move: specificMove,
});
