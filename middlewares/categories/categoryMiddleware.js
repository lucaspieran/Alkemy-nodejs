const {setResponseWithError} = require('../../util/common-response')
const statusMessages = require('../../constants/statusMessages');
const {
  check,
  validationResult
} = require('express-validator');
const statusCodes = require('../../constants/statusCodes');

const categoriesService = require('../../services/categories');


const _nameRequired = check('name', 'Name must be a string').isString().exists({
  checkFalsy: true
});
const _descriptionRequired = check('description', 'Description must be a string').isString().exists({
  checkFalsy: true
});

const _nameNotRequired = check('name', 'Name must be a string').optional().isString();
const _desciptionNotRequired = check('description', 'Description must be a string').optional().isString();

const _idRequired = check('id').not().isEmpty();
const _idExist = check('id').custom(
  async (id = '') => {
    const exists = await categoriesService.exists(id);
    if (!exists) {
      throw new Error('The id does not exist in DB');
    };
  }
);

const _validPage = check('page', 'Page must be a number grater than 0').optional().isInt({ min:0 });

const validResult = (req, res, next) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.VALIDATION_ERRORS,'error', errors.errors);
      }
      next()
  } catch (error) {
      next(error)
  }
};

const createCategoryValidation = [
  _nameRequired,
  _descriptionRequired,
  validResult
]

const updateCategoryValidation = [
  _nameNotRequired,
  _desciptionNotRequired,
  _idRequired,
  _idExist,
  validResult
];

const deleteCategoryValidation = [
  _idRequired,
  _idExist,
  validResult
]

const getCategoryValidation = [
  _validPage,
  validResult
]

module.exports = {
  updateCategoryValidation,
  createCategoryValidation,
  deleteCategoryValidation,
  getCategoryValidation
};