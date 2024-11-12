export class Piece {
  constructor(
    type: "King" | "Rook" | "Knight" | "Bishop" | "Pawn" | "Queen",
    color: "W" | "B"
  ) {
    this.type = type;
    this.color = color;
    const multiplier = color === "W" ? 1 : -1;
    if (type === "King") this.importance = 10000 * multiplier;
    else if (type === "Queen") this.importance = 2000 * multiplier;
    else if (type === "Knight") this.importance = 200 * multiplier;
    else if (type === "Rook") this.importance = 150 * multiplier;
    else if (type === "Bishop") this.importance = 150 * multiplier;
    else this.importance = 50 * multiplier;

    this.canMoveTo = Array.from({ length: 6 }, () => Array(5).fill(false));
  }

  type: string = "";
  color: string = "";
  // Adjusted 6x5 matrix for canMoveTo
  canMoveTo: boolean[][] = Array.from({ length: 6 }, () =>
    Array(5).fill(false)
  );
  numOfMoves: number = 0;
  turnsSinceLastMove: number = 0;
  importance: number;
}

export const valueOfPiece = (
  type: "King" | "Rook" | "Knight" | "Bishop" | "Pawn" | "Queen"
) => {
  switch (type) {
    case "King":
      return 1000;
    case "Rook":
      return 100;
    case "Knight":
      return 150;
    case "Bishop":
      return 100;
    case "Pawn":
      return 30;
    case "Queen":
      return 500;
  }
};
