"use strict"

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    })
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    })
  },
}
