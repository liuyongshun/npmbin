const fs = require('fs');

class ObjUtil {
  // get dir
  getDir (dir) {
    return fs.readdirSync(dir, (err, files) => {
      if (err) throw err;
      return files;
    })
  }

  // whether get file
  isFile (dir) {
    return fs.statSync(dir).isFile();
  }

  // get dir name
  getDirName (dir) {
    const dealDir = dir.substr(dir.lastIndexOf('/')+1, dir.length)
    return dealDir;
  }

  // get user dir
  readFile (dir) {
    const all = fs.readFileSync(dir, 'utf-8');
    return all;
  }

  // generate the file
  writeFile (data, name = 'tree', type = 'json') {
    return new Promise((resolve, reject) => {
      let dealData = ''
      if (typeof data !== 'string') {
        dealData = JSON.stringify(data, '', '\t');
      } else {
        dealData = data
      }
      fs.writeFile(`${name}.${type}`, dealData, 'utf8', (err) => {
        if (err) throw err;
        resolve(`Generate the file: ${name}.${type}`);
      });
    });
  }
}

module.exports = new ObjUtil()