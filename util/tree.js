const util = require('./index.js');
const lib = require('./lib.js');

let output = '';
let init = '';

function getTree (dir, options) {
  let record = [];
  let patt = null
  if (options.i) patt = new RegExp('.*' + options.i + '(\\.\\w+)?$', 'i');
  if (util.isFile(dir)) return;
  // get sub dir
  let files = util.getDir(dir);
  // iteration sub dir and deal with data to get we want
  files.map((file, index) => {
    let subDir = `${dir}/${file}`;
    if (options.i && patt.test(subDir) && util.isFile(subDir) === JSON.parse(options.f)) return;
    let item = { name: file, dir: subDir, children: null };
    let dirname = util.getDirName(subDir);
    // deal base dir and delete
    let cont = subDir.replace(new RegExp('(' + init + '\/)'), '');
    let dirDeep = cont.split('/');
    // if dirDeep length greater than 1 that means sub dir or files。 last one will show └─
    dirDeep = dirDeep.reduce(acc => ((dirDeep.length > 1 ? '│  ' : '') + acc), index === files.length - 1 ? '└─ ' : '├─ ');
    output += `${dirDeep}${dirname}\n`;
    if (!util.isFile(subDir)) item.children = getTree(subDir, options);
    record.push(item);
  });
  return record;
}

function carryOut (url, options) {
  return new Promise((resolve, reject) => {
    getTree(url, options);
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