const homeRouter = require("./home/MainHomeRouter")
const productsRouter = require("./products/ProductsRouter")
const departmentsRouter = require("./departments/DepartmentsRouter")
const categoryWithProductListRouter = require("./departments_with_products_list/CategoryWithProductsListRouter")
const marketListRouter = require("./market_list/MarketListRouter")
const router = require("express").Router()
const { tokenValidationRouter } = require("../authentication/middleware/tokenValidation")

router.use(tokenValidationRouter)
router.use(homeRouter)
router.use(productsRouter)
router.use(departmentsRouter)
router.use(categoryWithProductListRouter)
router.use(marketListRouter)

module.exports = router
