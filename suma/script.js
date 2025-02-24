// Configuración inicial del juego
let nivelDificultad = 1; // Comienza con sumas de un dígito
let tiempoInicio;
let respuestasCorrectasConsecutivas = 0;
let respuestasIncorrectasConsecutivas = 0;

// Función para generar una suma basada en la dificultad
function generarSuma() {
    let num1 = Math.floor(Math.random() * (10 ** nivelDificultad));
    let num2 = Math.floor(Math.random() * (10 ** nivelDificultad));
    
    tiempoInicio = Date.now(); // Guardamos el tiempo en que se genera la pregunta
    
    document.getElementById("pregunta").textContent = `${num1} + ${num2} = ?`;
    return num1 + num2;
}

let respuestaCorrecta = generarSuma();

// Función para evaluar la respuesta del jugador
function evaluarRespuesta(respuesta) {
    let tiempoRespuesta = (Date.now() - tiempoInicio) / 1000; // Tiempo en segundos
    let resultadoElemento = document.getElementById("resultado");
    let inputRespuesta = document.getElementById("respuesta");
    
    if (parseInt(respuesta) === respuestaCorrecta) {
        resultadoElemento.textContent = "¡Correcto!";
        resultadoElemento.style.color = "green";
        respuestasCorrectasConsecutivas++;
        respuestasIncorrectasConsecutivas = 0;
        // Aumentar la dificultad después de 5 respuestas correctas consecutivas
        if (respuestasCorrectasConsecutivas >= 6) {
            nivelDificultad = Math.min(nivelDificultad + 0.5, 3);
            respuestasCorrectasConsecutivas = 0;
        }
    } else {
        resultadoElemento.textContent = "Incorrecto. Intenta de nuevo.";
        resultadoElemento.style.color = "red";
        respuestasIncorrectasConsecutivas++;
        respuestasCorrectasConsecutivas = 0;
        // Disminuir la dificultad después de 2 errores consecutivos
        if (respuestasIncorrectasConsecutivas >= 2) {
            nivelDificultad = Math.max(nivelDificultad - 1, 1);
            respuestasIncorrectasConsecutivas = 0;
        }
    }
    
    inputRespuesta.value = ""; // Borrar la respuesta ingresada
    respuestaCorrecta = generarSuma();
}

document.getElementById("btnVerificar").addEventListener("click", function() {
    let respuestaUsuario = document.getElementById("respuesta").value;
    evaluarRespuesta(respuestaUsuario);
});
