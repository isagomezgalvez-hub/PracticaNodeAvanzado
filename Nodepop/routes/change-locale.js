var express = require('express');
var router = express.Router();

/* GET /change-locale/:locale. */
router.get('/:locale', function (req, res, next) {
	
	const locale = req.params.locale;
	//Poner una cookie con el idioma seleccionado
	res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 })


	//Redireccionar a la página de donde venía (cabecera referer)
	res.redirect(req.get('referer'))
});

module.exports = router;