/* eslint-disable import/no-mutable-exports */
import JSON5 from 'json5';
import {
  readFileSync,
  writeFileSync,
} from 'fs';
import * as url from 'url';

let dbData = '';
const dbPath = url.fileURLToPath(new URL('../db/data.json', import.meta.url));

try {
  dbData = JSON5.parse(readFileSync(dbPath, 'utf8'));
} catch (err) {
  console.error(err);
}
// console.log(dbData);

function saveDB() {
  try {
    writeFileSync(dbPath, JSON5.stringify(dbData, null, 2), 'utf8');
  } catch (err) {
    console.error(err);
  }
}

function addUser(user) {
  dbData.push(user);
  saveDB();
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
  dbData,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
