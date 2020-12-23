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

let SOCKET_LIST = {}

let map = {}
map.hexagons = createMap(100)
map.crosses = createCrosses()
console.log(map)

let playerFName = ['attractive', 'bald', 'beautiful', 'chubby', 'clean', 'dazzling', 'drab', 'elegant', 'fancy', 'fit', 'flabby', 'glamorous', 'gorgeous', 'handsome', 'long', 'magnificent', 'muscular', 'plain', 'plump', 'quaint', 'scruffy', 'shapely', 'short', 'skinny', 'stocky', 'ugly', 'unkempt', 'unsightly']
let playerBName = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","news","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president"]

let playerColors = ['RED', 'GREEN', 'ORANGE', 'BLUE', 'WHITE', 'PURPLE', 'YELLOW']

function pickRandColor(array) {
    let pos = (Math.random() * array.length) | 0
    let rand = array[pos]
    array.splice(pos, 1)
    return rand
}

let io = new Server(serv);
io.sockets.on('connection', function(socket){
    socket.id = Math.random();

    let bName = pickRand(playerBName)
    bName = bName.charAt(0).toUpperCase() + bName.slice(1)
    socket.name = pickRand(playerFName) + bName

    socket.color = pickRandColor(playerColors)
    SOCKET_LIST[socket.id] = socket;

    socket.emit('myInfo', {id: socket.id, name: socket.name, color: socket.color})

    console.log(socket.name + ' connected!');

    socket.emit('newMap', map)

    socket.on('buildHouse',function(data){
        map.crosses[data].type = 1
        map.crosses[data].color = socket.color
        sendMapToAll()
        console.log(socket.name + ' build house on cross ' + data)
    })

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        console.log('socket disconnected');
    });
});

function sendMapToAll() {
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit('newMap', map)
    }
}

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

        if (upLeft) crossArray.push({x: currentHexX - 0.5, y: currentHex.y - 1, color: 'GREEN', type: 0, color: 'Grey'})
        if (upRight) crossArray.push({x: currentHexX + 0.5, y: currentHex.y - 1, color: 'GREEN', type: 0, color: 'Grey'})
        if (right) crossArray.push({x: currentHexX + 1, y: currentHex.y, color: 'GREEN', type: 0, color: 'Grey'})
        if (downRight) crossArray.push({x: currentHexX + 0.5, y: currentHex.y + 1, color: 'GREEN', type: 0, color: 'Grey'})
        if (downLeft) crossArray.push({x: currentHexX - 0.5, y: currentHex.y + 1, color: 'GREEN', type: 0, color: 'Grey'})
        if (left) crossArray.push({x: currentHexX - 1, y: currentHex.y, color: 'GREEN', type: 0, color: 'Grey'})

    }
    return crossArray
}

