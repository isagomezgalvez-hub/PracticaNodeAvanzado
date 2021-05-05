'use strict';
const Jim = require('jimp');

const cote = require('cote');


// Declarar el microservicio
const responder = new cote.Responder({ name: "Service: i-resize-u" });

// Lógica del microservicio

responder.on("resize", (req, done) => {

	const result = `${req.img}`;

	//ruta destino de las imagenes
	const destination = `${req.destination}`

	//nombre de la imagen
	const name = `${req.name}`

	//formato de la imagen
	const format = `${req.format}`	
	const divideName = name.split('.')

	//añadir '-thumnails' al nombre del archivo de imagen
	const newImagen = destination + '/' + divideName[0] + '-thumnails.' + divideName[1]

	console.log('Testing', divideName)
	//redimensionar, escalar y escribir la miniatura
		Jim.read(result, (err, img) => {
			if (err) throw err;
			img
				.resize(800, 800) // resize
				.quality(60) // set JPEG quality
				.scale(.1)
				.write(newImagen); // save
		});
	
	done(result);

});
