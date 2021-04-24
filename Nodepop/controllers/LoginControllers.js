'use strict';
const { Usuario } = require('../models')
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
			console.log(email, password)

			/// Buscar usuario en la Base de datos
			const usuario = await Usuario.findOne({ email })
			console.log(usuario)

			// Si no encontramos email usuario => error
			// Si no coincide la contraseña =>error
		

			if (!usuario || !(await usuario.comparePassword(password))){
				res.locals.email = email;
				res.locals.error = 'Invalid Credentials';
				res.render('login');
				return
			}

			//Si el usuario existe y la clave coincide redireccionar al área privada
			res.redirect('/private')

		}catch(error){
			next(error)
		}
	
	}
}

module.exports = new LoginController();
