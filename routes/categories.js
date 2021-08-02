var express = require('express');
var router = express.Router();

const { upload } = require('../config/multer');
const CategoriesController = require('../controllers/categories');
const {
  updateCategoryValidation,
  createCategoryValidation,
  deleteCategoryValidation,
  getCategoryValidation
} = require('../middlewares/categories/categoryMiddleware');

const {
  validJWT,
  hasRole
} = require('../middlewares/users/auth');


router.get('/', validJWT, hasRole('Admin'), getCategoryValidation, CategoriesController.getCategories);

router.get('/:id', validJWT, hasRole('Admin'), CategoriesController.getCategoryById);

router.post('/', validJWT, hasRole('Admin'),upload.single('image'),createCategoryValidation ,CategoriesController.postCategory);

router.put('/:id', validJWT, hasRole('Admin'), updateCategoryValidation, CategoriesController.updateCategory);

router.delete('/:id', validJWT, hasRole('Admin'), deleteCategoryValidation, CategoriesController.deleteCategory);

module.exports = router;