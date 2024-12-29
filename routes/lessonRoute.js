const express = require('express');
const routes = express.Router();
const lessonController = require('../controllers/lessonsController');

// Add a new lesson
routes.post('/addLesson', lessonController.addLesson);

// Get all lessons
routes.get('/getAllLessons', lessonController.getAllLessons);

// Get a single lesson by ID
routes.get('/getLesson/:lessonId', lessonController.getLesson);

// Update a lesson
routes.put('/updateLesson/:lessonId', lessonController.updateLesson);

// Delete a lesson
routes.delete('/deleteLesson/:lessonId', lessonController.deleteLesson);

module.exports = routes;
