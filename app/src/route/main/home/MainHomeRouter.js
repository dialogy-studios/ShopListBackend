const router = require('express').Router()
const { tokenValidationRouter } = require("../../authentication/middleware/tokenValidation")

router.use(tokenValidationRouter)

router.get("/main/home", (req, res) => {
    res.status(200).send("able to access services")
})

module.exports = router
