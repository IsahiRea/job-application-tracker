const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {registerUser, authUser, getUserProfile, updateUserProfile, updateUserPassword} = require('../controllers/authController');

/*
POST /register: Registers a new user.
POST /login: Authenticates an existing user.
*/


router.post('/register', registerUser);
router.post('/login', authUser);

// Route to get user's profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/password', protect, updateUserPassword);

module.exports = router;