'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Application.Game =  this.belongsTo(models.Game)
      Application.Talent = this.belongsTo(models.Talent)
    }
  };
  Application.init({
    GameId: DataTypes.INTEGER,
    TalentId: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
