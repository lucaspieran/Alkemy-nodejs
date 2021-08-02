const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { validJWT, hasRole } = require('../middlewares/users/auth');
const { createMiddleware } = require('../middlewares/contacts/contactsMiddleware');

router.get('/', validJWT, hasRole('Admin'), contactsController.getContacts); //As Admin
router.post('/', createMiddleware, contactsController.createContacts); //As user

module.exports = router;
