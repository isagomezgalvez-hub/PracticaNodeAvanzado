
/* Script to clean and load data & users into the Database */

//Load connectMongoose module and models
const mongoose = require('mongoose');
const {Usuario, Anuncio} = require('./models');


const { nextTick } = require('process');
const { read, readFile, readFileSync } = require('fs');

require('./models/connectMongoose');

//Iniciar el proceso
mongoose.connection.once('open', async (req, res, next) => {
	try {

		//Clean Data in Data Base
		Anuncio.deleteMany(function (err, result) {
			if (err) {
				return cb(err);
			}
		});

		//Read ad data.json
		const newData = readFileSync('./files/anuncios.json');
		const anuncio = JSON.parse(newData);


		//Inserts the data in the Database
		await Anuncio.insertMany(anuncio.anuncios);

	} catch (error) {
		next(error);
	}
});  


main().catch(err => console.error(err));

async function main() {

	// inicializo colección de usuarios
	await initUsuarios();

	mongoose.connection.close();
}

async function initUsuarios() {
	const { deletedCount } = await Usuario.deleteMany();
	console.log(`Eliminados ${deletedCount} usuarios.`);

	const result = await Usuario.insertMany(
		{
			email: 'admin@example.com',
			password: '1234'
		}
		
	);
	console.log(`Insertados ${result.length} usuario${result.length > 1 ? 's' : ''}.`)
}
