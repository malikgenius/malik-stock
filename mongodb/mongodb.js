const mongoose = require('mongoose');
const mongoFusion = require('../config/Keys').mongoFusion;
const Grid = require('gridfs-stream');
const fs = require('fs');
mongoose.Promise = global.Promise;

// Simple mongoose.com to only open single connection to DB.
mongoose
  .connect(
    mongoFusion,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth is connected to local Fusion DB');
  })
  .catch(err => {
    console.log('error:', err);
  });
