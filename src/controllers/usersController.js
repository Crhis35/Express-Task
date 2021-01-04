const { User, Post } = require('../models');
const Factory = require('./handlerFactory');

exports.getAllUsers = Factory.getAll(User);
exports.getOneUser = Factory.getOne(User, { model: Post, as: 'posts' });
exports.createUser = Factory.createOne(User);
exports.deleteUser = Factory.deleteOne(User);
exports.updateUser = Factory.updateOne(User);
