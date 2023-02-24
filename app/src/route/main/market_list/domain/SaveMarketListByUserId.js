const {insertMarketList} = require("../data/MarketListService");

async function saveMarketList(marketListPayload) {
    await insertMarketList(marketListPayload)
}

module.exports = { saveMarketList }
