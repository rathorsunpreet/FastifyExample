// File to create hashes of password
/* eslint-disable no-await-in-loop */
import bcrypt from 'bcrypt';
import {
  readFileSync,
  writeFileSync,
} from 'fs';
import * as url from 'url';
import JSON5 from 'json5';

const userFile = '../db/userpass.json';
const dbFile = '../db/data.json';

const saltRounds = 10;

const userPath = url.fileURLToPath(new URL(userFile, import.meta.url));
const dbPath = url.fileURLToPath(new URL(dbFile, import.meta.url));

let dbData = '';
let userData = '';

dbData = JSON5.parse(readFileSync(dbPath, 'utf8'));
userData = JSON5.parse(readFileSync(userPath, 'utf8'));

async function createHash() {
  for (let i = 0; i < dbData.length; i += 1) {
    const dbUsername = dbData[i].username;
    const UserFilename = userData[i].username;
    if (dbUsername.localeCompare(UserFilename) === 0) {
      const { psswd } = userData[i];
      const psswdHash = await bcrypt.hash(psswd, saltRounds);
      dbData[i].psswdhash = psswdHash.slice(0);
    }
  }
  console.log(dbData);
  try {
    writeFileSync(dbPath, JSON5.stringify(dbData, null, 2), 'utf-8');
    console.log('data.json file has been modified!');
    console.log('psswdhash has been added successfully!');
  } catch (err) {
    console.error(err);
  }
}

createHash();
