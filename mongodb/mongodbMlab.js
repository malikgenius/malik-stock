const mongoose = require('mongoose');
const mongoURI = require('../config/Keys').mongoURI;
// Simple mongoose.com to only open single connection to DB.

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth Mlab is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
