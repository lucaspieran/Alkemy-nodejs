'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Organization}) {
      // define association here
      this.belongsTo(Organization ,{foreignKey: 'organizationId', as: 'organization'} )
    }
  };
  SocialMedia.init({
    facebook: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
    paranoid: true,
  });
  return SocialMedia;
};