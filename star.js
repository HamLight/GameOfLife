let Creature = require("./creature")
module.exports = class Star extends Creature {
    constructor(x, y) {
        super(x,y);
        this.directions = [];
        this.energy = 8;
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

    move() {
        this.energy--;
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 0) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            this.x = newX 
            this.y = newY 
            matrix[this.y][this.x] = 0;
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 15 && starArr.length<150 ) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            let newStar = new Star(newX, newY)
            starArr.push(newStar);
            this.energy -= 4;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0]; 
            let newY = newCell[1]; 
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < materiaArr.length; i++) {
                if (materiaArr[i].x == this.x && materiaArr[i].y == this.y) {
                    materiaArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < starArr.length; i++) {
            if (starArr[i].x == this.x && starArr[i].y == this.y) {
                starArr.splice(i, 1);
            }
        }
    }
}