const express = require("express")
const registerRouter = require("./register/RegisterRouter")
const loginRouter = require("./login/LoginRouter")
const router = express.Router()

router.use(registerRouter)
router.use(loginRouter)

module.exports = router
