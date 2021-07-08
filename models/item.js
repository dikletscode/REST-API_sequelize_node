"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { targetKey: "id", foreignKey: "itemID" });
    }
  }
  Item.init(
    {
      nameProduct: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: { type: DataTypes.INTEGER(30), allowNull: false },
      description: DataTypes.STRING,
      total: { type: DataTypes.INTEGER(20), allowNull: false },
      images: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Items",
      modelName: "Item",
    }
  );
  return Item;
};
