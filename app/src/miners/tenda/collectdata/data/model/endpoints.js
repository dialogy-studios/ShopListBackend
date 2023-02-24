const endpoints = {
    departments: '/api/public/store/departments',
    products: (categoryId) => `/api/public/store/category/${categoryId}/products`
}

module.exports = endpoints;
