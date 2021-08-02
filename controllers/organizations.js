const service = require('../services/organizations');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const {
  setResponseWithError,
  setResponseWithOk,
} = require('../util/common-response');
const s3Service = require('../services/s3Service');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const allOrganizations = async (req, res, next) => {
  try {
    const response = await service.getAll();
    setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', response);
  } catch (error) {
    next(error);
  }
};

const deleteOrganization = async (req, res, next) => {
  const { id } = req.params;
  try {
    const organization = await service.exists(id);
    if (!organization) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID
      );
    }
    const deleted = await service.deleteById(id);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS_DELETE,
      'ok',
      deleted
    );
  } catch (error) {
    next(error);
  }
};

const checkExistence = async (req, res, next) => {
  try {
    const organization = await service.exists(req.params.id);
    if (!organization) {
      setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.INVALID_ID);
    } else {
      setResponseWithOk(
        res,
        statusCodes.OK,
        statusMessages.SUCCESS,
        'ok',
        organization
      );
    }
  } catch (error) {
    next(error);
  }
};

const updateOrganization = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const organization = await service.exists(id);
    if (!organization) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID
      );
    }
    const updated = await service.update(body, id);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS_UPDATE,
      'ok',
      updated
    );
  } catch (error) {
    next(error);
  }
};
const addOrganization = async (req, res, next) => {
  try {
    const { body } = req;
    const file = await req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    body.image = result.key;
    const newOrganization = await service.add(body);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS,
      'ok',
      newOrganization
    );
  } catch (error) {
    next(error);
  }
};

const getPublicInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const info = await service.getPublicInfo(id);
    if (!info) {
      setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.INVALID_ID);
    } else {
      setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', info);
    }
  } catch (error) {
    next(error);
  }
};

const updatePublicInfo = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const organization = await service.exists(id);
    if (!organization) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID
      );
    }
    const updated = await service.changePublicInfo(id, body);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS_UPDATE,
      'ok',
      updated
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allOrganizations,
  addOrganization,
  getPublicInfo,
  updatePublicInfo,
  checkExistence,
  deleteOrganization,
  updateOrganization,
};
