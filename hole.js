let Creature = require("./creature")
module.exports = class Hole extends Creature{
        constructor(x, y) {
            super(x,y)
            this.energy = 0;
            this.type = "black"
        
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ]
        }

        disapear() {
            let xMat
            let yMat
            if(this.energy >= 30 && this.type == "black"){
                this.type = "white"
            }      
            else if(this.energy <= 0 && this.type=="white"){
                this.type = "black"
            }
            if(this.type == "black"){
                
                for (let i in this.directions) {
                    xMat = this.directions[i][0]
                    yMat = this.directions[i][1]

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
                    if(matrix[yMat][xMat] != 7){
                        matrix[yMat][xMat] = 0
                    }
                    matrix[this.y][this.x] = 4
                }
            }       
        }
        if(this.type == "white"){
            matrix[this.y][this.x] = 5
            let newObjX = Math.floor(Math.random() * matrix[0].length)
            let newObjY = Math.floor(Math.random() * matrix.length)
            let newType = Math.floor(Math.random() * (4 - 1)) + 1
            if(matrix[newObjY][newObjX] == 0){
                matrix[newObjY][newObjX] = 6
                setTimeout(function(){matrix[newObjY][newObjX] = newType},1000)
                if(newType == 1){
                    this.energy-= 1
                    materiaArr.push(new Materia(newObjX, newObjY))
                }
                else if(newType == 2){
                    this.energy-= 2
                    starArr.push(new Star(newObjX, newObjY))
                }
                else if(newType == 3){
                    this.energy-= 3
                    meteoriteArr.push(new Meteorite(newObjX, newObjY))
                }
            }
        }
    }   
}