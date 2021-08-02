'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  members.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      image: {
        type: DataTypes.STRING,
        facebookUrl: DataTypes.STRING,
        instagramUrl: DataTypes.STRING,
        linkedinUrl: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'members',
    }
  );
  return members;
};
