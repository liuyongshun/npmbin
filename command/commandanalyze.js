const util = require('../util/index.js');
const lib = require('../util/lib.js');

module.exports = {
  command: 'analyze',
  aliases: ['analyze', 'a'],
  desc: 'analyze file',
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
