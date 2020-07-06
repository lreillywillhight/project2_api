'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newsViewedLast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.newsViewedLast.belongsTo(models.user)
    }
  };
  newsViewedLast.init({
    userId: DataTypes.INTEGER,
    newsViewedLast: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'newsViewedLast',
  });
  return newsViewedLast;
};