import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import User from '../schemas/users.js';

const getUser = async (req, reply) => {
  const usrname = req.params.username;
  try {
    const res = await User.find({ username: usrname }).exec();
    if (res.length !== 0) {
      return reply
        .status(StatusCodes.OK)
        .send(res);
    }
  } catch (err) {
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }
  return reply
    .status(StatusCodes.NOT_FOUND)
    .send({
      error: getReasonPhrase(StatusCodes.NOT_FOUND),
    });
};

const addUser = async (req, reply) => {
  const body = new User(req.body);
  try {
    const newUser = await body.save();
    return reply
      .status(StatusCodes.OK)
      .send({
        user: newUser,
      });
  } catch (err) {
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }
};

const updateUser = async (req, reply) => {
  const name = req.params.username;
  try {
    const res = await User.updateOne({ username: name }, req.body);
    return reply
      .status(StatusCodes.OK)
      .send({
        user: res,
      });
  } catch (err) {
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }
};

const deleteUser = async (req, reply) => {
  const name = req.params.username;
  try {
    const res = await User.deleteOne({ username: name });
    return reply
      .status(StatusCodes.OK)
      .send({ msg: `${name} account deleted!` });
  } catch (err) {
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }
};

export {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
