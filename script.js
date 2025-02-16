function iniciarJuego(tipoJuego) {
    if (tipoJuego === 'suma') {
        window.location.href = './suma/suma.html';
    } 
    else if (tipoJuego === 'resta') {
        window.location.href = './resta/resta.html';
    } 
    else if (tipoJuego === 'multiplicacion') {
        window.location.href = './multiplicacion/multiplicacion.html';
    } 
    else if (tipoJuego === 'division') {
        window.location.href = './division/division.html';
    }
    else if (tipoJuego === 'fracciones') {
        window.location.href = './fracciones/fracciones.html';
    }
    else {
        alert('En desarrollo: ' + tipoJuego);
    }


}
