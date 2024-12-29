const db = require('../models/indexStart'); 
const createError = require('http-errors');

const Announcement = db.Announcement;
const Class = db.Class;

module.exports = {
  // Add a new announcement
  addAnnouncement: async (req, res, next) => {
    try {
      const { title, description, date, classId } = req.body;

      // Create a new announcement
      const newAnnouncement = await Announcement.create({
        title,
        description,
        date,
        classId,
      });

      res.status(201).send(newAnnouncement);
    } catch (error) {
      next(error);
    }
  },

  // Get all announcements
  getAllAnnouncements: async (req, res, next) => {
    try {
      const announcements = await Announcement.findAll({
        include: [
          {
            model: Class,
            as: 'class', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });
      res.status(200).send(announcements);
    } catch (error) {
      next(error);
    }
  },

  // Get a single announcement by ID
  getAnnouncement: async (req, res, next) => {
    try {
      const { announcementId } = req.params;

      const announcement = await Announcement.findOne({
        where: { id: announcementId },
        include: [
          {
            model: Class,
            as: 'class', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      if (!announcement) {
        throw createError(404, 'Announcement not found');
      }

      res.status(200).send(announcement);
    } catch (error) {
      next(error);
    }
  },

  // Update an announcement by ID
  updateAnnouncement: async (req, res, next) => {
    try {
      const { announcementId } = req.params;
      const { title, description, date, classId } = req.body;

      const [updated] = await Announcement.update(
        { title, description, date, classId },
        { where: { id: announcementId } }
      );

      if (updated === 0) {
        throw createError(404, 'Announcement not found or no changes made');
      }

      const updatedAnnouncement = await Announcement.findOne({
        where: { id: announcementId },
        include: [
          {
            model: Class,
            as: 'class', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      res.status(200).send(updatedAnnouncement);
    } catch (error) {
      next(error);
    }
  },

  // Delete an announcement by ID
  deleteAnnouncement: async (req, res, next) => {
    try {
      const { announcementId } = req.params;

      const deleted = await Announcement.destroy({ where: { id: announcementId } });

      if (!deleted) {
        throw createError(404, 'Announcement not found');
      }

      res.status(200).send({ message: `Announcement with ID ${announcementId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },
};
