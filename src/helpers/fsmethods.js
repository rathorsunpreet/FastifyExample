// Gets filename and dirname using URLs
import * as url from 'url';

function getDirName(newPath) {
  if (newPath.length === 0) {
    return url.fileURLToPath(new URL('.', import.meta.url));
  }
  return url.fileURLToPath(new URL(newPath, import.meta.url));
}

export default getDirName;
