'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticityToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
