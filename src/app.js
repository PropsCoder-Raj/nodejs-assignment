const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const connectWithDb = require("./api/config/db");
const middlewares = require('./api/middleware/errorMiddleware');

const app = express();

connectWithDb(); // Connect to the database

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello 🌎🌍🌏',
  });
});

app.use('/api/v1/user', require('./api/routes/user')); // User routes
app.use('/api/v1/blogs', require('./api/routes/blogs')); // Blogs routes
app.use('/api/v1/news', require('./api/routes/news')); // News routes
app.use('/api/v1/music', require('./api/routes/music')); // Music routes
app.use('/api/v1/task', require('./api/routes/task')); // Task routes
app.use('/api/v1/post', require('./api/routes/posts')); // Post routes
app.use('/api/v1/recipe', require('./api/routes/recipe')); // Recipe routes
app.use('/api/v1/movies', require('./api/routes/movies')); // Movies routes
app.use('/api/v1/estate', require('./api/routes/estate')); // Estate routes
app.use('/api/v1/wether', require('./api/routes/wether')); // Wether routes

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
