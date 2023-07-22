import mongoose from 'mongoose';
import JSON5 from 'json5';
import { readFileSync } from 'fs';
import * as url from 'url';
import User from '../schemas/users.js';

let dbData = '';

try {
  const dbPath = url.fileURLToPath(new URL('../db/data.json', import.meta.url));
  dbData = JSON5.parse(readFileSync(dbPath, 'utf8'));
} catch (err) {
  console.error(err);
}
// console.log(dbData);

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .catch((error) => {
    throw error;
  });

// Handle error after connection
mongoose.connection.on('error', (err) => {
  throw err;
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
