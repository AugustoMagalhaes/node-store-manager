const salesModels = require('../models/salesModels');

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

module.exports = { createSalesProducts };
