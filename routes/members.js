var express = require('express');
var router = express.Router();
const { upload } = require('../config/multer');
const {
  createMiddleware,
  updateMiddleware,
  deleteMiddleware,
  getByIdMiddleware,
} = require('../middlewares/members/membersMiddleware');
const membersController = require('../controllers/members');
const { validJWT, hasRole } = require('../middlewares/users/auth');

router.get('/', validJWT, hasRole('Admin'), membersController.getMembers);
router.get(
  '/:id',
  validJWT,
  hasRole('Admin'),
  getByIdMiddleware,
  membersController.getMembersById
);
router.post(
  '/',
  validJWT,
  hasRole('Admin'),
  upload.single('image'),
  createMiddleware,
  membersController.createMember
);

router.put(
  '/:id',
  validJWT,
  hasRole('Admin'),
  updateMiddleware,
  membersController.updateMembers
);
router.delete(
  '/:id',
  validJWT,
  hasRole('Admin'),
  deleteMiddleware,
  membersController.deleteMember
);

module.exports = router;
