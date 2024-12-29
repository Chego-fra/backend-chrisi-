const express = require('express');
const routes = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Add a new assignment
routes.post('/addAssignment', assignmentController.addAssignment);

// Get all assignments
routes.get('/getAllAssignments', assignmentController.getAllAssignments);

// Get an assignment by ID
routes.get('/getAssignment/:assignmentId', assignmentController.getAssignment);

// Update an assignment by ID
routes.put('/updateAssignment/:assignmentId', assignmentController.updateAssignment);

// Delete an assignment by ID
routes.delete('/deleteAssignment/:assignmentId', assignmentController.deleteAssignment);

module.exports = routes;
