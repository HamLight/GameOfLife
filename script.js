let matrix = []
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
}
matrixGen(50, 50, 1000, 400, 30, 10);

var materiaArr = [];
var starArr = [];
var meteoriteArr = []
var holeArr = [];
var side = 10;


function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('pink');
    noStroke()
    frameRate(10)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var mt = new Materia(x, y);
                materiaArr.push(mt);
            } else if (matrix[y][x] == 2) {
                var st = new Star(x, y);
                starArr.push(st);
            } else if(matrix[y][x] == 3){
                var met = new Meteorite(x,y);
                meteoriteArr.push(met);
            } else if(matrix[y][x] == 4){
                var hole = new Hole(x,y);
                holeArr.push(hole);
            } 
        }
    }
}


function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 0) {
                fill("DarkBlue");
            }
            else if (matrix[y][x] == 1) {
                fill("MediumSlateBlue");
            }
            else if (matrix[y][x] == 2) {
                fill("Gold");
            }
            else if (matrix[y][x] == 3) {
                fill("FireBrick");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("white");
            }
            else if (matrix[y][x] == 6) {
                fill("Moccasin");
            }
            rect(x * side, y * side, side, side);
 
        }
    }

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
}

