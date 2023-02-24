const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
class TendaAtacadoSitesService {
    saveSitesMutation = gql`mutation BatchSites($sites: [TendaAtacadoSiteInput]) {
        batchSites(sites: $sites) {
            id
            products {
                id
                totalAvailable
            }
        }
    }`;

    getSiteProductsByIdQuery = gql`query GetTendaAtacadoSite($id: ID!) {
        getTendaAtacadoSite(id: $id) {
            products {
                id
                totalAvailable
            }
        }
    }`

    async putSitesInDatabase(sites) {
        const graphqlData = await axios({
            url: process.env.API_URL,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            data: {
                query: print(this.saveSitesMutation),
                variables: {
                    sites
                }
            }
        });
        return graphqlData.data;
    }

    async getSiteProductsById(id) {
        const graphqlData = await axios({
            url: process.env.API_URL,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            data: {
                query: print(this.getSiteProductsByIdQuery),
                variables: {
                    id
                }
            }
        });
        return graphqlData.data;
    }
}

module.exports = TendaAtacadoSitesService;
