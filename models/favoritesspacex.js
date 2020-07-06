'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritesSpaceX extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favoritesSpaceX.belongsTo(models.user)
    }
  };
  favoritesSpaceX.init({
    userId: DataTypes.INTEGER,
    favoritesListSpaceX: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'favoritesSpaceX',
  });
  return favoritesSpaceX;
};