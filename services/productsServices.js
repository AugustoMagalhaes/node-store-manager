const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  if (!products.length) {
    return {
      error: {
        message: 'Cannot find products',
      },
      httpStatus: 404,
    };
  }
  return {
    payload: products,
    httpStatus: 200,
  };
};

const getProductById = async (id) => {
  const [product] = await productsModels.getProductById(id);
  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
      httpStatus: 404,
    };
  }
  return {
    payload: product,
    httpStatus: 200,
  };
};

const createProduct = async (name) => {
  const [product] = await productsModels.createProduct(name);
  if (!product) {
    return {
      error: {
        message: 'Cannot create product',
      },
      httpStatus: 400,
    };
  }
  const response = {
    payload: {
      id: product.insertId,
      name,
    },
    httpStatus: 201,
  };
  return response;
};

module.exports = { getAllProducts, getProductById, createProduct };
