const db = require('../models/indexStart');
const createError = require('http-errors');

const Subject = db.Subject; // Sequelize Subject model
const Lesson = db.Lesson;   // Sequelize Lesson model

module.exports = {
  // Add a new subject
  addSubject: async (req, res, next) => {
    try {
      const { name } = req.body;

      // Check if the subject already exists
      const existingSubject = await Subject.findOne({ where: { name } });
      if (existingSubject) {
        throw createError(409, 'Subject already exists');
      }

      // Create a new subject
      const newSubject = await Subject.create({ name });

      res.status(201).send(newSubject);
    } catch (error) {
      next(error);
    }
  },

  // Get all subjects
  getAllSubjects: async (req, res, next) => {
    try {
      const subjects = await Subject.findAll({
        include: [
          {
            model: Lesson,
            as: 'lessons', // Ensure alias matches your association
            attributes: ['id', 'name', 'day'], // Include specific fields from Lesson
          },
        ],
      });

      res.status(200).send(subjects);
    } catch (error) {
      next(error);
    }
  },

  // Get a single subject by ID
  getSubject: async (req, res, next) => {
    try {
      const { subjectId } = req.params;

      const subject = await Subject.findOne({
        where: { id: subjectId },
        include: [
          {
            model: Lesson,
            as: 'lessons', // Ensure alias matches your association
            attributes: ['id', 'name', 'day'], // Include specific fields from Lesson
          },
        ],
      });

      if (!subject) {
        throw createError(404, 'Subject not found');
      }

      res.status(200).send(subject);
    } catch (error) {
      next(error);
    }
  },

  // Update a subject
  updateSubject: async (req, res, next) => {
    try {
      const { subjectId } = req.params;
      const { name } = req.body;

      // Check if the subject name already exists
      const existingSubject = await Subject.findOne({ where: { name } });
      if (existingSubject && existingSubject.id !== parseInt(subjectId)) {
        throw createError(409, 'Subject name already exists');
      }

      // Update the subject
      const [updated] = await Subject.update(
        { name },
        { where: { id: subjectId } }
      );

      if (updated === 0) {
        throw createError(404, 'Subject not found or no changes made');
      }

      // Fetch the updated subject
      const updatedSubject = await Subject.findOne({ where: { id: subjectId } });
      res.status(200).send(updatedSubject);
    } catch (error) {
      next(error);
    }
  },

  // Delete a subject
  deleteSubject: async (req, res, next) => {
    try {
      const { subjectId } = req.params;

      // Check if the subject exists
      const subject = await Subject.findOne({ where: { id: subjectId } });
      if (!subject) {
        throw createError(404, 'Subject not found');
      }

      // Delete the subject
      await Subject.destroy({ where: { id: subjectId } });

      res.status(200).send({ message: `Subject with ID ${subjectId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all subjects with lessons
  getAllSubjectsWithLessons: async (req, res, next) => {
    try {
      const subjects = await Subject.findAll({
        include: [
          {
            model: Lesson,
            as: 'lessons', // Ensure alias matches your association
            attributes: ['id', 'name', 'day'], // Include specific fields from Lesson
          },
        ],
      });

      res.status(200).send(subjects);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific subject with its lessons
  getSubjectWithLessons: async (req, res, next) => {
    try {
      const { subjectId } = req.params;

      const subject = await Subject.findOne({
        where: { id: subjectId },
        include: [
          {
            model: Lesson,
            as: 'lessons', // Ensure alias matches your association
            attributes: ['id', 'name', 'day'], // Include specific fields from Lesson
          },
        ],
      });

      if (!subject) {
        throw createError(404, 'Subject not found');
      }

      res.status(200).send(subject);
    } catch (error) {
      next(error);
    }
  },
};
