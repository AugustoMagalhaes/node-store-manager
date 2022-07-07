const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('6 - Testando controller getAllProducts', async () => {
  beforeEach(sinon.restore);

  it('É possível chamar todos os produtos', async () => {
    const allProducts = {
      payload: [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
      httpStatus: 200,
    };

    sinon.stub(productsServices, 'getAllProducts').resolves(allProducts);

    const _req = {};
    const res = {};
    res.status = sinon.stub().callsFake(() => res);
    res.json = sinon.stub().returns(allProducts);

    const productsObj = await productsControllers.getAllProducts(_req, res);
    const products = productsObj.payload;
    expect(productsObj).to.have.property('payload');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.an('array');
  });

  it('dispara um erro quando existe o objeto "error" em getAllProducts ', async () => {
    const notFound = {
      error: {
        code: 'notFound',
        httpStatus: 404,
        message: 'Product not found',
      },
    };

    const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(notFound),
    };
    const _req = {};

    sinon.stub(productsServices, 'getAllProducts').resolves(notFound);
    const result = await productsControllers.getAllProducts(_req, res);
    expect(result).to.be.an('object');
    expect(result).to.have.property('error');
  });
});

// ----------------------------------------

describe('Controller getProductById', () => {
  beforeEach(sinon.restore);

  it('Testa se dispara um erro quando existe o objeto "error" em getProductById', async () => {
    const notFound = {
      error: {
        code: 'notFound',
        httpStatus: 404,
        message: 'Product not found',
      },
    };
    const msgError = { message: notFound.error.message };
    const req = { params: sinon.stub().returns('4') };
    const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(),
    };

    sinon.stub(productsServices, 'getProductById').resolves(notFound);
    await productsControllers.getProductById(req, res);
    return chai.expect(res.json.calledWith(msgError)).to.equal(true);
  });

  it('captura um produto especifico por id', async () => {
    const productObj = {
      payload: [{ id: 2, name: 'Traje de encolhimento' }],
      httpStatus: 200,
    };

    const req = { params: sinon.stub().returns('2') };
    const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(productObj.payload),
    };

    sinon.stub(productsServices, 'getProductById').resolves(productObj);
    await productsControllers.getProductById(req, res);
    const { payload, httpStatus } = productObj;
    expect(payload).to.deep.equal([{ id: 2, name: 'Traje de encolhimento' }]);

    expect(res.json()).to.deep.equal(payload);
    expect(res.status.calledWith(httpStatus)).to.equal(true);
  });
});

describe('Controller createProduct', () => {
  beforeEach(sinon.restore);

  it('Dispara erro quando não cria produto', async () => {
    const productObj = {
      error: {
        message: '',
      },
    };

    const req = { body: sinon.stub().returns('name') };
    const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(productObj.error),
    };

    sinon.stub(productsServices, 'createProduct').resolves(productObj);
    await productsControllers.createProduct(req, res);
    expect(productsControllers.createProduct(req, res)).to.eventually.be
      .rejected;
    expect(res.json.calledWith(productObj.error)).to.equal(true);
  });

  it('produto criado com sucesso', async () => {
    const productObj = {
      payload: {
        name: 'produto',
      },
      httpStatus: 201,
    };

    sinon.stub(productsServices, 'createProduct').resolves(productObj);
    const req = { body: sinon.stub().returns('produto') };
    const res = {
      status: sinon.stub().callsFake(() => res),
      json: sinon.stub().returns(productObj.payload),
    };

    const result = await productsControllers.createProduct(req, res);
    expect(result).to.deep.equal({ name: 'produto' });
  });
});
