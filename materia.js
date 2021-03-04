let Creature = require("./creature")
module.exports = class Materia extends Creature {
    constructor(x,y) {
    super(x,y)
        this.multiply = 0;
        this.directions = [
            [this.x, this.y],
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

    mul() {
        this.multiply++
        let emptyCell = this.chooseCell(0)
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.multiply >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            let newMateria = new Materia(newX, newY)
            materiaArr.push(newMateria);
            this.multiply = 0;
        }
    }
}