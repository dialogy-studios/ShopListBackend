const homeRouter = require("./home/MainHomeRouter")
const productsRouter = require("./products/ProductsRouter")
const departmentsRouter = require("./departments/DepartmentsRouter")
const marketListRouter = require("./market_list/MarketListRouter")
const router = require("express").Router()
const { tokenValidationRouter } = require("../authentication/middleware/tokenValidation")

// router.use(tokenValidationRouter)
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
router.use(homeRouter)
router.use(productsRouter)
router.use(departmentsRouter)
router.use(marketListRouter)

module.exports = router
