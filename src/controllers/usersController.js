const { User, Post } = require('../models');
const Factory = require('./handlerFactory');

exports.getAllUsers = Factory.getAll(User);
exports.getOneUser = Factory.getOne(User, [{ model: Post, as: 'posts' }]);
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined, Please use /signup',
  });
};
exports.deleteUser = Factory.deleteOne(User);
exports.updateUser = Factory.updateOne(User);
