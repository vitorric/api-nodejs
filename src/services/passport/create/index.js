const JWT = require('jsonwebtoken'),
  {JWT_SECRET} = require('../../../../config');

exports.createToken = (user) => {
  try
  {
    return JWT.sign({
      auth: user,
      exp: new Date(new Date().getFullYear(), 11, 31).getTime()
    },
    JWT_SECRET);
  }
  catch (error)
  {
    console.log(error);
    throw error;
  }
};