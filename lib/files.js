
import fs from 'fs';
import path from 'path';


export function getCurrentDirectoryBase() {
  return path.basename(process.cwd());
}
export function directoryExists(filePath) {
  return fs.existsSync(filePath);
}
