import pygame as p

xDimension = 5
yDimension = 6
squareSize = 100
pawnHeight = 85
pawnWidht = 39
rank = 20
file = 20
boardWidth = xDimension * squareSize
boardHeight = yDimension * squareSize
panelWidth = 400
panelHeight = squareSize*4.5 + rank
panelX=boardWidth + 2 * file
panelY=0
btnWidth=300
btnHeight=40
playerOne = True
playerTwo = False
maxFPS = 60

images = {}

def loadImages():
    pieces = ['bR', 'bB', 'bK', 'bQ', 'bN', 'bp', 'wR', 'wB', 'wK', 'wQ', 'wN', 'wp']
    for piece in pieces:
        images[piece] = p.transform.scale(p.image.load('images/' + piece + '.png'), (pawnWidht, pawnHeight))

def drawPieces(screen, board):
    for r in range(yDimension):
        for c in range(xDimension):
            piece = board[r][c]
            if piece != "--":
                square_center_x = c * squareSize + squareSize // 2 + file
                square_center_y = r * squareSize + squareSize // 2 + rank

                piece_x = square_center_x - pawnWidht // 2
                piece_y = square_center_y - pawnHeight // 2

                screen.blit(images[piece], p.Rect(piece_x, piece_y, pawnWidht, pawnHeight))

