const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const sales = await salesModels.getAllSales();
  if (!sales.length) {
    return {
      error: {
        message: 'Cannot find sales',
      },
      httpStatus: 404,
    };
  }
  return {
    payload: sales,
    httpStatus: 200,
  };
};

const createSalesProducts = async (productsList) => {
  const { insertId } = await salesModels.createSales();
  await Promise.all(
    productsList.map((product) => {
      const { productId, quantity } = product;
      return salesModels.createSalesProducts(insertId, productId, quantity);
    }),
  );
  return {
    id: insertId,
    itemsSold: productsList,
  };
};

module.exports = { createSalesProducts, getAllSales };
