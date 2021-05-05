# API NodePop Avanzado

## Desplegar 

```sh npm install```


Copia .env.example a .env y reescribe con la configuración de tu base de datos

```sh cp .env.example .en```


## Comando para arrancar MongoDB (mac/Linux)

```./bin/mongod --dbpath ./data/db```


## Inicializar Base de Datos

Si deseas resetear la Base de datos y cargar datos iniciales de producto y usuarios puedes ejecutar:

`npm run initDB`


## Inicializar servidor

Para iniciar la aplicación lo podemos hacer de dos formas: 

1. En modo desarrollo, para ello usaremos:

`npm run dev`

2. En modo producción, usamos: 

`npm start`

## Inicializar conversionService

```npm run conversionService```

##  Lista de Anuncios (Front-end)
La ruta / nos permitirá mostrar en el Front-end de nuestra aplicación un listado de todos los anuncios registrados en la base de datos MongoDB. Igualmente, en esta ruta también se pueden realizar filtros que hemos aplicado a nuestra API pero que están accesibles también para esta ruta.

`http://localhost:3000/`
##  Listado de anuncios (API)

La ruta /apiv1/anuncios en nuestra API nos permitirá consultar, paginar, y filtrar datos de todos los anuncios registrados en la base de datos de nuestra aplicación NodePop.

`http://localhost:3000/apiv1/anuncios`


##  Filtrar anuncios por tag

Para aplicar un filtrado por tag podemos utilizar la siguiente ruta teniendo en cuenta que nos filtrará todos aquellos anuncios que contenga la etiqueta 'mobile'.

`http://localhost:3000/apiv1/anuncios?tag=mobile`

##  Filtrar por precio

Para aplicar un filtrado por precio podemos diferentes variables.

Algunos de los ejemplos: 

1. Filtrar aquellos anuncios que contenga un precio <strong>entre dos valores</strong>. Por ejemplo: 10 - 40

`http://localhost:3000/apiv1/anuncios?precio=10-40`

2. Filtrar aquellos anuncios que contenga un precio <strong>mayor</strong> que el valor indicado. Por ejemplo 10-

`http://localhost:3000/apiv1/anuncios?precio=10-`

3. Filtrar aquellos anuncios que contenga un precio <strong>menor</strong> que el valor indicado. Por ejemplo -50

`http://localhost:3000/apiv1/anuncios?precio=-50`


4. Filtrar aquellos anuncios que contenga un precio <strong>exacto</strong> al valor indicado. Por ejemplo =40

`http://localhost:3000/apiv1/anuncios?precio=40`

##  Filtrar por tipo de anuncio

Esta petición nos permite filtrar anuncios según el tipo de anuncio. Es decir, si el anuncio está en venta su parametro será <strong>true</strong> y  si el anuncio está en compra su parámetro será <strong>false</strong>.

`http://localhost:3000/apiv1/anuncios?venta=true`

##  Paginar anuncios

Esta petición nos permite paginar el listado de anuncios

`http://localhost:3000/apiv1/anuncios?skip=1&limit=2`

## Filtar por nombre

Este filtro nos permite hacer una búsqueda por nombre

`http://localhost:3000/apiv1/anuncios?nombre=Coche`

## Consultar por id

Esta petición nos permite buscar un anuncio por su id.

`http://localhost:3000/apiv1/anuncios/601e403463889d1af612b859`

## Ordenar campos
Esta petición nos devolverá anuncios ordenando según el campo que le pase al parámetro <strong>sort</strong>. En la ruta que se aporta como ejemplo ordenamos por precio.

`http://localhost:3000/apiv1/anuncios?sort=precio`

##  Mostrar Listado de tags 
Nos devuleve un listado con las etiquetas existentes en los anuncios de nuestra apliación.

`http://localhost:3000/apiv1/anuncios/tags`
### POST /api/anuncios - Crear Anuncido

Esta petición nos permite crear un nuevo anuncio y quedando almacenado en la base de datos.

`http://localhost:3000/apiv1/anuncios`

