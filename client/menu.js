let PopUpMenu = function (sizeX, sizeY) {
    let self = {
        sizeX: sizeX,
        sizeY: sizeY,
        color: 'GREY',
        rows: 8,
        buySizeFactX: 0.8,
        buySizeFactY: 0.3,
        buyColor: 'lightblue'
    }

    self.draw = function (length, scaleLength, fCross, offX, offY) {
        realSizeX = this.sizeX * length
        realSizeY = this.sizeY * length
        realCrossX = CROSS_LIST[fCross].x * scaleLength + offX
        realCrossY = CROSS_LIST[fCross].y * scaleLength + offY
        realX = realCrossX - realSizeX / 2
        realY = realCrossY - realSizeY * 1.3

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(realCrossX, realCrossY)
        ctx.lineTo(realX + realSizeX / 6, realY)
        ctx.lineTo(realX + realSizeX / 6 * 5, realY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()
        ctx.beginPath()
        ctx.rect(realX, realY, realSizeX, realSizeY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()
        
        buySizeX = realSizeX * this.buySizeFactX
        buySizeY = realSizeY * this.buySizeFactY
        buyX = realX + ((realSizeX - buySizeX) / 2)
        buyY = realY + (realSizeY / this.rows)
        ctx.fillStyle = this.buyColor
        ctx.beginPath()
        ctx.rect(buyX, buyY, buySizeX, buySizeY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()

        ctx.font = (Math.floor(buySizeX / 7)) + 'px Arial'
        ctx.fillStyle = 'Black'
        ctx.textAlign = "center";
        ctx.fillText('BUILD', realX + realSizeX / 2, realY + realSizeY / this.rows * 3)
        

    }
    return self
}

function menuDrag(pX, pY) {
        if (pX > myWidth - myWidth / 32 * 3 && pX < myWidth - myWidth / 32 && pY > myHeight / 10 - myHeight / 15 && pY < myHeight / 10 + myHeight / 20) dragObject = 1
}
