'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const usuarioSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String
});

usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
	return bcrypt.hash(passwordEnClaro, 7);
}

usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
	return bcrypt.compare(passwordEnClaro, this.password);
}

usuarioSchema.methods.enviaEmail = async function (asunto, body) {
	let testAccount = await nodemailer.createTestAccount();

	const transport = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port:587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	}) 

	// crear un transport

	/* const transport = nodemailer.createTransport({
				service: process.env.EMAIL_SERVICE,
				auth:{
					user: process.env.EMAIL_SERVICE_USER,
					pass: process.env.EMAIL_SERVICE_PASS
				}
			}) */

	// enviar el correo.
		
	return transport.sendMail({
		from: process.env.EMAIL_SERVICE_FROM,
		to:this.email,
		subject:asunto,
		html: body
	})
	
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
