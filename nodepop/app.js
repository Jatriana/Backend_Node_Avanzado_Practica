var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/change-locale');

var app = express();

// Conectar a Mongodb vía Mongoose
require('./lib/connectMongoose');

// i18n.setLocale('es')
// i18n.__('welcome to nodeApi');
// //prueba de funcionamiento
// console.log(i18n.__('welcome to nodeApi'));
// Cargar el modelo
require('./models/Anuncio');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
//se declara una variable local para todas las vistas
app.locals.title = 'NodeAPI';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * rutas de API
 *
 */
app.use('/api/anuncios', require('./routes/api/anuncios'));

// configuro el i18n
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);

/**
 * rutas del website
 */

app.use('prueba', (req, res, next) => {
  next();
});

app.use('/', require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/users', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  //validacion de error query erronea

  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }
  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ eror: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
