'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'categoryId', as: 'posts' });
    }
    // toJSON() {
    //   return {
    //     ...this.get(),
    //     id: undefined,
    //     userId: undefined,
    //   };
    // }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name can not be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'categories',
      modelName: 'Category',
    }
  );
  Category.beforeCreate(async (category, options) => (category.id = uuidv4()));
  return Category;
};
