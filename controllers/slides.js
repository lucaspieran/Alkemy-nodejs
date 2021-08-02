const slideService = require('../services/slides');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const s3Service = require('../services/s3Service');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { setResponseWithError, setResponseWithOk } = require ('../util/common-response');

const createSlide = async(req, res, next) => {
  const newSlide = req.body;
  const file = req.file;
  try {
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    newSlide.imageUrl = result.key;
    const created = await slideService.create(newSlide);
    setResponseWithOk(res,statusCodes.CREATED,statusMessages.SUCCESS_CREATE,'ok',created);
  } catch (error) {
    next(error);
  }
}

const getAllSlides = async(req, res, next)=> {
    try {
        const slides = await slideService.getAll();
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',slides);
    } catch (error) {
      next(error);
    }
}

const getSlideById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const slide = await slideService.getById(id);
    if (slide === null) {
      setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',slide);
    }
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',slide);
  } catch (error) {
    next(error);
  }
}

const updateSlide = async (req, res, next) => {
  const id = req.params.id;
  const updatedSlide = req.body;
  try {
    const exists = await slideService.exists(req.params.id);
      if (!exists) {
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'ok',exists);
      }
    const updated = await slideService.update(id, updatedSlide);
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_UPDATE,'ok',updated);
  } catch (error) {
    next(error)
  }
}

const deleteSlide = async (req, res, next) => {
    try {
      const exists = await slideService.exists(req.params.id);
      if (!exists) {
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',exists);
      }
      await s3Service.deleteImage(exists.imageUrl);
      const deleted = await slideService.deleteById(req.params.id);
      setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_DELETE,'ok',deleted);
    } catch (error) {
      next(error);
    }
  }

module.exports = { getAllSlides, deleteSlide, getSlideById, createSlide, updateSlide };