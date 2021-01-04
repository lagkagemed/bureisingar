let offSetX = 0
let offSetY = 0
let initX = 0
let initY = 0
let startX = 0
let startY = 0
let endX = 0
let endY = 0
let pX = 0
let pY = 0
let relZX = 0
let relZY = 0
let dragScreen = false
let crossFocus = -1


let scale = 1

function dragStart(e) {
    dragScreen = true
    if (e.type == 'touchstart') {
        initX = offSetX - e.touches[0].clientX
        initY = offSetY - e.touches[0].clientY
        pX = e.touches[0].clientX
        pY = e.touches[0].clientY
        endX = offSetX - e.touches[0].clientX
        endY = offSetY - e.touches[0].clientY
    } else {
        initX = offSetX - e.clientX
        initY = offSetY - e.clientY
        pX = e.clientX
        pY = e.clientY
        endX = offSetX - e.clientX
        endY = offSetY - e.clientY   
    }
    if (pY < myHeight / tMenu.yFact) dragScreen = false
    startX = pX
    startY = pY
    menuDrag(pX, pY)
}

function dragEnd() {
    dragScreen = false
    if (startX == pX && startY == pY) {
        if (pY > myHeight / tMenu.yFact) {
            crossFocus = clickCross(crossFocus, endX, endY, hexSize, hexSizeScale)
        }
        clickOnOff(pX, pY, tMenu.onOffX, tMenu.onOffY, tMenu.onOffSize)
    }
}

function drag(e) {
    e.preventDefault()
    if (dragScreen) {
        e.preventDefault()
        if (e.type == 'touchmove') {
            offSetX = initX + e.touches[0].clientX
            offSetY = initY + e.touches[0].clientY
        } else {
            offSetX = initX + e.clientX
            offSetY = initY + e.clientY
        }
    }
    if (e.type == 'touchmove') {
        endX = offSetX - e.touches[0].clientX
        endY = offSetY - e.touches[0].clientY
        pX = e.touches[0].clientX
        pY = e.touches[0].clientY
    } else {
        endX = offSetX - e.clientX
        endY = offSetY - e.clientY     
        pX = e.clientX
        pY = e.clientY
    }
}

function zoom(event) {
    event.preventDefault();

    if (scale > 1.125) scaleFact = -0.005
    if (scale <= 1.125) scaleFact = -0.001
  
    scale += event.deltaY * scaleFact
  
    // Restrict scale
    scale = Math.min(Math.max(0.225, scale), 4)
  }