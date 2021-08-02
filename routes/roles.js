var express = require('express');
var router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole  } = require('../controllers/roles')

const requestValidations = require('../middlewares/roles/roleMiddleware')


/* GET roles listing. */
router.get('/', getAllRoles);

/* GET role by id. */
router.get('/:id', requestValidations, getRoleById);

/* POST role create*/
router.post('/', createRole);

/* PATCH role by id*/
router.patch('/:id', requestValidations, updateRole);

/* DELETE role by id*/
router.delete('/:id', requestValidations, deleteRole);

module.exports = router;
