import { Piece } from "./pieces";

interface Position {
  row: number;
  col: number;
}

export interface Square {
  position: Position;
  color: "black" | "white";
  piece: Piece | null;
}
