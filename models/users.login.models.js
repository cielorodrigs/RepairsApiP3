const { DataTypes } = require("sequelize")
const { db } = require("../database/db")

const Login = db.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Login