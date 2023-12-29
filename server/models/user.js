'use strict';
const { hash } = require('../helper/bcrypt');
const Crypto = require("crypto");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.myMeme, {foreignKey: 'userId'})
      User.hasMany(models.Comment, {foreignKey: 'userId'})
      User.hasMany(models.Like, {foreignKey: 'userId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: DataTypes.STRING,
    premiumDate: DataTypes.DATE,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verifyToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
    user.role = 'basic'
    user.verifyToken = Crypto.randomBytes(10).toString("hex");
  })
  return User;
};