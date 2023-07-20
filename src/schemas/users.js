import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullname: String,
  cellnumber: Number,
  address: String,
  username: String,
  psswdhash: String,
  email: String,
  dob: String,
  gender: String,
});

const User = model('User', userSchema);

export default User;
