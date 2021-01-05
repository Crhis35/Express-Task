const { User, Post, Comment, Category } = require('../models');
const Factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('../services/email');

const schedule = require('node-schedule');

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

let page_visits = {};

exports.visits = (req, res, next) => {
  let counter = page_visits[req.params.id];
  if (counter || counter === 0) page_visits[req.params.id] = counter + 1;
  else page_visits[req.params.id] = 1;

  // Every time at 50 set visits to null and send a message

  schedule.scheduleJob('50 * * * *', async () => {
    const post = await Post.findByPk(req.params.id);
    if (!post) return next(new AppError('No Document found with that ID', 404));

    const user = await User.findByPk(post.userId);
    await new Email(user, '').send(
      'visitCount',
      'Post Reand',
      `Your post have ${page_visits[req.params.id]} visits on this hour`
    );
    page_visits = {};
  });

  next();
};

exports.visitPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return next(new AppError('No Document found with that ID', 404));
  res.status(200).json({
    status: 'success',
    name: post.name,
    time: page_visits[req.params.id] || 0,
  });
});
