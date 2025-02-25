// Configuración inicial del juego
let nivelDificultad = 1;
let tiempoInicio;
let respuestasCorrectasConsecutivas = 0;
let respuestasIncorrectasConsecutivas = 0;
let estrellas = 0;
let puntaje = 0;

// Cargar sonidos
const sonidoCorrecto = new Audio("correcto.mp3"); // 🎵 Sonido de acierto
const sonidoIncorrecto = new Audio("incorrecto.mp3"); // 🎵 Sonido de error

// Función para generar una resta basada en la dificultad
function generarResta() {
    let num1 = Math.floor(Math.random() * (10 ** nivelDificultad));
    let num2 = Math.floor(Math.random() * (10 ** nivelDificultad));

    if (num1 < num2) {
        [num1, num2] = [num2, num1]; // Evitar negativos
    }

    tiempoInicio = Date.now();
    document.getElementById("pregunta").textContent = `${num1} - ${num2} = ?`;

    return num1 - num2;
}

let respuestaCorrecta = generarResta();

// Función para evaluar la respuesta
function evaluarRespuesta(respuesta) {
    let resultadoElemento = document.getElementById("resultado");
    let inputRespuesta = document.getElementById("respuesta");
    let personaje = document.getElementById("personaje");

    if (parseInt(respuesta) === respuestaCorrecta) {
        resultadoElemento.textContent = "¡Correcto! 🎉";
        resultadoElemento.style.color = "green";
        respuestasCorrectasConsecutivas++;
        respuestasIncorrectasConsecutivas = 0;
        sonidoCorrecto.play(); 

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

        // Aumentar dificultad cada 6 aciertos
        if (respuestasCorrectasConsecutivas >= 6) {
            nivelDificultad = Math.min(nivelDificultad + 0.5, 3);
            respuestasCorrectasConsecutivas = 0;
        }

    } else {
        resultadoElemento.textContent = "Incorrecto. 😢 Inténtalo de nuevo.";
        resultadoElemento.style.color = "red";
        respuestasIncorrectasConsecutivas++;
        respuestasCorrectasConsecutivas = 0;
        sonidoIncorrecto.play(); // 

        // Cambiar el personaje a triste 😢
        personaje.textContent = "😢";

        // Disminuir dificultad después de 2 errores
        if (respuestasIncorrectasConsecutivas >= 2) {
            nivelDificultad = Math.max(nivelDificultad - 1, 1);
            respuestasIncorrectasConsecutivas = 0;
        }
    }

    inputRespuesta.value = "";
    respuestaCorrecta = generarResta();
}

// Función para lanzar confeti
function lanzarConfeti() {
    var duration = 2 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Evento para verificar respuesta
document.getElementById("btnVerificar").addEventListener("click", function() {
    let respuestaUsuario = document.getElementById("respuesta").value;
    evaluarRespuesta(respuestaUsuario);
});
