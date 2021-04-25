'use strict';

class PrivateController {
	index(req,res,next){
		console.log(req.session)
		if (!req.session.usuarioLogeado) {
			res.redirect('/login');
			return;
		} 

		res.redirect('/private')
		
	}
}

module.exports = new PrivateController();