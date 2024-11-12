class Move:
    ranksToRows = {"1": 5, "2": 4, "3": 3, "4": 2, "5": 1, "6": 0}
    rowsToRanks = {v: k for k, v in ranksToRows.items()}

    filesToCols = {"e": 4, "d": 3, "c": 2, "b": 1, "a": 0}
    colsToFiles = {v: k for k, v in filesToCols.items()}

    def __init__(self, startSq, endSq, board):
        self.startRow = startSq[0]
        self.startCol = startSq[1]
        self.endRow = endSq[0]
        self.endCol = endSq[1]
        self.pieceMoved = board[self.startRow, self.startCol]
        self.pieceCaptured = board[self.endRow, self.endCol]
        self.moveId = self.startRow * 1000 + self.startCol * 100 + self.endRow * 10 + self.endCol

        self.is_pawn_promotion = (self.pieceMoved == "wp" and self.endRow == 0) or (
                self.pieceMoved == "bp" and self.endRow == 5)

    def is_capture(self):
        return self.pieceCaptured is not None

    def __eq__(self, other):
        if isinstance(other, Move):
            return self.moveId == other.moveId
        return False

    def getChessNotation(self):
        return f"{self.getRankFile(self.startRow, self.startCol)}->{self.getRankFile(self.endRow, self.endCol)}"

    def getRankFile(self, r, c):
        return self.colsToFiles[c] + self.rowsToRanks[r]
