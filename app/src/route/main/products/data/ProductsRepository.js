const { client } = require("../../../../setup/get_pgsql_client")


const queryProductInfo = async (sku) => {
    const query = `
    select
	products.sku,
	products.name,
	products.thumbnail,
    departments_products.department_id::text,
	(
	select
		distinct on
		("sku") price
	from
		product_price
	where
		sku = $1
	order by
		"sku",
		"price" desc nulls last) as price
from
	products
inner join departments_products on 
        departments_products.sku = products.sku
where
	products.sku = $1
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
            thumb: productInfo.thumbnail,
            price: productInfo.price,
            departmentId: productInfo.department_id
        },
    }
}

module.exports = { getProductDetail, getProductInfo }
