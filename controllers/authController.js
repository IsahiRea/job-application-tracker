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

module.exports = {registerUser, authUser};