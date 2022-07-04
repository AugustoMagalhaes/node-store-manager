const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = require('chai');

chai.use(chaiAsPromised);

const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

describe('4 - Procura por todos produtos em services', () => {
  beforeEach(sinon.restore);
  describe('4.1 - Quando o banco de dados encontra os produtos', async () => {
    before(async () => {
      const allProducts = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(productsModels, 'getAllProducts').resolves(allProducts);
    });

    it('Chamando todos os produtos', async () => {
      const productsList = await productsServices.getAllProducts();
      const { payload } = productsList;
      expect(productsList).to.have.property('payload');
      expect(payload).to.be.an('array');
      expect(payload).to.have.lengthOf(3);

      payload.forEach((product) => {
        expect(product).to.have.property('id');
      });
    });
  });

  describe('4.2 - Quando o banco de dados não encontra os produtos', async () => {
    it('O retorno contem um objeto de erro adequado', async () => {
      const notFound = [];
      sinon.stub(productsModels, 'getAllProducts').resolves(notFound);
      const products = await productsServices.getAllProducts();
      console.log('products 4,2', products);
      expect(products).to.have.property('error');
    });
  });

  // -------------
});

describe('5 - Procura produto por id em services', () => {
  describe('Quando produto existe', async () => {
    before(async () => {
      const secProduct = [{ id: 2, name: 'Traje de encolhimento' }];

      sinon.stub(productsModels, 'getProductById').resolves(secProduct);
    });

    after(async () => {
      productsModels.getProductById.restore();
    });

    it('O retorno é um produto válido', async () => {
      const shrinkingSuit = await productsServices.getProductById(2);
      expect(shrinkingSuit.payload).to.have.property('id', 2);
      expect(shrinkingSuit.payload).not.to.have.property('id', 3);
      expect(shrinkingSuit.payload).not.to.have.property('error');
    });
  });
  describe('Quando produto não existe', async () => {
    before(async () => {
      const cannotFind = [];

      sinon.stub(productsModels, 'getProductById').resolves(cannotFind);
    });

    after(async () => {
      productsModels.getProductById.restore();
    });
    it('O retorno é um objeto de erro', async () => {
      const notFound = await productsServices.getProductById(4);
      expect(notFound).to.be.an('object');
      expect(notFound).to.have.property('error');
    });
  });
});

describe('productsServices.createProduct', () => {
  beforeEach(sinon.restore);

  it('dispara um erro quando productsModel nao retorna', async () => {
    sinon.stub(productsModels, 'createProduct').resolves([]);
    const product = await productsServices.createProduct('name');
    chai.expect(product).to.have.property('error');
  });

  it('quando productsModel retorna corretamente', async () => {
    sinon.stub(productsModels, 'createProduct').resolves([[]]);
    const product = await productsServices.createProduct('name');
    const { payload } = product;
    expect(product).to.have.property('payload');
    expect(product).to.have.property('httpStatus');
    expect(payload).to.have.property('name', 'name');
  });
});
