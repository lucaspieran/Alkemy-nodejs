const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const authController = require('../../controllers/auth');

const { Users } = require('../../models/index');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const sgMail = require('@sendgrid/mail')

describe("User Controller methods", function () {

  const userCreated =  {
    id: 53,
    firstName: "Federico",
    lastName: "Puiggros",
    email: "barman7@outlook.com",
    photo: "ds",
    password: "$2b$10$2SH415hylMmDPPrUpmzNW.xjf6hkRd41lNNJQJgHG6k/S18CYkSBa",
    roleId: "1",
    updatedAt: "2021-07-22T20:36:02.711Z",
    createdAt: "2021-07-22T20:36:02.711Z"
  }

  const userFound = {      
    id: 53,
    firstName: "Federico",
    lastName: "Puiggros",
    email: "barman7@outlook.com",
    photo: "ds",
    password: "$2b$10$2SH415hylMmDPPrUpmzNW.xjf6hkRd41lNNJQJgHG6k/S18CYkSBa",
    roleId: "1",
    deletedAt: null,
    updatedAt: "2021-07-22T20:36:02.711Z",
    createdAt: "2021-07-22T20:36:02.711Z"}

  beforeEach(function () {
    sinon.stub(Users,"create").returns(userCreated);
    sinon.stub(Users,"findOne").returns(userFound);
    sinon.stub( bcrypt, 'compare').returns(true);
    sinon.stub(jwt, 'sign').returns('token')
    sinon.stub(sgMail, 'send').resolves()
  });
  afterEach(function () {
    Users.create.restore();
    Users.findOne.restore();
    bcrypt.compare.restore();
    jwt.sign.restore();
    sgMail.send.restore();
  });
  it("this test should log a user ", async function () {
    let result = {
      code: 'ok',
      message: 'Succesfully login',
      data: {
        token: 'token',
        userFound
      }
    };
    req = {body: {
      email: "barman7@outlook.com",
      password: "123"
    }};
    res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
    next = (err)=>{console.log(err);};

    await authController.login(req, res ,next);
    expect(Users.findOne.calledOnce).to.be.true;
    expect(bcrypt.compare.calledOnce).to.be.true;
    expect(jwt.sign.calledOnce).to.be.true;
    expect(JSON.stringify(res.send.firstCall.args[0])).to.equal(JSON.stringify(result))
  });
  
  it("This test should register a user", async function () {
    let result = {
      code: 'ok',
      message: 'Successfully created',
      data: {
        token: 'token',
        userCreated
      }
    }
    req = {body: {
      firstName: "Federico",
        lastName: "Puiggros",
        email: "barman7@outlook.com",
        photo: "ds",
        password: "123",
        roleId: "1"
    }};
    res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
    next = (err)=>{console.log(err);};
    await authController.register(req, res ,next);
    expect(Users.create.calledOnce).to.be.true;
    expect(sgMail.send.calledOnce).to.be.true;
    expect(jwt.sign.calledOnce).to.be.true;
    expect(JSON.stringify(res.send.firstCall.args[0])).to.equal(JSON.stringify(result))
  });

});
