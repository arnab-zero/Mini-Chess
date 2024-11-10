from Moves import moves

pins = []
board = [
            ["bR", "bB", "bK", "bQ", "bN"],
            ["bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp"],
            ["wR", "wB", "wK", "wQ", "wN"]
        ]

def getKnightMoves(r, c, moves):
    piecePinned = False
    for i in range((len(pins) - 1), -1, -1):
        if r == pins[i][0] and c == pins[i][1]:
            piecePinned = True
            pins.remove(pins[i])
            break
    directions = ((2, -1), (2, 1), (1, 2), (-1, 2), (1, -2), (-1, -2), (-2, 1), (-2, -1))
    allyColor = 'w' if whiteToMove else 'b'
    for dir in directions:
        endRow = r + dir[0]
        endCol = c + dir[1]

        if 0 <= endRow < len(board) and 0 <= endCol < len(board[0]):
            if not piecePinned:
                endPiece = board[endRow][endCol]
                if endPiece[0] != allyColor:
                    moves.append(Move((r, c), (endRow, endCol), board))