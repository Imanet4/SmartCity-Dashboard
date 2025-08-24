const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

//Import routes
const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
const alertsRouter = require('./routes/alerts');

const app = express();

//Data base connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


//Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limits each IP to 100 requests per windowMs
});
app.use(limiter);




//Test route
app.get('/', (req, res) => {
    res.send('Smart City Dashboard API!');
});

//Routes
app.use('/api/v1', indexRouter);
app.use('/api/v1/weather', weatherRouter);
app.use('/api/v1/alerts', alertsRouter);


//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});