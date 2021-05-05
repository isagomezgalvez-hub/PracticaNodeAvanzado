var express = require('express');
var router = express.Router();
const { query, param, validationResult } = require('express-validator')
const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');


/* GET / listing and filters */
router.get('/', async function (req, res, next) {

  try {
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const tag = req.query.tag;

    const filtro = {};

    if (precio) {
      if (precio.includes('-')) {
        const divisor = precio.indexOf('-');
        if (divisor === 0) {
          let Number = precio.slice(1, precio.length);
          filtro.precio =
            { $lt: Number }
          console.log('Dame menores que:', Number)
        }
        else if (divisor === (precio.length - 1)) {
          let Number = precio.slice(0, precio.length - 1);
          filtro.precio =
            { $gt: Number }
          console.log('Dame mayores que:', Number)
        }
        else {
          const firstItem = (precio.slice(0, divisor))
          const secondItem = (precio.slice(divisor + 1))
          filtro.precio =
            { $gte: firstItem, $lte: secondItem }
        }
      } else {
        filtro.precio = precio
      }

    }

    if (nombre) {
      filtro.nombre = nombre;
    }

    if (tag) {
      filtro.tags = tag;
    }

    const fields = req.query.fields;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;

    const resultado = await Anuncio.lista(filtro, limit, skip, fields, sort);
    res.locals = { ...res.locals, anuncios: resultado }
    res.render('index');
  } catch (err) {
    next(err)
  }
});


module.exports = router;
