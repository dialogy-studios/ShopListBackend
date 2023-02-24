const {apiURL} = require('../model/config');
const {departments} = require('../model/endpoints');
const axios = require('axios');

class TendaAtacadoDepartmentService {

    async loadDepartments() {
        const response = await axios({
            url: `${apiURL}${departments}`,
            method: 'get',
        });
        return response.data;
    }
}

module.exports = TendaAtacadoDepartmentService;
