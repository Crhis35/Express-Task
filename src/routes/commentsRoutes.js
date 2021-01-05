const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    commentController.setCategoryUserIds,
    commentController.createComment
  );

router
  .route('/:id')
  .get(commentController.getOneComment)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    commentController.updateComment
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    commentController.deleteComment
  );

module.exports = router;
