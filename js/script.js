//Dibujo base del canvas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//El canvas ocupa el tamaño completo de la ventana.
c.width = window.innerWidth;
c.height = window.innerHeight;

//Dibujo base del agujero negro.
ctx.fillStyle = 'black';
ctx.beginPath();

/*
* ctx.arc dibuja el circulo con varios parametros:
* 2 primeros parametros: X e Y dentro del canvas para posicionarlo.
* 3 parametro: radio del circulo.
* 4 y 5 parametro: ángulo de inicio y fin.
*/
ctx.arc(c.width / 2, c.height / 2, 150, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();


