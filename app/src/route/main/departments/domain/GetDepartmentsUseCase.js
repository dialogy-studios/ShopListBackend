const {queryAllDepartments} = require("../data/DepartmentsService");

async function getAllDepartments() {
    const departments = await queryAllDepartments()
    return departments.rows
}

module.exports = { getAllDepartments }
