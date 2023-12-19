const { client } = require("../../../../setup/get_pgsql_client")


const queryProductInfo = async (sku) => {
    const query = `
    select products.sku, products.name, products.thumbnail
    from products
    where products.sku = $1
    `

    return (await client.query(query, [sku])).rows[0]
}

const queryProductHistoricPrice = async (sku) => {
    const query = `
    select product_price.price, product_price.related_date
    from product_price
    where product_price.sku = $1
    `
    return (await client.query(query, [sku])).rows
}


const getProductDetail = async (sku) => {
    const info = await getProductInfo(sku)
    const historicalPrice = await queryProductHistoricPrice(sku)

    return {
        ...info,
        historicPrice: historicalPrice
    }
}

const getProductInfo = async (sku) => {
    const productInfo = await queryProductInfo(sku)

    return {
        info: {
            id: productInfo.sku,
            name: productInfo.name,
            thumb: productInfo.thumbnail
        },
    }
}

module.exports = { getProductDetail, getProductInfo }
