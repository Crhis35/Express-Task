const { User, Post, Comment, Category } = require('../models');
const Factory = require('./handlerFactory');

exports.getAllPosts = Factory.getAll(Post);
exports.getOnePost = Factory.getOne(Post, [
  { model: Comment, as: 'comments' },
  { model: Category, as: 'category' },
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
]);
exports.createPost = Factory.createOne(Post, {
  RModel: [User, Category],
  id: ['userId', 'categoryId'],
});
exports.deletePost = Factory.deleteOne(Post);
exports.updatePost = Factory.updateOne(Post);
