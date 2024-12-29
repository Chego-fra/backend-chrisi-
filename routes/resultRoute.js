const express = require('express');
const routes = express.Router();
const resultController = require('../controllers/resultController');

// Add a new result
routes.post('/addResult', resultController.addResult);

// Get all results
routes.get('/getAllResults', resultController.getAllResults);

// Get a single result by ID
routes.get('/getResult/:resultId', resultController.getResult);

// Update a result by ID
routes.put('/updateResult/:resultId', resultController.updateResult);

// Delete a result by ID
routes.delete('/deleteResult/:resultId', resultController.deleteResult);

module.exports = routes;
