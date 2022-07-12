const salesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  let payload;
  let httpStatus;
  let error;
  try {
    const salesObj = await salesServices.getAllSales();
    ({ payload, httpStatus, error } = salesObj);

    if (error) throw new Error(error.message);

    return res.status(httpStatus).json(payload);
  } catch (err) {
    return res.status(httpStatus).json({ message: err.message });
  }
};

const createSalesProducts = async (req, res) => {
  const productsList = req.body;

  const products = await salesServices.createSalesProducts(productsList);
  return res.status(201).json(products);
};

module.exports = { createSalesProducts, getAllSales };
