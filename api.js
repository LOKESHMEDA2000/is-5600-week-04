const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
    const { offset = 0, limit = 25, tag } = req.query;
    res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }));
}

async function getProduct(req, res, next) {
    const { id } = req.params;
    const product = await Products.get(id);
    if (!product) return next(); // 404 if product not found
    res.json(product);
}

async function createProduct(req, res) {
    console.log('Request body:', req.body);
    res.status(201).json(req.body);
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    await Products.delete(id);
    res.status(202).json({ message: `Product with ID ${id} deleted.` });
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    await Products.update(id, updatedData);
    res.status(200).json({ message: `Product with ID ${id} updated.` });
}

module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
});
