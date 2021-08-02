const {
  check,
  validationResult
} = require('express-validator');
const statusCodes = require('../../constants/statusCodes');

const _keyRequired = check('key').exists({checkFalsy: true});


const validResult = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errorMessage = '';
      for(error of errors.array()){
        errorMessage += `${error.msg} \n`
      }
      throw new Error(errorMessage);
    }
    next();
  } catch (error) {
    error.status = statusCodes.BAD_REQUEST;
    next(error);
  }
};

const getImageValidation = [
  _keyRequired,
  validResult
]


module.exports = {
  getImageValidation
};