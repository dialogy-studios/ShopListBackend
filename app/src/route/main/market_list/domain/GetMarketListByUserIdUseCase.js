const {queryMarketListByUserid} = require("../data/MarketListService");

async function getMarketListByUserId(accountId) {
    const marketList = await queryMarketListByUserid(accountId)
    return marketList
}

module.exports = { getMarketListByUserId }
