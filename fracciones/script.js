// Configuración inicial del juego
let nivelDificultad = 1; // Controla el rango de los números generados
let respuestasCorrectasConsecutivas = 0;
let respuestasIncorrectasConsecutivas = 0;
let estrellas = 0;

// Función para calcular el MCD (Máximo Común Divisor)
function mcd(a, b) {
    return b === 0 ? a : mcd(b, a % b);
}

// Función para simplificar fracciones
function simplificarFraccion(numerador, denominador) {
    let divisor = mcd(numerador, denominador);
    return [numerador / divisor, denominador / divisor];
}

// Función para generar fracciones aleatorias
function generarFraccion() {
    let numerador = Math.floor(Math.random() * (10 * nivelDificultad)) + 1;
    let denominador = Math.floor(Math.random() * (10 * nivelDificultad)) + 1;
    return [numerador, denominador];
}

// Función para generar una pregunta con fracciones
function generarPregunta() {
    let [num1, den1] = generarFraccion();
    let [num2, den2] = generarFraccion();
    let operador = Math.random() < 0.5 ? '+' : '-';
    
    // Calcular el resultado correcto
    let numResultado, denResultado;
    if (operador === '+') {
        numResultado = num1 * den2 + num2 * den1;
        let preguntaElemento = document.getElementById("Pregunta");
        preguntaElemento.textContent = "Suma:";
    } else {
        numResultado = num1 * den2 - num2 * den1;
        let preguntaElemento = document.getElementById("Pregunta");
        preguntaElemento.textContent = "Resta:";
    }
    denResultado = den1 * den2;
    
    // Simplificar resultado
    [numResultado, denResultado] = simplificarFraccion(numResultado, denResultado);
    
    // Mostrar pregunta
    document.getElementById("pregunta").textContent = `${num1}/${den1} ${operador} ${num2}/${den2} = ?`;
    return [numResultado, denResultado];
}

let respuestaCorrecta = generarPregunta();

// Función para evaluar la respuesta del usuario
function evaluarRespuesta(respuesta) {
    let [numUsuario, denUsuario] = respuesta.split("/").map(Number);
    let [numCorrecto, denCorrecto] = respuestaCorrecta;
    let resultadoElemento = document.getElementById("resultado");
    
    let inputRespuesta = document.getElementById("respuesta");
    
    if (numUsuario === numCorrecto && denUsuario === denCorrecto) {
        resultadoElemento.textContent = "¡Correcto! 🎉";
        resultadoElemento.style.color = "green";
        respuestasCorrectasConsecutivas++;
        respuestasIncorrectasConsecutivas = 0;

        // Efecto de animación en la pregunta
        document.getElementById("pregunta").classList.add("rebote");
        setTimeout(() => document.getElementById("pregunta").classList.remove("rebote"), 500);

        // Cambiar el personaje a feliz 😃
        personaje.textContent = "😃";

        // Lanzar confeti
        lanzarConfeti();
    
        // Ganar una estrella cada 3 aciertos
        if (respuestasCorrectasConsecutivas % 3 === 0) {
            estrellas++;
            document.getElementById("estrellas").textContent = `⭐ ${estrellas}`;
        }

        // Aumentar dificultad
        if (respuestasCorrectasConsecutivas >= 6) {
            nivelDificultad = Math.min(nivelDificultad + 1, 3); 
            respuestasCorrectasConsecutivas = 0;
        }
    } else {
        resultadoElemento.textContent = "Incorrecto. 😢 Intenta de nuevo.";
        resultadoElemento.style.color = "red";
        respuestasIncorrectasConsecutivas++;
        respuestasCorrectasConsecutivas = 0;
        
        // Disminuir dificultad si hay muchos errores
        if (respuestasIncorrectasConsecutivas >= 2) {
            nivelDificultad = Math.max(nivelDificultad - 1, 1);
            respuestasIncorrectasConsecutivas = 0;
        }
    }
    
    inputRespuesta.value = ""; // Borrar la respuesta ingresada
    respuestaCorrecta = generarPregunta();
}

document.getElementById("btnVerificar").addEventListener("click", function() {
    let respuestaUsuario = document.getElementById("respuesta").value;
    evaluarRespuesta(respuestaUsuario);
});

// Función para lanzar confeti
function lanzarConfeti() {
    var duration = 0.5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 20, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 20, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
