const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const [product] = await productsModels.getProductById(id);
  if (!product) {
    return {
      error: {
        code: 'notFound',
        httpStatus: 404,
        message: 'Product not Found',
      },
    };
  }
  return {
    payload: product,
    httpStatus: 200,
  };
};

module.exports = { getAllProducts, getProductById };
