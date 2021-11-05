'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    static associate(models) {
      Developer.Games = this.hasMany(models.Game)
      Developer.AuthenticityTokens = this.hasMany(models.AuthenticityToken)
    }
  };

  Developer.init({
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Developer',
  });
  return Developer;
};
