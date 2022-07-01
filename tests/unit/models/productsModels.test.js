const sinon = require('sinon');
const { expect } = require('chai');
require('dotenv').config();

const connection = require('../../../models/connection');

const { getAllProducts } = require('../../../models/productsModels');

describe('Testa a chamada ao banco de dados de "products" ', async () => {
  it('Testa se os produtos sao chamados corretamente', async () => {
    const products = await getAllProducts();
    expect(products).to.have.lengthOf(3);

    products.forEach((product) => {
      expect(product).to.have.property('id');
    });
  });

  it('Testa se o banco de dados existe', () => {
    const db = connection.pool.config.connectionConfig.database;
    expect(db).to.equal('StoreManager');
  });
});
