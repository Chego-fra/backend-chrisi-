const db = require('../models/indexStart'); // Adjust the path if necessary
const createError = require('http-errors');

const Parent = db.Parent; // Sequelize Parent model
const Student = db.Student; // Sequelize Student model

module.exports = {
  // Add a new parent
  addParent: async (req, res, next) => {
    try {
      const { id, username, name, surname, email, phone, address } = req.body;

      // Check if the parent already exists by username, email, or phone
      const existingParent = await Parent.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ username }, { email }, { phone }],
        },
      });
      if (existingParent) {
        throw createError(409, 'Parent with the same username, email, or phone already exists');
      }

      // Create a new parent
      const newParent = await Parent.create({
        id,
        username,
        name,
        surname,
        email,
        phone,
        address,
      });

      res.status(201).send(newParent);
    } catch (error) {
      next(error);
    }
  },

  // Get all parents
  getAllParents: async (req, res, next) => {
    try {
      const parents = await Parent.findAll({
        include: [
          {
            model: Student,
            as: 'students', // Ensure alias matches the association
            attributes: ['id', 'name', 'surname', 'grade'], // Fields to include from Student
          },
        ],
      });

      res.status(200).send(parents);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific parent by ID
  getParent: async (req, res, next) => {
    try {
      const { parentId } = req.params;

      const parent = await Parent.findOne({
        where: { id: parentId },
        include: [
          {
            model: Student,
            as: 'students', // Ensure alias matches the association
            attributes: ['id', 'name', 'surname', 'grade'], // Fields to include from Student
          },
        ],
      });

      if (!parent) {
        throw createError(404, 'Parent not found');
      }

      res.status(200).send(parent);
    } catch (error) {
      next(error);
    }
  },

  // Update a parent
  updateParent: async (req, res, next) => {
    try {
      const { parentId } = req.params;
      const { username, name, surname, email, phone, address } = req.body;

      // Check if the parent exists by ID
      const existingParent = await Parent.findByPk(parentId);
      if (!existingParent) {
        throw createError(404, 'Parent not found');
      }

      // Update the parent
      const updatedParent = await existingParent.update({
        username,
        name,
        surname,
        email,
        phone,
        address,
      });

      res.status(200).send(updatedParent);
    } catch (error) {
      next(error);
    }
  },

  // Delete a parent
  deleteParent: async (req, res, next) => {
    try {
      const { parentId } = req.params;

      // Check if the parent exists
      const parent = await Parent.findByPk(parentId);
      if (!parent) {
        throw createError(404, 'Parent not found');
      }

      // Delete the parent
      await parent.destroy();

      res.status(200).send({ message: `Parent with ID ${parentId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all parents with their associated students
  getAllParentsWithStudents: async (req, res, next) => {
    try {
      const parents = await Parent.findAll({
        include: [
          {
            model: Student,
            as: 'students', // Ensure alias matches the association
            attributes: ['id', 'name', 'surname', 'grade'], // Fields to include from Student
          },
        ],
      });

      res.status(200).send(parents);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific parent with their associated students
  getParentWithStudents: async (req, res, next) => {
    try {
      const { parentId } = req.params;

      const parent = await Parent.findOne({
        where: { id: parentId },
        include: [
          {
            model: Student,
            as: 'students', // Ensure alias matches the association
            attributes: ['id', 'name', 'surname', 'grade'], // Fields to include from Student
          },
        ],
      });

      if (!parent) {
        throw createError(404, 'Parent not found');
      }

      res.status(200).send(parent);
    } catch (error) {
      next(error);
    }
  },
};
