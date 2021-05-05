'use strict';
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const nodemailer = require('nodemailer')

class LoginController {

	/** 
	* GET Login 
	*/

	index(req, res,next){
		res.locals.email = '';
		res.locals.error ='';
		res.render('login')
	};

	/** 
	* POST Login
	*/
	async post(req,res,next){
		try{
			const { email, password } = req.body;
			

			/// Buscar usuario en la Base de datos
			const usuario = await Usuario.findOne({ email })
			

			// Si no encontramos email usuario => error
			// Si no coincide la contraseña =>error
		
			if (!usuario || !(await usuario.comparePassword(password))){
				res.locals.email = email;
				res.locals.error = res.__('Invalid Credentials');
				res.render('login');
				return;
			}
		
			//Si el usuario existe y la clave coincide redireccionar al área privada
			
			// apuntar en la sesión de usuario su _id
			req.session.usuarioLogado = {
				_id: usuario._id
			}


			//mandar un email al usuario
			const info = await usuario.enviaEmail('Este es el asunto', 'Bienvenido a NodePop');
			console.log("Message sent: %s", info.messageId);
			console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		
			//redirecciono a la pagina Dashboard(Area Privada)
			res.redirect('/privado');

		}catch(error){
			next(error)
		}
	
	}


	/**
	* POST /loginJWT
	Autentificacion en API */

	async postJWT(req, res, next) {
		try {
			const { email, password } = req.body;
			/// Buscar usuario en la Base de datos
			const usuario = await Usuario.findOne({ email })

			// si no lo encontramos --> error
			// si no coincide la clave --> error
			if (!usuario || !(await usuario.comparePassword(password))) {

				const error = new Error('invalid credentials');
				error.status = 401;
				next(error);
				return;
			}


			// si el usuario existe y la clave coincide
			// crear un token JWT (firmado) 

			jwt.sign({ _id: usuario._id },process.env.JWT_SECRET, {expiresIn: '2h' }, (error, jwtToken )=>{
				if(error){
					next(error);
					return;
				}
				//devolver al cliente el token
				res.json({token: jwtToken})
			});
			
		} catch (error) {
			next(error)
		}

	}

	/**
   * GET /logout
   */
	logout(req, res, next) {
		req.session.regenerate(err => {
			if (err) {
				next(err);
				return;
			}
			res.redirect('/');
		})
	}

}




module.exports = new LoginController();
