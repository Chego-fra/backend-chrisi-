const express = require('express');
const routes = express.Router();
const gradeController = require('../controllers/gradeController');

// Add a new result
routes.post('/addGrade', gradeController.addGrade);

// Get all results
routes.get('/getAllGrades', gradeController.getAllGrades);

// Get a single result by ID
routes.get('/getGrade/:gradeId', gradeController.getGrade);

// Update a result by ID
routes.put('/updateGrade/:gradeId', gradeController.updateGrade);

// Delete a result by ID
routes.delete('/deleteGrade/:gradeId', gradeController.deleteGrade);

module.exports = routes;
