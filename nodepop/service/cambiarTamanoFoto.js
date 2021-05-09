'use strict';

const jimp = require('jimp');

const cambiarTamanoFoto = async (rutaOrigenImagen, rutaDestinoCambioTamano) => {
  try {
    const imagen = await jimp.read(rutaOrigenImagen);

    await imagen.resize(75, jimp.AUTO);
    await imagen.writeAsync(rutaDestinoCambioTamano);
  } catch (error) {
    console.log('falla cambiar tamaño de foto', error);
  }
};

module.exports = cambiarTamanoFoto;
