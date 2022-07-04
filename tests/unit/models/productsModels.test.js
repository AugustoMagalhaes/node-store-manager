const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
require('dotenv').config();

chai.use(chaiAsPromised);

const connection = require('../../../models/connection');

const productsModels = require('../../../models/productsModels');

describe('Testa .env em connection', () => {
  it('Testa se o banco de dados existe', () => {
    const db = connection.pool.config.connectionConfig.database;
    expect(db).to.equal('StoreManager');
  });
});

describe('Testa a chamada ao banco de dados de "getAllProducts" ', async () => {
  before(async () => {
    const allProducts = [
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
    ];
    sinon.stub(connection, 'execute').resolves(allProducts);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Testa se os produtos sao chamados corretamente', async () => {
    const products = await productsModels.getAllProducts();
    expect(products).to.have.lengthOf(3);

    products.forEach((product) => {
      expect(product).to.have.property('id');
    });
  });
});

describe('3 - Testa a chamada ao banco de dados de "getProductById" ', async () => {
  describe('3.1 - Quando o id existe na tabela "products" ', async () => {
    before(async () => {
      const thirdProduct = [[{ id: 3, name: 'Escudo do Capitão América' }]];
      sinon.stub(connection, 'execute').resolves(thirdProduct);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Testa se o elemento retornado possui o id correto', async () => {
      const captainShield = await productsModels.getProductById(3);
      expect(captainShield[0]).to.have.property('id', 3);
      expect(captainShield).to.have.lengthOf(1);
    });
  });

  describe('3.2 - Quando o id nao existe na tabela "products" ', async () => {
    before(async () => {
      const cannotFind = [[]];
      sinon.stub(connection, 'execute').resolves(cannotFind);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Testa se não retorna nada quando o id não existe no banco de dados', async () => {
      const shouldNotFind = await productsModels.getProductById(4);
      expect(shouldNotFind).to.be.an('array');
      expect(shouldNotFind).to.have.lengthOf(0);
    });
  });
});

describe('productsModel.createProduct', () => {
  beforeEach(sinon.restore);

  it('produto inserido com sucesso', async () => {
    sinon.stub(connection, 'execute').resolves([]);
    const result = await productsModels.createProduct('name');
    return chai.expect(result).to.deep.equal([]);
  });
});
