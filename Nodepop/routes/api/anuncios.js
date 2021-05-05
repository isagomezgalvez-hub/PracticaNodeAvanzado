'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../middleware/jwtAuth')
const fs = require('fs');
const multer = require('multer');
const path = require('path')
const cote = require('cote');

// Almacenar imagenes
const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../public/images'),
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})


var upload = multer({ storage: storage })



/* GET /api/anuncios API listing and filters */
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


/* GET /api/anuncios/tags  */
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


/* GET /api/anuncios:id */
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

/* POST /api/anuncios (body) - Ads products (ads) */
router.post('/', upload.single('foto'), async (req, res, next) => {

	

	try {
		//almacenamos la imagen
		const file = req.file

		const AnuncioData = req.body;
		const anuncio = new Anuncio(AnuncioData)
		anuncio.foto =  file.filename 

		const productCreated = await anuncio.save();
		res.status(201).json({ result: productCreated });

	
		//llamando al microservicio
		
		const requester = new cote.Requester({ name: 'Client: gimme-thumbnail' });

		const request = {
				type: 'resize',
				img: file.path,
				name:file.filename,
				destination: file.destination
				};
			console.log(file)
		requester.send(request, result => {
				console.log('gimme-thumnail result:', result);
		});
		
		
	} catch (error) {
		next(error)
	}

})

module.exports = router;