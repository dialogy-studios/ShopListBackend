const { getProductsByDepartmentId } = require("../data/ProductsRepository")
async function getProductsByDepartmentUseCase(departmentId, page) {
    const products = await getProductsByDepartmentId(departmentId, page)
    return products.rows
}

module.exports = { getProductsByDepartmentUseCase }
