const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  try {
    const productsObj = await productsServices.getAllProducts();
    const { payload, httpStatus, error } = productsObj;
    if (error) throw new Error(error.message);
    return res.status(httpStatus).json({ payload });
  } catch (err) {
    console.error(err);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productsObj = await productsServices.getProductById(id);
    const { error, httpStatus, payload } = productsObj;
    if (error) throw new Error(error.message);
    return res.status(httpStatus).json({ payload });
  } catch (err) {
    return res.status(httpStatus).json(err.message);
  }
};

module.exports = { getAllProducts, getProductById };
