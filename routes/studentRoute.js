const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/studentController');
const { uploadMultiple } = require('../upload configuration'); // For multiple files
const { uploadSingle } = require('../upload configuration'); // For a single file

// Add a new student
routes.post('/addStudent', uploadSingle,studentController.addStudent);

// Add a new student
routes.post('/addStudentWithMultipleImages', uploadMultiple ,studentController.addStudentWithMultipleImages);

// Get all students
routes.get('/getAllStudents', studentController.getAllStudents);

// Get a single student by ID
routes.get('/getStudent/:studentId', studentController.getStudent);

// Get all students with details
routes.get('/getAllStudentsWithDetails', studentController.getAllStudentsWithDetails);

// Update a student by ID
routes.put('/updateStudent/:studentId', uploadSingle, studentController.updateStudent);


routes.put('/updateStudentMultipeImages/:studentId', uploadSingle, studentController.updateStudent);

// Delete a student by ID
routes.delete('/deleteStudent/:studentId', studentController.deleteStudent);

module.exports = routes;
