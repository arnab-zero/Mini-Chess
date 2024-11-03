import { move } from "../moves";
import { King, Position } from "../types/pieces";
import { Square } from "../types/square";

export const findNextValidPositionsForKing = (
  currentLocation: Position,
  color: "white" | "black",
  board: Square[][]
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

export const createKing = (
  color: "white" | "black",
  position: Position
): King => ({
  type: "king",
  color,
  materialValue: 1000,
  findNextValidPositions: findNextValidPositionsForKing,
  position,
  move: move,
});



// export const findNextValidPositionsForKing = (
//   currentLocation: Position,
//   color: "white" | "black",
//   board: Square[][],
//   opponentKingPosition: Position,
//   isCellUnderAttack: (position: Position, board: Square[][], color: "white" | "black") => boolean
// ): Position[] => {
//   const possibleMoves = [
//     { row: currentLocation.row - 1, col: currentLocation.col }, // Up
//     { row: currentLocation.row + 1, col: currentLocation.col }, // Down
//     { row: currentLocation.row, col: currentLocation.col - 1 }, // Left
//     { row: currentLocation.row, col: currentLocation.col + 1 }, // Right
//     { row: currentLocation.row - 1, col: currentLocation.col - 1 }, // Up Left
//     { row: currentLocation.row - 1, col: currentLocation.col + 1 }, // Up Right
//     { row: currentLocation.row + 1, col: currentLocation.col - 1 }, // Down Left
//     { row: currentLocation.row + 1, col: currentLocation.col + 1 }  // Down Right
//   ];

//   const boardSize = board.length; // Assuming a 6x5 board
//   const opponentColor = color === "white" ? "black" : "white";

//   // Filter possible moves based on the requirements
//   const validMoves = possibleMoves.filter((move) => {
//     // Check if the move is within the board bounds
//     if (move.row < 0 || move.row >= boardSize || move.col < 0 || move.col >= board[0].length) {
//       return false;
//     }

//     // Check if the move is not overlapping with the opponent king's position
//     if (move.row === opponentKingPosition.row && move.col === opponentKingPosition.col) {
//       return false;
//     }

//     // Check if the move would put the king in a position under attack
//     if (isCellUnderAttack(move, board, opponentColor)) {
//       return false;
//     }

//     // Check if the move captures an opponent piece and ensures no check after the move
//     const targetSquare = board[move.row][move.col];
//     if (targetSquare.hasPiece && targetSquare.hasPiece.color === opponentColor) {
//       const originalSquare = board[currentLocation.row][currentLocation.col];

//       // Temporarily perform the move for evaluation
//       targetSquare.hasPiece = originalSquare.hasPiece;
//       originalSquare.hasPiece = null;

//       // Check if the king is safe after this move
//       const kingIsSafe = !isCellUnderAttack(move, board, opponentColor);

//       // Revert the temporary move
//       originalSquare.hasPiece = targetSquare.hasPiece;
//       targetSquare.hasPiece = null;

//       return kingIsSafe;
//     }

//     // If all checks are passed, the move is valid
//     return true;
//   });

//   return validMoves;
// };
