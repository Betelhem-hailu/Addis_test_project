require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
})();

module.exports = app;
