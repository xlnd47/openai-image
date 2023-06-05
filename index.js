const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes
app.use('/openai', require('./routes/openaiRoutes'));

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});