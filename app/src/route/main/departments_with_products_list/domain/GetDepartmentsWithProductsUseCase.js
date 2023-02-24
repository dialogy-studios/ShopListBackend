const {getAllDepartments} = require("../../departments/domain/GetDepartmentsUseCase");
const {getProductsByDepartmentUseCase} = require("../../products/domain/GetProductsByDepartmentUseCase");

async function getDepartmentsWithProducts() {
    const departments = await getAllDepartments()
    const promises = departments.map(async (department) => {
        const products = await getProductsByDepartmentUseCase(department.id, 1)
        return {
            id: department.id,
            name: department.name,
            product_list: products.map(({name, thumbnail}) => ({name, thumb: thumbnail}))
        }
    })

    return await Promise.all(promises)
}

module.exports = getDepartmentsWithProducts
