'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritesNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favoritesNews.belongsTo(models.user)
    }
  };
  favoritesNews.init({
    userId: DataTypes.INTEGER,
    favoritesListNews: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'favoritesNews',
  });
  return favoritesNews;
};