const connection = require('./connection');

const createSalesProducts = async (saleId, productId, quantity) => {
  const sp = 'sales_products';
  const query = `INSERT INTO StoreManager.${sp} (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
  const [created] = await connection.execute(query, [
    saleId,
    productId,
    quantity,
  ]);
  return created;
};

const createSales = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [created] = await connection.execute(query);
  return created;
};

module.exports = { createSales, createSalesProducts };
