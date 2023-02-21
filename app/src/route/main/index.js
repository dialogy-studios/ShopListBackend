const homeRouter = require("./home/MainHomeRouter")
const router = require("express").Router()

router.use(homeRouter)

module.exports = router
