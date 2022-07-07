const salesServices = require('../services/salesServices');

const createSalesProducts = async (req, res) => {
  console.log('chegou no contr');
  const productsList = req.body;

  const products = await salesServices.createSalesProducts(productsList);
  return res.status(201).json(products);
};

module.exports = { createSalesProducts };
