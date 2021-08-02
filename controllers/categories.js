const categoryService = require('../services/categories');
const s3Service = require('../services/s3Service');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const { setResponseWithError, setResponseWithOk } = require('../util/common-response');

exports.getCategories = async (req, res, next) => {
  const page = parseInt(req.query.page);
  try {
    let response;
    if (page) {
      response = await categoryService.getWithPagination(page);
    } else {
      response = await categoryService.getAll();
    }
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',response);
  } catch (error) {
    next(error)
  }
}

exports.getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await categoryService.getById(id);
    if (response === null) {
      setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',response);
    }
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',response);
  } catch (error) {
    next(error);
  }
}

exports.updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const updatedCategory = req.body;
  try {
    const exists = await categoryService.exists(req.params.id);
      if (!exists) {
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'ok',exists);
      }
    const updated = await categoryService.update(id, updatedCategory);
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_UPDATE,'ok',updated);
  } catch (error) {
    next(error)
  }
}

exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    const exists = await categoryService.exists(req.params.id);
      if (!exists) {
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',exists);
      }
    const category = await categoryService.getById(id);
    await s3Service.deleteImage(category.image);
    const deleted = await categoryService.delete(id);
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_DELETE,'ok',deleted);
  } catch (error) {
    next(error);
  }
}

exports.postCategory = async (req, res, next) => {
  try {
    const newCategory = req.body;
    const file = req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    newCategory.image = result.key;
    const response = await categoryService.create(newCategory);
    setResponseWithOk(res,statusCodes.CREATED,statusMessages.SUCCESS_CREATE,'ok',response);
  } catch (error) {
    next(error);
  }
}