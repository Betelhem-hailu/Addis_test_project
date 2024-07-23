require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
})();

module.exports = app;
