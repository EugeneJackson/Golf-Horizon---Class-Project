/////////////////////////////////
//CLASES
/////////////////////////////////


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

/////////////////////////////////
//MAIN
/////////////////////////////////


//Dibujo base del canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
//El canvas ocupa el tamaño completo de la ventana.
c.width = window.innerWidth;
c.height = window.innerHeight;

var x_massive = c.width / 2;
var y_massive = c.height / 2;

var massiveObjArr = [];
var ballsArr = [];

var bolaSeleccionada = null;

massiveObjArr.push(new AgujeroNegro(100, 500000, 50, x_massive, y_massive, 110));
ballsArr.push(new Bola(c.width / 4, c.height / 1.3, 0, 0, 10));

var tiempoAnterior = 0;
var juegoActivo = true;
var bolaLanzada = false;

var mouseDownX = 0;
var mouseDownY = 0;
var isClicked = false;
var factorLanzamiento = 4;
var mouseCurrentX = 0;
var mouseCurrentY = 0;

c.addEventListener('mousedown', manageMouseDown);
c.addEventListener('mouseup', manageMouseUp);
c.addEventListener('mousemove', manageMouseMove);

/////////////////////////////////
//gameLoop principal, funcion recursiva
/////////////////////////////////


function gameLoop(tiempoActual) {

    if(!juegoActivo) return;
    var dt = (tiempoActual - tiempoAnterior) / 1000;
    tiempoAnterior = tiempoActual;

    ctx.clearRect(0, 0, c.width, c.height);
    actualizarFisica(dt);
    dibujarAgujeroNegro();
    dibujarBola();
    dibujarLineaDireccionLanzamiento();
    dibujarPuntosPredictivos();
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1;
    requestAnimationFrame(gameLoop);
}

/////////////////////////////////
//FUNCIONES DE DIBUJO
/////////////////////////////////


