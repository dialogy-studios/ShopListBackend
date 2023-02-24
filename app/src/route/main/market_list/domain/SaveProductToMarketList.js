const {insertProductListToMarketList} = require("../data/MarketListService");

async function saveProductToMarketList(marketListId, productId) {
    await insertProductListToMarketList(marketListId, productId)
}

module.exports = { saveProductToMarketList }
