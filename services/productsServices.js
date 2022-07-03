const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  const opa = [];
  console.log(products);
  if (!opa.length) {
    return {
      error: {
        message: "Can't find products",
      },
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
