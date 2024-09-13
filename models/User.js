const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the Schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});

// Set Up Pre Hooks for the Model (Actions Taken before an Operation)
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    // Salt (random bits added to each password)
    const salt = await bcrypt.genSalt(10);
    // Hash the Password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Check whether password equals to hashed password
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;