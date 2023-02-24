const TendaAtacadoProductsService = require('./service/TendaAtacadoProductsService');

class TendaAtacadoProductsRepository {
    tendaAtacadoProductsService = new TendaAtacadoProductsService();
    rawData = [];
    products = [];
    sites = [];
    currentPage = 1;
    isLastPage = false;
    async getProductsByCategory(categoryId) {
        const page = await this.tendaAtacadoProductsService.loadProductsFromCategory(categoryId, this.currentPage);
        const products = (page['products'] || []).map((product) => ({
            ...product,
            categoryId
        }));
        this.rawData = [...this.rawData, ...products];
        this.isLastPage = this.currentPage === page['total_pages'];
        this.currentPage++;
    }

    getProducts() {
        const rawData = this.rawData;
        this.rawData = [];
        return rawData;
    }
}

module.exports = TendaAtacadoProductsRepository;
