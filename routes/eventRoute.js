const express = require('express');
const routes = express.Router();
const eventController = require('../controllers/eventController');

// Add a new event
routes.post('/addEvent', eventController.addEvent);

// Get all events
routes.get('/getAllEvents', eventController.getAllEvents);

// Get a single event by ID
routes.get('/getEvent/:eventId', eventController.getEventById);

// Get all events with their related classes
routes.get('/getAllEventsWithDetails', eventController.getAllEventsWithDetails);

// Get a specific event with its related class
routes.get('/getEventWithDetails/:eventId', eventController.getEventWithDetails);

// Update an event by ID
routes.put('/updateEvent/:eventId', eventController.updateEvent);

// Delete an event by ID
routes.delete('/deleteEvent/:eventId', eventController.deleteEvent);

module.exports = routes;
