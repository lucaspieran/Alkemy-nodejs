const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const newsController = require('../../controllers/News');

const { News } = require('../../models/index');

describe('News Controller methods', function () {
  beforeEach(function () {
    sinon.stub(News, 'findAll').returns({
      name: 'News',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'News about an Organization',
      categoryId: 2,
    });
    sinon.stub(News, 'findOne').returns({
      name: 'News',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'News about an Organization',
      categoryId: 2,
    });
    sinon.stub(News, 'findAndCountAll').returns({
      name: 'News',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'News about an Organization',
      categoryId: 2,
    });
    sinon.stub(News, 'findByPk').returns({
      name: 'News',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'News about an Organization',
      categoryId: 2,
    });
    sinon.stub(News, 'create').returns({
      name: 'News',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      content: 'News about an Organization',
      categoryId: 2,
    });
    sinon.stub(News, 'update').returns({ News: 'Updated' });
    sinon.stub(News, 'destroy').returns({ News: 'Deleted' });
  });
  afterEach(function () {
    News.findAll.restore();
    News.create.restore();
    News.findOne.restore();
    News.findAndCountAll.restore();
    News.findByPk.restore();
    News.update.restore();
    News.destroy.restore();
  });

  it('Get allNews method', async function () {
    req = { query: { page: 2 } };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await newsController.allNews(req, res, next);
    expect(News.findAndCountAll.calledOnce).to.be.true;
  });
  it('getNewsId method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await newsController.getNewsId(req, res, next);
    expect(News.findOne.calledOnce).to.be.true;
  });
  it('postNews method', async function () {
    req = {};
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await newsController.postNews(req, res, next);
    expect(News.create.calledOnce).to.be.true;
  });
  it('deleteNews method', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await newsController.deleteNews(req, res, next);
    expect(News.destroy.calledOnce).to.be.true;
  });
  it('updateNews method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await newsController.updateNews(req, res, next);
    expect(News.update.calledOnce).to.be.true;
  });
});
