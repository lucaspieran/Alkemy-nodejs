'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasMany(models.News)
    }
  };
  Categories.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name can not be null"
        },
        notEmpty: {
          msg: "Name can not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description can not be null"
        },
        notEmpty: {
          msg: "Description can not be empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image can not be null"
        },
        notEmpty: {
          msg: "Image can not be empty"
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Categories',
  });
  return Categories;
};