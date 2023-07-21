import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import * as Schemas from '../helpers/dbConnector.js';

const homePage = async (req, reply) => {
  reply.send({ hello: 'world' });
};

const getUser = async (req, reply) => {
  const user = req.params.username;
  try {
    const res = await Schemas.User.find({ username: user }).exec();
    return res;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const addUser = async (req, reply) => {
  try {
    const body = new Schemas.User(req.body);
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
    const res = await Schemas.User.updateOne({ username: name }, req.body);
    return res;
  } catch (err) {
    console.error(err);
  }
  return '';
};

const deleteUser = async (req, reply) => {
  try {
    const name = req.params.username;
    const res = await Schemas.User.deleteOne({ username: name });
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
