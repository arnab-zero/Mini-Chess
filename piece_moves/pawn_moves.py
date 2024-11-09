from Moves import Move

def getPawnMoves(self, r, c, moves):
    piecePinned = False
    pinDirection = ()
    for i in range((len(self.pins) - 1), -1, -1):
        if r == self.pins[i][0] and c == self.pins[i][1]:
            piecePinned = True
            pinDirection = (self.pins[i][2], self.pins[i][3])
            self.pins.remove(self.pins[i])
            break

    if self.whiteToMove:
        if self.board[r - 1][c] == '--':
            if not piecePinned or pinDirection == (-1, 0):
                moves.append(Move((r, c), (r - 1, c), self.board))
        if c - 1 >= 0:
            if not piecePinned or pinDirection == (-1, -1):
                if self.board[r - 1][c - 1][0] == 'b':
                    moves.append(Move((r, c), (r - 1, c - 1), self.board))
        if c + 1 < len(self.board[r]):
            if not piecePinned or pinDirection == (-1, 1):
                if self.board[r - 1][c + 1][0] == 'b':
                    moves.append(Move((r, c), (r - 1, c + 1), self.board))
    else:
        if self.board[r + 1][c] == '--':
            if not piecePinned or pinDirection == (1, 0):
                moves.append(Move((r, c), (r + 1, c), self.board))
        if c - 1 >= 0:
            if not piecePinned or pinDirection == (1, -1):
                if self.board[r + 1][c - 1][0] == 'w':
                    moves.append(Move((r, c), (r + 1, c - 1), self.board))
        if c + 1 < len(self.board[r]):
            if not piecePinned or pinDirection == (1, 1):
                if self.board[r + 1][c + 1][0] == 'w':
                    moves.append(Move((r, c), (r + 1, c + 1), self.board))