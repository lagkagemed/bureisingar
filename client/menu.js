let Menu = function () {
    let self = {}

    self.draw = function (sizeX, sizeY) {
        ctx.fillStyle = 'lightgrey'
        ctx.beginPath()
        ctx.rect(sizeX - sizeX / 8, 0, sizeX / 8, sizeY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()
        ctx.fillStyle = myColor
        drawHouse(sizeX - sizeX / 16, sizeY / 10, sizeX / 32)
    }
    return self
}

function menuDrag(pX, pY) {
        if (pX > myWidth - myWidth / 32 * 3 && pX < myWidth - myWidth / 32 && pY > myHeight / 10 - myHeight / 15 && pY < myHeight / 10 + myHeight / 20) dragObject = 1
}
