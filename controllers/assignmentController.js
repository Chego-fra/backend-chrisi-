const db = require('../models/indexStart');
const createError = require('http-errors');

const Assignment = db.Assignment;
const Lesson = db.Lesson;
const Result = db.Result;

module.exports = {
  // Add a new assignment
  addAssignment: async (req, res, next) => {
    try {
      const { title, startDate, dueDate, lessonId } = req.body;

      // Check if the lesson exists
      const lesson = await Lesson.findByPk(lessonId);
      if (!lesson) {
        throw createError(404, 'Lesson not found');
      }

      // Create the new assignment
      const newAssignment = await Assignment.create({
        title,
        startDate,
        dueDate,
        lessonId,
      });

      res.status(201).send(newAssignment);
    } catch (error) {
      next(error);
    }
  },

  // Get all assignments
  getAllAssignments: async (req, res, next) => {
    try {
      const assignments = await Assignment.findAll({
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Result,
            attributes: ['id', 'score', 'studentId'],
          },
        ],
      });

      res.status(200).send(assignments);
    } catch (error) {
      next(error);
    }
  },

  // Get an assignment by ID
  getAssignment: async (req, res, next) => {
    try {
      const { assignmentId } = req.params;

      const assignment = await Assignment.findOne({
        where: { id: assignmentId },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Result,
            attributes: ['id', 'score', 'studentId'],
          },
        ],
      });

      if (!assignment) {
        throw createError(404, 'Assignment not found');
      }

      res.status(200).send(assignment);
    } catch (error) {
      next(error);
    }
  },

  // Update an assignment
  updateAssignment: async (req, res, next) => {
    try {
      const { assignmentId } = req.params;
      const { title, startDate, dueDate, lessonId } = req.body;

      // Check if the lesson exists
      if (lessonId) {
        const lesson = await Lesson.findByPk(lessonId);
        if (!lesson) {
          throw createError(404, 'Lesson not found');
        }
      }

      // Update the assignment
      const [updated] = await Assignment.update(
        { title, startDate, dueDate, lessonId },
        { where: { id: assignmentId } }
      );

      if (updated === 0) {
        throw createError(404, 'Assignment not found or no changes made');
      }

      const updatedAssignment = await Assignment.findOne({
        where: { id: assignmentId },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Result,
            attributes: ['id', 'score', 'studentId'],
          },
        ],
      });

      res.status(200).send(updatedAssignment);
    } catch (error) {
      next(error);
    }
  },

  // Delete an assignment
  deleteAssignment: async (req, res, next) => {
    try {
      const { assignmentId } = req.params;

      const deleted = await Assignment.destroy({ where: { id: assignmentId } });

      if (!deleted) {
        throw createError(404, 'Assignment not found');
      }

      res.status(200).send({ message: `Assignment with ID ${assignmentId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};
