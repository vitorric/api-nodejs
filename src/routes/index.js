const passport = require('passport');

/**
 * Padrão de rotas = token/service/metodo
 */
module.exports = (app) => {
  app.use('/api/auth', require('./auth')());
};