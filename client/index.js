let canvas = document.getElementById("ctx")
let ctx = canvas.getContext("2d")
let myWidth = 0
let myHeight = 0
let myId = 0
let myName = ''
let myColor = 'Green'
let myResources = {tree: 0, clay: 0, stone: 0, sheep: 0, hay: 0}
ctx.imageSmoothingEnabled = false;
let oldScale = scale

let hexSize = 50
let hexSizeScale = hexSize * (scale * 1)


let pMenu = PopUpMenu(4, 2)
let tMenu = TopMenu(8)


canvas.addEventListener('touchstart', dragStart, false)
canvas.addEventListener('touchend', dragEnd, false)
canvas.addEventListener('touchmove', drag, false)

window.addEventListener('mousedown', dragStart, false)
window.addEventListener('mouseup', dragEnd, false)
window.addEventListener('mousemove', drag, false)
canvas.addEventListener('wheel', zoom, false)

window.onload = function() {
    init()
    window.addEventListener('resize', init, false)
    window.addEventListener("orientationchange", init, false)
}
function init() {
    myWidth = window.innerWidth - 5
    myHeight = window.innerHeight -5 
    ctx.canvas.width = myWidth
    ctx.canvas.height = myHeight
    offSetX = myWidth / 2
    offSetY = myHeight / 2
    hexSize = myWidth / 15
    if (hexSize < 50) hexSize = 50
    if (hexSize > 75) hexSize = 75
    imgTreeS.src = Resize_Nearest_Neighbour(imgTree, hexSize / imgFact)
    imgClayS.src = Resize_Nearest_Neighbour(imgClay, hexSize / imgFact)
    imgHayS.src = Resize_Nearest_Neighbour(imgHay, hexSize / imgFact)
    imgSheepS.src = Resize_Nearest_Neighbour(imgSheep, hexSize / imgFact)
    imgStoneS.src = Resize_Nearest_Neighbour(imgStone, hexSize / imgFact)
}

function update() {
    hexSizeScale = hexSize * scale


}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawAllInList(hexSizeScale, HEXAGON_LIST, offSetX, offSetY)
    drawAllInList(hexSizeScale, CROSS_LIST, offSetX, offSetY)

    if (crossFocus > -1) pMenu.draw(hexSize, hexSizeScale, crossFocus, offSetX, offSetY)
    tMenu.draw(myWidth, myHeight)
}



setInterval(function(){
    update()
    draw()
},1000/100);

let socket = io();

socket.on('newMap',function(data){
    HEXAGON_LIST = []
    CROSS_LIST = []

    for (let i = 0; i < data.hexagons.length; i++) {
        let hex = data.hexagons[i]
        Hexagon(hex.x, hex.y, hex.color, hex.number)
    }

    for (let i = 0; i < data.crosses.length; i++) {
        let cross = data.crosses[i]
        Cross(cross.x, cross.y, cross.type, cross.color)
    }
})

socket.on('myInfo', function(data){
    myId = data.id
    myName = data.name
    myColor = data.color
    myResources = data.resources
})