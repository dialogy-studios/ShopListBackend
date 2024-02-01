const {getAllDepartments} = require("./domain/GetDepartmentsUseCase");
const {validateThenGet, parseError} = require("../../../setup/exceptions");
const {DEPARTMENT_QUERY_PARAMETER, PAGE_QUERY_PARAMETER} = require("../../../setup/constants");
const { getProductsByDepartmentUseCase } = require("./domain/GetProductsByDepartmentUseCase")
const router = require('express').Router()


router.get("/department/list", async (req, res) => {
    try {
        const departments = await getAllDepartments()
        res.status(200).send(JSON.stringify(departments))
    } catch (error) {
        res.status(400).send(JSON.stringify("UnknownError"))
    }
})


router.get("/department/:departmentId/products", async(req, res) => {
    try {
        const departmentId = req.params["departmentId"]
        const page = validateThenGet(req, PAGE_QUERY_PARAMETER)
        const products = await getProductsByDepartmentUseCase(departmentId, page)
        res.status(200).send(JSON.stringify({ productList: products.map(({sku, name, thumbnail, price}) => ({id: sku, name, thumb: thumbnail, price})) }))
    } catch (error) {
        console.log(error);
        const [status, _, type] = parseError(error)
        res.status(status).send(type)
    }
})


module.exports = router
