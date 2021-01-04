'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'postId', as: 'comments' });
    }
  }
  Comment.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Info is required' },
          notEmpty: { msg: 'Info can not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'comments',
      modelName: 'Comment',
    }
  );
  return Comment;
};
