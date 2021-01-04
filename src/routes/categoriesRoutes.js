const express = require('express');
const categoryController = require('../controllers/categoryController');
const postsRouter = require('../routes/postsRoutes');

const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.use('/:categoryId/posts', postsRouter);

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getOneCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
