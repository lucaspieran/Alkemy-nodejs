const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const organizationController = require('../../controllers/organizations');

const { Organization } = require('../../models/index');

describe('Organization Controller methods', function () {
  beforeEach(function () {
    sinon
      .stub(Organization, 'findAll')
      .returns({
        name: 'Organization',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      });
    sinon
      .stub(Organization, 'findOne')
      .returns({
        name: 'Organization',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      });
    sinon
      .stub(Organization, 'findByPk')
      .returns({
        name: 'Organization',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      });
    sinon
      .stub(Organization, 'create')
      .returns({
        name: 'Organization',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      });
    sinon.stub(Organization, 'update').returns({ organization: 'Updated' });
    sinon.stub(Organization, 'destroy').returns({ organization: 'Deleted' });
  });
  afterEach(function () {
    Organization.findAll.restore();
    Organization.create.restore();
    Organization.findOne.restore();
    Organization.findByPk.restore();
    Organization.update.restore();
    Organization.destroy.restore();
  });

  it('Get allOrganizations method ', async function () {
    req = {};
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.allOrganizations(req, res, next);
    expect(Organization.findAll.calledOnce).to.be.true;
  });
  it(' getPublicInfo method', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.getPublicInfo(req, res, next);
    expect(Organization.findOne.calledOnce).to.be.true;
  });
  it('checkExistence method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.checkExistence(req, res, next);
    expect(Organization.findByPk.calledOnce).to.be.true;
  });
  it(' updateOrganization method', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.updateOrganization(req, res, next);
    expect(Organization.update.calledOnce).to.be.true;
  });
  it(' deleteOrganization method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.deleteOrganization(req, res, next);
    expect(Organization.destroy.calledOnce).to.be.true;
  });
  it(' addOrganization method ', async function () {
    req = { body: { facebook: 'facebook.com', name: 'organization number 1' } };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.addOrganization(req, res, next);
    expect(Organization.create.calledOnce).to.be.true;
  });
  it('updatePublicInfo method ', async function () {
    req = { params: 1, body: { name: 'organization number 1' } };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await organizationController.updatePublicInfo(req, res, next);
    expect(Organization.update.calledOnce).to.be.true;
  });
});
