import mongoose from 'mongoose';
import User from '../schemas/users.js';

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
} catch (err) {
  // Call lowdb connector here
  console.error(err);
}

export {
  User,
};
