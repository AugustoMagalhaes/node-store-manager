const productsModels = require('../models/productsModels');

const getAllProducts = async () => {
  const products = await productsModels.getAllProducts();
  if (!products.length) {
    return {
      error: {
        message: 'Cannot find products',
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

const teste = async (id) => {
  const result1 = await getAllProducts();
  const result = await getProductById(id);
  console.log('all prod', result1);
  console.log('by id', result);
};

teste(2);

module.exports = { getAllProducts, getProductById };
