const express = require("express")
const cors = require("cors")
const { db } = require("../database/db")
const { userRouter } = require("../routes/user.routes")
const { repairRouter } = require("../routes/repair.routes")
const globalErrorHandler = require("../controllers/error.controller")
const { loginRouter } = require("../routes/user.login.routes")

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //Path Routes
    this.paths = {
      repairs: "/api/v1/repairs",
      users: "/api/v1/users",
      login: "/api/v1/users/login",
    }

    //Connect to db
    this.database()

    //Middlewares
    this.middlewares()

    //Routes
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.users, userRouter)
    this.app.use(this.paths.repairs, repairRouter)
    this.app.use(this.paths.login, loginRouter)
    

    this.app.all('*',(req,res,next)=>{
      return next(new AppError(`cant find ${req.originalUrl} on this server`,404))
    })

    this.app.use(globalErrorHandler)
  }

  database() {
    db.authenticate()
      .then(() => console.log("Database authenticated 😁"))
      .catch((err) => console.log(err))

    //relations

    db.sync()
      .then(() => console.log("Database synced 😁"))
      .catch((err) => console.log(err))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running On Port 😁", this.port)
    })
  }
}

module.exports = Server
