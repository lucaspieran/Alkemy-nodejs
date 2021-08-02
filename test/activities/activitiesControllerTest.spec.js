const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const activitiesController = require('../../controllers/activities');

const { activities } = require('../../models/index');

describe('activitiesController methods', function () {
  beforeEach(() => {
    sinon.stub(activities, 'findAll').returns({
      name: 'activities',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    });
    sinon.stub(activities, 'findOne').returns({
      name: 'activities',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    });
    sinon.stub(activities, 'create').returns({
      name: 'activities',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    });
    sinon.stub(activities, 'update').returns({ activities: 'Updated' });
    sinon.stub(activities, 'destroy').returns({ activities: 'Deleted' });
  });
  afterEach(function () {
    activities.findAll.restore();
    activities.create.restore();
    activities.findOne.restore();
    activities.update.restore();
    activities.destroy.restore();
  });

  it('getActivities method', async function () {
    req = {};
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await activitiesController.getActivities(req, res, next);
    expect(activities.findAll.calledOnce).to.be.true;
  });
  it('getActivityById method', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await activitiesController.getById(req, res, next);
    expect(activities.findOne.calledOnce).to.be.true;
  });
  it('updateActivities method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await activitiesController.updateActivities(req, res, next);
    expect(activities.update.calledOnce).to.be.true;
  });
  it('deleteActivities method ', async function () {
    req = { params: 1 };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await activitiesController.deleteActivity(req, res, next);
    expect(activities.destroy.calledOnce).to.be.true;
  });
  it('createActivities method ', async function () {
    req = {
      body: { name: 'activitiesnumber 1', image: 'asd.png', content: 'testContent' },
    };
    res = {
      status: status => status,
      send: response => response,
    };
    next = err => console.log(err);

    await activitiesController.createActivities(req, res, next);
    expect(activities.create.calledOnce).to.be.true;
  });
});
