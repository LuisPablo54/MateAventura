(function() {
// Configuración inicial del juego
let nivelDificultad = 1; // Comienza con multiplicaciones de un dígito
let tiempoInicio;
let respuestasCorrectasConsecutivas = 0;
let respuestasIncorrectasConsecutivas = 0;
let estrellas = 0;

function lanzarConfeti() {
    var duration = 0.5 * 1000; // Duración de 0.5 segundos
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5, // Cantidad de partículas
            angle: 60,
            spread: 20,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 20,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Función para generar una multiplicación basada en la dificultad a
function generarMultiplicacion() {
    let num1 = Math.floor(Math.random() * (10 ** nivelDificultad));
    let num2 = Math.floor(Math.random() * (10 ** nivelDificultad));
    
    tiempoInicio = Date.now(); // Guardamos el tiempo en que se genera la pregunta
    
    document.getElementById("pregunta").textContent = `${num1} × ${num2} = ?`;
    return num1 * num2;
}

let respuestaCorrecta = generarMultiplicacion();

function evaluarRespuesta(respuesta) {
    let tiempoRespuesta = (Date.now() - tiempoInicio) / 1000; // Tiempo en segundos
    let resultadoElemento = document.getElementById("resultado");
    let inputRespuesta = document.getElementById("respuesta");
    
    if (parseInt(respuesta) === respuestaCorrecta) {
        resultadoElemento.textContent = "¡Correcto! 🎉";
        resultadoElemento.style.color = "green";
        respuestasCorrectasConsecutivas++;
        respuestasIncorrectasConsecutivas = 0;

        document.getElementById("pregunta").classList.add("rebote");
        setTimeout(() => document.getElementById("pregunta").classList.remove("rebote"), 500);

        personaje.textContent = "😃";
        lanzarConfeti();

        if (respuestasCorrectasConsecutivas % 3 === 0) {
            estrellas++;
            document.getElementById("estrellas").textContent = `⭐ ${estrellas}`;
        }

        if (respuestasCorrectasConsecutivas >= 6) {
            nivelDificultad = Math.min(nivelDificultad + 0.5, 3);
            respuestasCorrectasConsecutivas = 0;
        }
    } else {
        resultadoElemento.textContent = "Incorrecto. 😢 Intenta de nuevo.";
        resultadoElemento.style.color = "red";
        respuestasIncorrectasConsecutivas++;
        respuestasCorrectasConsecutivas = 0;
        personaje.textContent = "😢";

        if (respuestasIncorrectasConsecutivas >= 2) {
            nivelDificultad = Math.max(nivelDificultad - 1, 1);
            respuestasIncorrectasConsecutivas = 0;
        }
    }
    
    inputRespuesta.value = ""; // Borrar la respuesta ingresada
    respuestaCorrecta = generarMultiplicacion();
}

document.getElementById("btnVerificar").addEventListener("click", function() {
    let respuestaUsuario = document.getElementById("respuesta").value;
    evaluarRespuesta(respuestaUsuario);
});
})();