const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

  console.log('IP: ', req.connection.remoteAddress);

  next();
});

/**
 * @description inicia o modulo de passaport jwt
 */
require('./src/services/passport')();

app.use(
  morgan('dev'),
  bodyParser.json({ limit: '1000MB' }),
  bodyParser.urlencoded({ extended: true })
);

require('./src/routes')(app);

app.set('port', process.env.PORT || 3000);

module.exports = app;