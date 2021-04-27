'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth')

/* GET /apiv1/anuncios API listing and filters */
router.get('/', jwtAuth, async function (req, res, next) {
	try {
		const nombre = req.query.nombre;
		const venta = req.query.venta;
		const precio = req.query.precio;
		const tag = req.query.tag;

		// Filtros 
		const filtro = {};

		if (nombre) {
			filtro.nombre = nombre;
		}
		if (venta) {
			filtro.venta = venta;
		}
		if (precio) {
			if (precio.includes('-')) {
				const divisor = precio.indexOf('-');
				if (divisor === 0) {
					let Number = precio.slice(1, precio.length);
					filtro.precio =
						{ $lt: Number }
				}
				else if (divisor === (precio.length - 1)) {
					let Number = precio.slice(0, precio.length - 1);
					filtro.precio =
						{ $gt: Number }
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
		if (tag) {
			filtro.tags = tag;
		}

		// Paginar, ordenar o Recuperar campo(s) determinados

		const fields = req.query.fields;
		const limit = parseInt(req.query.limit);
		const skip = parseInt(req.query.skip);
		const sort = req.query.sort;

		const resultado = await Anuncio.lista(filtro, limit, skip, fields, sort);

		res.json(resultado)
	} catch (err) {
		next(err)
	}
});


/* GET /apiv1/anuncios/tags  */
//Obtener un listado de tag existentes
router.get('/tags', async (req, res, next) => {
	try {
		const tags = req.query.tag;
		const anuncio = await Anuncio.distinct("tags");
		if (!anuncio) {
			return res.status(404).json({ error: 'No found' });
		}
		res.json({ result: anuncio })

	} catch (error) {
		next(error)
	}
})


/* GET /apiv1/anuncios:id */
//Obtener un anuncio

router.get('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;

		const anuncio = await Anuncio.findOne({ _id: _id });
		if (!anuncio) {
			return res.status(404).json({ error: 'No found' });
		}
		res.json({ result: anuncio })
	} catch (error) {
		next(error)
	}
})

/* POST /apiv1/anuncios (body) - Ads products (ads) */
router.post('/', async (req, res, next) => {
	try {
		const AnuncioData = req.body;
		const anuncio = new Anuncio(AnuncioData)
		const productCreated = await anuncio.save();
		res.status(201).json({ result: productCreated });
	} catch (error) {
		next(error)
	}
})

module.exports = router;