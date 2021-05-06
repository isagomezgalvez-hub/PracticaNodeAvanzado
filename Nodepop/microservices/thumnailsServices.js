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

	const divideName = name.split('.')

	//añadir '-thumnails' al nombre del archivo de imagen
	const newImagen = destination + '/' + divideName[0] + '-thumnails.' + divideName[1]

	//redimensionar, escalar y escribir la miniatura
		Jim.read(result, (err, img) => {
			if (err) throw err;
			img
				
				.resize(Jim.AUTO, 100) // resize
				.quality(60) // set JPEG quality
				.write(newImagen); // save
		});
	
	done(newImagen);

});
