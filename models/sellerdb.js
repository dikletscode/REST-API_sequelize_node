'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sellerdb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sellerdb.init({
    nameProduct: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    total: DataTypes.INTEGER,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sellerdb',
  });
  return Sellerdb;
};