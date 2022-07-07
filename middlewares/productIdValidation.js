const productIdValidation = (req, res, next) => {
  const productsList = [...req.body];
  const lacksProductId = productsList.some((product) => !product.productId);
  if (lacksProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

module.exports = productIdValidation;
