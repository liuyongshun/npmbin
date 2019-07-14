#!/usr/bin/env node
const yargs = require('yargs');
const util = require('./util');

let output = '';
let init = '';

// The first element in the array is considered the canonical command,
// which may define positional arguments,
// and the remaining elements in the array are considered aliases.
// [app] will be set value ('commond' generate 22), app get 22

// one way
// yargs.command(['generate [app]', 'g'], 'generate the file', {}, (argv) => {
//   console.log(argv)
// })

// other way
yargs
.config(util.config)
.command({
  // must be (configure <key> [value]), if not, handler arguments wont't get key and value correct
  command: 'configure <key> [value]',
  // alias for set config key and value，('command' config aa 3),handler method get key: aa , vakue: 3
  aliases: ['config', 'cfg'],
  desc: 'Set a config variable',
  builder: (yargs) => yargs.default('value', 'true'),
  handler: (argv) => {
    // console.log(util.readFile('./'))
    console.log(argv, 'handler')
  // keep consistent with expectations
  // init = init.replace(/\/$/, '');
// util.writeFile(getTree(init))
  }
})
.demandCommand()
.help('h')
.argv

console.log(yargs.parse(), 'fffffzzff')
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