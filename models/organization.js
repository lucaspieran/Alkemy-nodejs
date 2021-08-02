'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({SocialMedia, Slide}) {
     this.hasOne(SocialMedia, {foreignKey: 'organizationId', as:'socialMedia'});
     this.hasMany(Slide, {foreignKey: 'organizationId', as:'slide'});
    }
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,        
      },
      address: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      welcomeText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      aboutUsText: DataTypes.TEXT,
    }, {
      sequelize,
      modelName: 'Organization',
      paranoid: true,
    }
  );
  return Organization;
};
