'use strict';
class LoginController {
	index(req, res,next){
		res.render('login')
	};

	post(res,req,next){

	}
}

module.exports = new LoginController();
