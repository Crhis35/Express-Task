const { Category, Post } = require('../models');
const AppError = require('../utils/appError');
const Factory = require('./handlerFactory');

exports.setCategoryUserIds = (req, res, next) => {
  if (!req.params.categoryId) next(new AppError('No Category selected', 400));
  req.uuids = {
    userId: req.user.uuid,
    categoryId: req.params.categoryId,
  };
  next();
};

exports.getAllCategories = Factory.getAll(Category);
exports.getOneCategory = Factory.getOne(Category, {
  model: Post,
  as: 'posts',
});
exports.createCategory = Factory.createOne(Category);
exports.deleteCategory = Factory.deleteOne(Category);
exports.updateCategory = Factory.updateOne(Category);
