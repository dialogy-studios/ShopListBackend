const repository = require("../data/ProductsRepository")

const getProductInfo = async (sku) => {
    return repository.getProductInfo(sku)
}

module.exports = { getProductInfo }