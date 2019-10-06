const util = require('./index.js');
const lib = require('./lib.js');

let output = '';

function getTree (dir, options) {
  let record = [];
  let patt = '';

  if (options.i) {
    let arr = options.i.split(',');
    patt = arr.map(n => (new RegExp('.*' + n + '(\\.\\w+)?$', 'i')));
  }
  if (util.isFile(dir)) return;

  // get sub dir
  let files = util.getDir(dir);

  // iteration sub dir and deal with data to get we want
  files.map((file, index) => {

    let subDir = '';
    if (dir === './') {
      subDir = `${dir}${file}`;
    } else {
      subDir = `${dir}/${file}`;
    }

    if (options.i && patt && patt.some(n => n.test(subDir)) && util.isFile(subDir) === JSON.parse(options.f)) return;

    let item = { name: file, dir: subDir, children: null };
    let dirname = util.getDirName(subDir);
    let dirDeep = subDir.split('/');

    // if dirDeep length greater than 1 that means sub dir or files。 last one will show └─
    dirDeep = dirDeep.reduce((acc, item, i) => (i > 0 ? '  ' + acc : acc), index === files.length - 1 ? '└─ ' : '├─ ');

    output += `${dirDeep}${dirname}\n`;
    if (!util.isFile(subDir)) item.children = getTree(subDir, options);
    record.push(item);
  });
  return record;
}

function carryOut (url, options) {
  return new Promise((resolve, reject) => {
    let filterUrl = url.replace(/^\.\/\b/g, '');
    getTree(filterUrl, options);
    resolve(output);
  });
}

function genFile (url, options) {
  return new Promise((resolve, reject) => {
    resolve(getTree(url, options));
  });
}

module.exports = {
  carryOut,
  genFile
}