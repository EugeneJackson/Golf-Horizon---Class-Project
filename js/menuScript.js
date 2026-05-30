//Dibujo base del canvas
var c = document.getElementById("menuCanvas");
var ctx = c.getContext("2d");
//El canvas ocupa el tamaño completo de la ventana.
c.width = window.innerWidth;
c.height = window.innerHeight;

var starsArr = [];

for(var i = 0; i < 500; i++) {
    var estrella = {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        radio: Math.random() * 1.5 + 0.5,
        vx: 0.2,
        vy: 0.1
    }

    starsArr.push(estrella);
}



function gameLoop() {

    ctx.clearRect(0, 0, c.width, c.height);
    dibujarEstrellas();
    requestAnimationFrame(gameLoop);
}

function dibujarEstrellas() {
    
    for(var i = 0; i < starsArr.length; i++) {
        ctx.fillStyle = "white";
        ctx.beginPath();

        ctx.arc(starsArr[i].x, starsArr[i].y, starsArr[i].radio, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        starsArr[i].x += estrella.vx;
        starsArr[i].y += estrella.vy;

        if(starsArr[i].x > c.width) {
            starsArr[i].x = 0;
        }

        if(starsArr[i].y > c.height) {
            starsArr[i].y = 0;
        }
    }

}

requestAnimationFrame(gameLoop)