import { move } from "../moves";
import { Knight, Position } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForKnight = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
): Position[] => {
  const possibleMoves: Position[] = [
    { row: currentLocation.row - 2, col: currentLocation.col - 1 }, // Up 2, Left 1
    { row: currentLocation.row - 2, col: currentLocation.col + 1 }, // Up 2, Right 1
    { row: currentLocation.row - 1, col: currentLocation.col - 2 }, // Up 1, Left 2
    { row: currentLocation.row - 1, col: currentLocation.col + 2 }, // Up 1, Right 2
    { row: currentLocation.row + 1, col: currentLocation.col - 2 }, // Down 1, Left 2
    { row: currentLocation.row + 1, col: currentLocation.col + 2 }, // Down 1, Right 2
    { row: currentLocation.row + 2, col: currentLocation.col - 1 }, // Down 2, Left 1
    { row: currentLocation.row + 2, col: currentLocation.col + 1 }, // Down 2, Right 1
  ];

  const validMoves: Position[] = possibleMoves.filter((move) => {
    // Check if the move is within bounds of the chessboard
    const isWithinBounds =
      move.row >= 0 &&
      move.row < board.length &&
      move.col >= 0 &&
      move.col < board[0].length;

    // Check if the square is either empty or occupied by an opponent's piece
    const targetSquare = board[move.row][move.col];
    const isTargetEmpty = !targetSquare.piece;
    const isOpponentPiece =
      targetSquare.piece && targetSquare.piece.color !== color;

    return isWithinBounds && (isTargetEmpty || isOpponentPiece);
  });

  return validMoves;
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
