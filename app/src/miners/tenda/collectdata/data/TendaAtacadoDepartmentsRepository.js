const TendaAtacadoService = require('./service/TendaAtacadoDepartmentService');
class TendaAtacadoDepartmentsRepository {
    tendaAtacadoService = new TendaAtacadoService();
    async loadDepartments() {
        const data = ((await this.tendaAtacadoService.loadDepartments()) || [])
            .map(({id, name}) => ({
                id,
                name
            }))
        return data;
    }
}


module.exports = TendaAtacadoDepartmentsRepository;
