var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = []

function matrixGen(matY, matX, materia, star, meteorite, hole) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < materia; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < star; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < meteorite; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < hole; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
    var sunX = 25
    var sunY = 25
    matrix[sunY][sunX] = 7;
    matrix[sunY - 1][sunX - 1] = 7;
    matrix[sunY][sunX - 1] = 7;
    matrix[sunY + 1][sunX - 1] = 7;
    matrix[sunY - 1][sunX] = 7;
    matrix[sunY + 1][sunX] = 7;
    matrix[sunY - 1][sunX + 1] = 7;
    matrix[sunY][sunX + 1] = 7;
    matrix[sunY + 1][sunX + 1] = 7;
}

matrixGen(50, 50, 1000, 100, 30, 10);

io.sockets.emit('send matrix', matrix)


materiaArr = [];
starArr = [];
meteoriteArr = []
holeArr = [];
sun = 0

Materia = require("./materia")
Star = require("./star")
Meteorite = require("./meteorite")
Hole = require("./hole")
Sun = require("./sun") 

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var mt = new Materia(x, y);
                materiaArr.push(mt);
            } 
            else if (matrix[y][x] == 2) {
                var st = new Star(x, y);
                starArr.push(st);
            } 
            else if(matrix[y][x] == 3){
                var met = new Meteorite(x,y);
                meteoriteArr.push(met);
            } 
            else if(matrix[y][x] == 4){
                var hole = new Hole(x,y);
                holeArr.push(hole);
            }     
        }
    }
    sun = new Sun(25,25);
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (let i = 0; i < materiaArr.length; i++) {
        materiaArr[i].mul();
    }
    for (let i = 0; i < starArr.length; i++) {
        starArr[i].mul();
        starArr[i].eat();
    }
    for (let i = 0; i < meteoriteArr.length; i++) {
        meteoriteArr[i].mul();
        meteoriteArr[i].eat();
    }
    for (let i = 0; i < holeArr.length; i++) {
        holeArr[i].disapear();
    }
    io.sockets.emit('send matrix', matrix) 
}

function sunActivate(){
    sun.sunActivate()
}

function sunBurn(){
    sun.sunBurn()
}

setInterval(game, 100)

io.on('connection', function (socket) {
    createObject(matrix)
    socket.on("sunActivate", sunActivate)
    socket.on("sunBurn", sunBurn)
})

var statistics = {};

setInterval(function() {
    statistics.materia = materiaArr.length;
    statistics.star = starArr.length;
    statistics.meteorite = meteoriteArr.length;
    statistics.hole = holeArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)