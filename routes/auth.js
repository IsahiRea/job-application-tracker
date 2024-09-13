const express = require('express');
const router = express.Router();
const {registerUser, authUser} = require('../controllers/authController');

/*
POST /register: Registers a new user.
POST /login: Authenticates an existing user.
*/


router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;