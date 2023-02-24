const {validateThenGet, parseError} = require("../../../setup/exceptions");
const {DEPARTMENT_QUERY_PARAMETER, PAGE_QUERY_PARAMETER} = require("../../../setup/constants");
const { getProductsByDepartmentUseCase } = require("./domain/GetProductsByDepartmentUseCase")
const router = require('express').Router()

router.get("/products", async(req, res) => {
    try {
        const departmentId = validateThenGet(req, DEPARTMENT_QUERY_PARAMETER)
        const page = validateThenGet(req, PAGE_QUERY_PARAMETER)
        const products = await getProductsByDepartmentUseCase(departmentId, page)
        res.status(200).send(JSON.stringify({id: departmentId, productList: products.map(({sku, name, thumbnail}) => ({id: sku, name, thumb: thumbnail}))}))
    } catch (error) {
        const [status, _, type] = parseError(error)
        res.status(status).send(type)
    }
})

module.exports = router
