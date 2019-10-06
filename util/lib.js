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
    if (temp.sign) temp.s = temp.sign;
    return temp;
  }
}

module.exports = new CommonMethods()