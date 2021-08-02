const { check, validationResult } = require('express-validator');

const statusCodes = require('../../constants/statusCodes');
const contactsService = require('../../services/contacts');

const _nameRequired = check('name')
  .isString()
  .withMessage('Name must be a string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('Name field must not be empty')
  .bail();

const _emailRequired = check('email')
  .isString()
  .withMessage('Email must be a string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('Email field must not be empty')
  .bail();

const _idExist = check('id')
  .not()
  .isEmpty()
  .withMessage('id must be provided')
  .bail()
  .custom(async (id = '') => {
    const exists = await contactsService.checkExist(id);
    if (!exists) {
      throw new Error('The id does not exist in DB');
    }
  });

const validResult = (req, res, next) => {
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.VALIDATION_ERRORS,'error',errors.errors);     
    }
    next();
  
};

exports.createMiddleware = [_nameRequired, _emailRequired, validResult];
