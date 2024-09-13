const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () =>  {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Mongo connected...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;