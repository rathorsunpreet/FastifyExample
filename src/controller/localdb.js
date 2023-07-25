import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';
import {
  dbData,
  saveDB,
} from '../helpers/dboperator.js';

const addUser = async (req, reply) => {
  const user = req.body;
  dbData.push(user);
  saveDB();
  return user;
}

const getUser = async (req, reply) => {
  const username = req.params.username;
  const user = dbData.filter((item) => item.username.localeCompare(username) === 0);
  if (user.length !== 0) {
    return user[0];
  }
  return '';
}

const deleteUser = async (req, reply) => {
  const username = req.params.username;
  const user = getUser(username);
  if (user !== '') {
    const index = dbData.indexOf(user);
    const deletedUser = dbData.splice(index, 1);
    saveDB();
    return deletedUser[0];
  }
  return '';
}

const updateUser = async (req, reply) => {
  const username = req.params.username;
  const body = req.body;
  const user = deleteUser(username);
  if (user !== '') {
    Object.keys(user).forEach((key) => {
      if (Object.keys(body).includes(key)) {
        user[key] = body[key];
      }
    });
    addUser(user);
    saveDB();
    return user;
  }
  return '';
}

export {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
