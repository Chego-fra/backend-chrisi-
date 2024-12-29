const db = require('../models/indexStart');
const createError = require('http-errors');

const Class = db.Class;
const Event = db.Event;
const Announcement = db.Announcement;
const Lesson = db.Lesson;
const Student = db.Student;
const Grade = db.Grade;
const Teacher = db.Teacher;

module.exports = {
  // Add a new class
  addClass: async (req, res, next) => {
    try {
      const { name, capacity, supervisorId, gradeId } = req.body;

      const newClass = await Class.create({
        name,
        capacity,
        supervisorId,
        gradeId,
      });

      res.status(201).send(newClass);
    } catch (error) {
      next(error);
    }
  },

  // Get all classes
  getAllClasses: async (req, res, next) => {
    try {
      const classes = await Class.findAll({
        include: [
          {
            model: Event,
            as: 'events',
            attributes: ['id', 'name', 'date', 'description'],
          },
          {
            model: Announcement,
            as: 'announcements',
            attributes: ['id', 'title', 'message', 'date'],
          },
          {
            model: Lesson,
            as: 'lessons',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'name', 'surname', 'email'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'level'],
          },
          {
            model: Teacher,
            as: 'supervisor',
            attributes: ['id', 'name', 'surname', 'email'],
          },
        ],
      });
      res.status(200).send(classes);
    } catch (error) {
      next(error);
    }
  },

  // Get a single class by ID
  getClass: async (req, res, next) => {
    try {
      const { classId } = req.params;

      const singleClass = await Class.findOne({
        where: { id: classId },
        include: [
          {
            model: Event,
            as: 'events',
            attributes: ['id', 'name', 'date', 'description'],
          },
          {
            model: Announcement,
            as: 'announcements',
            attributes: ['id', 'title', 'message', 'date'],
          },
          {
            model: Lesson,
            as: 'lessons',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'name', 'surname', 'email'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'level'],
          },
          {
            model: Teacher,
            as: 'supervisor',
            attributes: ['id', 'name', 'surname', 'email'],
          },
        ],
      });

      if (!singleClass) {
        throw createError(404, 'Class not found');
      }

      res.status(200).send(singleClass);
    } catch (error) {
      next(error);
    }
  },

  // Update a class
  updateClass: async (req, res, next) => {
    try {
      const { classId } = req.params;
      const { name, capacity, supervisorId, gradeId } = req.body;

      const [updated] = await Class.update(
        { name, capacity, supervisorId, gradeId },
        { where: { id: classId } }
      );

      if (updated === 0) {
        throw createError(404, 'Class not found or no changes made');
      }

      const updatedClass = await Class.findOne({
        where: { id: classId },
        include: [
          {
            model: Event,
            as: 'events',
            attributes: ['id', 'name', 'date', 'description'],
          },
          {
            model: Announcement,
            as: 'announcements',
            attributes: ['id', 'title', 'message', 'date'],
          },
          {
            model: Lesson,
            as: 'lessons',
            attributes: ['id', 'topic', 'date', 'duration'],
          },
          {
            model: Student,
            as: 'students',
            attributes: ['id', 'name', 'surname', 'email'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'level'],
          },
          {
            model: Teacher,
            as: 'supervisor',
            attributes: ['id', 'name', 'surname', 'email'],
          },
        ],
      });

      res.status(200).send(updatedClass);
    } catch (error) {
      next(error);
    }
  },

  // Delete a class
  deleteClass: async (req, res, next) => {
    try {
      const { classId } = req.params;

      const deleted = await Class.destroy({ where: { id: classId } });

      if (!deleted) {
        throw createError(404, 'Class not found');
      }

      res.status(200).send({ message: `Class with ID ${classId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};
