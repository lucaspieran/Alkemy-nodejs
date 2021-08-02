const membersService = require('../services/memberService');
const { setResponseWithOk } = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');

const s3Service = require('../services/s3Service');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.getMembers = async (req, res, next) => {
  const { page } = req.query;
  const limit = 10;
  let previousPage;
  let nextPage;
  try {
    const response = await membersService.getAll(limit, page);
    const totalPages = parseInt(response.count / limit);
    const content = response.rows;

    if (page > 0) {
      previousPage = `members?page=${parseInt(page) - 1}`;
    }

    if (page < totalPages) {
      nextPage = `members?page=${parseInt(page) + 1}`;
    }
    setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', {
      content,
      totalPages,
      nextPage,
      previousPage,
      response,
    });
  } catch (error) {
    next(error);
  }
};

exports.createMember = async (req, res, next) => {
  try {
    const { body } = req;
    const file = req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    body.image = result.key;
    const member = await membersService.createMember(req.body);
    setResponseWithOk(
      res,
      statusCodes.CREATED,
      statusMessages.SUCCESS_CREATE,
      'ok',
      member
    );
  } catch (error) {
    next(error);
  }
};
exports.deleteMember = async (req, res, next) => {
  try {
    await membersService.deleteMembers(req.params.id);
    setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS_DELETE, 'ok');
  } catch (error) {
    next(error);
  }
};
exports.updateMembers = async (req, res, next) => {
  try {
    await membersService.updateMember(req.body, req.params.id);
    const updatedMember = await membersService.getMemberById(req.params.id);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS_UPDATE,
      'ok',
      updatedMember
    );
  } catch (error) {
    next(error);
  }
};

exports.getMembersById = async (req, res, next) => {
  try {
    const memberById = await membersService.getMemberById(req.params.id);
    setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', memberById);
  } catch (error) {
    next(error);
  }
};
