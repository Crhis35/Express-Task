const { Category, Post, Comment } = require('../models');
const AppError = require('../utils/appError');
const Factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.setCategoryUserIds = (req, res, next) => {
  if (!req.params.categoryId) next(new AppError('No Category selected', 400));
  req.ids = {
    userId: req.user.id,
    categoryId: req.params.categoryId,
  };
  next();
};

exports.getAllCategories = Factory.getAll(Category, [
  {
    model: Post,
    as: 'posts',
    include: {
      model: Comment,
      as: 'comments',
    },
  },
]);
exports.getOneCategory = Factory.getOne(Category, [
  {
    model: Post,
    as: 'posts',
    include: {
      model: Comment,
      as: 'comments',
    },
  },
]);
exports.createCategory = Factory.createOne(Category);
exports.deleteCategory = Factory.deleteOne(Category);
exports.updateCategory = Factory.updateOne(Category);
exports.categoryResume = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!category) {
    return next(new AppError('No Document found with that ID', 404));
  }
  let { count } = await Post.findAndCountAll({
    where: {
      categoryId: req.params.id,
    },
  });

  res.status(200).json({
    status: 'success',
    category: category.name,
    amount: count,
  });
});
