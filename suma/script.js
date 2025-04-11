(function() {
    // Configuración inicial del juego (variables ahora son privadas)
    let nivelDificultad = 1;
    let tiempoInicio;
    let respuestasCorrectasConsecutivas = 0;
    let respuestasIncorrectasConsecutivas = 0;
    let estrellas = 0;
    let respuestaCorrecta;

    function lanzarConfeti() {
        var duration = 0.5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
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

    function generarSuma() {
        let num1 = Math.floor(Math.random() * (10 ** nivelDificultad));
        let num2 = Math.floor(Math.random() * (10 ** nivelDificultad));
        
        tiempoInicio = Date.now();
        
        document.getElementById("pregunta").textContent = `${num1} + ${num2} = ?`;
        return num1 + num2;
    }

    function evaluarRespuesta(respuesta) {
        let tiempoRespuesta = (Date.now() - tiempoInicio) / 1000;
        let resultadoElemento = document.getElementById("resultado");
        let inputRespuesta = document.getElementById("respuesta");
        const personaje = document.getElementById("personaje");
        
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
        
        inputRespuesta.value = "";
        respuestaCorrecta = generarSuma();
    }

    // Inicialización del juego
    respuestaCorrecta = generarSuma();

    // Configurar evento (también dentro del ámbito privado)
    document.getElementById("btnVerificar").addEventListener("click", function() {
        let respuestaUsuario = document.getElementById("respuesta").value;
        evaluarRespuesta(respuestaUsuario);
    });
})();