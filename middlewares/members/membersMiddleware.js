const { check, validationResult } = require('express-validator');

const statusCodes = require('../../constants/statusCodes');
const membersService = require('../../services/memberService');

const _nameRequired = check('name')
  .isString()
  .withMessage('Name must be a string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('Name field must not be empty')
  .bail();

const _imageRequired = check('image')
  .isString()
  .withMessage('Image must be a string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('image field must not be empty')
  .bail();

const _idExist = check('id')
  .not()
  .isEmpty()
  .withMessage('id must be provided')
  .bail()
  .custom(async (id = '') => {
    const exists = await membersService.checkExist(id);
    if (!exists) {
      throw new Error('The id does not exist in DB');
    }
  });

const validResult = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMessage = '';
      for (error of errors.array()) {
        errorMessage += `${error.msg} \n`;
      }
      throw new Error(errorMessage);
    }
    next();
  } catch (error) {
    error.status = statusCodes.BAD_REQUEST;
    next(error);
  }
};
exports.createMiddleware = [_nameRequired, validResult];

exports.updateMiddleware = [_nameRequired, _imageRequired, _idExist, validResult];

exports.deleteMiddleware = [_idExist, validResult];

exports.getByIdMiddleware = [_idExist, validResult];
