import numpy as np

BOARD_ROWS = 6
BOARD_COLS = 5


def is_valid_square(row, col):
    return np.logical_and(0 <= row, row < BOARD_ROWS) & np.logical_and(0 <= col, col < BOARD_COLS)


class GameState:
    def __init__(self):
        self.board = np.array([
            ["bR", "bN", "bB", "bQ", "bK"],
            ["bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp"],
            ["wR", "wN", "wB", "wQ", "wK"],
        ], dtype=object)

        self.moveFunctions = {'p': self.getPawnMoves,
                              'R': self.getRookMoves,
                              'N': self.getKnightMoves,
                              'B': self.getBishopMoves,
                              'Q': self.getQueenMoves,
                              'K': self.getKingMoves
                              }
        
        self.whiteToMove = True
        self.moveLog = []

        self.whiteKingLocation = (5, 4)
        self.blackKingLocation = (0, 4)

        self.checkMate = False
        self.staleMate = False


    def makeMove(self, move):
        self.board[move.startRow, move.startCol] = "--"
        self.board[move.endRow, move.endCol] = move.pieceMoved
        self.moveLog.append(move)
        self.whiteToMove = not self.whiteToMove

        if move.pieceMoved == 'bK':
            self.blackKingLocation = (move.endRow, move.endCol)
        elif move.pieceMoved == 'wK':
            self.whiteKingLocation = (move.endRow, move.endCol)

        if move.is_pawn_promotion:
            self.board[move.endRow, move.endCol] = move.pieceMoved[0] + "Q"

    def squareAttack(self, r, c):
        self.whiteToMove = not self.whiteToMove  
        oppMoves = self.getAllPossibleMoves()
        self.whiteToMove = not self.whiteToMove 
        for move in oppMoves:
            if move.endRow == r and move.endCol == c: 
                return True
        return False

    def inCheck(self):
        if self.whiteToMove:
            return self.squareAttack(self.whiteKingLocation[0], self.whiteKingLocation[1])
        else:
            return self.squareAttack(self.blackKingLocation[0], self.blackKingLocation[1])

    def undoMove(self, mode='single'):
        if len(self.moveLog) != 0:
            move = self.moveLog.pop()
            self.board[move.startRow, move.startCol] = move.pieceMoved
            self.board[move.endRow, move.endCol] = move.pieceCaptured
            self.whiteToMove = not self.whiteToMove
            # update king if move
            if move.pieceMoved == 'bK':
                self.blackKingLocation = (move.startRow, move.startCol)
            elif move.pieceMoved == 'wK':
                self.whiteKingLocation = (move.startRow, move.startCol)

    def getValidMoves(self):
        # list moves
        moves = self.getAllPossibleMoves()

        #  make the move
        for i in range(len(moves) - 1, -1, -1):
            self.makeMove(moves[i])
            #  all opponent's move
            # for  opponent's move, see if attack my king
            self.whiteToMove = not self.whiteToMove
            if self.inCheck():
                # if attack king, invalid move
                moves.remove(moves[i])
            self.whiteToMove = not self.whiteToMove
            self.undoMove()
        return moves

    def getAllPossibleMoves(self):
        moves = []
        for r in range(6):
            # print(30)
            for c in range(5):
                # print(32)
                turn = self.board[r, c][0]
                # print(turn)
                if (turn == "w" and self.whiteToMove) or (turn == "b" and not self.whiteToMove):
                    piece = self.board[r, c][1]
                    self.moveFunctions[piece](r, c, moves)
        # print(moves)
        return moves

    def getPawnMoves(self, r, c, moves):
        if self.whiteToMove:  # White pawn moves
            if r > 0:  # Row index checking
                if self.board[r - 1, c] == "--":  # 1 square pawn advance
                    moves.append(Move((r, c), (r - 1, c), self.board))
                    # Check if the pawn is in its starting position (row 4)
                    if r == 4 and self.board[r - 2, c] == "--":
                        moves.append(Move((r, c), (r - 2, c), self.board))
                if c - 1 > -1:
                    # Left corner enemy piece to capture
                    if self.board[r - 1, c - 1][0] == 'b':
                        moves.append(Move((r, c), (r - 1, c - 1), self.board))
                if c + 1 < 5:
                    # Right corner enemy piece to capture
                    if self.board[r - 1, c + 1][0] == 'b':
                        moves.append(Move((r, c), (r - 1, c + 1), self.board))

        else:  # Black pawn moves
            if r < 5:  # Row index checking
                if self.board[r + 1, c] == "--":  # 1 square pawn advance
                    moves.append(Move((r, c), (r + 1, c), self.board))
                    # Check if the pawn is in its starting position (row 1)
                    if r == 1 and self.board[r + 2, c] == "--":
                        moves.append(Move((r, c), (r + 2, c), self.board))
                if c - 1 > -1:
                    # Right corner enemy piece to capture
                    if self.board[r + 1, c - 1][0] == 'w':
                        moves.append(Move((r, c), (r + 1, c - 1), self.board))
                if c + 1 < 5:
                    # Left corner enemy piece to capture
                    if self.board[r + 1, c + 1][0] == 'w':
                        moves.append(Move((r, c), (r + 1, c + 1), self.board))

    def getRookMoves(self, r, c, moves):

        directions = [(-1, 0), (0, -1), (1, 0), (0, 1)]  # up, left, down, right
        enemy_color = 'b' if self.whiteToMove else 'w'

        for dr, dc in directions:
            for i in range(1, 6):
                destRow, destCol = r + dr * i, c + dc * i

                if is_valid_square(destRow, destCol):  # check on board
                    destination = self.board[destRow, destCol]
                    if destination == '--':  # empty space so valid
                        moves.append(Move((r, c), (destRow, destCol), self.board))
                    elif destination[0] == enemy_color:
                        moves.append(Move((r, c), (destRow, destCol), self.board))
                        break
                    else:  # friendly piece (own piece)
                        break
                else:  # off board
                    break

    
        kingMoves = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        allyColor = 'w' if self.whiteToMove else 'b'
        for i in range(len(kingMoves)):
            destRow, destCol = r + kingMoves[i][0], c + kingMoves[i][1]
            if is_valid_square(destRow, destCol):  # check on board
                destination = self.board[destRow, destCol]
                # not an ally (empty or enemy piece)
                if destination[0] != allyColor:
                    moves.append(Move((r, c), (destRow, destCol), self.board))

    def getBishopMoves(self, r, c, moves):
        directions = ((-1, -1), (-1, 1), (1, -1), (1, 1))  # all 4 diagonals
        enemyColor = 'b' if self.whiteToMove else 'w'

        for dr, dc in directions:
            for i in range(1, 5):  # a bishop can move maximum 4 diagonal squares
                destRow, destCol = r + dr * i, c + dc * i

                if is_valid_square(destRow, destCol):  # check on board
                    destination = self.board[destRow, destCol]
                    if destination == '--':  # empty space so valid
                        moves.append(Move((r, c), (destRow, destCol), self.board))
                    elif destination[0] == enemyColor:
                        moves.append(Move((r, c), (destRow, destCol), self.board))
                        break
                    else:
                        break
                else:
                    break

    def getQueenMoves(self, r, c, moves):
        self.getRookMoves(r, c, moves)
        self.getBishopMoves(r, c, moves)

    def getKnightMoves(self, r, c, moves):
        knightMoves = ((-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1))
        allyColor = 'w' if self.whiteToMove else 'b'

        for dir in knightMoves:
            destRow, destCol = r + dir[0], c + dir[1]
            if is_valid_square(destRow, destCol):  # check if the destination is on the board
                destination = self.board[destRow, destCol]
                if destination[0] != allyColor:
                    moves.append(Move((r, c), (destRow, destCol), self.board))

    def getKingMoves(self, r, c, moves):
        kingMoves = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        allyColor = 'w' if self.whiteToMove else 'b'
        for i in range(len(kingMoves)):
            destRow, destCol = r + kingMoves[i][0], c + kingMoves[i][1]
            if is_valid_square(destRow, destCol):  # check on board
                destination = self.board[destRow, destCol]
                # not an ally (empty or enemy piece)
                if destination[0] != allyColor:
                    moves.append(Move((r, c), (destRow, destCol), self.board))
