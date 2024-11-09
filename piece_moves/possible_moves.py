def getAllPossibleMoves(self):
    moves = []
    for r in range(len(self.board)):
        for c in range(len(self.board[0])):
            turn = self.board[r][c][0]
            if (turn == "w" and self.whiteToMove) or (turn == "b" and not self.whiteToMove):
                if self.board[r][c][1]=='p' and (r==0 or r==5):
                    continue
                piece = self.board[r][c][1]
                self.moveFunctions[piece](r, c, moves)
    return moves