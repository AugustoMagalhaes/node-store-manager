const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity
FROM StoreManager.sales as s
INNER JOIN StoreManager.sales_products as sp
ON s.id = sp.sale_id;`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSalesById = async (id) => {
  const query = `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity
FROM StoreManager.sales as s
INNER JOIN StoreManager.sales_products as sp
ON s.id = sp.sale_id
WHERE s.id = ?
ORDER BY saleId ASC, productId ASC;`;
  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const createSalesProducts = async (saleId, productId, quantity) => {
  const sp = 'sales_products';
  const query = `INSERT INTO StoreManager.${sp} (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
  const [created] = await connection.execute(query, [saleId, productId, quantity]);
  return created;
};

const createSales = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [created] = await connection.execute(query);
  return created;
};

module.exports = { createSales, createSalesProducts, getAllSales, getSalesById };
