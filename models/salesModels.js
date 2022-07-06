const connection = require('./connection');

const createSales = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?);';
  return connection.execute(query, [saleId, productId, quantity]);
};

module.exports = { createSales };
