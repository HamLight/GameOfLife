let Creature = require("./creature")
module.exports = class Meteorite extends Creature{
    constructor(x, y) {
        super(x,y)
        this.directions = [];
        this.energy = 12;
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
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0) 

        let arr = emptyCell0.concat(emptyCell1)

        let newCell = arr[Math.floor(Math.random() * arr.length)];
        if (newCell && this.energy >= 0) {
            if (newCell == 0) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (newCell == 1) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCell0= this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell = emptyCell0.concat(emptyCell1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 20 && meteoriteArr.length<30) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            let newMeteorite = new Meteorite(newX, newY)
            meteoriteArr.push(newMeteorite);
            this.energy -= 4;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(2)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy += 2
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < starArr.length; i++) {
                if (starArr[i].x == this.x && starArr[i].y == this.y) {
                    starArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < meteoriteArr.length; i++) {
            if (meteoriteArr[i].x == this.x && meteoriteArr[i].y == this.y) {
                meteoriteArr.splice(i, 1);
            }
        }
    }
}
