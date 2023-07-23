import mongoose from 'mongoose';
import { dbData } from './dboperator.js';
import User from '../schemas/users.js';

// Host: 127.0.0.1
// Port: 27107
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Connecting to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB');
    console.error(error);
    console.error('Switching to local DB');
    // throw error;
  });

// Populate DB if collection count is zero
mongoose.connection.on('connected', () => {
  User.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        console.log('No Documents Found!');
        console.log('Adding from local db file!');
        User.insertMany(dbData);
      }
    })
    .catch((err) => {
      throw err;
    });
});

export {
  User,
};
