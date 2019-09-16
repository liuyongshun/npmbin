const util = require('./index.js');

class CommonMethods {
  filterAttr (obj, exc = ['_', '$0']) {
    let temp = {};
    Object.keys(obj).forEach(n => {
      if (!exc.includes(n)) temp[n] = obj[n];
    })
    if (temp.ignore) temp.i = temp.ignore;
    if (temp.file) temp.f = temp.file;
    if (temp.name) temp.n = temp.name;
    if (temp.type) temp.t = temp.type;
    return temp;
  }
  ignoreFile (dir, ignore, isFile) {
    console.log(dir)
    let subDir = `${dir}/${file}`;
    dir.forEach(n => {
      console.log(util.isFile(n), '3333')
    })
    return dir
  }
}

module.exports = new CommonMethods()