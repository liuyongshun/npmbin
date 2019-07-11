const fs = require('fs');

// get dir
function getDir (dir) {
  return fs.readdirSync(dir, (err, files) => {
    if (err) throw err;
    return files;
  })
}

// whether get file
function isFile (dir) {
  return fs.statSync(dir).isFile();
}

// get dir name
function getDirName (dir) {
  const dealDir = dir.substr(dir.lastIndexOf('/')+1, dir.length)
  return dealDir;
}

// get file and dir
function readFile (dir) {
  const all = fs.readFileSync(dir, 'utf-8');
  return all
}

module.exports = {
  getDir,
  getDirName,
  isFile,
  readFile
}