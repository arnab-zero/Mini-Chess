import { Square } from "./square";

type PieceType = "pawn" | "king" | "queen" | "bishop" | "rook" | "knight";

export type Position = { row: number; col: number };

export interface Piece {
  type: PieceType;
  color: "white" | "black";
  materialValue: number;
  position: { row: number; col: number };
  findNextValidPositions: (
    currentLocation: Position,
    color: "white" | "black"
  ) => Position[];
  move: (targetPosition: Position, board: Square[][]) => void;
}

export interface Pawn extends Piece {
  type: "pawn";
}

export interface King extends Piece {
  type: "king";
}

export interface Queen extends Piece {
  type: "queen";
}

export interface Bishop extends Piece {
  type: "bishop";
}

export interface Knight extends Piece {
  type: "knight";
}

export interface Rook extends Piece {
  type: "rook";
}
