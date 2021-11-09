'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.Game = this.belongsTo(models.Game)
    }
  };

  Image.init({
    GameId: DataTypes.INTEGER,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING,
    url3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
