var side = 10;
let socket = io()

function setup() {
    createCanvas(50 * side, 50 * side);
    background('#acacac'); 
    noStroke();
}

function nkarel(matrix) {
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
            else if (matrix[y][x] == 7) {
                fill("Orange");
            }
            else if (matrix[y][x] == 8) {
                fill("DarkOrange");
            }
            rect(x * side, y * side, side, side);
 
        }
    }
}
function sunActivate(){
    socket.emit("sunActivate")
}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },100
)

