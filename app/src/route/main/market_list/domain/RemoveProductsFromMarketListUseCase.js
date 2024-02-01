const service = require("../data/MarketListService")

async function removeProducts(marketListId, products) {
    return service.removeProducts(marketListId, products);
}

module.exports = {
    removeProducts
}