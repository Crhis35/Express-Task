'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment, User, Category }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
      this.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        categoryId: undefined,
      };
    }
  }
  Post.init(
    {
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
