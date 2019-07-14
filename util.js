const fs = require('fs');
const findUp = require('find-up');
const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

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

// get user dir
function readFile (dir) {
  const all = fs.readFileSync(dir, 'utf-8');
  return all
}

// generate the file
function writeFile (tree, name = 'tree', type = 'json') {
  const treeFile = JSON.stringify(tree, '', '\t');
  fs.writeFile(`${name}.${type}`, treeFile, 'utf8', (err) => {
    if (err) throw err;
    console.log(`Generate the file: ${name}.${type}`);
  });
}

module.exports = {
  getDir,
  getDirName,
  isFile,
  writeFile,
  readFile,
  config
}