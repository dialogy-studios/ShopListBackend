const repository = require("../data/MarketListService")

const getMarketListDetail = async (marketListId) => {
    return await repository.getMarketListDetail(marketListId);
}

module.exports = { getMarketListDetail }