'use strict'

const jimp = require('jimp')

const cambiarTamanoFoto = async (rutaOrigenImagen, rutaDestinoCambioTamano) => {
  try {
    console.log('-----------------ruta de origen en cambiartamañoFoto',rutaOrigenImagen);
    const imagen = await jimp.read(rutaOrigenImagen);
    console.log(imagen);
    await imagen.resize(75, jimp.AUTO);
    await imagen.writeAsync(rutaDestinoCambioTamano);
    
  } catch (error) {
    console.log('falla cambiar tamaño de foto', error);
  }

  };
  cambiarTamanoFoto()
  module.exports = cambiarTamanoFoto;