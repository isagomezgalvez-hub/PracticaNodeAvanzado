'use strict'
const mongoose = require('mongoose');


// Define Schema for the model
const anuncioSchema = mongoose.Schema({
	nombre: { type: String, index: true },
	venta: Boolean,
	precio: { type: Number, index: true },
	foto: String,
	tags: { type: [String], index: true }
}, {
	collection: 'anuncios'
});


anuncioSchema.statics.lista = function (filtro, limit, skip, fields, sort) {
	const query = Anuncio.find(filtro);
	query.limit(limit);
	query.limit(skip);
	query.sort(sort);
	query.select(fields);
	return query.exec();
}

//Create the model
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

//Export model
module.exports = Anuncio;