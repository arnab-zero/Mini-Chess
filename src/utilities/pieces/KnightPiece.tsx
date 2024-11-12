import { isUnderCheck, Piece, valueOfPiece } from "../types/pieces";

export const Knight = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | null)[][],
  turn: string
) => {
  let importance = 200;
  const boardRows = 6;
  const boardCols = 5;

  const moves = [
    [-2, -1], [-2, 1],
    [2, -1], [2, 1],
    [-1, -2], [1, -2],
    [-1, 2], [1, 2]
  ];

  moves.forEach(([dx, dy]) => {
    const newRow = i + dx;
    const newCol = j + dy;

    // Ensure move is within the 6x5 board boundaries
    if (newRow >= 0 && newRow < boardRows && newCol >= 0 && newCol < boardCols) {
      const targetSquare = Board[newRow][newCol];
      let moveResultsInCheck = false;

      if (!targetSquare || targetSquare.color !== Board[i][j]?.color) {
        const newBoard = Board.map(inner => inner.slice());
        newBoard[newRow][newCol] = newBoard[i][j];
        newBoard[i][j] = null;

        // Check if this move results in a check
        moveResultsInCheck = isUnderCheck(newBoard, turn === "W" ? "B" : "W");
      }

      if (!moveResultsInCheck) {
        canMoveTo[newRow][newCol] = true;

        if (targetSquare && targetSquare.color !== turn) {
          importance += valueOfPiece(targetSquare.type);
        }
      }
    }
  });

  importance *= turn === "W" ? 1 : -1;
  Board[i][j].importance = importance;
};


export const KnightGivesCheck = (i: number, j: number, Board: (Piece | any)[][]): boolean => {
  const rows = 6;
  const cols = 5;
  const knightColor = Board[i][j]?.color;
  
  // Define all possible knight moves in terms of row and column offsets
  const knightMoves = [
    [-2, -1], [-2, 1], [2, -1], [2, 1],
    [-1, -2], [-1, 2], [1, -2], [1, 2]
  ];

  // Check each potential move for a check against the King
  for (const [dx, dy] of knightMoves) {
    const newRow = i + dx;
    const newCol = j + dy;
    
    // Ensure move is within board boundaries
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const target = Board[newRow][newCol];
      
      // Check if the target square contains an opponent's King
      if (target && target.color !== knightColor && target.type === "King") {
        return true;
      }
    }
  }
  
  return false;
};
