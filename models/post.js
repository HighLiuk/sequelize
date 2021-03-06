"use strict"

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      })
    }

    /**
     * Each time we return a post, we want to hide its id
     */
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      }
    }
  }

  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Post must have a body",
          },
          notEmpty: {
            msg: "body must not be empty",
          },
          max: {
            args: 255,
            msg: "Body is too long",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  )

  return Post
}
