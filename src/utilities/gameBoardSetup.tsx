import { createBishop } from "./pieces/BishopPiece";
import { createKing } from "./pieces/KingPiece";
import { createKnight } from "./pieces/KnightPiece";
import { createPawn } from "./pieces/PawnPiece";
import { createQueen } from "./pieces/QueenPiece";
import { createRook } from "./pieces/RookPiece";
import { Piece } from "./types/pieces";
import { Square } from "./types/square";

// Helper function to place initial pieces on the board
export function getInitialPiece(row: number, col: number): Piece | null {
  const color = row < 3 ? "black" : "white"; // Determine piece color based on row
  const createPiece = (type: string) => {
    switch (type) {
      case "pawn":
        return createPawn(color, { row, col });
      case "rook":
        return createRook(color, { row, col });
      case "knight":
        return createKnight(color, { row, col });
      case "bishop":
        return createBishop(color, { row, col });
      case "queen":
        return createQueen(color, { row, col });
      case "king":
        return createKing(color, { row, col });
      default:
        return null;
    }
  };

  if (row === 1 || row === 4) return createPiece("pawn");
  if (row === 0 || row === 5)
    return createPiece(["rook", "bishop", "queen", "king", "knight"][col]);

  return null; // If no piece is initialized
}

// Initialize the board state
export const initialBoardState: Square[][] = Array.from(
  { length: 6 },
  (_, row) =>
    Array.from({ length: 5 }, (_, col) => {
      const isBlack = (row + col) % 2 === 1;
      return {
        position: { row, col },
        piece: getInitialPiece(row, col),
        color: isBlack ? "black" : "white",
      };
    })
);

export const renderPiece = (piece: Piece) => {
  const symbols: { [key: string]: { white: string; black: string } } = {
    pawn: { white: "♙", black: "♙" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" },
  };

  return symbols[piece.type]?.[piece.color] || "";
};
