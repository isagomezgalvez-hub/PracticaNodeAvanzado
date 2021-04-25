var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var app = express();

const conectionBD = require('./models/connectMongoose.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));

//cambiar la extensión de vistas
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.locals.title = 'NodePop'


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//middleware de ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', require('./routes/users'));


//Routes of Api
app.use('/apiv1/anuncios', require('./routes/api/anuncios'));
app.use('/apiv1/anuncios/tags', require('./routes/api/anuncios'));


// Setup of i18n
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);


// Middleware Create Session to Website

app.use(session({
  name: 'nodepop-session',
  secret: 'dsa987ad10/)H(/G()/9sa7d98',
  saveUninitialized: true,
  resave:false,
  cookie: {
    secure:true, // solo se envian al servidor cuando la petición es HTTPs
    maxAge: 1000 * 60 * 60 * 24 * 2 // dos dias de inactividad
  }
}));



// Routes of Website
//General list of products
app.use('/', require('./routes/index'));
app.get('/login', require('./controllers/LoginControllers').index);
app.post('/login', require('./controllers/LoginControllers').post);
app.get('/private', require('./controllers/PrivateControllers').index);
//app.use('/anuncios', require('./routes/index'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) { // es un error de validación
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }
  res.status(err.status || 500);
  if (isApiRequest(req)) {
    res.json({ error: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isApiRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
