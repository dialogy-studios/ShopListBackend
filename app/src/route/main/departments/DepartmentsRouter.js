const {getAllDepartments} = require("./domain/GetDepartmentsUseCase");
const router = require('express').Router()


router.get("/departments", async (req, res) => {
    try {
        const departments = await getAllDepartments()
        res.status(200).send(JSON.stringify(departments))
    } catch (error) {
        res.status(400).send(JSON.stringify("UnknownError"))
    }
})


module.exports = router
