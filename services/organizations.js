const { Organization, SocialMedia } = require('../models');

const getAll = () => Organization.findAll({ attributes: ['name', 'image'] });

const update = (body, id) => Organization.update(body, { where: { id } });

const exists = (id) => Organization.findByPk(id, { include: 'socialMedia' });

const deleteById = (id) => Organization.destroy({ where: { id } });

const add = (body) => Organization.create(body);

const getPublicInfo = (id) => Organization.findOne({
  where: { id },
  include: [
    { association: 'socialMedia', attributes: ['facebook', 'linkedin', 'instagram'] },
    { association: 'slide', attributes: ['imageUrl', 'text', 'order']}
  ],
  attributes: ['name', 'image', 'address', 'phone'],
  order: [
    [{ model: 'slide', as: 'Div' }, 'order', 'ASC']
  ]
});

const changePublicInfo = async (id, changes) => {
  const {
    name, facebook, linkedin, instagram, image, address, phone,
  } = changes;
  let response = [];

  const organizationId = id;

  if (facebook || linkedin || instagram) {
    const hasSocialMedia = await SocialMedia.findOne({ where: { organizationId } })
      if (hasSocialMedia) {
        const update = await hasSocialMedia.update(changes)
        response.push(update)
        }
      if (!hasSocialMedia) {
        const contactInfo = await SocialMedia.create({
          facebook, linkedin, instagram, organizationId,
        })
        response.push(contactInfo)
      }
  }
  if (name || image || address || phone) {
    const update = await Organization.update(changes, { where: { id } })
    response.push(update)
  }
  return response;
};

module.exports = {
  getAll,
  update,
  exists,
  deleteById,
  add,
  getPublicInfo,
  changePublicInfo,
};
