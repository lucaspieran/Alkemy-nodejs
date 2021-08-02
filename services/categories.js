const {
  Categories
} = require('../models');

exports.getAll = async () => {
  return Categories.findAll({
    attributes: ['name']
  });
}

exports.getById = async (id) => {
  return Categories.findByPk(id);
}

exports.getWithPagination = async (currentPage) => {
  let response = {}
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const totalPages = parseInt(Categories.count() / limit);
  const categories = await Categories.findAndCountAll({
    limit,
    offset,
    attributes: ['name']
  });
  response.categories = categories.rows;
  if (currentPage !== 1)
    response.prevPage = `/categories?page=${parseInt(currentPage) - 1}`;
  if(page < totalPages){
    response.nextPage =`/categories?page=${parseInt(currentPage) + 1}`;
  }
  return response;
}

exports.exists = async (id) => {
  const qty = await Categories.count({
    where: {
      id
    }
  });
  return qty !== 0;
}

exports.update = async (id, updatedCategory) => {
  await Categories.update({
    ...updatedCategory
  }, {
    where: {
      id
    }
  });
}

exports.delete = async (id) => {
  await Categories.destroy({
    where: {
      id
    }
  });
}

exports.create = async (newCategory) => {
  return Categories.create(newCategory);
}