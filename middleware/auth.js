const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

/* Checks for a JWT in the authorization header, verifies it, and attaches the user object to 
the request if the token is valid. If the token is missing or invalid, it returns a 401 error.
*/

const protect = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token  = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err){
            res.status(401).json({message: 'Not authorized, token failed'});
        }
    } 

    if(!token) {
        res.status(401).json({message: 'Not authorized, no token'});
    }
};

module.exports = { protect };