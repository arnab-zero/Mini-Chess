from Moves import Move

pins = []
board = [
            ["bR", "bB", "bK", "bQ", "bN"],
            ["bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp"],
            ["wR", "wB", "wK", "wQ", "wN"]
        ]

def getPawnMoves(self, r, c, moves):
    piecePinned = False
    pinDirection = ()
    for i in range((len(pins) - 1), -1, -1):
        if r == pins[i][0] and c == pins[i][1]:
            piecePinned = True
            pinDirection = (pins[i][2], pins[i][3])
            pins.remove(pins[i])
            break

    if whiteToMove:
        if board[r - 1][c] == '--':
            if not piecePinned or pinDirection == (-1, 0):
                moves.append(Move((r, c), (r - 1, c), board))
        if c - 1 >= 0:
            if not piecePinned or pinDirection == (-1, -1):
                if board[r - 1][c - 1][0] == 'b':
                    moves.append(Move((r, c), (r - 1, c - 1), board))
        if c + 1 < len(board[r]):
            if not piecePinned or pinDirection == (-1, 1):
                if board[r - 1][c + 1][0] == 'b':
                    moves.append(Move((r, c), (r - 1, c + 1), board))
    else:
        if board[r + 1][c] == '--':
            if not piecePinned or pinDirection == (1, 0):
                moves.append(Move((r, c), (r + 1, c), board))
        if c - 1 >= 0:
            if not piecePinned or pinDirection == (1, -1):
                if board[r + 1][c - 1][0] == 'w':
                    moves.append(Move((r, c), (r + 1, c - 1), board))
        if c + 1 < len(board[r]):
            if not piecePinned or pinDirection == (1, 1):
                if board[r + 1][c + 1][0] == 'w':
                    moves.append(Move((r, c), (r + 1, c + 1), board))