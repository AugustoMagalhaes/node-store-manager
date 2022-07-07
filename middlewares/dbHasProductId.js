const productsModels = require('../models/productsModels');

const hasProductId = async (productsList) => {
  const allProducts = await productsModels.getAllProducts();
  const allIds = allProducts.map((item) => item.id);
  const hasId = productsList.every((item) => allIds.includes(Number(item.productId)));
  return hasId;
};

const dbHasProductId = async (req, res, next) => {
  const productsList = [...req.body];

  const check = await hasProductId(productsList);
  if (!check) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = dbHasProductId;
