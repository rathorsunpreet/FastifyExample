import mongoose from 'mongoose';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import User from '../schemas/users.js';

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
} catch (err) {
  // Call lowdb connector here
  console.error(err);
}

const homePage = async (req, reply) => {
  reply.send({ hello: 'world' });
};

const getUser = async (req, reply) => {
  const user = req.params.username;
  try {
    const res = await User.find({ username: user }).exec();
    return res;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const addUser = async (req, reply) => {
  try {
    const body = new User(req.body);
    const newUser = await body.save();
    return newUser;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const updateUser = async (req, reply) => {
  try {
    const name = req.params.username;
    const res = await User.updateOne({ username: name }, req.body);
    return res;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const deleteUser = async (req, reply) => {
  try {
    const name = req.params.username;
    const res = await User.deleteOne({ username: name });
    return ({ msg: `${name} account deleted!` });
  } catch (err) {
    console.error(err);
  }
  return '';
};

export {
  homePage,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
