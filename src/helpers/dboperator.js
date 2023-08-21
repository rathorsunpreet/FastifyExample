/* eslint-disable import/no-mutable-exports */
import JSON5 from 'json5';
import {
  readFileSync,
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

export default dbData;
