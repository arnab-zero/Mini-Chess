import React from "react";
import { Piece } from "../utilities/types/pieces";
import { Square } from "../utilities/types/square";

// Helper function to place initial pieces on the board
function getInitialPiece(row: number, col: number): Piece | null {
  const pieces: { [key: number]: string } = {
    0: "rook",
    1: "bishop",
    2: "queen",
    3: "king",
    4: "knight",
  };

  if (row === 1) return { type: "pawn", color: "black" };
  if (row === 4) return { type: "pawn", color: "white" };
  if (row === 0) return { type: pieces[col], color: "black" };
  if (row === 5) return { type: pieces[col], color: "white" };
  return null;
}

const initialBoard: Square[][] = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => {
    const isBlack = (row + col) % 2 === 1;
    return {
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
  return (
    <div className="grid grid-cols-5 grid-rows-6 border-2 border-black w-[450px] h-[540px]">
      {initialBoard.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`flex items-center justify-center w-full h-full text-2xl font-bold ${
              square.color === "black" ? "bg-[#8e6425]" : "bg-[#d0ba97]"
            } cursor-pointer`}
            onClick={() => {
              if (square.piece) {
                console.log(
                  `Position: ${rowIndex}:${colIndex} --> ${square.piece}`
                );
              }
            }}
          >
            {square.piece ? renderPiece(square.piece) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
