'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
	//recoger el jwToken de la cabecera (o de otros sitios)
	const jwtToken = req.get('Authorization') || req.query.token || req.body.token


	// comprobar que tengo token

	if(!jwtToken){
		const error = new Error('no token provided');
		error.status = 401;
		next(error);
		return;
	}
	
	// comprobar que el token es válido
	jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload)=>{

		if (error){
			error.status = 401
			next(error);
			return;

		}
		
		req.apiAuthUserID = payload._id;
		next();
	})

}