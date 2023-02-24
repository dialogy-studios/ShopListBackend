const {client} = require("../../../../setup/get_pgsql_client")

async function queryAllDepartments() {
    const departments = await client.query("select * from Departments")
    return departments
}

module.exports = { queryAllDepartments }
