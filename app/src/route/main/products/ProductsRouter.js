const {parseError} = require("../../../setup/exceptions");
const { getProductDetail } = require("./domain/GetProductDetailUseCase")
const { getProductInfo } = require("./domain/GetProductInfoUseCase")
const router = require('express').Router()

router.get("/product/:sku/detail", async(req, res) => {
    try {
        const sku = req.params["sku"]
        const products = await getProductDetail(sku)
        res.status(200).send(JSON.stringify(products))
    } catch (error) {
        const [status, _, type] = parseError(error)
        console.log(error)
        res.status(status).send(type)
    }
})


router.get("/product/:sku/info", async (req, res) => {
    try {
        const sku = req.params["sku"]
        const product = await getProductInfo(sku)
        res.status(200).send(JSON.stringify(product))
    } catch (error) {
        const [status, _, type] = parseError(error)
        console.log(error)
        res.status(status).send(type)
    }
})


module.exports = router
