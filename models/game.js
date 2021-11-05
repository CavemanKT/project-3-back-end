'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.Developer = this.belongsTo(models.Developer)
      Game.Images = this.hasMany(models.Image)
      Game.Talents = this.belongsToMany(models.Talent, {through: 'Application'})
      Game.Applications = this.hasMany(models.Application)
    }
  };

  Game.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    jobDescription: DataTypes.STRING,
    qualification: DataTypes.STRING,
    DeveloperId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
