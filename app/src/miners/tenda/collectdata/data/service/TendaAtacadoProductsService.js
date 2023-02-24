const axios = require('axios');
const {apiURL} = require('../model/config');
const { products } = require('../model/endpoints')

class TendaAtacadoProductsService {

    async loadProductsFromCategory(categoryId, page) {
        const endpoint = apiURL + products(categoryId);
        const productsData = await axios({
            url: endpoint,
            method: "get",
            params: {
                page
            }
        });
        return productsData.data;
    }
}

module.exports = TendaAtacadoProductsService;
