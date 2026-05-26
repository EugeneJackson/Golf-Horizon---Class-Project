class Bola {
    bola_x;
    bola_y;
    bola_vx;
    bola_vy;
    bola_radio;

    constructor(bola_x, bola_y, bola_vx, bola_vy, bola_radio) {
        this.bola_x = bola_x;
        this.bola_y = bola_y;
        this.bola_vx = bola_vx;
        this.bola_vy = bola_vy;
        this.bola_radio = bola_radio;
    }

}

class AgujeroNegro {
    constGravitacionalUniversal;
    masaAgujeroNegro;
    cVelocity;
    massivePosY;
    massivePosX;

    constructor(constGravitacionalUniversal, masaAgujeroNegro, cVelocity, massivePosX, massivePosY) {
        this.constGravitacionalUniversal = constGravitacionalUniversal;
        this.masaAgujeroNegro = masaAgujeroNegro;
        this.cVelocity = cVelocity;
        this.massivePosX = massivePosX;
        this.massivePosY = massivePosY;
        this.radioHorizonte = (2 * this.constGravitacionalUniversal * this.masaAgujeroNegro) / Math.pow(this.cVelocity, 2);
    }

        
}



//Dibujo base del canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//El canvas ocupa el tamaño completo de la ventana.
c.width = window.innerWidth;
c.height = window.innerHeight;

var x_massive = c.width / 2;
var y_massive = c.height / 2;


const massiveObj = new AgujeroNegro(100, 100, 50, x_massive, y_massive);
const ball = new Bola(c.width / 5, c.height / 5, 0, 0, 15);

function gameLoop() {

    ctx.clearRect(0, 0, c.width, c.height);
    dibujarAgujeroNegro();
    dibujarBola
    requestAnimationFrame(gameLoop);

}


function dibujarAgujeroNegro() {

    //Dibujo base del agujero negro.
    ctx.fillStyle = 'black';
    ctx.beginPath();

    /*
    * ctx.arc dibuja el circulo con varios parametros:
    * 2 primeros parametros: X e Y dentro del canvas para posicionarlo.
    * 3 parametro: radio del circulo.
    * 4 y 5 parametro: ángulo de inicio y fin.
    */
    ctx.arc(massiveObj.massivePosX, massiveObj.massivePosY, massiveObj.radioHorizonte, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function dibujarBola() {
    ctx.fillStyle = '#7EBDC2';
    ctx.beginPath();

    ctx.arc(ball.bola_x, ball.bola_y, ball.bola_radio, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

}
