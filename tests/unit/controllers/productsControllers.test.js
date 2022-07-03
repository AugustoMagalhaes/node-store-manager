const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('6 - Testando controller getAllProducts', () => {
  before(async () => {
    const allProducts = {
      payload: [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
      httpStatus: 200,
    };

    sinon.stub(productsServices, 'getAllProducts').resolves(allProducts);
  });

  after(async () => {
    productsServices.getAllProducts.restore();
  });

  it('É possível chamar todos os produtos', async () => {
    const productsObj = await productsControllers.getAllProducts();
    const products = productsObj.payload;
    console.log('PRODUCTS', products);
    expect(productsObj).to.have.property('payload');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.an('array');
  });
});

describe('7 - Testando controller getProductById', () => {
  describe('Se o produte existe', () => {
    before(async () => {
      const firstProduct = {
        payload: { id: 1, name: 'Martelo de Thor' },
        httpStatus: 200,
      };

      sinon.stub(productsServices, 'getProductById').resolves(firstProduct);
    });

    after(async () => {
      productsServices.getProductById.restore();
    });

    it('Retorna objeto com payload e httpStatus corretos', async () => {
      const thorsHammer = await productsControllers.getProductById(1);
      const { payload, httpStatus } = thorsHammer;
      expect(thorsHammer).to.be.an('object');
      expect(payload).to.be.an('array');
      expect(payload).to.have.lengthOf(3);
      payload.forEach((product, index) => {
        expect(product).to.have.property('id', index + 1);
      });
    });
  });

  describe('Quando produto nao existe', async () => {
    before(async () => {
      const notFound = {
        error: {
          code: 'notFound',
          httpStatus: 404,
          message: 'Product not Found',
        },
      };

      sinon.stub(productsServices, 'getProductById').resolves(notFound);
    });

    after(async () => {
      productsServices.getProductById.restore();
    });

    it('Retorna objeto de erro correto', async () => {
      const errorObj = await productsControllers.getProductById(4);
      const { error } = errorObj;
      expect(error).to.be.an('object');
      expect(error).to.have.property('message');
    });
  });
});
