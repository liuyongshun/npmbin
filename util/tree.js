const util = require('./index.js');
const lib = require('./lib.js');

let output = '';
let init = '';
firstLevelOfLast = '';

function getTree (dir, options, start) {
  let record = [];
  let patt = null

  if (options.i) patt = new RegExp('.*' + options.i + '(\\.\\w+)?$', 'i');
  if (util.isFile(dir)) return;

  // get sub dir
  let files = util.getDir(dir);
  if (start) firstLevelOfLast = files[files.length - 1];
  console.log(firstLevelOfLast,' ffkkkkkzzzzlll')
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
    dirDeep = dirDeep.reduce(acc => {
      return ((dirDeep.length > 1 ? `${ dirDeep.includes(firstLevelOfLast) ? '' : '│'}  ` : '') + acc);
    }, index === files.length - 1 ? '└─ ' : '├─ ');

    output += `${dirDeep}${dirname}\n`;
    if (!util.isFile(subDir)) item.children = getTree(subDir, options);
    record.push(item);
  });
  return record;
}

function carryOut (url, options) {
  return new Promise((resolve, reject) => {
    getTree(url, options, true);
    resolve(output);
  });
}

function genFile (url, options) {
  return new Promise((resolve, reject) => {
    resolve(getTree(url, options, true));
  });
}

module.exports = {
  carryOut,
  genFile
}