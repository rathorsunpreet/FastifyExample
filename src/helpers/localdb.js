import {
  dbData,
  saveDB,
} from './dboperator.js';

function addUser(user) {
  dbData.push(user);
  saveDB();
  return user;
}

function getUser(username) {
  const user = dbData.filter((item) => item.username.localeCompare(username) === 0);
  if (user.length !== 0) {
    return user[0];
  }
  return '';
}

function deleteUser(username) {
  const user = getUser(username);
  if (user !== '') {
    const index = dbData.indexOf(user);
    const deletedUser = dbData.splice(index, 1);
    saveDB();
    return deletedUser[0];
  }
  return '';
}

function updateUser(username, body) {
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
