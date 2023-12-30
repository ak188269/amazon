const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.error('Error connecting to database:', err.message);
    });
};


module.exports = connectToDatabase;
