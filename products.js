const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data/full-products.json');

async function list(options = {}) {
    const { offset = 0, limit = 25, tag } = options;
    const data = await fs.readFile(productsFile);
    return JSON.parse(data)
        .filter(product => {
            if (!tag) return true; // If no tag filter, include all products
            return product.tags.some(({ title }) => title === tag);
        })
        .slice(offset, offset + limit);
}

async function get(id) {
    const products = JSON.parse(await fs.readFile(productsFile));
    return products.find(product => product.id === id) || null;
}

async function deleteProduct(id) {
    console.log(`Product with ID ${id} has been deleted.`);
    return true;
}

async function updateProduct(id, updatedData) {
    console.log(`Product with ID ${id} has been updated with data:`, updatedData);
    return true;
}

module.exports = {
    list,
    get,
    delete: deleteProduct,
    update: updateProduct,
};
