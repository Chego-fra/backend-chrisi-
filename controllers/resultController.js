const db = require('../models/indexStart');
const createError = require('http-errors');

const Result = db.Result;
const Student = db.Student;
const Exam = db.Exam;
const Assignment = db.Assignment;

module.exports = {
  // Add a new result
  addResult: async (req, res, next) => {
    try {
      const { score, examId, assignmentId, studentId } = req.body;

      const newResult = await Result.create({
        score,
        examId,
        assignmentId,
        studentId,
      });

      res.status(201).send(newResult);
    } catch (error) {
      next(error);
    }
  },

  // Get all results
  getAllResults: async (req, res, next) => {
    try {
      const results = await Result.findAll({
        include: [
          {
            model: Student,
            attributes: ['id', 'name', 'email'], // Include student details
          },
          {
            model: Exam,
            attributes: ['id', 'title', 'date'], // Include exam details
          },
          {
            model: Assignment,
            attributes: ['id', 'title', 'dueDate'], // Include assignment details
          },
        ],
      });

      res.status(200).send(results);
    } catch (error) {
      next(error);
    }
  },

  // Get a single result by ID
  getResult: async (req, res, next) => {
    try {
      const { resultId } = req.params;

      const result = await Result.findOne({
        where: { id: resultId },
        include: [
          {
            model: Student,
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Exam,
            attributes: ['id', 'title', 'date'],
          },
          {
            model: Assignment,
            attributes: ['id', 'title', 'dueDate'],
          },
        ],
      });

      if (!result) {
        throw createError(404, 'Result not found');
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  // Update a result
  updateResult: async (req, res, next) => {
    try {
      const { resultId } = req.params;
      const { score, examId, assignmentId, studentId } = req.body;

      const [updated] = await Result.update(
        { score, examId, assignmentId, studentId },
        { where: { id: resultId } }
      );

      if (updated === 0) {
        throw createError(404, 'Result not found or no changes made');
      }

      const updatedResult = await Result.findOne({
        where: { id: resultId },
        include: [
          {
            model: Student,
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Exam,
            attributes: ['id', 'title', 'date'],
          },
          {
            model: Assignment,
            attributes: ['id', 'title', 'dueDate'],
          },
        ],
      });

      res.status(200).send(updatedResult);
    } catch (error) {
      next(error);
    }
  },

  // Delete a result
  deleteResult: async (req, res, next) => {
    try {
      const { resultId } = req.params;

      const deleted = await Result.destroy({ where: { id: resultId } });

      if (!deleted) {
        throw createError(404, 'Result not found');
      }

      res.status(200).send({ message: `Result with ID ${resultId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};
