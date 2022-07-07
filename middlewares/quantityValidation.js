const isValidQuantity = (productsList) => {
  const lacksQuantity = productsList.some((product) => !product.quantity && product.quantity !== 0);
  return lacksQuantity;
};

const isPositiveQuantity = (productsList) => {
  const invalidQuantity = productsList.some((product) => product.quantity <= 0);
  return invalidQuantity;
};

const quantityValidation = (req, res, next) => {
  const productsList = [...req.body];
  if (isValidQuantity(productsList)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (isPositiveQuantity(productsList)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = quantityValidation;
