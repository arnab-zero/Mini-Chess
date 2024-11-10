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

def checkForPinsAndChecks(self):
        inCheck = False
        checks = []
        pins = []

        if whiteToMove:
            enemyColor = 'b'
            allyColor = 'w'
            startRow = whiteKingLocation[0]
            startCol = whiteKingLocation[1]
        else:
            enemyColor = 'w'
            allyColor = 'b'
            startRow = blackKingLocation[0]
            startCol = blackKingLocation[1]
        directions = ((-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1))

        for i in range(len(directions)):
            direction = directions[i]
            possiblePins = ()
            for j in range(1, max(len(board), len(board[0]))):
                endRow = startRow + direction[0] * j
                endCol = startCol + direction[1] * j

                if 0 <= endRow < len(board) and 0 <= endCol < len(board[0]):
                    endPiece = board[endRow][endCol]
                    if endPiece[0] == allyColor and endPiece[1] != 'K':
                        if possiblePins == ():
                            possiblePins = (endRow, endCol, direction[0], direction[1])
                        else:
                            break
                    elif endPiece[0] == enemyColor:
                        type = endPiece[1]
                        if (0 <= i <= 3 and type == 'R') or (4 <= i <= 7 and type == 'B') or (
                                j == 1 and type == 'p' and (
                                (enemyColor == 'w' and 6 <= i <= 7) or (enemyColor == 'b' and 4 <= i <= 5))) or (
                                type == 'Q') or (j == 1 and type == 'K'):
                            if possiblePins == ():
                                inCheck = True
                                checks.append((endRow, endCol, direction[0], direction[1]))
                                break
                            else:
                                pins.append(possiblePins)
                                break
                        else:
                            break
                else:
                    break
        knightDirections = ((2, -1), (2, 1), (1, 2), (-1, 2), (1, -2), (-1, -2), (-2, 1), (-2, -1))
        for direction in knightDirections:
            endRow = startRow + direction[0]
            endCol = startCol + direction[1]
            if 0 <= endRow < len(board) and 0 <= endCol < len(board[0]):
                endPiece = board[endRow][endCol]
                if endPiece[0] == enemyColor and endPiece[1] == 'N':
                    inCheck = True
                    checks.append((endRow, endCol, direction[0], direction[1]))

        return inCheck, pins, checks


def getKingMoves( r, c, moves):
    directions = ((1, -1), (1, 1), (-1, -1), (-1, 1), (0, -1), (0, 1), (1, 0), (-1, 0))
    allyColor = 'w' if whiteToMove else 'b'
    for dir in directions:
        endRow = r + dir[0]
        endCol = c + dir[1]

        if 0 <= endRow < len(board) and 0 <= endCol < len(board[0]):
            endPiece = board[endRow][endCol]
            if endPiece[0] != allyColor:
                if allyColor == 'w':
                    whiteKingLocation = (endRow, endCol)
                else:
                    blackKingLocation = (endRow, endCol)

                inCheck, pins, checks = checkForPinsAndChecks()

                if not inCheck:
                    moves.append(Move((r, c), (endRow, endCol), board))

                if allyColor == 'w':
                    whiteKingLocation = (r, c)
                else:
                    blackKingLocation = (r, c)