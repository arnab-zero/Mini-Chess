import { move } from "../moves";
import { Knight, Position } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForKnight = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): Position[] => {
  // Potential moves for a knight in all 8 directions
  const knightMoves = [
    { row: currentLocation.row + 2, col: currentLocation.col + 1 },
    { row: currentLocation.row + 2, col: currentLocation.col - 1 },
    { row: currentLocation.row - 2, col: currentLocation.col + 1 },
    { row: currentLocation.row - 2, col: currentLocation.col - 1 },
    { row: currentLocation.row + 1, col: currentLocation.col + 2 },
    { row: currentLocation.row + 1, col: currentLocation.col - 2 },
    { row: currentLocation.row - 1, col: currentLocation.col + 2 },
    { row: currentLocation.row - 1, col: currentLocation.col - 2 },
  ];

  // Filter moves to ensure they are within bounds and not occupied by a friendly piece
  return knightMoves.filter((move) => {
    const withinBounds =
      move.row >= 0 &&
      move.row < board.length &&
      move.col >= 0 &&
      move.col < board[0].length;

    if (!withinBounds) return false;

    const targetSquare = board[move.row][move.col];
    return !targetSquare.piece || targetSquare.piece.color !== color;
  });
};

export const createKnight = (
  color: "white" | "black",
  position: Position
): Knight => ({
  type: "knight",
  color,
  materialValue: 3.2,
  findNextValidPositions: findNextValidPositionsForKnight,
  position, // Default position, should be updated when placed on the board
  move: move,
});
