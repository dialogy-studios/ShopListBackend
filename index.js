require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser");
const authentication = require("./src/route/authentication")

const app = express()
const router = express.Router()
// Middlewares
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Routers
router.use(authentication)
// Main Router
app.use("/", router)
// Server init
app.listen(4040, () => {
    console.log("listen at 4040")
})
