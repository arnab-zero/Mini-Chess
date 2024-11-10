import React, { useState } from "react";
import { Position } from "../utilities/types/pieces";
import { Square } from "../utilities/types/square";
import { move } from "../utilities/moves";
import {
  initialBoardState,
  renderPiece,
  updateAttackedSquares,
} from "../utilities/gameBoardSetup";

const ChessBoard: React.FC = () => {
  const [boardState, setBoardState] = useState<Square[][]>(initialBoardState);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">(
    "white"
  );

  const handleSquareClick = (square: Square) => {
    if (
      selectedSquare &&
      validMoves.some(
        (move) =>
          move.row === square.position.row && move.col === square.position.col
      )
    ) {
      // If clicking on a valid move, execute the move
      let updatedBoard = move(selectedSquare, square, boardState); // Call move function
      updatedBoard = updateAttackedSquares(updatedBoard); // Update attacked squares with opponent's color

      setBoardState(updatedBoard); // Update board state
      setSelectedSquare(null); // Deselect the square
      setValidMoves([]); // Clear valid moves
      setCurrentPlayer(currentPlayer === "white" ? "black" : "white"); // Toggle turn
    } else if (square.piece === selectedSquare?.piece) {
      // If the same square is clicked again, deselect it
      setSelectedSquare(null);
      setValidMoves([]);
    } else if (square.piece && square.piece.color === currentPlayer) {
      // Allow selection only if the piece matches the current player's turn
      const validPositions = square.piece.findNextValidPositions(
        square.position,
        square.piece.color,
        boardState
      );
      setSelectedSquare(square);
      setValidMoves(validPositions);
    } else {
      // Clear selection if clicking an invalid square or wrong piece
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold mb-4">
        Next move: {currentPlayer === "white" ? "White" : "Black"}
      </h1>
      <div className="grid grid-cols-5 grid-rows-6 border-2 border-black w-[450px] h-[540px]">
        {boardState.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const isValidMove = validMoves.some(
              (move) => move.row === rowIndex && move.col === colIndex
            );

            // Determine if the square has an opponent's piece
            const hasOpponentPiece =
              square.piece && square.piece.color !== currentPlayer;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center w-full h-full text-2xl font-bold 
              ${square.color === "black" ? "bg-[#8e6425]" : "bg-[#d0ba97]"} 
              ${
                isValidMove
                  ? hasOpponentPiece
                    ? "border-4 border-red-500"
                    : "border-4 border-green-500"
                  : "border"
              }
              cursor-pointer`}
                onClick={() => handleSquareClick(square)}
              >
                {square.piece ? renderPiece(square.piece) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
