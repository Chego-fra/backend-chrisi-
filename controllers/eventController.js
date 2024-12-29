const db = require('../models/indexStart');
const createError = require('http-errors');

const Event = db.Event;
const Class = db.Class;

module.exports = {
  // Add a new event
  addEvent: async (req, res, next) => {
    try {
      const { title, description, startTime, endTime, classId } = req.body;

      // Create a new event
      const newEvent = await Event.create({
        title,
        description,
        startTime,
        endTime,
        classId,
      });

      res.status(201).send(newEvent);
    } catch (error) {
      next(error);
    }
  },

  // Get all events
  getAllEvents: async (req, res, next) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'], // Adjust attributes to match the Class model
          },
        ],
      });
      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  },

  // Get a single event by ID
  getEventById: async (req, res, next) => {
    try {
      const { eventId } = req.params;

      const event = await Event.findOne({
        where: { id: eventId },
        include: [
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      if (!event) {
        throw createError(404, 'Event not found');
      }

      res.status(200).send(event);
    } catch (error) {
      next(error);
    }
  },

  // Update an event
  updateEvent: async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const { title, description, startTime, endTime, classId } = req.body;

      const [updated] = await Event.update(
        { title, description, startTime, endTime, classId },
        { where: { id: eventId } }
      );

      if (updated === 0) {
        throw createError(404, 'Event not found or no changes made');
      }

      const updatedEvent = await Event.findOne({
        where: { id: eventId },
        include: [
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      res.status(200).send(updatedEvent);
    } catch (error) {
      next(error);
    }
  },

  // Delete an event
  deleteEvent: async (req, res, next) => {
    try {
      const { eventId } = req.params;

      const deleted = await Event.destroy({ where: { id: eventId } });

      if (!deleted) {
        throw createError(404, 'Event not found');
      }

      res.status(200).send({ message: `Event with ID ${eventId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all events with their related classes
  getAllEventsWithDetails: async (req, res, next) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      res.status(200).send(events);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific event with its related class
  getEventWithDetails: async (req, res, next) => {
    try {
      const { eventId } = req.params;

      const event = await Event.findOne({
        where: { id: eventId },
        include: [
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
        ],
      });

      if (!event) {
        throw createError(404, 'Event not found');
      }

      res.status(200).send(event);
    } catch (error) {
      next(error);
    }
  },
};
