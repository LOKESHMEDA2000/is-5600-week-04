const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./api');
const middleware = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(middleware.cors);
app.use(bodyParser.json());

// API Routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.delete('/products/:id', api.deleteProduct);
app.put('/products/:id', api.updateProduct);

// Error Handling
app.use(middleware.notFound);
app.use(middleware.handleError);

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
