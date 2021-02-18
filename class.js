
class Creature{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    chooseCell(ch) {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
class Materia extends Creature {
    constructor(x,y) {
    super(x,y)
        this.multiply = 0;
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
class Star extends Creature {
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
class Meteorite extends Creature{
    constructor(x, y) {
        console.log(this.y);
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
class Hole extends Creature{
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
                matrix[yMat][xMat] = 0
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

