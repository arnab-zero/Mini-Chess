import { Bishop } from "../pieces/BishopPiece";
import { King } from "../pieces/KingPiece";
import { Knight } from "../pieces/KnightPiece";
import { Pawn } from "../pieces/PawnPiece";
import { Rook } from "../pieces/RookPiece";
import { Piece } from "../types/pieces";
import { initiallyCanMoveTo } from "./InitialPosition";

export const pieceStateUpdate = (board: (Piece | null)[][], turn: string) => {
  let valueOfBoard: number = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] && board[i][j].color === turn) {
        board[i][j].canMoveTo = initiallyCanMoveTo.map((inner) =>
          inner.slice()
        );
        switch (board[i][j].type) {
          case "Pawn":
            Pawn(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Bishop":
            Bishop(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "King":
            King(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Queen":
            Bishop(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            Rook(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Rook":
            Rook(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
          case "Knight":
            Knight(i, j, board[i][j].canMoveTo, board, board[i][j].color);
            break;
        }
        valueOfBoard += board[i][j].importance;
      } else if (board[i][j]) valueOfBoard += board[i][j].importance;
    }
  }
  return valueOfBoard;
};
