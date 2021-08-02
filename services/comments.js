const {
  Comments
} = require('../models');

exports.getAll = async () => {
  return Comments.findAll({
    attributes: ['body'],
    order: [
      ['createdAt', 'DESC']
    ],
  });
}

exports.getById = async (id) => {
  return Comments.findByPk(id);
}

exports.getByNewsId = async (news_id) => {
  return Comments.findAll({
    where: {news_id}
  });
}

exports.exists = async (id) => {
  const qty = await Comments.count({
    where: {
      id
    }
  });
  return qty !== 0;
}

exports.isOwner = async (id, user_id) => {
  const qty = await Comments.count({
    where: {
      id,
      user_id
    }
  });
  return qty !== 0;
}

exports.update = async (id, updatedCategory) => {
  await Comments.update({
    ...updatedCategory
  }, {
    where: {
      id
    }
  });
}

exports.delete = async (id) => {
  await Comments.destroy({
    where: {
      id
    }
  });
}

exports.create = async (newComment) => {
  return Comments.create(newComment);
}