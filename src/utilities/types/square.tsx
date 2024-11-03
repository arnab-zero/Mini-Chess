import { Piece } from "./pieces";

interface Position {
  row: number;
  col: number;
}

export interface Square {
  position: Position;
  square_color: "black" | "white";
  hasPiece: Piece | null;
}
