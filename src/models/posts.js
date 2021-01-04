'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Comment, { foreignKey: 'commentId', as: 'comments' });
    }
  }
  Post.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Category is required' },
          notEmpty: { msg: 'Category can not be empty' },
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question is required' },
          notEmpty: { msg: 'Question can not be empty' },
          len: {
            args: [8],
            msg: 'Question is too short',
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  );

  return Post;
};
