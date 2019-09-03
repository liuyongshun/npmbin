const util = require('./index.js');

let output = '';
let init = '';

function getTree (dir) {
  const record = []
  if (util.isFile(dir)) return;
  // get sub dir
  const files = util.getDir(dir);
  // iteration sub dir and deal with data to get we want
  files.map((file, index) => {
    let subDir = `${dir}/${file}`;
    const item = {
      name: file,
      dir: subDir,
      children: null
    };
    const dirname = util.getDirName(subDir);
    // deal base dir and delete
    const cont = subDir.replace(new RegExp('('+init+'\/)'), '');
    let dirDeep = cont.split('/');
    // if dirDeep length greater than 1 that means sub dir or files
    // last one will show └─
    dirDeep = dirDeep.reduce(acc => ((dirDeep.length > 1 ? '  ' : '') + acc), index === files.length - 1 ? '└─ ' : '├─ ');
    output += `${dirDeep}${dirname}\n`;
    if (!util.isFile(subDir)) {
      item.children = getTree(subDir);
    }
    record.push(item);
  });
  return record
}

function carryOut (url) {
  return new Promise((resolve, reject) => {
    getTree('./test')
    // util.writeFile(, 'dddzzdd', 'doc')
    resolve(output)
  })
}

module.exports = carryOut