let Creature = require("./creature")
module.exports = class Sun extends Creature{
    constructor(x, y) {
        super(x,y)
        this.energy = 0
    }
        getNewCoordinates() {
            this.directions = [
                [this.x, this.y + 2],
                [this.x + 1, this.y + 2],
                [this.x + 2, this.y + 1],
                [this.x + 2, this.y],
                [this.x + 2, this.y - 1],
                [this.x + 2, this.y - 2],
                [this.x + 1, this.y - 2],
                [this.x, this.y - 2]
                [this.x - 1, this.y - 2]
                [this.x - 2, this.y - 2]
                [this.x - 2, this.y - 1]
                [this.x - 2, this.y]
                [this.x - 2, this.y + 1]
                [this.x - 2, this.y + 2]
                [this.x - 1, this.y + 2]
            ];
        }   
        chooseCell(ch) {
            this.getNewCoordinates()
            return super.chooseCell(ch)
        }
    eat(){
            for (let i in this.directions) {
                let xMat = this.directions[i][0]
                let yMat = this.directions[i][1]

            if (xMat >= 0 && xMat < matrix[0].length && yMat >= 0 && yMat < matrix.length) {
                if(matrix[yMat][xMat]==1){
                    materiaArr.splice(i, 1);
                    this.energy +=1
                }
                else if(matrix[yMat][xMat]==2){
                    starArr.splice(i, 1)
                    this.energy += 2
                }
                else if(matrix[yMat][xMat]==3){
                    meteoriteArr.splice(i, 1)
                    this.energy += 3
                }
                matrix[yMat][xMat] = 0;
            }
        }   
    }
    sunActivate(){
        this.energy = 0
        for (let i = 0; i < 20; i++) {
            var y = Math.floor(Math.random() * 50)
            var x = Math.floor(Math.random() * 50)
            if (matrix[y][x] != 4 && matrix[y][x] != 5 && matrix[y][x] != 7 && matrix[y][x] != 8) {
                matrix[y][x] = 8;
                while(this.energy < 20){
                    this.eat()
                    if(matrix[y][x]==1){
                        materiaArr.splice(i, 1);
                    }
                    else if(matrix[y][x]==2){
                        starArr.splice(i, 1)
                    }
                    else if(matrix[y][x]==3){
                        meteoriteArr.splice(i, 1)
                    }
                    matrix[y][x] = 0
                }
            }
        }
    }
}