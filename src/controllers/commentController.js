const { Comment, Post, User } = require('../models');
const Factory = require('./handlerFactory');

exports.setCategoryUserIds = (req, res, next) => {
  if (!req.params.postId) next(new AppError('No Category selected', 400));
  req.ids = {
    userId: req.user.id,
    postId: req.params.postId,
  };
  next();
};

exports.getAllComments = Factory.getAll(Comment);
exports.getOneComment = Factory.getOne(Comment);
exports.createComment = Factory.createOne(Comment, {
  RModel: [User, Post],
  id: ['userId', 'postId'],
});
exports.deleteComment = Factory.deleteOne(Comment);
exports.updateComment = Factory.updateOne(Comment);
