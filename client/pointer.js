let offSetX = 0
let offSetY = 0
let initX = 0
let initY = 0
let dragScreen = false

let scale = 1

function dragStart(e) {
    if (e.type == 'touchstart') {
        initX = offSetX - e.touches[0].clientX
        initY = offSetY - e.touches[0].clientY
    } else {
        initX = offSetX - e.clientX
        initY = offSetY - e.clientY
    }
    dragScreen = true
}

function dragEnd() {
    dragScreen = false
}

function drag(e) {
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
}

function zoom(event) {
    event.preventDefault();

    if (scale > 1.125) scaleFact = -0.005
    if (scale <= 1.125) scaleFact = -0.001
  
    scale += event.deltaY * scaleFact;
  
    // Restrict scale
    scale = Math.min(Math.max(0.225, scale), 4);
  }