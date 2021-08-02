const { check, validationResult } = require('express-validator');

const _nameRequired = check('name', 'Name must be a string').isString().exists({ checkFalsy: true });
const _imageRequired = check('image', 'Image must be valid URL').isURL().exists({ checkFalsy: true });
const _emailRequired = check('email', 'Email must be an email').isEmail().exists({ checkFalsy: true });
const _welcomeTextRequired = check('welcomeText', 'WelcomeText must be a string').isString().exists({ checkFalsy: true });
const _idRequired = check('id').isInt().exists({ checkFalsy: true });

const _addressNotRequired = check('address', 'Address must be a string').optional().isString();
const _phoneNotRequired = check('phone', 'phone must be a number').optional().isInt();
const _aboutUsTextNotRequired = check('aboutUsText', 'About Us must be a string').optional().isString();
const _nameNotRequired = check('name', 'Name must be a string').optional().isString();
const _imageNotRequired = check('image', 'Image must be valid URL').optional().isURL();
const _emailNotRequired = check('email', 'Email must be an email').optional().isEmail();
const _welcomeTextNotRequired = check('welcomeText', 'WelcomeText must be a string').optional().isString();
const _facebookNotRequired = check('facebook', 'Facebook must be valid URL').optional().isURL();
const _linkedinNotRequired = check('linkedin', 'Linkedin must be valid URL').optional().isURL();
const _instagramNotRequired = check('instagram', 'Instagram must be valid URL').optional().isURL();

const validResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createOrganizationValidation = [
  _nameRequired,
  _imageRequired,
  _addressNotRequired,
  _phoneNotRequired,
  _emailRequired,
  _welcomeTextRequired,
  _aboutUsTextNotRequired,
  validResult,
];
const updateOrganizationValidation = [
  _idRequired,
  _nameNotRequired,
  _imageNotRequired,
  _addressNotRequired,
  _phoneNotRequired,
  _emailNotRequired,
  _welcomeTextNotRequired,
  _aboutUsTextNotRequired,
  validResult,
];
const updateOrganizationPublicInfoValidation = [
  _nameNotRequired,
  _imageNotRequired,
  _addressNotRequired,
  _phoneNotRequired,
  _emailNotRequired,
  _welcomeTextNotRequired,
  _aboutUsTextNotRequired,
  _facebookNotRequired,
  _linkedinNotRequired,
  _instagramNotRequired,
  validResult,
];
const deleteOrganizationValidation = [
  _idRequired,
];

module.exports = {
  createOrganizationValidation,
  updateOrganizationValidation,
  updateOrganizationPublicInfoValidation,
  deleteOrganizationValidation,
};
