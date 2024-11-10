from Moves import Move

board = [
            ["bR", "bB", "bK", "bQ", "bN"],
            ["bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp"],
            ["wR", "wB", "wK", "wQ", "wN"]
        ]

pins = []


def getBishopMoves(self, r, c, moves):
    piecePinned = False
    pinDirection = ()
    for i in range((len(pins) - 1), -1, -1):
        if r == pins[i][0] and c == pins[i][1]:
            piecePinned = True
            pinDirection = (pins[i][2], pins[i][3])
            pins.remove(pins[i])
            break
    directions = ((1, 1), (1, -1), (-1, -1), (-1, 1))
    enemyColor = 'b' if whiteToMove else 'w'
    for d in directions:
        for i in range(1, max(len(board), len(board[0]))):
            endRow = r + d[0] * i
            endCol = c + d[1] * i

            if 0 <= endRow < len(board) and 0 <= endCol < len(board[0]):
                if not piecePinned or pinDirection == d or pinDirection == (-d[0], -d[1]):
                    endPiece = board[endRow][endCol]
                    if endPiece == '--':
                        moves.append(Move((r, c), (endRow, endCol), board))
                    elif endPiece[0] == enemyColor:
                        moves.append(Move((r, c), (endRow, endCol), board))
                        break
                    else:
                        break
            else:
                break