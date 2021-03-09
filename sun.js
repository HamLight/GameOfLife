var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let Creature = require("./creature")
module.exports = class Sun extends Creature{
    constructor(x, y) {
        super(x,y)
        this.energy = 0
        this.directions = [
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2]
        ]
    }

    sunActivate(){
        this.energy = 0;
        for (let i = 0; i < 20; i++) {
            this.energy = 0
            let newObjX = Math.floor(Math.random() * matrix[0].length)
            let newObjY = Math.floor(Math.random() * matrix.length)
            if (matrix[newObjY][newObjX] != 4 && matrix[newObjY][newObjX] != 5 && matrix[newObjY][newObjX] != 7 && matrix[newObjY][newObjX] != 8) {
                if(matrix[newObjY][newObjX] == 1){
                    materiaArr.splice(i, 1);
                }
                else if(matrix[newObjY][newObjX] == 2){
                    starArr.splice(i, 1)
                }
                else if(matrix[newObjY][newObjX] == 3){
                    meteoriteArr.splice(i, 1)
                }
                matrix[newObjY][newObjX] = 8;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

    sunBurn(){
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if(matrix[y][x] == 8){
                    matrix[y][x] = 0 
                }
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
}