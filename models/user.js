"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessToken = require("../auth/accesToken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "roleId",
      });
    }
  }
  User.auth = (password, hashed, data) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashed, (err, result) => {
        if (result) {
          const token = accessToken(data[0].id);
          resolve({ isLogin: true, data: data, token: token });
        } else {
          reject("u can't acceess");
        }
      });
    });
  };

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      freezeTableName: true,
      tableName: "users",
      modelName: "User",
      hooks: {
        beforeValidate: async (user, option) => {
          if (user.password != "") {
            const hashed = await new Promise((resolve, reject) => {
              bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
              });
            });
            user.password = hashed;
          }
        },
      },
      sequelize,
    }
  );

  return User;
};
