from rook_moves import getRookMoves

pins = []
board = [
            ["bR", "bB", "bK", "bQ", "bN"],
            ["bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp"],
            ["wR", "wB", "wK", "wQ", "wN"]
        ]

def getQueenMoves(self, r, c, moves):
    getRookMoves(r, c, moves)
    getBishopMoves(r, c, moves)