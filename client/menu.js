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

let TopMenu = function (yFact) {
    let self = {
        yFact: yFact,
        color: 'lightgrey'
    }

    self.draw = function (width, height) {
        let realHeight = height / this.yFact
        let numbRes = 8
        let resLength = width / numbRes

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(0, 0, width, realHeight)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = 'BLACK'
        ctx.stroke()

        ctx.font = (Math.floor(imgTreeS.width / 1.5)) + 'px Arial'
        ctx.fillStyle = 'Black'
        ctx.textAlign = "center";

        ctx.drawImage(imgTreeS, resLength, realHeight / 2 - imgTreeS.height / 2)
        ctx.fillText(myResources.tree, resLength + imgTreeS.width * 1.5, realHeight / 2 + realHeight / 16)

        ctx.drawImage(imgClayS, resLength * 2, realHeight / 2 - imgClayS.height / 2)
        ctx.fillText(myResources.clay, resLength * 2 + imgClayS.width * 1.5, realHeight / 2 + realHeight / 16)

        ctx.drawImage(imgHayS, resLength * 3, realHeight / 2 - imgHayS.height / 2)
        ctx.fillText(myResources.hay, resLength * 3 + imgHayS.width * 1.5, realHeight / 2 + realHeight / 16)

        ctx.drawImage(imgSheepS, resLength * 4, realHeight / 2 - imgSheepS.height / 2)
        ctx.fillText(myResources.sheep, resLength * 4 + imgSheepS.width * 1.5, realHeight / 2 + realHeight / 16)

        ctx.drawImage(imgStoneS, resLength * 5, realHeight / 2 - imgStoneS.height / 2)
        ctx.fillText(myResources.stone, resLength * 5 + imgStoneS.width * 1.5, realHeight / 2 + realHeight / 16)

    }
    return self
}

function menuDrag(pX, pY) {
        if (pX > myWidth - myWidth / 32 * 3 && pX < myWidth - myWidth / 32 && pY > myHeight / 10 - myHeight / 15 && pY < myHeight / 10 + myHeight / 20) dragObject = 1
}

// init images

let imgFact = 15

let imgTree = new Image()
imgTree.src = "./client/img/Tree.png"
let imgTreeS = new Image()
imgTree.addEventListener("load", function(){
    imgTreeS.src = Resize_Nearest_Neighbour(imgTree, hexSize / imgFact)
});

let imgClay = new Image()
imgClay.src = "./client/img/Clay.png"
let imgClayS = new Image()
imgClay.addEventListener("load", function(){
    imgClayS.src = Resize_Nearest_Neighbour(imgClay, hexSize / imgFact)
});

let imgHay = new Image()
imgHay.src = "./client/img/Hay.png"
let imgHayS = new Image()
imgHay.addEventListener("load", function(){
    imgHayS.src = Resize_Nearest_Neighbour(imgHay, hexSize / imgFact)
});

let imgSheep = new Image()
imgSheep.src = "./client/img/Sheep.png"
let imgSheepS = new Image()
imgSheep.addEventListener("load", function(){
    imgSheepS.src = Resize_Nearest_Neighbour(imgSheep, hexSize / imgFact)
});

let imgStone = new Image()
imgStone.src = "./client/img/Stone.png"
let imgStoneS = new Image()
imgStone.addEventListener("load", function(){
    imgStoneS.src = Resize_Nearest_Neighbour(imgStone, hexSize / imgFact)
});