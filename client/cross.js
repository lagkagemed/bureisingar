let CROSS_LIST = []

let Cross = function (x, y, color) {
    let self = {
        x: x,
        y: y,
        color: color
    }
    self.draw = function (length, offX, offY) {
        let realX = (x * length) + offX
        let realY = (y * length) + offY
        let sideLength = length / 2
        ctx.fillStyle = this.color
        //ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath()
        ctx.rect(realX - sideLength / 2, realY - sideLength / 2, sideLength, sideLength)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()
    }
    CROSS_LIST.push(self)
    return self
}