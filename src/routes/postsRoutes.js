const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const commentRouter = require('./commentsRoutes');
const router = express.Router({ mergeParams: true });

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.setCategoryUserIds,
    postController.createPost
  );

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    postController.deletePost
  );

module.exports = router;
