"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define foreign key for custom target key
      this.hasMany(models.User, { foreignKey: "roleId", as: "user" });
    }
  }

  Role.init(
    {
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
      tableName: "roles",
      modelName: "Role",
    }
  );

  return Role;
};
