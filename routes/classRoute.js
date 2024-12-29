const express = require('express');
const routes = express.Router();
const classController = require('../controllers/classController');

// Add a new class
routes.post('/addClass', classController.addClass);

// Get all classes
routes.get('/getAllClasses', classController.getAllClasses);

// Get a single class by ID
routes.get('/getClass/:classId', classController.getClass);

// Update a class by ID
routes.put('/updateClass/:classId', classController.updateClass);

// Delete a class by ID
routes.delete('/deleteClass/:classId', classController.deleteClass);

module.exports = routes;
