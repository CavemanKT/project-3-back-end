'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticityToken extends Model {
    static associate(models) {
      AuthenticityToken.Developer =this.belongsTo(models.Developer)
      AuthenticityToken.Talent =this.belongsTo(models.Talent)
    }
  };

  AuthenticityToken.init({
    token: DataTypes.STRING,
    DeveloperId: DataTypes.INTEGER,
    TalentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthenticityToken',
  });
  return AuthenticityToken;
};
