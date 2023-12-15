'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meme.hasMany(models.myMeme, {foreignKey: 'memeId'})
      Meme.hasMany(models.Comment, {foreignKey: 'memeId'})
      Meme.hasMany(models.Like, {foreignKey: 'memeId'})
    }
  }
  Meme.init({
    otherId: DataTypes.STRING,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    boxCount: DataTypes.INTEGER,
    captions: DataTypes.INTEGER,
    status: DataTypes.STRING,
    text1: DataTypes.STRING,
    text2: DataTypes.STRING,
    text3: DataTypes.STRING,
    text4: DataTypes.STRING,
    text5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Meme',
  });
  return Meme;
};