const {client} = require("../../../../setup/get_pgsql_client")
const {USER_ID_MARKET_LIST_TABLE_COLUMN} = require("../../../../setup/constants");

async function queryMarketListByUserid(userId) {
    const marketList = await client.query("select * from MarketList where user_id = $1", [userId])
    return marketList.rows
}

async function insertMarketList(marketListPayload) {
    await client.query("insert into MarketList(name_list, user_id) values ($1, $2)", [marketListPayload.name, marketListPayload[USER_ID_MARKET_LIST_TABLE_COLUMN]])
}

async function insertProductListToMarketList(marketListId, productId) {
    await client.query("insert into MarketListProducts values($1, $2)", [marketListId, productId])
}

module.exports = { queryMarketListByUserid, insertMarketList, insertProductListToMarketList }
