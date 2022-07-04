const express = require('express');

const productsRouter = express.Router();

const productsController = require('../controllers/productsControllers');

const nameValidation = require('../middlewares/nameValidation');

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', nameValidation, productsController.createProduct);

module.exports = productsRouter;
