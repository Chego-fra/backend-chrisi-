const express = require('express');
const routes = express.Router();
const examController = require('../controllers/examController');

// Add a new exam
routes.post('/addExam', examController.addExam);

// Get all exams
routes.get('/getAllExams', examController.getAllExams);

// Get a single exam by ID
routes.get('/getExam/:examId', examController.getExam);

// Update an exam
routes.put('/updateExam/:examId', examController.updateExam);

// Delete an exam
routes.delete('/deleteExam/:examId', examController.deleteExam);

// Get all exams with their associated lessons
routes.get('/getAllExamsWithLessons', examController.getAllExamsWithLessons);

// Get a specific exam with its associated lesson
routes.get('/getExamWithLesson/:examId', examController.getExamWithLesson);

module.exports = routes;
