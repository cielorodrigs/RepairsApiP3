const User = require("../models/users.model")
const { generateJWT } = require("../utils/jwt")
const bcrypt = require('bcryptjs');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      where: {
        status: "available",
      },
    })

    return res.status(200).json({
      status: "success",
      message: "Users found",
      users,
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}

exports.findOneUser = async (req, res) => {
  try {
    const { user } = req

    return res.status(200).json({
      status: "success",
      message: "User Found",
      user,
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    name = name.toLowerCase()
    email = email.toLowerCase()

    const user = await User.create({
      name,
      email,
      password,
      role,
    })
    
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    const token = await generateJWT(user.id)

    return res.status(201).json({
      status: "success",
      message: "User created",
      user,
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.updateUser = async (req, res) => {
  try {

    const { name, email } = req.body
    const { user } = req

    await user.update({ name, email })

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.deleteUser = async (req, res) => {
  try {

    const { user } = req

    await user.update({ status: "disabled" })

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
