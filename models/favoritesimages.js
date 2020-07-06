'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritesImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favoritesImages.belongsTo(models.user)
    }
  };
  favoritesImages.init({
    userId: DataTypes.INTEGER,
    favoritesListImages: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'favoritesImages',
  });
  return favoritesImages;
};