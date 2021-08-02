const {
  check,
  validationResult
} = require('express-validator');
const commentService = require('../../services/comments');
const UserService = require('../../services/userService');
const userService = new UserService();
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');
const {
  News
} = require('../../models/index');
const AppError = require('../../errors/appError');

const _userIdRequire = check('user_id', 'User Id required').exists({
  checkFalsy: true
}).isNumeric().custom(async (id = '') => {
  const exists = await userService.findById(id);
  console.log(exists);
  if (!exists) {
    error.status = statusCodes.BAD_REQUEST;
    throw new Error(statusMessages.INVALID_ID);
  };
});
const _bodyRequire = check('body', 'Body required').exists({
  checkFalsy: true
}).isString();
const _newsIdRequire = check('news_id', 'News Id required').exists({
  checkFalsy: true
}).isNumeric().custom(async (id = '') => {
  const qty = await News.count({
    where: {
      id
    }
  });
  if (qty === 0) {
    throw new Error(statusMessages.INVALID_ID);
  }
});

const _userIdNotRequire = check('user_id', 'User Id required').isNumeric().optional();
const _bodyNotRequire = check('body', 'Body required').isString().optional();
const _newsIdNotRequire = check('news_id', 'News Id required').isNumeric().optional();
const _idRequire = check('id', 'Id is required').exists({
  checkFalsy: true
}).isNumeric();
const _commentExists = check('id').custom(async (id = '') => {
  const exists = await commentService.exists(id);
  if (!exists) {
    throw new AppError(statusMessages.INVALID_ID, statusCodes.NOT_FOUND);
  };
})

const validResult = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError(`Validation Errors: ${errors.errors[0].msg}`, statusCodes.BAD_REQUEST);
    }
    next();
  } catch (error) {
    error.status = statusCodes.BAD_REQUEST;
    next(error);
  }

};

const createCommentMiddleware = [
  _userIdRequire,
  _bodyRequire,
  _newsIdRequire,
  validResult
]
const updateCommentMiddleware = [
  _userIdNotRequire,
  _bodyNotRequire,
  _newsIdNotRequire,
  _idRequire,
  _commentExists,
  validResult
]

const deleteCommentMiddleware = [
  _idRequire,
  _commentExists,
  validResult
]

module.exports = {
  createCommentMiddleware,
  updateCommentMiddleware,
  deleteCommentMiddleware
};