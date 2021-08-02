'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, News }) {
      this.belongsTo(Users, { foreignKey: 'user_id'});
      this.belongsTo(News, { foreignKey: 'news_id'});
    }
  };
  Comments.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Body can not be null"
        },
        notEmpty: {
          msg: 'Body can not be empty'
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Comments',
  });
  return Comments;
};