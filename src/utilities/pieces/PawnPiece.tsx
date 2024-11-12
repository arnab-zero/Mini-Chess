import { isUnderCheck, Piece, valueOfPiece } from "../types/pieces";

export const Pawn = (
  i: number,
  j: number,
  canMoveTo: boolean[][],
  Board: (Piece | null)[][],
  turn: string
) => {
  let importance: number = 50;
  Board[i][j].turnsSinceLastMove++;

  // Adjust boundaries for 6x5 board
  const maxRow = 5;
  const maxCol = 4;

  if (turn === "W" && i !== 0) {
    // Move up for White
    if (Board[i - 1][j] === null) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i - 1][j] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i - 1][j] = true;

      // Initial double move for White
      if (
        Board[i][j] &&
        Board[i][j].numOfMoves === 0 &&
        i - 2 >= 0 &&
        Board[i - 2][j] === null
      ) {
        newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 2][j] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i - 2][j] = true;
      }
    }

    // Capture diagonally left for White
    if (j > 0) {
      const upLeft = Board[i - 1][j - 1];
      const left = Board[i][j - 1];
      if (upLeft !== null && upLeft.color === "B") {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i - 1][j - 1] = true;
          importance += valueOfPiece(upLeft.type);
        }
      }
      // En Passant for White
      else if (
        i === 3 &&
        left &&
        left.numOfMoves === 1 &&
        left.turnsSinceLastMove === 0
      ) {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j - 1] = Board[i][j];
        newBoard[i][j - 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i - 1][j - 1] = true;
          importance += valueOfPiece(left.type);
        }
      }
    }

    // Capture diagonally right for White
    if (j < maxCol) {
      const upRight = Board[i - 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight !== null && upRight.color === "B") {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i - 1][j + 1] = true;
          importance += valueOfPiece(upRight.type);
        }
      }
      // En Passant for White
      else if (
        i === 3 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      ) {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i - 1][j + 1] = Board[i][j];
        newBoard[i][j + 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i - 1][j + 1] = true;
        importance += valueOfPiece(right.type);
      }
    }
  }

  if (turn === "B" && i !== maxRow) {
    // Move down for Black
    if (Board[i + 1][j] === null) {
      let newBoard = Board.map((inner) => inner.slice());
      newBoard[i + 1][j] = Board[i][j];
      newBoard[i][j] = null;
      if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
        canMoveTo[i + 1][j] = true;

      // Initial double move for Black
      if (
        Board[i][j].numOfMoves === 0 &&
        i + 2 <= maxRow &&
        Board[i + 2][j] == null
      ) {
        newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 2][j] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 2][j] = true;
      }
    }

    // Capture diagonally left for Black
    if (j > 0) {
      const upLeft = Board[i + 1][j - 1];
      const left = Board[i][j - 1];
      if (upLeft !== null && upLeft.color === "W") {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i + 1][j - 1] = true;
          importance += valueOfPiece(upLeft.type);
        }
      }
      // En Passant for Black
      else if (
        i === 2 &&
        left &&
        left.numOfMoves === 1 &&
        left.turnsSinceLastMove === 0
      ) {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j - 1] = Board[i][j];
        newBoard[i][j - 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j - 1] = true;
        importance += valueOfPiece(left.type);
      }
    }

    // Capture diagonally right for Black
    if (j < maxCol) {
      const upRight = Board[i + 1][j + 1];
      const right = Board[i][j + 1];
      if (upRight !== null && upRight.color === "W") {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 1] = Board[i][j];
        newBoard[i][j] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W")) {
          canMoveTo[i + 1][j + 1] = true;
          importance += valueOfPiece(upRight.type);
        }
      }
      // En Passant for Black
      else if (
        i === 2 &&
        right &&
        right.numOfMoves === 1 &&
        right.turnsSinceLastMove === 0
      ) {
        const newBoard = Board.map((inner) => inner.slice());
        newBoard[i + 1][j + 1] = Board[i][j];
        newBoard[i][j + 1] = null;
        if (!isUnderCheck(newBoard, turn === "W" ? "B" : "W"))
          canMoveTo[i + 1][j + 1] = true;
        importance += valueOfPiece(right.type);
      }
    }
  }

  importance *= turn === "W" ? 1 : -1;
  Board[i][j].importance = importance;
};

export const PawnGivesCheck = (
  i: number,
  j: number,
  board: (Piece | null)[][]
): boolean => {
  if (i === 0 || i === 5) return false;

  const piece = board[i][j];
  if (piece) {
    const color = piece.color;
    const targetColor = color === "W" ? "B" : "W";
    let directions = [];

    // Determine possible check directions based on the piece's color
    if (color === "W") {
      directions = [
        [-1, -1],
        [-1, 1],
      ]; // Capture diagonally up for White
    } else {
      directions = [
        [1, -1],
        [1, 1],
      ]; // Capture diagonally down for Black
    }

    // Check diagonals for opponent's king
    for (const [dx, dy] of directions) {
      const newRow = i + dx;
      const newCol = j + dy;

      if (newRow >= 0 && newRow <= 5 && newCol >= 0 && newCol <= 4) {
        const targetPiece = board[newRow][newCol];
        if (
          targetPiece &&
          targetPiece.type === "K" &&
          targetPiece.color === targetColor
        ) {
          return true; // The pawn gives check
        }
      }
    }
  }

  return false; // No check given
};
