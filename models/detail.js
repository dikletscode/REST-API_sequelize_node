"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Detail.upsert = async (value, condition) => {
    return await Detail.findOne({
      where: condition,
    }).then((obj) => {
      if (obj) return obj.update(value);
      return Detail.create(value);
    });
  };
  Detail.init(
    {
      address: DataTypes.STRING(100),
      notelp: DataTypes.STRING(15),
      images: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "detailUsers",
      modelName: "Detail",
    }
  );
  return Detail;
};
