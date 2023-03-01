const User = require("../models/users.model")
const catchAsync = require("../utils/catchAsync")
const { generateJWT } = require("../utils/jwt")

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      status: true,
      email,
    },
  })

  if (!user) {
    return next(new AppError("The user is not registered", 400))
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid credential", 401))
  }

  const token = await generateJWT(user.id)

  res.json({
    status: "success",
    token,
    user: {
      username: user.username,
      uid: user.id,
    },
  })
})
