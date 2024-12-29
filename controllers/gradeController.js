// Import required modules
const db = require('../models/indexStart');
const createError = require('http-errors');

const Grade = db.Grade;
const Student = db.Student;

module.exports = {
  // Add a new grade
  addGrade: async (req, res, next) => {
    try {
      const { level } = req.body;

      // Create a new grade
      const newGrade = await Grade.create({ level });

      res.status(201).send(newGrade);
    } catch (error) {
      next(error);
    }
  },

  // Get all grades
  getAllGrades: async (req, res, next) => {
    try {
      const grades = await Grade.findAll({
        include: [
          {
            model: Student,
            as: 'students', // Use the alias defined in the relationship
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      res.status(200).send(grades);
    } catch (error) {
      next(error);
    }
  },

  // Get a single grade by ID
  getGrade: async (req, res, next) => {
    try {
      const { gradeId } = req.params;

      const grade = await Grade.findOne({
        where: { id: gradeId },
        include: [
          {
            model: Student,
            as: 'students', // Use the alias defined in the relationship
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      if (!grade) {
        throw createError(404, 'Grade not found');
      }

      res.status(200).send(grade);
    } catch (error) {
      next(error);
    }
  },

  // Update a grade
  updateGrade: async (req, res, next) => {
    try {
      const { gradeId } = req.params;
      const { level } = req.body;

      const [updated] = await Grade.update(
        { level },
        { where: { id: gradeId } }
      );

      if (updated === 0) {
        throw createError(404, 'Grade not found or no changes made');
      }

      const updatedGrade = await Grade.findOne({
        where: { id: gradeId },
        include: [
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      res.status(200).send(updatedGrade);
    } catch (error) {
      next(error);
    }
  },

  // Delete a grade
  deleteGrade: async (req, res, next) => {
    try {
      const { gradeId } = req.params;

      const deleted = await Grade.destroy({ where: { id: gradeId } });

      if (!deleted) {
        throw createError(404, 'Grade not found');
      }

      res.status(200).send({ message: `Grade with ID ${gradeId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};