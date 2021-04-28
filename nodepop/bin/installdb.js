'use strict';
require('dotenv').config();
//  conecto con la BBDD
require('../lib/connectMongoose');

const ficheroJson = require('./anuncios.json');

// console.log(ficheroJson);
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

const { closeDelimiter } = require('ejs');
//cargo registro anuncio de prueba
const anuncio1 = new Anuncio({
  nombre: 'botas',
  venta: 'true',
  precio: '50',
  foto: 'botas.jpg',
  tag: ['ropa', 'lifestyle'],
});
anuncio1.save(function (err, anuncioCreado) {
  if (err) throw err;
  console.log('registro anuncio de prueba ' + anuncioCreado.nombre + ' creado');

  // funcion de inicializar la BBDD con la instruccion npm run installDB
});
async function inicializacionDB() {
  try {
    //borrar  la registros BBDD
    const { deletedCount } = await Usuario.deleteMany();
    console.log(`Eliminados ${deletedCount} usuarios.`);

    const result = await Usuario.insertMany({
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234'),
    });
    console.log(
      `Insertados ${result.length} usuario${result.length > 1 ? 's' : ''}.`
    );

    const borrado = await Anuncio.deleteMany();
    console.log('se ha borrado registros la DDBB', borrado);

    //cargo la BBDD con el fichero anuncios.json

    const cargaAnuncio = await Anuncio.insertMany(ficheroJson);
    console.log('se carga fichero anuncios.json', cargaAnuncio);
  } catch (error) {
    console.log('fallo en la inicializacion de BBDD', error);
  }
}

inicializacionDB().catch((err) => {
  console.log(err);
});
