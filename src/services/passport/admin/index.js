module.exports = () => {
  const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    { JWT_SECRET } = require('../../../../config'),
    { getUserById, getUserByEmail } = require('../../../repositories/user'),
    { encrypt } = require('../../../utils');

  passport.use('userAdminAuth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  }, async(payload,done) => {

    try{
      if (!payload.auth)
        return done(null, false);

      const user = await getUserById(payload.auth._id);

      if(!user){
        return done(null, false);
      }

      if (user.role !== 'admin' || user.delete || !user.status) {
        return done(null, false);
      }

      // Otherwise, return the user
      done(null, user);
    }catch(error){
      done(error,false);
    }
  }));

  passport.use('userAdmin', new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {

    try{
      // get the user given the email
      const user = await getUserByEmail(email);

      // If not, handle it
      if (!user){
        return done(null, null);
      }

      // Check if the password is corret
      const encryptedPassword = encrypt(password);
      const isMatch = encryptedPassword === user.password;

      // If not, handle it
      if (!isMatch){
        return done(null, null);
      }

      // Otherwise, return the cliente
      done(null, user);

    }catch(error){
      done(error, false);
    }
  }));

  return passport;
};