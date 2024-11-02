import { findNextValidPositionsForKing } from "../moves";

type PieceType = "pawn" | "king" | "queen" | "bishop" | "rook" | "knight";

export interface Piece {
  type: PieceType;
  color: "white" | "black";
  materialValue: number;
  position: { row: number; col: number };
  findNextValidPositions: (
    currentLocation: { row: number; col: number },
    color: "white" | "black"
  ) => { row: number; col: number }[];
  move: () => void;
}

export interface Pawn extends Piece {
  type: "pawn";
  move: () => void;
}

export interface King extends Piece {
  type: "king";
  findNextValidPostions: findNextValidPositionsForKing;
  move: () => void;
}

export interface Queen extends Piece {
  type: "queen";
  move: () => void;
}

export interface Bishop extends Piece {
  type: "bishop";
  move: () => void;
}

export interface Knight extends Piece {
  type: "knight";
  move: () => void;
}

export interface Rook extends Piece {
  type: "rook";
  move: () => void;
}
