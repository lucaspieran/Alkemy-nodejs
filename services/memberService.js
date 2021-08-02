const { members } = require('../models');

const getAll = async (limit, page = 0) => {
  return await members.findAndCountAll({
    limit,
    offset: page * limit,
  });
};
const createMember = async body => {
  return await members.create(body);
};
const deleteMembers = async id => {
  return await members.destroy({ where: { id } });
};

const getMemberById = async id => {
  return await members.findOne({ where: { id } });
};
const checkExist = async id => {
  const exist = await members.findByPk(id);
  if (!exist) {
    return false;
  }
  return true;
};

const updateMember = async (body, id) => {
  return await members.update(body, { where: { id } });
};

module.exports = {
  getAll,
  getMemberById,
  deleteMembers,
  createMember,
  updateMember,
  checkExist,
};
