const router = require('express').Router()

router.get("/main/home", (req, res) => {
    res.status(200).send("able to access services")
})

module.exports = router
