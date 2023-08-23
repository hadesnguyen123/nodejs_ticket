const express = require('express')
const { User } = require('../models')
const { checkExist } = require('../middlewares/validations/checkExist')
const { register, login } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)


module.exports = {
    userRouter
}
