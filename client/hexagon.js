let HEXAGON_LIST = []

let Hexagon = function (x, y, color, number) {
    let self = {
        x: x,
        y: y,
        color: color,
        number: number
    }
    self.draw = function (length, offX, offY) {
        let realX = (x * length * 1.5) + offX
        let realY = (y * length) + offY
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(realX - length, realY)
        ctx.lineTo(realX - length / 2, realY - length)
        ctx.lineTo(realX + length / 2, realY - length)
        ctx.lineTo(realX + length, realY)
        ctx.lineTo(realX + length / 2, realY + length)
        ctx.lineTo(realX - length / 2, realY + length)
        ctx.lineTo(realX - length, realY)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()
        ctx.font = (Math.floor(length / 2)) + 'px Arial'
        ctx.fillStyle = 'Black'
        ctx.textAlign = "center";
        ctx.fillText(this.number, realX, realY + (length / 10))
    }
    HEXAGON_LIST.push(self)
    return self
}