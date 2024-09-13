const express = require('express');
const router = express.Router();
const {createApplication, getApplications, updateApplication, deleteApplication} = require('../controllers/applicationController');
const {protect} = require('../middleware/auth');

/*
POST /: Creates a new application.
GET /: Retrieves all applications for the authenticated user.
PUT /:id: Updates an existing application.
DELETE /:id: Deletes an application.
*/


router.route('/')
    .post(protect, createApplication)
    .get(protect, getApplications);

router.route('/:id')
    .put(protect, updateApplication)
    .delete(protect, deleteApplication);

module.exports = router;