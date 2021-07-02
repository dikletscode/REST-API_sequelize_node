"use strict";
const { Model, UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role }) {
      this.belongsTo(Role, { foreignKey: "role_id", as: "fk_role" });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      tableName: "users",
      modelName: "Users",
      hooks: {
        beforeValidate: async (user, options) => {
          const hash = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
          user.password = hash;
        },
      },
      sequelize,
    }
  );
  return Users;
};
