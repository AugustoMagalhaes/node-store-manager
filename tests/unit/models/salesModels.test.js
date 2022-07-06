const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const connection = require('../../../models/connection');
const productsSales = require('../../../models/salesModels');

chai.use(chaiAsPromised);

describe('Testa inserção de produto em sales_products', () => {
  beforeEach(sinon.restore);

  it('testa retorno de productsSales.createSales', async () => {
    const execute = [{}];

    sinon.stub(connection, 'execute').resolves([{}]);
    const result = await productsSales.createSales(2, 2, 10);
    expect(result).to.deep.equal([{}]);
  });
});
