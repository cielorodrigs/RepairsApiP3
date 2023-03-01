const User = require("../models/users.model")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
//lo intente
exports.validExistUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findOne({
      attributes: ["id", "name", "email"],
      where: {
        id,
        status: "available",
      },
    })

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong 😥",
    })
  }
}

exports.tokenValidation = async (req, res = response, next) => {
  try {
    const protectToken = catchAsync(async (req, res = response, next) => {
      let token

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1]
      }

      if (!token) {
        return next(
          new AppError(
            "You are not logged in!, Please log in to get access.",
            401
          )
        )
      }
      const decoded = await jwt.verify(token, process.env.SECRET_JWT_SEED)

      const user = await User.findOne({
        where: { id: decoded.id, status: true },
      })

      if (!user) {
        return next(
          new AppError("The owner of this token is not longer available", 403)
        )
      }

      req.sessionUser = user

      next()
    })
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong 😥",
    })
  }
}

exports.protectAccountOwner = catchAsync(async (req, res = response, next) => {
  const { user, sessionUser } = req

  if (user.id !== sessionUser.id) {
    return next(new AppError("You do not own this account", 403))
  }

  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("Yo do not have permission to perform this action", 403)
      )
    }
    next()
  }
}
