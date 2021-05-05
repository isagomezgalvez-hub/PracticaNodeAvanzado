var express = require('express');
var router = express.Router();
const cote = require('cote');
const Anuncio = require('../models/Anuncio');

const Jimp =require('jimp');
const path = require('path');


const requester = new cote.Requester({ name: 'Client: gimme-thumbnail' });



	const request = {
		type: 'resize',
		img: path.join(`${__dirname} ../../public/images/`)
	};

	requester.send(request, result => {
		console.log('gimme-thumnail result:', result);
	
	});

	
	



module.exports = router;
