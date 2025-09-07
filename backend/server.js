const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Import routes
const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
const alertsRouter = require('./routes/alerts');
const eventsRouter = require('./routes/events');
const trafficRouter = require('./routes/traffic');
const citiesRouter = require('./routes/cities');


//Importing error handler
const globalErrorHandler = require('./utils/errorHandler');

//Rate limiter middlware
const { generalLimiter } = require('./middleware/rateLimiter');


const app = express();

//Data base connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//Rate Limiter
app.use(generalLimiter);



// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());




//Test route
app.get('/', (req, res) => {
    res.send('Smart City Dashboard API!');
});

//Routes
app.use('/api', indexRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/traffic', trafficRouter);
app.use('/api/cities', citiesRouter);




//Error handling middleware
app.use(globalErrorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});