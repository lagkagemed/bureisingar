//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
let serv = http.Server(app);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

let map = {}
map.hexagons = createMap(100)
map.crosses = createCrosses()
console.log(map)

let io = new Server(serv);
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    socket.name = "Unnamed";
    //SOCKET_LIST[socket.id] = socket;
    console.log('socket connection');

    socket.emit('newMap', map)

    socket.on('disconnect',function(){
        //delete SOCKET_LIST[socket.id];
        console.log('socket disconnected');
    });
});

function pickRand(array) {
    let rand = array[(Math.random() * array.length) | 0]
    return rand
}

function createMap(hexes) {
    let mapArray = []
    let hexColors = ['ForestGreen', 'LightGreen', 'Gold', 'DarkGray', 'Coral']
    let hexDir = ['up', 'upRight', 'downRight', 'down', 'downLeft', 'upLeft']
    let hexNumbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
    mapArray.push({x:0, y:0, color: pickRand(hexColors), number: pickRand(hexNumbers)})
    while (mapArray.length < hexes) {
        let initHex = pickRand(mapArray)
        let tryDir = pickRand(hexDir)
        let newHexX = 0
        let newHexY = 0
        let createNew = true

        switch (tryDir) {

            case 'up':
                newHexX = initHex.x
                newHexY = initHex.y - 2
                break

            case 'upRight':
                newHexX = initHex.x + 1
                newHexY = initHex.y - 1
                break

            case 'downRight':
                newHexX = initHex.x + 1
                newHexY = initHex.y + 1
                break

            case 'down':
                newHexX = initHex.x
                newHexY = initHex.y + 2
                break

            case 'downLeft':
                newHexX = initHex.x - 1
                newHexY = initHex.y + 1
                break

            case 'upLeft':
                newHexX = initHex.x - 1
                newHexY = initHex.y - 1
                break
        }

        for (let i = 0; i < mapArray.length; i++) {
            let currentHex = mapArray[i]
            if (currentHex.x == newHexX && currentHex.y == newHexY) {
                createNew = false
            }
        }
        if (createNew) mapArray.push({x:newHexX, y:newHexY, color: pickRand(hexColors), number: pickRand(hexNumbers)})  
    }

    return mapArray
}

function createCrosses() {
    let crossArray = []
    let hex = map.hexagons

    for (let i = 0; i < hex.length; i++) {
        let upLeft = true
        let upRight = true
        let right = true
        let downRight = true
        let downLeft = true
        let left = true
        let currentHex = hex[i]
        let currentHexX = currentHex.x * 1.5


        for (let a = 0; a < crossArray.length; a++) {
            if (crossArray[a].x == currentHexX - 0.5 && crossArray[a].y == currentHex.y - 1) upLeft = false
            if (crossArray[a].x == currentHexX + 0.5 && crossArray[a].y == currentHex.y - 1) upRight = false
            if (crossArray[a].x == currentHexX + 1 && crossArray[a].y == currentHex.y) right = false
            if (crossArray[a].x == currentHexX + 0.5 && crossArray[a].y == currentHex.y + 1) downRight = false
            if (crossArray[a].x == currentHexX - 0.5 && crossArray[a].y == currentHex.y + 1) downLeft = false
            if (crossArray[a].x == currentHexX - 1 && crossArray[a].y == currentHex.y) left = false
        }

        if (upLeft) crossArray.push({x: currentHexX - 0.5, y: currentHex.y - 1, color: 'GREEN'})
        if (upRight) crossArray.push({x: currentHexX + 0.5, y: currentHex.y - 1, color: 'GREEN'})
        if (right) crossArray.push({x: currentHexX + 1, y: currentHex.y, color: 'GREEN'})
        if (downRight) crossArray.push({x: currentHexX + 0.5, y: currentHex.y + 1, color: 'GREEN'})
        if (downLeft) crossArray.push({x: currentHexX - 0.5, y: currentHex.y + 1, color: 'GREEN'})
        if (left) crossArray.push({x: currentHexX - 1, y: currentHex.y, color: 'GREEN'})

    }
    return crossArray
}