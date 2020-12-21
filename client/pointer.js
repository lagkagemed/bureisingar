let offSetX = 0
let offSetY = 0
let initX = 0
let initY = 0
let endX = 0
let endY = 0
let pX = 0
let pY = 0
let relZX = 0
let relZY = 0
let dragScreen = false
let dragObject = 0


let scale = 1

function dragStart(e) {
    dragScreen = true
    if (e.type == 'touchstart') {
        initX = offSetX - e.touches[0].clientX
        initY = offSetY - e.touches[0].clientY
        pX = e.touches[0].clientX
        pY = e.touches[0].clientY
        if (e.touches[0].clientX > myWidth - myWidth / 8) dragScreen = false
    } else {
        initX = offSetX - e.clientX
        initY = offSetY - e.clientY
        pX = e.clientX
        pY = e.clientY
        if (e.clientX > myWidth - myWidth / 8) dragScreen = false
    }
    menuDrag(pX, pY)
}

function dragEnd() {
    dragScreen = false
    clickCross(endX, endY, hexSizeScale, dragObject)
    dragObject = 0
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