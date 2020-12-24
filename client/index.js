let canvas = document.getElementById("ctx")
let ctx = canvas.getContext("2d")
let myWidth = 0
let myHeight = 0
let myId = 0
let myName = ''
let myColor = 'Green'

let imgTree = new Image()
imgTree.src = "./client/img/tree.png"

let pMenu = PopUpMenu(4, 2)


canvas.addEventListener('touchstart', dragStart, false)
canvas.addEventListener('touchend', dragEnd, false)
canvas.addEventListener('touchmove', drag, false)

window.addEventListener('mousedown', dragStart, false)
window.addEventListener('mouseup', dragEnd, false)
window.addEventListener('mousemove', drag, false)
canvas.addEventListener('wheel', zoom, false)

let hexSize = 50
let hexSizeScale = hexSize * (scale * 1)

let newCross = Cross(0.5, -1, 'RED')

window.onload = function() {
    init()
    window.addEventListener('resize', init, false)
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
}

function update() {
    hexSizeScale = hexSize * scale

}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawAllInList(hexSizeScale, HEXAGON_LIST, offSetX, offSetY)
    drawAllInList(hexSizeScale, CROSS_LIST, offSetX, offSetY)

    if (crossFocus > -1) pMenu.draw(hexSize, hexSizeScale, crossFocus, offSetX, offSetY)
    //ctx.drawImage(imgTree, offSetX, offSetY)
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
})