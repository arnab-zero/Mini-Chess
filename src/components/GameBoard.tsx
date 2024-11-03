import React, { useState } from "react";
import { Piece, Position } from "../utilities/types/pieces";
import { Square } from "../utilities/types/square";
import { createPawn } from "../utilities/pieces/PawnPiece";
import { createRook } from "../utilities/pieces/RookPiece";
import { createKnight } from "../utilities/pieces/KnightPiece";
import { createBishop } from "../utilities/pieces/BishopPiece";
import { createQueen } from "../utilities/pieces/QueenPiece";
import { createKing } from "../utilities/pieces/KingPiece";

// Helper function to place initial pieces on the board
function getInitialPiece(row: number, col: number): Piece | null {
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

  if (row === 1) return createPiece("pawn");
  if (row === 4) return createPiece("pawn");
  if (row === 0)
    return createPiece(["rook", "bishop", "queen", "king", "knight"][col]);
  if (row === 5)
    return createPiece(["rook", "bishop", "queen", "king", "knight"][col]);

  return null; // If no piece is initialized
}

const boardCurrentState: Square[][] = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => {
    const isBlack = (row + col) % 2 === 1;
    return {
      position: { row, col },
      piece: getInitialPiece(row, col),
      color: isBlack ? "black" : "white",
    };
  })
);

const renderPiece = (piece: Piece) => {
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

const ChessBoard: React.FC = () => {
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  const handleSquareClick = (square: Square) => {
    console.log("Piece:", square?.piece);
    if (square.piece) {
      const { piece } = square;
      const validPositions = piece.findNextValidPositions(
        square.position,
        piece.color,
        boardCurrentState
      );
      setValidMoves(validPositions); // Update state with valid moves
    } else {
      setValidMoves([]); // Clear valid moves if no piece is selected
    }
  };

  return (
    <div className="grid grid-cols-5 grid-rows-6 border-2 border-black w-[450px] h-[540px]">
      {boardCurrentState.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const isValidMove = validMoves.some(
            (move) => move.row === rowIndex && move.col === colIndex
          );

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center w-full h-full text-2xl font-bold 
                ${square.color === "black" ? "bg-[#8e6425]" : "bg-[#d0ba97]"} 
                ${
                  isValidMove ? "border-4 border-green-500" : "border"
                } cursor-pointer`}
              onClick={() => handleSquareClick(square)}
            >
              {square.piece ? renderPiece(square.piece) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
