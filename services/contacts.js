const { contact } = require('../models');

const getContact = async () => {
  return await contact.findAll();
}

const checkExist = async () => {
  const exist = await contact.findByPk(id);
  if (!exist) {
    return false;
  }
  return true;
}

const createContact = async (newContact) => {
  return await contact.create(newContact);
}

module.exports = { getContact, createContact, checkExist };
