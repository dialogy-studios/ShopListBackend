const repository = require("../data/ProductsRepository")

const getProductDetail = async (sku) => {
    return await repository.getProductDetail(sku)
}

module.exports = { getProductDetail }