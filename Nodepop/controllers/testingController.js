class testingController {

	/**
	 * GET /privado
	 */
	index(req, res, next) {
		res.render('testing');

	}

}

module.exports = new testingController();
