const express = require('express');
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')
const router = express.Router()

router
  .route('/')
  .get(authController.protect, productController.getProduct)
  .post(productController.createProduct);


  router
  .route('/:id')
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;