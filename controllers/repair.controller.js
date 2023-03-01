const Repair = require("../models/repairs.models")
const catchAsync = require("../utils/catchAsync")

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      attributes: ["id", "date", "userId"],
      where: {
        status: "pending",
      },
    })

    return res.status(200).json({
      status: "success",
      repairs,
    })
    
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}

exports.nombreFuncion = catchAsync(async(req, res,next) => {

})

exports.findOneRepair = async (req, res) => {
  try {
    const { repair } = req

    return res.status(200).json({
      status: "success",
      repair,
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body

    const repair = await Repair.create({ date, userId })

    return res.status(201).json({
      status: "success",
      message: "Created Repair",
      repair,
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.updateRepair = async (req, res) => {
  try {
    const { status } = req.body

    const { repair } = req

    await repair.update({ status })

    return res.status(200).json({
      status: "success",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
exports.deleteRepair = async (req, res) => {
  try {
    const { repair } = req

    await repair.update({ status: "cancelled" })

    return res.status(200).json({
      status: "success",
    })
  } catch {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong! 🧨",
    })
  }
}
