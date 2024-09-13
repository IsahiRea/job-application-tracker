const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const bodyParser = require('body-parser');

dotenv.config();

connectDB();
const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});