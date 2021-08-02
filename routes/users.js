var express = require('express');
var router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const {
  patchRequestValidations,
  deleteRequestValidations
} = require('../middlewares/users/users');

const { 
  validJWT,
  hasRole,
  hasUserOwnership
} = require('../middlewares/users/auth');

/* GET users listing. */
router.get('/', validJWT, hasRole('Admin'), getAllUsers);
router.get('/:id', getUser); /* Ruta para usar en develop ya que para crear usuario y obtener tu propio usuario esta el endpoint auth */
router.post('/', createUser); /* Ruta para usar en develop ya que para crear usuario y obtener tu propio usuario esta el endpoint auth */
router.patch('/:id', patchRequestValidations, validJWT, hasUserOwnership, updateUser);
router.delete('/:id', deleteRequestValidations, validJWT, hasUserOwnership, deleteUser);

module.exports = router;
