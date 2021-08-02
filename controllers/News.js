const statusMessages = require('../constants/statusMessages');
const statusCodes = require('../constants/statusCodes');
const {
  setResponseWithError,
  setResponseWithOk,
} = require('../util/common-response');
const service = require('../services/newsServices');

const allNews = async (req, res, next) => {
  const page = parseInt(req.query.page);
  try {
    let news = {};
    if (!page) {
      news = await service.getNews();
    } else {
      news = await service.getWithPagination(page);
    }
    if (Object.keys(news).length === 0) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.BAD_REQUEST,
        'error',
        news
      );
    } else {
      setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', news);
    }
  } catch (error) {
    next(error);
  }
};

const getNewsId = async (req, res, next) => {
  try {
    const news = await service.getNewsbyId(req.params.id);
    if (!news) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID,
        'error',
        news
      );
    } else {
      setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', news);
    }
  } catch (error) {
    next(error);
  }
};

const postNews = async (req, res, next) => {
  try {
    const { body } = req;
    const file = await req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    body.image = result.key;
    const newNews = await service.post(body);
    setResponseWithOk(
      res,
      statusCodes.OK,
      statusMessages.SUCCESS_CREATE,
      'ok',
      newNews
    );
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  const { id } = req.params;
  const updateNew = req.body;

  try {
    const exists = await service.exists(id);
    if (!exists) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID
      );
    }
    const updated = await service.update(updateNew, id);
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

const deleteNews = async (req, res, next) => {
  const { id } = req.params;

  try {
    const exists = await service.exists(id);
    if (!exists) {
      return setResponseWithError(
        res,
        statusCodes.BAD_REQUEST,
        statusMessages.INVALID_ID
      );
    }
    const deleted = await service.deleteNewsService(id);
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
module.exports = {
  allNews,
  postNews,
  updateNews,
  deleteNews,
  getNewsId,
};