function dibujarAgujeroNegro() {

    for (var i = 0; i < massiveObjArr.length; i++) {
        //Dibujo base del agujero negro.
        ctx.fillStyle = 'black';
        ctx.beginPath();

        /*
        * ctx.arc dibuja el circulo con varios parametros:
        * 2 primeros parametros: X e Y dentro del canvas para posicionarlo.
        * 3 parametro: radio del circulo.
        * 4 y 5 parametro: ángulo de inicio y fin.
        */
        ctx.arc(massiveObjArr[i].massivePosX, massiveObjArr[i].massivePosY, massiveObjArr[i].radioVisualAgujeroNegro, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

function dibujarBola() {

    for (var i = 0; i < ballsArr.length; i++) {
        ctx.fillStyle = '#7EBDC2';
        ctx.beginPath();

        ctx.arc(ballsArr[i].bola_x, ballsArr[i].bola_y, ballsArr[i].bola_radio, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

}

function dibujarLineaDireccionLanzamiento() {

    //Primero se comprueba si el booleano isClicked es verdadero o falso, si no lo es, no hace nada.

    if (!isClicked) return;


    //Empieza en X e Y de donde haya clickado el usuario y se mueve por el valor de mouseCurrentX e Y, que se actualiza todo el rato.

    ctx.beginPath();
    ctx.moveTo(bolaSeleccionada.bola_x, bolaSeleccionada.bola_y);
    ctx.lineTo(mouseCurrentX, mouseCurrentY);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
}

/////////////////////////////////
//FUNCION DE DIBUJO + FISICA
/////////////////////////////////

function dibujarPuntosPredictivos() {

    if(!isClicked) return;

    var radioBolasPredictivas = 3;

    var simVx = (mouseDownX - mouseCurrentX) * factorLanzamiento;
    var simVy = (mouseDownY - mouseCurrentY) * factorLanzamiento;
    var simX = bolaSeleccionada.bola_x;
    var simY = bolaSeleccionada.bola_y;

    for(var i = 0; i < 5; i++) {

        var simAx = 0;
        var simAy = 0;


        for (var j = 0; j < massiveObjArr.length; j++) {

            //Calcular la distancia entre las bolas predictivas y el agujero negro.
            dx = massiveObjArr[j].massivePosX - simX;
            dy = massiveObjArr[j].massivePosY - simY;

            //Diferencia real entre las bolas predictivas y el agujero negro. (Usando pitágoras);
            d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            //Magnitud de la fuerza gravitacional - crece mucho al acercarse.
            massiveForce = (massiveObjArr[j].constGravitacionalUniversal * massiveObjArr[j].masaAgujeroNegro) / (d * d);

            //Aceleración final que se suma a la velocidad de la bola por cada frame.
            simAx += (dx / d) * massiveForce;
            simAy += (dy / d) * massiveForce;

        }

        

        //Velocidad actual de la bola en X e Y - se acumula cada frame.
        simVx += simAx * 0.1;
        simVy += simAy * 0.1;

        simX += simVx * 0.1;
        simY += simVy * 0.1;

        if(radioBolasPredictivas <= 1) break;

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(simX, simY, radioBolasPredictivas, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        radioBolasPredictivas -= 0.5;

    }
}

/////////////////////////////////
//FUNCION FISICA PRINCIPAL
/////////////////////////////////

function actualizarFisica(dt) {

    if (bolaLanzada) {

        for (var i = 0; i < ballsArr.length; i++) {

            var ax = 0;
            var ay = 0;

            for (var j = 0; j < massiveObjArr.length; j++) {

                //Diferencia de posición en X e Y entre la bola y el agujero negro.
                var dx = massiveObjArr[j].massivePosX - ballsArr[i].bola_x;
                var dy = massiveObjArr[j].massivePosY - ballsArr[i].bola_y;

                //Distancia real entre la bola y el agujero negro (Usando pitágoras).
                var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

                //Magnitud de la fuerza gravitacional - crece mucho al acercarse.
                var massiveForce = (massiveObjArr[j].constGravitacionalUniversal * massiveObjArr[j].masaAgujeroNegro) / (d * d);

                //Aceleración final que se suma a la velocidad de la bola por cada frame.
                ax += (dx / d) * massiveForce;
                ay += (dy / d) * massiveForce;

                if (d < massiveObjArr[j].radioVisualAgujeroNegro) {
                    console.log("Juego terminado");
                    juegoActivo = false;
                }
            }

            //bola_vx/vy = Veloicdad actual de la bola en X e Y - se acumula cada frame
            ballsArr[i].bola_vx += ax * dt;
            ballsArr[i].bola_vy += ay * dt;

            var velocidadMaxima = 500;
            ballsArr[i].bola_vx = Math.max(-velocidadMaxima, Math.min(velocidadMaxima, ballsArr[i].bola_vx));
            ballsArr[i].bola_vy = Math.max(-velocidadMaxima, Math.min(velocidadMaxima, ballsArr[i].bola_vy));
            
            //Se actualiza la posición de la bola en X e Y con la velocidad actual acumulada en cada frame.
            ballsArr[i].bola_x += ballsArr[i].bola_vx * dt;
            ballsArr[i].bola_y += ballsArr[i].bola_vy * dt;
        }
    }
}

/////////////////////////////////
//MANEJO DE EVENTOS
/////////////////////////////////

function manageMouseDown(e) {

    mouseDownX = e.clientX;
    mouseDownY = e.clientY;

    for (var i = 0; i < ballsArr.length; i++) {

        dx = mouseDownX - ballsArr[i].bola_x;
        dy = mouseDownY - ballsArr[i].bola_y;

        d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (d < ballsArr[i].bola_radio * 4) {
            isClicked = true;
            bolaSeleccionada = ballsArr[i];

            bolaSeleccionada.bola_vx = 0;
            bolaSeleccionada.bola_vy = 0;

            bolaLanzada = false;
        }
    }

}

function manageMouseUp(e) {

    if (bolaLanzada) return;
    if (!isClicked) return;


    bolaSeleccionada.bola_vx = (mouseDownX - e.clientX) * factorLanzamiento;
    bolaSeleccionada.bola_vy = (mouseDownY - e.clientY) * factorLanzamiento;

    isClicked = false;
    bolaLanzada = true;

}

function manageMouseMove(e) {
    mouseCurrentX = e.clientX;
    mouseCurrentY = e.clientY;
}   

requestAnimationFrame(gameLoop);
