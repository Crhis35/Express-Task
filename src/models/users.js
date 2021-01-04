'use strict';
const { Model } = require('sequelize');
const bycript = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Name is required' },
          notEmpty: { msg: 'Name can not be empty' },
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email can not be empty' },

          isEmail: true,
        },
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'admin',
        allowNull: false,

        validate: {
          notNull: { msg: 'Role is required' },
          notEmpty: { msg: 'Role can not be empty' },
          isIn: {
            args: [['admin', 'user']],
            msg: 'That Role not allowed',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password can not be empty' },
          len: {
            args: [8, 42],
            msg: 'Password is too short min(6)',
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  User.beforeCreate(
    async (user, options) =>
      (user.password = await bycript.hash(user.password, 12))
  );
  User.prototype.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bycript.compare(candidatePassword, userPassword);
  };
  return User;
};
