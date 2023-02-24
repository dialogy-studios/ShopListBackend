const TendaAtacadoManager = require('./data/TendaAtacadoDepartmentsRepository');
const TendaAtacadoProductsManager = require('./data/TendaAtacadoProductsRepository');
const {client} = require('../../../setup/get_pgsql_client')
const express = require('express')
const router = express.Router()

async function loadDepartments() {
    const tendaAtacadoManager = new TendaAtacadoManager();
    return await tendaAtacadoManager.loadDepartments()
}

async function loadProducts(department) {
    const tendaAtacadoProductsManager = new TendaAtacadoProductsManager();
    while (!tendaAtacadoProductsManager.isLastPage) {
        await tendaAtacadoProductsManager.getProductsByCategory(department.id);
    }
    return tendaAtacadoProductsManager.getProducts();
}

async function saveDepartment(pgSqlClient, department) {
    await pgSqlClient.query("BEGIN")
    await pgSqlClient.query("insert into Departments values ($1, $2) on conflict do nothing", [department.id, department.name])
    await pgSqlClient.query("COMMIT")
}

async function saveProducts(pgSqlClient, product) {
    const {sku, barcode, name, thumbnail, price, currency, brandToken, categoryId} = product
    await pgSqlClient.query("BEGIN")
    await pgSqlClient.query("insert into Products values ($1, $2, $3, $4, $5, $6, $7, $8)", [sku, barcode, name, thumbnail, price, currency, brandToken, categoryId])
    await pgSqlClient.query("COMMIT")
}

async function mine() {
    try {
        const departments = await loadDepartments()
        for (let department of departments) {
            console.log("saving department...")
            await saveDepartment(client, department)
            const products = await loadProducts(department)
            const promises = products.map(async (product) => {
                await saveProducts(client, product)
                console.log("saved product!")
            })
            await Promise.all(promises)
        }
    } catch (error) {
        console.log(error)
    }
}

router.get('/mine/tenda', async (req, res) => {
    mine().finally(() => {
        res.status(200).send()
    })
})

module.exports = router
