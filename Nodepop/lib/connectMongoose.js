'use strict';

const mongoose = require('mongoose');
const mongoBaseDatos = 'mongodb://localhost/nodepop'

// Connect to the Database
mongoose.connect(mongoBaseDatos, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});


mongoose.connection.on('error', err => {
	console.log('Error de conexión', err);// Show connection error
	process.exit(1);
});

//Successful connection to database
console.log('Conectado a MongoDB en', mongoose.connection.name)


module.exports = mongoose.connection;

