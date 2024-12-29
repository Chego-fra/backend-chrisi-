const express = require('express');
const routes = express.Router();
const announcementController = require('../controllers/announcementController');

// Add a new announcement
routes.post('/addAnnouncement', announcementController.addAnnouncement);

// Get all announcements
routes.get('/getAllAnnouncements', announcementController.getAllAnnouncements);

// Get a single announcement by ID
routes.get('/getAnnouncement/:announcementId', announcementController.getAnnouncement);

// Update an announcement by ID
routes.put('/updateAnnouncement/:announcementId', announcementController.updateAnnouncement);

// Delete an announcement by ID
routes.delete('/deleteAnnouncement/:announcementId', announcementController.deleteAnnouncement);

module.exports = routes;
