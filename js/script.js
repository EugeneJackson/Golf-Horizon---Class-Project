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
    radioVisualAgujeroNegro;

    constructor(constGravitacionalUniversal, masaAgujeroNegro, cVelocity, massivePosX, massivePosY, radioVisualAgujeroNegro) {
        this.constGravitacionalUniversal = constGravitacionalUniversal;
        this.masaAgujeroNegro = masaAgujeroNegro;
        this.cVelocity = cVelocity;
        this.massivePosX = massivePosX;
        this.massivePosY = massivePosY;
        this.radioHorizonte = (2 * this.constGravitacionalUniversal * this.masaAgujeroNegro) / Math.pow(this.cVelocity, 2);
        this.radioVisualAgujeroNegro = radioVisualAgujeroNegro;
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


const massiveObj = new AgujeroNegro(10000, 5000, 50, x_massive, y_massive, 100);
const ball = new Bola(c.width / 5, c.height / 1.3, 0, 0, 10);

var tiempoAnterior = 0;


function gameLoop(tiempoActual) {

    var dt = (tiempoActual - tiempoAnterior) / 1000;
    tiempoAnterior = tiempoActual;

    ctx.clearRect(0, 0, c.width, c.height);
    actualizarFisica(dt);
    dibujarAgujeroNegro();
    dibujarBola();
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
    ctx.arc(massiveObj.massivePosX, massiveObj.massivePosY, massiveObj.radioVisualAgujeroNegro, 0, 2 * Math.PI);
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

function actualizarFisica(dt) {

    //Diferencia de posición en X e Y entre la bola y el agujero negro.
    var dx = massiveObj.massivePosX - ball.bola_x;
    var dy = massiveObj.massivePosY - ball.bola_y;

    //Distancia real entre la bola y el agujero negro (Usando pitágoras).
    var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    //Magnitud de la fuerza gravitacional - crece mucho al acercarse.
    var massiveForce = (massiveObj.constGravitacionalUniversal * massiveObj.masaAgujeroNegro) / (d * d);

    //Aceleración final que se suma a la velocidad de la bola por cada frame.
    var ax = (dx / d) * massiveForce;
    var ay = (dy / d) * massiveForce;

    //===================================================================================================
    
    //bola_vx/vy = Veloicdad actual de la bola en X e Y - se acumula cada frame
    ball.bola_vx += ax * dt;
    ball.bola_vy += ay * dt;

    //Se actualiza la posición de la bola en X e Y con la velocidad actual acumulada en cada frame.
    ball.bola_x += ball.bola_vx * dt;
    ball.bola_y += ball.bola_vy * dt;

}

requestAnimationFrame(gameLoop);