const getDepartmentsWithProducts = require("./domain/GetDepartmentsWithProductsUseCase");
const router = require('express').Router()

router.get("/departmentsWithProducts", async (req, res) => {
    try {
        const departmentsWithProducts = await getDepartmentsWithProducts()
        res.status(200).send(JSON.stringify({category_list: departmentsWithProducts}))
    } catch(error) {
        res.status(400).send(JSON.stringify("UnknownError"))
    }
})

module.exports = router
