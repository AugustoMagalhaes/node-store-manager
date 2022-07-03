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

module.exports = { getAllProducts, getProductById };
