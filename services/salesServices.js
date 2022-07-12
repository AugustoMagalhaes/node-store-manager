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

const getSalesById = async (id) => {
  const sales = await salesModels.getSalesById(id);
  const properSales = sales.map((sale) => {
    const salesEntries = Object.entries(sale);
    salesEntries.splice(0, 1);
    return Object.fromEntries(salesEntries);
  });
  if (!properSales.length) {
    return {
      error: {
        message: 'Sale not found',
      },
      httpStatus: 404,
    };
  }
  return {
    payload: properSales,
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

module.exports = { createSalesProducts, getAllSales, getSalesById };
