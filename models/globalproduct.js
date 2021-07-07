"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Globalproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Globalproduct.init(
    {
      nameProduct: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: { type: DataTypes.INTEGER(20), allowNull: false, defaultValue: 0 },
      description: DataTypes.STRING,
      total: { type: DataTypes.INTEGER(20), allowNull: false, defaultValue: 0 },
      images: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "globalProducts",
      modelName: "Globalproduct",
    }
  );
  return Globalproduct;
};
