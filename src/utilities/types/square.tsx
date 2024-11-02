import { Piece } from "./pieces";

export type Square = {
  piece: Piece | null;
  color: "white" | "black";
};
