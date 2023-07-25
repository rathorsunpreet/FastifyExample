import mongoose from 'mongoose';
import { dbData } from './dboperator.js';
import User from '../schemas/users.js';

const dbState = {
  val: true,
};

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

mongoose.connection.on('disconnected', () => {
  console.log('DB Disconnected!');
  dbState.val = false;
});

mongoose.connection.on('disconnecting', () => {
  console.log('DB Disconnecting!');
  dbState.val = false;
});

// Host: 127.0.0.1
// Port: 27107
mongoose.connect('mongodb://127.10.0.1:27017/test')
  .catch((error) => {
    console.error('Error connecting to MongoDB');
    console.error(error);
    console.error('Switching to local DB');
    // throw error;
  });



export default dbState;
