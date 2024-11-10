import { createBishop } from "./pieces/BishopPiece";
import { createKing } from "./pieces/KingPiece";
import { createKnight } from "./pieces/KnightPiece";
import { createPawn } from "./pieces/PawnPiece";
import { createQueen } from "./pieces/QueenPiece";
import { createRook } from "./pieces/RookPiece";
import { Piece } from "./types/pieces";
import { Square } from "./types/square";

import bk from "../assets/pieces/bk.png";
import wk from "../assets/pieces/wk.png";
import bq from "../assets/pieces/bq.png";
import wq from "../assets/pieces/wq.png";
import bn from "../assets/pieces/bn.png";
import wn from "../assets/pieces/wn.png";
import bb from "../assets/pieces/bb.png";
import wb from "../assets/pieces/wb.png";
import wr from "../assets/pieces/wr.png";
import br from "../assets/pieces/br.png";
import wp from "../assets/pieces/wp.png";
import bp from "../assets/pieces/bp.png";

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

// Helper function to update the check status for each square based on attacks from opponent pieces
export const updateAttackedSquares = (board: Square[][]): Square[][] => {
  // Reset check fields for all squares
  board.forEach((row) =>
    row.forEach((square) => {
      square.check = null;
    })
  );

  // Traverse the board to mark squares as attacked by each color
  board.forEach((row) =>
    row.forEach((square) => {
      if (square.piece) {
        const attackingColor = square.piece.color;

        // Get all possible moves (attack positions) for the piece
        const attackPositions = square.piece.findNextValidPositions(
          square.position,
          attackingColor,
          board
        );

        // Mark each targeted square with the appropriate check status
        attackPositions.forEach(({ row, col }) => {
          if (
            row >= 0 &&
            row < board.length &&
            col >= 0 &&
            col < board[0].length
          ) {
            const targetSquare = board[row][col];

            // Update the check field based on which colors can attack this square
            if (targetSquare.check === null) {
              targetSquare.check = attackingColor;
            } else if (
              targetSquare.check !== attackingColor &&
              targetSquare.check !== "both"
            ) {
              targetSquare.check = "both"; // Attacked by both colors
            }
          }
        });
      }
    })
  );

  return board;
};

// Initialize the board state with the check fields
export const initialBoardState: Square[][] = updateAttackedSquares(
  Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => {
      const isBlack = (row + col) % 2 === 1;
      return {
        position: { row, col },
        piece: getInitialPiece(row, col),
        color: isBlack ? "black" : "white",
        check: null,
      };
    })
  )
);

const symbols: { [key: string]: { white: string; black: string } } = {
  pawn: { white: wp, black: bp },
  rook: { white: wr, black: br },
  knight: { white: wn, black: bn },
  bishop: { white: wb, black: bb },
  queen: { white: wq, black: bq },
  king: { white: wk, black: bk },
};

export const renderPiece = (piece: Piece) => {
  const pieceImage = symbols[piece.type]?.[piece.color];

  return pieceImage ? (
    <img
      src={pieceImage}
      alt={`${piece.color} ${piece.type}`}
      className="w-8 h-8"
    />
  ) : null;
};
