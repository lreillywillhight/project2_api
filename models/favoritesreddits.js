'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritesReddits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favoritesReddits.belongsTo(models.user)
    }
  };
  favoritesReddits.init({
    userId: DataTypes.INTEGER,
    favoritesListReddits: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'favoritesReddits',
  });
  return favoritesReddits;
};