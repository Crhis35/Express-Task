'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      // define association here
      this.belongsTo(Post, { foreignKey: 'postId', as: 'comments' });
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
    // toJSON() {
    //   return {
    //     ...this.get(),
    //     id: undefined,
    //     postId: undefined,
    //     userId: undefined,
    //   };
    // }
  }
  Comment.init(
    {
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
  Comment.beforeCreate(async (comment, options) => (comment.id = uuidv4()));
  return Comment;
};
