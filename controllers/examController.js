const db = require('../models/indexStart');
const createError = require('http-errors');

const Exam = db.Exam; // Sequelize Exam model
const Lesson = db.Lesson; // Sequelize Lesson model

module.exports = {
  // Add a new exam
  addExam: async (req, res, next) => {
    try {
      const { title, startTime, endTime, lessonId } = req.body;

      // Check if the lesson exists before creating an exam
      const lesson = await Lesson.findByPk(lessonId);
      if (!lesson) {
        throw createError(404, 'Lesson not found');
      }

      // Create a new exam linked to a lesson by lessonId
      const newExam = await Exam.create({ title, startTime, endTime, lessonId });

      res.status(201).send(newExam);
    } catch (error) {
      next(error);
    }
  },

  // Get all exams
  getAllExams: async (req, res, next) => {
    try {
      const exams = await Exam.findAll({
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'name', 'day'],
          },
        ],
      });

      res.status(200).send(exams);
    } catch (error) {
      next(error);
    }
  },

  // Get a single exam by ID
  getExam: async (req, res, next) => {
    try {
      const { examId } = req.params;

      const exam = await Exam.findOne({
        where: { id: examId },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'name', 'day'],
          },
        ],
      });

      if (!exam) {
        throw createError(404, 'Exam not found');
      }

      res.status(200).send(exam);
    } catch (error) {
      next(error);
    }
  },

  // Update an exam by ID
  updateExam: async (req, res, next) => {
    try {
      const { examId } = req.params;
      const { title, startTime, endTime, lessonId } = req.body;

      // Check if the provided lessonId exists
      if (lessonId) {
        const lesson = await Lesson.findByPk(lessonId);
        if (!lesson) {
          throw createError(404, 'Lesson not found');
        }
      }

      // Update the exam
      const [updated] = await Exam.update(
        { title, startTime, endTime, lessonId },
        { where: { id: examId } }
      );

      if (updated === 0) {
        throw createError(404, 'Exam not found or no changes made');
      }

      // Fetch the updated exam
      const updatedExam = await Exam.findOne({
        where: { id: examId },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'name', 'day'],
          },
        ],
      });

      res.status(200).send(updatedExam);
    } catch (error) {
      next(error);
    }
  },

  // Delete an exam by ID
  deleteExam: async (req, res, next) => {
    try {
      const { examId } = req.params;

      const deleted = await Exam.destroy({ where: { id: examId } });

      if (!deleted) {
        throw createError(404, 'Exam not found');
      }

      res.status(200).send({ message: `Exam with ID ${examId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all exams with their associated lessons
  getAllExamsWithLessons: async (req, res, next) => {
    try {
      const exams = await Exam.findAll({
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'name', 'day'],
          },
        ],
      });

      res.status(200).send(exams);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific exam with its associated lesson
  getExamWithLesson: async (req, res, next) => {
    try {
      const { examId } = req.params;

      const exam = await Exam.findOne({
        where: { id: examId },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'name', 'day'],
          },
        ],
      });

      if (!exam) {
        throw createError(404, 'Exam not found');
      }

      res.status(200).send(exam);
    } catch (error) {
      next(error);
    }
  },
};
