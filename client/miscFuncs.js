function drawAllInList(size, list, offX, offY) {
    for(let i = 0; i < list.length; i +=1) {
        list[i].draw(size, offX, offY)
    }
}