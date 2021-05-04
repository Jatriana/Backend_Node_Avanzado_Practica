'use strict'

const jimp = require('jimp')

const cambiarTamanoFoto = async (rutaOrigenImagen, rutaDestinoCambioTamano) => {
    const imagen = await jimp.read(rutaOrigenImagen);
    await imagen.resize(75, jimp.AUTO);
    await imagen.writeAsync(rutaDestinoCambioTamano);
  };
  
  module.exports = cambiarTamanoFoto;