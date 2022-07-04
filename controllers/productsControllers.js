const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  let payload;
  let httpStatus;
  let error;
  try {
    const productsObj = await productsServices.getAllProducts();
    ({ payload, httpStatus, error } = productsObj);

    if (error) throw new Error(error.message);

    return res.status(httpStatus).json(payload);
  } catch (err) {
    return res.status(httpStatus).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  let error;
  let httpStatus;
  let payload;
  try {
    const productsObj = await productsServices.getProductById(id);
    ({ error, httpStatus, payload } = productsObj);
    if (error) throw new Error(error.message);
    return res.status(httpStatus).json(payload);
  } catch (err) {
    return res.status(httpStatus).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsServices.createProduct(name);

  const { error, payload, httpStatus } = product;

  try {
    if (error) {
      throw new Error(error.message, httpStatus);
    }
  } catch (err) {
    return res.status(httpStatus).json({ message: error.message });
  }

  return res.status(httpStatus).json(payload);
};

module.exports = { getAllProducts, getProductById, createProduct };
