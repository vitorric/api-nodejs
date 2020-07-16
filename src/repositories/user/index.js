const { User } = require('../../schemas/user'),
  { ObjectIdCast } = require('../../utils');

exports.createUser = async user => {
  try {
    return User.create(user);
  } catch (error) {
    console.log('Error in createUser: ', error);
  }
};

exports.getUserByEmail = email => {
  try {
    return User.findOne({ email }).exec();
  } catch (error) {
    console.log('Error in getUserByEmail', error);
  }
};

exports.getUserById = _id => {
  try {
    return User.findOne({ _id: ObjectIdCast(_id) }).exec();
  } catch (error) {
    console.log('Error in getUserById', error);
  }
};