const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

//Creates a JWT for the use
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};


// Handles user registration by checking if the user exists, creating a new user, 
// and returning the user data along with a JWT.
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(400).json({message: 'Invalid user data'});
        }

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


// Handles user login by checking if the user exists and if the password matches, 
// then returns the user data along with a JWT.
const authUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Get the logged-in user's profile
const getUserProfile = async (req, res) => {
    try {
        // Respond with the user information excluding password
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user's profile information (name, email)
const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
  
        // Check if the new email already exists for another user
        const existingEmail = await User.findOne({ email });
        if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
  
        const updatedUser = await user.save();
  
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id), // Reissue token if necessary
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Change user's password
const updateUserPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(req.user._id);
  
      if (user && (await user.matchPassword(currentPassword))) {
        // Hash the new password before saving
        user.password = newPassword;
        await user.save();
  
        res.json({ message: 'Password updated successfully' });
      } else {
        res.status(400).json({ message: 'Current password is incorrect' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  

module.exports = {registerUser, authUser, getUserProfile, updateUserProfile, updateUserPassword};