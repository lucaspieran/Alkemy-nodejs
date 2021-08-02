const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');
const { validJWT, hasRole } = require('../middlewares/users/auth');
const {
  createMiddleware,
  updateMiddleware,
  deleteMiddleware,
  getByIdMiddleware,
} = require('../middlewares/activities/activitiesMiddleware');
const { upload } = require('../config/multer');

router.get('/', activitiesController.getActivities);

router.post(
  '/',
  validJWT,
  hasRole('Admin'),
  upload.single('image'),
  createMiddleware,
  activitiesController.createActivities
);

router.get('/:id', getByIdMiddleware, activitiesController.getById);

router.put(
  '/:id',
  validJWT,
  hasRole('Admin'),
  updateMiddleware,
  activitiesController.updateActivities
);

router.delete(
  '/:id',
  validJWT,
  hasRole('Admin'),
  deleteMiddleware,
  activitiesController.deleteActivity
);

module.exports = router;
