"use strict"

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      this.hasMany(Post, {
        foreignKey: "userId",
        as: "posts",
      })
    }

    /**
     * Each time we return a user, we want to hide its id
     */
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }

  /**
   * Validators list in Sequelize:
   * @see https://sequelize.org/master/manual/validations-and-constraints.html
   */
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User must have a name",
          },
          notEmpty: {
            msg: "Name must not be empty",
          },
          is: {
            args: /^[a-z]+( [a-z]+)*$/i,
            msg: "Name can contain only letters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "User must have an email",
          },
          notEmpty: {
            msg: "Email must not be empty",
          },
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User must have a role",
          },
          isIn: {
            args: [["admin", "owner", "user"]],
            msg: "Role must be one of admin, owner or user",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  )

  return User
}
