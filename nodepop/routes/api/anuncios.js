//controlador

var express = require('express');
const { route } = require('..');
var router = express.Router();
const path = require('path');
var multer = require('multer');
const cote = require('cote');

const storage = require('../../controllers/multerMiddleware');
var upload = multer({ storage: storage });

//cargar el modelo

const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');

const requester = new cote.Requester({
  name: '//////peticion de  cliente///////',
});

/*
 * GET /api/auncios
 * metodo de filtar por nombre- ventra -precio(valor , memor igual que, mayor igual que),
 * ordena ,
 */

router.get('/',jwtAuth,  async (req, res, next) => {
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
      let posicion = precio.indexOf('-');
      if (posicion === -1) {
        filtro.precio = precio;
      } else if (posicion === 0) {
        precio = precio.replace('-', '');
        filtro.precio = { $lte: precio };
      } else if (posicion === precio.length - 1) {
        precio = precio.replace('-', '');
        filtro.precio = { $gte: precio };
      } else {
        let min = precio.substr(0, posicion);
        let max = precio.substr(posicion + 1, precio.length - 1);
        filtro.precio = { $gte: min, $lte: max };
      }
    }

    const anuncios = await Anuncio.lista(filtro, limit, skip, fields, sort);

    res.json({ data: anuncios });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/anuncios/
 * Listar los tags existentes
 */
exports.list;
router.get('/tags', async function (req, res, next) {
  const listaTags = await Anuncio.distinct('tags');
  console.log(listaTags);
  res.status(202).json(listaTags);
});

/*
 *GET /api/anuncios/
 * Listar los anuncios por _id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    const anuncio = await Anuncio.findOne({ _id: _id });
    if (!anuncio) {
      return res.status(404).json({ error: 'not found' });
    }
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

/**
 * //POST /api/anuncios (body)
 *
 */
//

router.post('/', upload.single('foto'), async (req, res, next) => {
  try {
    const { nombre, venta, precio, tags } = req.body;
    const foto = req.file.filename;
    const anuncio = new Anuncio({ nombre, venta, precio, foto, tags });

    const anuncioCreado = await anuncio.save();

    //configurar parametros requester

    const rutaOrigenImagen = path.join(
      __dirname,
      '../../public/images/anuncios',
      anuncio.foto
    );

    const rutaDestinoCambioTamano = path.join(
      __dirname,
      '../../public/images/anuncios/thumbnails',
      `${anuncio.foto}`
    );

    // Enviar "Eventos / mensajes" al microservicio
    requester.send({
      type: 'cambiarTamanoFoto',
      rutaOrigenImagen,
      rutaDestinoCambioTamano,
    });

    res.status(202).json({ result: anuncioCreado });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
