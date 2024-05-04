const { client } = require("../../../../setup/get_pgsql_client")
const { USER_ID_MARKET_LIST_TABLE_COLUMN } = require("../../../../setup/constants");

async function queryMarketListByUserid(userId) {
  const marketList = await client.query("select MarketList.id_list::text as id, MarketList.name_list as name from MarketList where user_id = $1", [userId])
  return marketList.rows
}

async function insertMarketList(marketListPayload) {
  await client.query("insert into MarketList(name_list, user_id) values ($1, $2)", [marketListPayload.name, marketListPayload[USER_ID_MARKET_LIST_TABLE_COLUMN]])
}

async function insertProductListToMarketList(marketListId, productId) {
  await client.query("insert into MarketListProducts values($1, $2)", [marketListId, productId])
}

async function queryMarketListDetail(marketListId) {
  const query = "select id_list::varchar as id, name_list as name from marketlist where id_list=$1"
  return (await client.query(query, [marketListId])).rows[0]
}

async function queryMarketListProducts(marketListId) {
  const query = `
      select
        distinct on
      (products.sku)
            products.sku as sku,
      products.name as name,
      products.thumbnail as thumb,
      concat('R\$ ', product_price.price) as price,
      occurrences.product_occurrence
    from
        product_price
    inner join marketlistproducts on
        marketlistproducts.id_product = product_price.sku
    inner join products on
          products.sku = product_price.sku
    inner join (
      select
        products.sku,
        count(products.sku) as product_occurrence
      from
        products
      inner join marketlistproducts 
    on
        marketlistproducts.id_product = products.sku
      where
        marketlistproducts.id_list = $1
      group by
        products.sku
      ) as occurrences 
    on
      occurrences.sku = products.sku
    where
      marketlistproducts.id_list = $1
    order by
        "sku",
        "related_date" desc nulls last
        `
  return (await client.query(query, [marketListId])).rows
}

async function queryMarketListHistoricalPrice(marketListId) {
  const query = `
    select
      distinct on
      (result.related_date)
          concat('R\$ ', sum(result.price)) as price,
      result.related_date as datee
    from
      (
      select
        distinct on
        (product_price.related_date,
        products.sku)
            products.sku,
        product_price.related_date,
        occurrences.product_occurrence * cast(product_price.price as double precision) as price
      from
        products
      inner join marketlistproducts on
        marketlistproducts.id_product = products.sku
      inner join product_price on
        product_price.sku = products.sku
      inner join (
        select
            products.sku,
            count(products.sku) as product_occurrence
        from
            products
        inner join marketlistproducts 
              on
            marketlistproducts.id_product = products.sku
        where
            marketlistproducts.id_list = $1
        group by
          products.sku
        ) as occurrences 
      on
          occurrences.sku = products.sku
      where
        marketlistproducts.id_list = $1
        ) as result
    group by
      result.related_date
    order by
      result.related_date desc
        `
  return (await client.query(query, [marketListId])).rows
}

async function removeProductFromList(marketListId, productId) {
  const query = `
    delete
    from
      marketlistproducts
    where
      marketlistproducts.id_product = $1
      and marketlistproducts.id_list = $2
  `
  await client.query(query, [productId, marketListId])
  return
}

async function getMarketListDetail(marketListId) {
  const marketListDetail = await queryMarketListDetail(marketListId)
  const productsOfMarketList = await queryMarketListProducts(marketListId)
  const historicalPriceMarketList = await queryMarketListHistoricalPrice(marketListId)
  const totalToday = (historicalPriceMarketList[0] || { price: "R\$ 0,00" }).price
  return {
    id: marketListDetail.id,
    name: marketListDetail.name,
    historicalPrice: historicalPriceMarketList.map(({ date, price }) => ({
      period: date,
      price: price
    })),
    products: productsOfMarketList.map(({ sku, thumb, price, name, product_occurrence }) => ({ id: sku, thumb, price, name, product_occurrence })),
    total: totalToday
  }
}

async function removeProducts(marketListId, productsId) {
  try {
    await client.query("BEGIN")
    await Promise.all(
      productsId.map(async (productId) => {
        await removeProductFromList(marketListId, productId)
      })
    )
    await client.query("COMMIT")
  } catch (e) {
    await client.query("ROLLBACK")
    console.log(e)
  }

}


module.exports = { queryMarketListByUserid, insertMarketList, insertProductListToMarketList, getMarketListDetail, removeProducts }
