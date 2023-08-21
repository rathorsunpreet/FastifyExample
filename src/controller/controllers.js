import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../schemas/users.js';

const auth = async (req, reply) => {
  const { username, password } = req.body;
  try {
    const res = await User.find({ username }).exec();
    if (res.length !== 0) {
      const passwdHash = res.pswdhash;
      try {
        const check = await bcrypt.compare(password, passwdHash);
        if (check) {
          return reply
            .status(StatusCodes.OK)
            .send({
              msg: 'Valid User',
            });
        }
      } catch (err) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({
            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
          });
      }
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

const getUser = async (req, reply) => {
  const { username } = req.params;
  try {
    const res = await User.find({ username }).exec();
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
    body.pswdhash = await bcrypt.hash(body.password, 10);
  } catch (err) {
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }
  delete body.password;
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
  auth,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
