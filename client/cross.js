let CROSS_LIST = []

let Cross = function (x, y) {
    let self = {
        x: x,
        y: y,
        color: 'GREEN',
        sideLengthFact: 2,
        owner: 'none',
        type: 0
    }
    self.draw = function (length, offX, offY) {
        let realX = (x * length) + offX
        let realY = (y * length) + offY
        let sideLength = length / this.sideLengthFact
        ctx.fillStyle = myColor
        //ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        //if (this.type == 0) drawCrossHitB(realX, realY, sideLength)
        if (this.type == 1) drawHouse(realX, realY, sideLength / 2)

    }
    CROSS_LIST.push(self)
    return self
}

function clickCross(pX, pY, length) {
    let focus = -1
    for (let i = 0; i < CROSS_LIST.length; i++) {
        let cross = CROSS_LIST[i]
        let realX = (cross.x * length) * -1
        let realY = (cross.y * length) * -1
        let hsl = length / cross.sideLengthFact / 2
        if (pX > realX - hsl && pX < realX + hsl && pY > realY - hsl && pY < realY + hsl) focus = i
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