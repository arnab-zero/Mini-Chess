import pygame as p
from board_setup import loadImages 

def main():
    p.init()
    screen = p.display.set_mode((boardWidth + panelWidth + rank * 2, boardHeight + rank * 2))
    clock = p.time.Clock()

    screen.fill(p.Color("#61210F"))
    moveLogFont = p.font.SysFont('Arial', 15, True, False)
    btnFont=p.font.SysFont("Arial",20,True,False)
    gameState = chessEngine.GameState()

    loadImages()
    drawRankAndFile(screen, moveLogFont)
    btnX=panelX + panelWidth / 2 - btnWidth/2
    against_human_btn=getBtn(screen,btnX,panelHeight + squareSize / 4,btnFont,"Play Against Human")
    against_computer_btn=getBtn(screen,btnX ,against_human_btn.y+btnHeight+20,btnFont,"Play Against Computer")
    chooseSide=False
    gameStarted=False

if __name__ == '__main__':
    main()