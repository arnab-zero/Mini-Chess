from rook_moves import getRookMoves


def getQueenMoves(self, r, c, moves):
    getRookMoves(r, c, moves)
    getBishopMoves(r, c, moves)