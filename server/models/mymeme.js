'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myMeme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      myMeme.belongsTo(models.User, { foreignKey: 'userId' })
      myMeme.belongsTo(models.Meme, { foreignKey: 'memeId' })
    }
  }
  myMeme.init({
    userId: DataTypes.INTEGER,
    memeId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'myMeme',
  });
  return myMeme;
};