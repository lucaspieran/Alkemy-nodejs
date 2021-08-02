const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const contactController = require('../../controllers/contacts');

const { contact } = require('../../models/index');

describe('Contact Controller methods', function () {
  beforeEach(function () {
    sinon
      .stub(contact, 'findAll')
      .returns({ name: 'dario', age: 19, estudiante: true });
    sinon
      .stub(contact, 'findByPk')
      .returns({ name: 'dario', age: 19, estudiante: true });
    //sinon.stub(contact,"create").returns(user);
  });
  afterEach(function () {
    contact.findAll.restore();
    contact.findByPk.restore();
    //contact.create.restore();
  });

  it(' getContacts method  ', async function () {
    req = {};
    res = {
      status: status => status,
      send: respuesta => {
        return { respuesta };
      },
    };
    next = err => {
      console.log(err);
    };

    await contactController.getContacts(req, res, next);

    expect(contact.findAll.calledOnce).to.be.true;
  });
  it('createContacts method ', async function () {
    req = {
      body: {
        name: 'Link',
        age: 22,
        adventure: true,
        password: '1234',
        email: 'email@test.test',
      },
    };
    res = {
      status: status => status,
      send: respuesta => {
        return { respuesta };
      },
    };
    next = err => {
      console.log(err);
    };

    sinon.stub(contact, 'create').returns(req.body);

    await contactController.createContacts(req, res, next);

    expect(contact.create.calledOnce).to.be.true;

    contact.create.restore();
  });
});
