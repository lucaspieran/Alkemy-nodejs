const { activities } = require('../models');

const getAllActivities = async () => {
  return await activities.findAll();
};

const postActivities = async body => {
  return await activities.create(body);
};

const updateA = async (body, id) => {
  return await activities.update(body, {
    where: {
      id,
    },
  });
};
const checkExist = async id => {
  const exist = await activities.findByPk(id);
  if (!exist) {
    return false;
  }
  return true;
};

const getActivitiesById = async id => {
  return await activities.findOne({ where: { id } });
};

const deleteA = async id => {
  return await activities.destroy({ where: { id } });
};

module.exports = {
  getAllActivities,
  postActivities,
  deleteA,
  updateA,
  getActivitiesById,
  checkExist,
};
