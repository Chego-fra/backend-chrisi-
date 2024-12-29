const db = require('../models/indexStart');
const createError = require('http-errors');

const Attendance = db.Attendance;
const Student = db.Student;
const Lesson = db.Lesson;

module.exports = {
  // Add a new attendance record
  addAttendance: async (req, res, next) => {
    try {
      const { date, present, studentId, lessonId } = req.body;

      // Create a new attendance record
      const newAttendance = await Attendance.create({
        date,
        present,
        studentId,
        lessonId,
      });

      res.status(201).send(newAttendance);
    } catch (error) {
      next(error);
    }
  },

  // Get all attendance records
  getAllAttendances: async (req, res, next) => {
    try {
      const attendances = await Attendance.findAll({
        include: [
          {
            model: Student,
            attributes: ['id', 'name'],
          },
          {
            model: Lesson,
            attributes: ['id', 'topic'],
          },
        ],
      });

      res.status(200).send(attendances);
    } catch (error) {
      next(error);
    }
  },

  // Get a single attendance record by ID
  getAttendance: async (req, res, next) => {
    try {
      const { attendanceId } = req.params;

      const attendance = await Attendance.findOne({
        where: { id: attendanceId },
        include: [
          {
            model: Student,
            attributes: ['id', 'name'],
          },
          {
            model: Lesson,
            attributes: ['id', 'topic'],
          },
        ],
      });

      if (!attendance) {
        throw createError(404, 'Attendance record not found');
      }

      res.status(200).send(attendance);
    } catch (error) {
      next(error);
    }
  },

  // Update an attendance record
  updateAttendance: async (req, res, next) => {
    try {
      const { attendanceId } = req.params;
      const { date, present, studentId, lessonId } = req.body;

      const [updated] = await Attendance.update(
        { date, present, studentId, lessonId },
        { where: { id: attendanceId } }
      );

      if (updated === 0) {
        throw createError(404, 'Attendance record not found or no changes made');
      }

      const updatedAttendance = await Attendance.findOne({
        where: { id: attendanceId },
        include: [
          {
            model: Student,
            attributes: ['id', 'name'],
          },
          {
            model: Lesson,
            attributes: ['id', 'topic'],
          },
        ],
      });

      res.status(200).send(updatedAttendance);
    } catch (error) {
      next(error);
    }
  },

  // Delete an attendance record
  deleteAttendance: async (req, res, next) => {
    try {
      const { attendanceId } = req.params;

      const deleted = await Attendance.destroy({ where: { id: attendanceId } });

      if (!deleted) {
        throw createError(404, 'Attendance record not found');
      }

      res.status(200).send({ message: `Attendance record with ID ${attendanceId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all attendance records for a specific student
  getAttendanceByStudent: async (req, res, next) => {
    try {
      const { studentId } = req.params;

      const attendances = await Attendance.findAll({
        where: { studentId },
        include: [
          {
            model: Lesson,
            attributes: ['id', 'topic'],
          },
        ],
      });

      res.status(200).send(attendances);
    } catch (error) {
      next(error);
    }
  },

// Get all attendance records for a specific lesson
  getAttendanceByLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      const attendances = await Attendance.findAll({
        where: { lessonId },
        include: [
          {
            model: Student,
            attributes: ['id', 'name'],
          },
        ],
      });

      res.status(200).send(attendances);
    } catch (error) {
      next(error);
    }
  },
};