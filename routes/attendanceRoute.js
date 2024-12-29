const express = require('express');
const routes = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Add a new attendance record
routes.post('/addAttendance', attendanceController.addAttendance);

// Get all attendance records
routes.get('/getAllAttendance', attendanceController.getAllAttendances);

// Get attendance by student ID
routes.get('/getAttendanceByStudent/:studentId', attendanceController.getAttendanceByStudent);

// Get attendance by lesson ID
routes.get('/getAttendanceByLesson/:lessonId', attendanceController.getAttendanceByLesson);

// Update attendance record by ID
routes.put('/updateAttendance/:attendanceId', attendanceController.updateAttendance);

// Delete attendance record by ID
routes.delete('/deleteAttendance/:attendanceId', attendanceController.deleteAttendance);

module.exports = routes;
