const { Slide }= require('../models');

const create = async (newSlide) => {
  return await Slide.create(newSlide);
}

const exists = async (id) => {
  try {
    const count = await Slide.count({
      where: {id}
    });
    if (count === 0){
      return false; //there is no register
    }
    else{
      return true; //there is a register with the specified id
    }
  } catch (error) {
    throw new Error(error);
  }
}

const getById = async (id) => {
  return await Slide.findByPk(id);
}

const getAll = async () => {
    try {
      return await Slide.findAll({
        attributes: ['imageUrl', 'order']
      });
    } catch (error) {
      throw new Error(error);
    }
}

const update = async (id, updatedSlide) => {
  await Slide.update({
    ...updatedSlide
  }, {
    where: {
      id
    }
  });
}

const deleteById = async (id) => {
  try {
    await Slide.destroy({
      where: {id}
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { exists, getAll, deleteById, getById, create, update };