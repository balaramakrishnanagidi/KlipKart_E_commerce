const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoute = require('./app/Routes/User');
const dbConfig = require('./config/database.config');

const app = express();
const port = 2025;

// Use path.resolve to create an absolute path to the 'app' directory
const appDirectory = path.resolve(__dirname, 'app');

// To serve static files
app.use('/products', express.static(path.join(appDirectory, 'src', 'products')));
app.use('/banners', express.static(path.join(appDirectory, 'src', 'banners')));

// Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS policy
app.use(cors());

// Define your other routes
app.use('/', userRoute);

// MongoDB connection setup
mongoose.promise = global.promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.log('Could not connect to the database', err);
    process.exit(1);
  });

// Default route
app.get('/', (req, res) => {
  res.send({ message: 'Hello, Welcome to Klipkart!' });
});

// Start the server
app.listen(port, '192.168.0.158', () => {
  console.log(`Server is listening on port ${port}`);
});
