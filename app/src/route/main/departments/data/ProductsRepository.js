const { client } = require("../../../../setup/get_pgsql_client")

const ITEMS_PER_PAGE = 10

async function queryProductsByDepartmentId(psqlClient, departmentId, start, end) {
    const query = `
    select distinct on (product_price.sku, product_price.related_date)
        products.sku,
        products.name,
        products.thumbnail,
        product_price.price
    from
        departments_products
    inner join departments on
        departments_products.department_id = departments.id
    inner join products on
        products.sku = departments_products.sku
    inner join product_price on 
        product_price.sku = products.sku
    where
    departments_products.department_id = $1
    order by product_price.related_date desc
        limit $2 offset $3
    `
    return await psqlClient.query(query, [departmentId, start, end])
}

async function getProductsByDepartmentId(departmentId, page) {
    const init = ITEMS_PER_PAGE * page
    const end = init + ITEMS_PER_PAGE
    const products = await queryProductsByDepartmentId(client, departmentId, end, init)
    return products
}

module.exports = { getProductsByDepartmentId }
