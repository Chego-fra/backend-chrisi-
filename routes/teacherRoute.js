const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');
const { uploadMultiple } = require('../upload configuration'); // For multiple files
const { uploadSingle } = require('../upload configuration'); // For a single file

// Add a new teacher (with single image)
routes.post('/addTeacher', uploadSingle, teacherController.addTeacher);

// Add a new teacher (with multiple images)
routes.post('/addTeacherWithMultipleImages', uploadMultiple, teacherController.addTeacherWithMultipleImages);

// Get all teachers
routes.get('/getAllTeachers', teacherController.getAllTeachers);

// Get a single teacher by ID
routes.get('/getTeacher/:teacherId', teacherController.getTeacher);

// Get all teachers with their classes, subjects, and lessons
routes.get('/getAllTeachersWithDetails', teacherController.getAllTeachersWithDetails);

// Get a specific teacher with their classes, subjects, and lessons
routes.get('/getTeacherWithDetails/:teacherId', teacherController.getTeacherWithDetails);

// Update a teacher by ID (decide whether you want single or multiple image updates)

// For single image updates:
routes.put('/updateTeacher/:teacherId', uploadSingle, teacherController.updateTeacher);

// OR for multiple image updates:
routes.put('/updateTeacherWithMultipleImages/:teacherId', uploadMultiple, teacherController.updateTeacher);

// Delete a teacher by ID
routes.delete('/deleteTeacher/:teacherId', teacherController.deleteTeacher);

module.exports = routes;
