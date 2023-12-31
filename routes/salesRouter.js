const express = require('express');

const salesRouter = express.Router();

const salesController = require('../controllers/salesControllers');
const dbHasProductId = require('../middlewares/dbHasProductId');
const quantityValidation = require('../middlewares/quantityValidation');
const productIdValidation = require('../middlewares/productIdValidation');

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.post(
  '/',
  productIdValidation,
  quantityValidation,
  dbHasProductId,
  salesController.createSalesProducts,
);

module.exports = salesRouter;
