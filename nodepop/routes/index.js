var express = require("express");
var router = express.Router();

const Anuncio = require("../models/Anuncio");

/*
 *GET home website / http://localhost:3000/
 */

router.get("/", async (req, res, next) => {
  try {
    const tags = req.query.tags;
    const venta = req.query.venta;
    let precio = req.query.precio;
    const nombre = req.query.nombre;

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filtro = {};
    if (tags) {
      filtro.tags = tags;
    }
    if (nombre) {
      filtro.nombre = nombre;
    }
    if (venta) {
      filtro.venta = venta;
    }

    if (precio) {
      let posicion = precio.indexOf("-");
      if (posicion === -1) {
        filtro.precio = precio;
      } else if (posicion === 0) {
        precio = precio.replace("-", "");
        filtro.precio = { $lte: precio };
      } else if (posicion === precio.length - 1) {
        precio = precio.replace("-", "");
        filtro.precio = { $gte: precio };
      } else {
        let min = precio.substr(0, posicion);
        let max = precio.substr(posicion + 1, precio.length - 1);
        filtro.precio = { $gte: min, $lte: max };
      }
    }

    const listaAvisos = await Anuncio.lista(filtro, limit, skip, fields, sort);

    
    res.render("index", { title: "NODEPOP", listaAvisos: listaAvisos });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
