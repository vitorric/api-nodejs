const router = require('express').Router();
// passportUserAdmin = passport.authenticate('userAdminAuth', {session: false});

module.exports = () => {

  router.post('/create', require('./create')());

  router.post('/login', require('./login')());

  // Exemplo uso pass
  // router.post('/service/metodo', passportUserAdmin, require('./service/metodo')());

  return router;
};