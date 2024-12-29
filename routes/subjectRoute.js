const express = require('express');
const routes = express.Router();
const subjectController = require('../controllers/subjectController');

// Routes for Subject

// Create a new subject
routes.post('/addSubject', subjectController.addSubject);

// Retrieve all subjects
routes.get('/getAllSubjects', subjectController.getAllSubjects);

// Retrieve a single subject by ID
routes.get('/getSubject/:subjectId', subjectController.getSubject);

// Retrieve all subjects with their associated lessons
routes.get('/getAllSubjectsWithLessons', subjectController.getAllSubjectsWithLessons);

// Retrieve a single subject with its associated lessons
routes.get('/getSubjectWithLessons/:subjectId', subjectController.getSubjectWithLessons);

// Update an existing subject by ID
routes.put('/updateSubject/:subjectId', subjectController.updateSubject);

// Delete a subject by ID
routes.delete('/deleteSubject/:subjectId', subjectController.deleteSubject);

module.exports = routes;
