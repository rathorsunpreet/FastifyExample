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

export {
  dbData,
  saveDB,
};
