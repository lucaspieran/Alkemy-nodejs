const commentsService = require('../services/comments');

const errorCodes = require('../constants/statusCodes');
const errorMessages = require('../constants/statusMessages');

exports.getComments = async (req, res, next) => {
  try {
    const response = await commentsService.getAll();
    res.json(response);
  } catch (error) {
    next(error)
  }
}

exports.getCommentById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await commentsService.getById(id);
    if (response === null) {
      res.statusCode = errorCodes.NOT_FOUND;
      throw new Error(errorMessages.INVALID_ID);
    }
    res.json(response);
  } catch (error) {
    error.status = res.statusCode;
    next(error);
  }
}

exports.getCommentByNews = async (req , res, next) => {
  const news_id = req.params.news_id;
  try {
    const response = await commentsService.getByNewsId(news_id);
    res.json(response);
  } catch (error) {
    error.status = res.statusCode;
    next(error);
  }
}

exports.updateComment = async (req, res, next) => {
  const id = req.params.id;
  const updatedComment = req.body;
  try {
    const response = await commentsService.update(id, updatedComment);
    res.json({
      msg: errorMessages.SUCCESS_UPDATE
    });
  } catch (error) {
    error.status = res.statusCode;
    next(error)
  }
}

exports.deleteComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await commentsService.delete(id);
    res.json({
      msg: errorMessages.SUCCESS_DELETE
    });
  } catch (error) {
    error.status = res.statusCode;
    next(error);
  }
}

exports.postComment = async (req, res, next) => {
  const newComment = req.body;
  try {
    const response = await commentsService.create(newComment);
    res.json(response);
  } catch (error) {
    next(error);
  }
}