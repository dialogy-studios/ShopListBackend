const {USER_ACCOUNT_ID_HEADER, USER_ID_MARKET_LIST_TABLE_COLUMN, USER_MARKET_LIST_ID_PARAM, PRODUCT_ID_BODY_PARAM} = require("../../../setup/constants");
const {getMarketListByUserId} = require("./domain/GetMarketListByUserIdUseCase");
const {saveMarketList} = require("./domain/SaveMarketListByUserId");
const {saveProductToMarketList} = require("./domain/SaveProductToMarketList");
const router = require('express').Router()

router.get("/market-list", async (req, res) => {
    try {
        const accountId = req.header[USER_ACCOUNT_ID_HEADER]
        const marketList = await getMarketListByUserId(accountId)
        res.status(200).send(JSON.stringify(marketList))
    } catch (error) {
        res.status(400).send(JSON.stringify("Unknown Error"))
    }
})

router.post("/market-list", async (req, res) => {
    try {
        const accountId = req.header[USER_ACCOUNT_ID_HEADER]
        const marketListPayload = req.body
        marketListPayload[USER_ID_MARKET_LIST_TABLE_COLUMN] = accountId
        await saveMarketList(marketListPayload)
        res.status(200).send(JSON.stringify(""))
    } catch (error) {
        console.log(error)
        res.status(400).send(JSON.stringify("Unknown Error"))
    }
})

router.post("/market-list/:marketListId/add", async (req, res) => {
    try {
        const marketListId = req.params[USER_MARKET_LIST_ID_PARAM]
        const productId = req.body[PRODUCT_ID_BODY_PARAM]
        await saveProductToMarketList(marketListId, productId)
        res.status(200).send(JSON.stringify(""))
    } catch (error) {
        console.log(error)
        res.status(400).send(JSON.stringify("Unknown Error"))
    }
})

module.exports = router
