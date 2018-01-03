var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano() {
  var valorActualGrilla = 0;
  var ultimoValorVisto = 0;

  for(var i=0; i < grilla.length; i++){
    for(var j=0; j < grilla[i].length; j++){
      valorActualGrilla = grilla[i][j];
      if (valorActualGrilla < ultimoValorVisto) {
        return false;
      }
      ultimoValorVisto = valorActualGrilla;
    }
  }
  //reproduce sonido si la grilla esta ordenada.
  var pika = document.getElementById('pika');
  pika.play();
  return true;
}

//muestra un cartel ganador.
function mostrarCartelGanador(){
  alert("GANASTE （＾∀＾）メ（＾∀＾）ノ");
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2){
  var pieza1 = grilla[filaPos1][columnaPos1];
  var pieza2 = grilla[filaPos2][columnaPos2];

  grilla[filaPos1][columnaPos1] = pieza2;
  grilla[filaPos2][columnaPos2] = pieza1;

  var elementoPieza1 = document.getElementById('pieza' + pieza1);
  var elementoPieza2 = document.getElementById('pieza' + pieza2);

  var padre = elementoPieza1.parentNode;

   var clonElemento1 = elementoPieza1.cloneNode(true);
   var clonElemento2 = elementoPieza2.cloneNode(true);

   padre.replaceChild(clonElemento1, elementoPieza2);
   padre.replaceChild(clonElemento2, elementoPieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);
}

function moverEnDireccion(direccion){
  var nuevaFilaPiezaBlanca;
  var nuevaColumnaPiezaBlanca;

  if (direccion == 40){
    nuevaFilaPiezaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }

  else if (direccion == 38) {
    nuevaFilaPiezaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }

  else if (direccion == 39) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna-1;
  }

  else if (direccion == 37) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna+1;
  }

 if (posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    actualizarposicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
  }
}

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();
        },500);
      }
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

iniciar();
