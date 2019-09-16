const util = require('../util/index.js');
const lib = require('../util/lib.js');
const tree = require('../util/tree.js');

module.exports = {
  command: 'gen',
  aliases: ['gen', 'g'],
  desc: 'generate file',
  builder: (yargs) => {
    return yargs
    .option('name', {
      alias: 'n',
      describe: 'generate file of name',
      default: 'tree'
    })
    .option('type', {
      alias: 't',
      describe: 'generate file of type',
      default: 'json'
    })
  },
  handler: (argv) => {
    let obj = lib.filterAttr(argv);
    let url = obj.dir || obj.d || './';
    tree.genFile(url, obj).then(res => {
      util.writeFile(res, obj.n, obj.t);
    })
  }
}
