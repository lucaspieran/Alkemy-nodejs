const express = require('express');
const { upload } = require('../config/multer');
const router = express.Router();
const {
  allOrganizations,
  checkExistence,
  getPublicInfo,
  updatePublicInfo,
  addOrganization,
  deleteOrganization,
  updateOrganization,
} = require('../controllers/organizations');
const {
  updateOrganizationPublicInfoValidation,
  updateOrganizationValidation,
  deleteOrganizationValidation,
  createOrganizationValidation,
} = require('../middlewares/organizations/organizationMiddleware');

const { validJWT, hasRole } = require('../middlewares/users/auth');

router.get('/', allOrganizations);
router.get('/:id', checkExistence);
router.post(
  '/',
  validJWT,
  hasRole('Admin'),
  upload.single('image'),
  createOrganizationValidation,
  addOrganization
);
router.put(
  '/:id',
  validJWT,
  hasRole('Admin'),
  updateOrganizationValidation,
  updateOrganization
);
router.delete(
  '/:id',
  validJWT,
  hasRole('Admin'),
  deleteOrganizationValidation,
  deleteOrganization
);
router.get('/:id/public', getPublicInfo);
router.post(
  '/:id/public',
  validJWT,
  hasRole('Admin'),
  updateOrganizationPublicInfoValidation,
  updatePublicInfo
);

module.exports = router;
