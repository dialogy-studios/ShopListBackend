const {client} = require("../../../../setup/get_pgsql_client")

const ITEMS_PER_PAGE = 10

async function queryProductsByDepartmentId(psqlClient, departmentId, start, end) {
    const query = "select * from Products where categoryId = $1 limit $2 offset $3"
    return await psqlClient.query(query, [departmentId, start, end])
}

async function getProductsByDepartmentId(departmentId, page) {
    const init = ITEMS_PER_PAGE * page
    const end = init + ITEMS_PER_PAGE
    const products = await queryProductsByDepartmentId(client, departmentId, end, init)
    return products
}

module.exports = { getProductsByDepartmentId }
