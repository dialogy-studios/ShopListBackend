const { Client } = require('pg')

const client = new Client({
    user: "reberth",
    password: "reberth",
    host: "database",
    port: "5432",
    database: "ShopList"
})

async function connectDb() {
    try {
        await client.connect()
        console.log("success")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {client, connectDb}
