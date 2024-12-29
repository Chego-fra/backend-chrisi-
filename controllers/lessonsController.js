const db = require('../models/indexStart');
const createError = require('http-errors');

const Lesson = db.Lesson;
const Exam = db.Exam;
const Assignment = db.Assignment;
const Attendance = db.Attendance;
const Subject = db.Subject;
const Class = db.Class;
const Teacher = db.Teacher;

module.exports = {
  // Add a new lesson
  addLesson: async (req, res, next) => {
    try {
      const { name, day, startTime, endTime, subjectId, classId, teacherId } = req.body;

      // Validate required associations
      const subject = await Subject.findByPk(subjectId);
      if (!subject) throw createError(404, 'Subject not found');

      const classEntity = await Class.findByPk(classId);
      if (!classEntity) throw createError(404, 'Class not found');

      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) throw createError(404, 'Teacher not found');

      // Create the new lesson
      const newLesson = await Lesson.create({
        name,
        day,
        startTime,
        endTime,
        subjectId,
        classId,
        teacherId,
      });

      res.status(201).send(newLesson);
    } catch (error) {
      next(error);
    }
  },

  // Get all lessons with related data
  getAllLessons: async (req, res, next) => {
    try {
      const lessons = await Lesson.findAll({
        include: [
          { model: Exam, as: 'exams', attributes: ['id', 'title', 'startTime', 'endTime'] },
          { model: Assignment, as: 'assignments', attributes: ['id', 'title', 'dueDate'] },
          { model: Attendance, as: 'attendances', attributes: ['id', 'studentId', 'status'] },
          { model: Subject, as: 'subject', attributes: ['id', 'name'] },
          { model: Class, as: 'class', attributes: ['id', 'name'] },
          { model: Teacher, as: 'teacher', attributes: ['id', 'name'] },
        ],
      });

      res.status(200).send(lessons);
    } catch (error) {
      next(error);
    }
  },

  // Get a single lesson by ID
  getLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      const lesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
          { model: Exam, as: 'exams', attributes: ['id', 'title', 'startTime', 'endTime'] },
          { model: Assignment, as: 'assignments', attributes: ['id', 'title', 'dueDate'] },
          { model: Attendance, as: 'attendances', attributes: ['id', 'studentId', 'status'] },
          { model: Subject, as: 'subject', attributes: ['id', 'name'] },
          { model: Class, as: 'class', attributes: ['id', 'name'] },
          { model: Teacher, as: 'teacher', attributes: ['id', 'name'] },
        ],
      });

      if (!lesson) {
        throw createError(404, 'Lesson not found');
      }

      res.status(200).send(lesson);
    } catch (error) {
      next(error);
    }
  },

  // Update a lesson
  updateLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;
      const { name, day, startTime, endTime, subjectId, classId, teacherId } = req.body;

      // Validate required associations if provided
      if (subjectId) {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) throw createError(404, 'Subject not found');
      }

      if (classId) {
        const classEntity = await Class.findByPk(classId);
        if (!classEntity) throw createError(404, 'Class not found');
      }

      if (teacherId) {
        const teacher = await Teacher.findByPk(teacherId);
        if (!teacher) throw createError(404, 'Teacher not found');
      }

      // Update the lesson
      const [updated] = await Lesson.update(
        { name, day, startTime, endTime, subjectId, classId, teacherId },
        { where: { id: lessonId } }
      );

      if (updated === 0) {
        throw createError(404, 'Lesson not found or no changes made');
      }

      // Fetch the updated lesson
      const updatedLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
          { model: Exam, as: 'exams', attributes: ['id', 'title', 'startTime', 'endTime'] },
          { model: Assignment, as: 'assignments', attributes: ['id', 'title', 'dueDate'] },
          { model: Attendance, as: 'attendances', attributes: ['id', 'studentId', 'status'] },
          { model: Subject, as: 'subject', attributes: ['id', 'name'] },
          { model: Class, as: 'class', attributes: ['id', 'name'] },
          { model: Teacher, as: 'teacher', attributes: ['id', 'name'] },
        ],
      });

      res.status(200).send(updatedLesson);
    } catch (error) {
      next(error);
    }
  },

  // Delete a lesson
  deleteLesson: async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      const deleted = await Lesson.destroy({ where: { id: lessonId } });

      if (!deleted) {
        throw createError(404, 'Lesson not found');
      }

      res.status(200).send({ message: `Lesson with ID ${lessonId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};
