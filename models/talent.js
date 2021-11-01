'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Talent.Games = this.belongsToMany(models.Game, { through : 'Application'})
      Talent.Applications = this.hasMany(models.Application)
      Talent.AuthenticityTokens = this.hasMany(models.AuthenticityToken)
    }
  };
  Talent.init({
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    type: DataTypes.STRING,
    resume: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Talent',
  });
  return Talent;
};
