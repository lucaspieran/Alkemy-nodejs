const contactService = require('../services/contacts');
const mailServices = require('../services/mailServices');
const mailText = require('../constants/mailText');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const { setResponseWithError, setResponseWithOk } = require ('../util/common-response');

const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContact();
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',contacts);
  } catch (error) {
    next(error);
  }
}

const createContacts = async (req, res, next) => {
  const newContact = req.body;
  try {
    const contacts = await contactService.createContact(newContact);
    mailServices(contacts.email, mailText.NEW_CONTACT);
    setResponseWithOk(res,statusCodes.CREATED,statusMessages.SUCCESS_CREATE,'ok',contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = { getContacts, createContacts };
