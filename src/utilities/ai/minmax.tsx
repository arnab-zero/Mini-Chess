import { Piece } from "../types/pieces";
import { pieceStateUpdate } from "../board/boardUpdate";
import {
  PawnScore,
  RookScore,
  BishopScore,
  KingScore,
  KnightScore,
} from "../moves/AnalysePosition";

export class fromTo {
  constructor(
    i: 0 | 1 | 2 | 3 | 4 | 5 | number,
    j: 0 | 1 | 2 | 3 | 4 | number,
    x: 0 | 1 | 2 | 3 | 4 | 5 | number,
    y: 0 | 1 | 2 | 3 | 4 | number
  ) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
  }
  // i, j represent move from.
  i: number;
  j: number;
  // x, y represent moved to.
  x: number;
  y: number;
}

const MinMax = (
  board: (Piece | null)[][],
  turn: "W" | "B",
  iterationsLeft: number,
  alpha: number,
  beta: number
): { score: number; moveToMake: fromTo } => {
  // If this move is the bottom-most move in the MinMax search tree
  if (iterationsLeft === 0)
    return {
      score: analyzeBoard(board),
      moveToMake: new fromTo(1, 1, 1, 1),
    };

  let bestScoreYet = turn === "W" ? -100000 : 100000;
  let bestMoveYet: fromTo;
  const returnValue = () => {
    return { score: bestScoreYet, moveToMake: bestMoveYet };
  };

  // Create a copy of the piece because piece.canMoveTo will change.
  const newBoard = JSON.parse(JSON.stringify(board));
  pieceStateUpdate(newBoard, turn);

  for (let i = 0; i < 6; i++) {
    // Updated for 6 ranks
    for (let j = 0; j < 5; j++) {
      // Updated for 5 files
      let count = 0;
      // board[i][j] represents each piece.
      if (!newBoard[i][j] || newBoard[i][j].color !== turn) continue;
      for (let x = 0; x < 6; x++) {
        // Updated for 6 ranks
        for (let y = 0; y < 5; y++) {
          // Updated for 5 files
          const piece = newBoard[i][j];
          // board[i][j].canMoveTo represents each possible move by board[i][j].
          if (piece.canMoveTo[x][y]) {
            count++;
            const copyOfNewBoard = newBoard.map((inner: any) => inner.slice());
            copyOfNewBoard[x][y] = copyOfNewBoard[i][j];
            copyOfNewBoard[i][j] = null;

            // Call MinMax recursively on the new board state.
            const { score: scoreToSend, moveToMake } = MinMax(
              copyOfNewBoard,
              turn === "W" ? "B" : "W",
              iterationsLeft - 1,
              alpha,
              beta
            );
            const thisMove = new fromTo(i, j, x, y);

            if (
              turn === "W"
                ? scoreToSend > bestScoreYet
                : scoreToSend < bestScoreYet
            ) {
              bestScoreYet = scoreToSend;
              bestMoveYet = thisMove;
            }

            if (turn === "W" && scoreToSend !== 100000) {
              alpha = Math.max(alpha, scoreToSend, -100000);
            } else if (scoreToSend !== -100000) {
              beta = Math.min(beta, scoreToSend, 100000);
            }

            if (beta <= alpha) {
              return returnValue();
            }
          }
        }
      }
    }
  }

  return returnValue();
};

export default MinMax;

const analyzeBoard = (board: (Piece | null)[][]) => {
  let valueOfBoard: number = 0;
  for (let i = 0; i < 6; i++) {
    // Updated for 6 ranks
    for (let j = 0; j < 5; j++) {
      // Updated for 5 files
      if (board[i][j]) {
        switch (board[i][j].type) {
          case "Pawn":
            PawnScore(i, j, board);
            break;
          case "Bishop":
            BishopScore(i, j, board);
            break;
          case "King":
            KingScore(i, j, board);
            break;
          case "Queen":
            BishopScore(i, j, board);
            RookScore(i, j, board);
            break;
          case "Rook":
            RookScore(i, j, board);
            break;
          case "Knight":
            KnightScore(i, j, board);
            break;
        }
        valueOfBoard += board[i][j].importance;
      }
    }
  }
  return valueOfBoard;
};
