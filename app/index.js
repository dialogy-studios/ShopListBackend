require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser");
const authentication = require("./src/route/authentication")
const main = require("./src/route/main")
const app = express()
const router = express.Router()

// Middlewares
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Routers
router.use(authentication)
router.use(main)
// Main Router
app.use("/", router)
// Server init
app.listen(process.env.PORT || 3000, () => {
    console.log(`listen at ${process.env.PORT}`)
})
