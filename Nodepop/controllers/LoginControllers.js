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
			

			// Si no encontramos email usuario => error
			// Si no coincide la contraseña =>error
		

			if (!usuario || !(await usuario.comparePassword(password))){
				res.locals.email = email;
				res.locals.error = res.__('Invalid Credentials');
				res.render('login');
				return
			}

			//Si el usuario existe y la clave coincide redireccionar al área privada

			// apuntar en la sesión de usuario su _id
			req.session.usuarioLogeado = {
				_id: usuario._id
			}

			//redirecciono a la pagina privado
			res.redirect('/private')
			

		}catch(error){
			next(error)
		}
	
	}
}

module.exports = new LoginController();
