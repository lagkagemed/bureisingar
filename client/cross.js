let CROSS_LIST = []

let Cross = function (x, y, type, color) {
    let self = {
        x: x,
        y: y,
        color: color,
        sideLengthFact: 2,
        owner: 'none',
        type: type
    }
    self.draw = function (length, offX, offY) {
        let realX = (x * length) + offX
        let realY = (y * length) + offY
        let sideLength = length / this.sideLengthFact
        ctx.fillStyle = this.color
        //ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        //if (this.type == 0) drawCrossHitB(realX, realY, sideLength)
        if (this.type == 1) drawHouse(realX, realY, sideLength / 2)

    }
    CROSS_LIST.push(self)
    return self
}

function clickCross(focus, pX, pY, length, scaleLength) {
    if (focus > -1) {
        cross = CROSS_LIST[focus]
        realCrossX = (cross.x * scaleLength) * -1
        realCrossY = (cross.y * scaleLength) * -1
        realSizeX = pMenu.sizeX * length
        realSizeY = pMenu.sizeY * length
        realX = realCrossX - realSizeX / 2
        realY = realCrossY + realSizeY * 0.3
        if (pX < realX || pX > realX + realSizeX || pY < realY || pY > realY + realSizeY) {
            focus = -1
        }
    } 
    if (focus == -1) {
        for (let i = 0; i < CROSS_LIST.length; i++) {
            cross = CROSS_LIST[i]
            realX = (cross.x * scaleLength) * -1
            realY = (cross.y * scaleLength) * -1
            hsl = scaleLength / cross.sideLengthFact / 2
            if (pX > realX - hsl && pX < realX + hsl && pY > realY - hsl && pY < realY + hsl) focus = i
        }
    }
    if (focus > -1) {
        cross = CROSS_LIST[focus]
        realCrossX = (cross.x * scaleLength) * -1
        realCrossY = (cross.y * scaleLength) * -1
        realSizeX = pMenu.sizeX * length
        realSizeY = pMenu.sizeY * length
        realX = realCrossX - realSizeX / 2
        realY = realCrossY + realSizeY * 0.3
        if (pX > realX && pX < realX + realSizeX && pY > realY && pY < realY + realSizeY) {
            socket.emit('buildHouse', focus)
            focus = -1
        } 
    }
    return focus
}

function drawCrossHitB(realX, realY, sideLength) {         
    ctx.beginPath()
    ctx.rect(realX - sideLength / 2, realY - sideLength / 2, sideLength, sideLength)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'BLACK'
    ctx.stroke()
}

function drawHouse(x, y, length) {
    ctx.beginPath()
    ctx.rect(x - length / 2, y - length / 2, length, length)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'BLACK'
    ctx.stroke()

    ctx.fillStyle = 'GREY'
    ctx.beginPath()
    ctx.moveTo(x - length / 2, y - length / 2)
    ctx.lineTo(x, y - length)
    ctx.lineTo(x + length / 2, y - length / 2)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'BLACK'
    ctx.stroke()
}