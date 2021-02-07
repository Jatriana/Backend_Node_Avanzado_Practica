"use strict";
//creamos el modelo
//cargamos mongose

const mongoose = require("mongoose");

//definimos un esquema

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

anuncioSchema.statics.lista = function (filtro, limit, skip, sort, fields) {
  const query = Anuncio.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);

  return query.exec();
};



const Anuncio = mongoose.model("Anuncio", anuncioSchema);

//exportamos el modelo

module.exports = Anuncio;
