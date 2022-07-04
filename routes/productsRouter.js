const express = require('express');

const productsRouter = express.Router();

const productsController = require('../controllers/productsControllers');

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', productsController.createProduct);

module.exports = productsRouter;
