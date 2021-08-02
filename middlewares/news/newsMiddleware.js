const { check, validationResult } = require('express-validator');

const _nameRequired = check('name', 'Name must be a string').isString().exists({ checkFalsy: true });
const _contentRequired = check('content', 'Content must be a string').isString().exists({ checkFalsy: true });
const _imageRequired = check('image', 'Image must be valid URL').isURL().exists({ checkFalsy: true });
const _idRequired = check('categoryId').isInt().exists({ checkFalsy: true });

const _nameNotRequired = check('name', 'Name must be a string').isString().optional()
const _contentNotRequired = check('content', 'Content must be a string').isString().optional()
const _imageNotRequired = check('image', 'Image must be valid URL').isURL().optional()
const _idNotRequired = check('categoryId').isInt().optional()


const validResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const uploadNewsValidation = [
    _nameRequired,
    _contentRequired,
    _imageRequired,
    _idRequired,
    validResult
]
const updateNewsValidation = [
    _nameNotRequired,
    _contentNotRequired,
    _imageNotRequired,
    _idNotRequired,
    validResult
]


module.exports = {
    uploadNewsValidation,
    updateNewsValidation
}