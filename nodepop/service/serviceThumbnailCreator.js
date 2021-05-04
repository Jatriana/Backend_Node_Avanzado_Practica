'use stric';

const cote = require('cote');
const cambiarTamanoFoto = require('./cambiarTamanoFoto');

// Declaracion de Microservice
const responder = new cote.Responder({name: 'creador de Thumbnail'});

// Logicas
responder.on('cambiarTamanoFoto', (message, done) => {
  console.log(
    `Service: ${message.rutaOrigenImagen} ${message.rutaDestinoCambioTamano} ${Date.now()}`
  );

  // convertidor de imagen
  cambiarTamanoFoto(message.rutaOrigenImagen, message.rutaDestinoCambioTamano);

  done();
});