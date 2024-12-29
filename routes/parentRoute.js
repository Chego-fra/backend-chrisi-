const express = require('express');
const routes = express.Router();
const parentController = require('../controllers/parentController'); // Adjust the path if necessary

// Add a new parent
routes.post('/addParent', parentController.addParent);

// Get all parents
routes.get('/getAllParents', parentController.getAllParents);

// Get a specific parent by ID
routes.get('/getParent/:parentId', parentController.getParent);

// Update a parent by ID
routes.put('/updateParent/:parentId', parentController.updateParent);

// Delete a parent by ID
routes.delete('/deleteParent/:parentId', parentController.deleteParent);

// Get all parents with their associated students
routes.get('/getAllParentsWithStudents', parentController.getAllParentsWithStudents);

// Get a specific parent with their associated students
routes.get('/getParentWithStudents/:parentId', parentController.getParentWithStudents);

module.exports = routes;
