const util = require('../util/index.js');
const lib = require('../util/lib.js');

module.exports = {
  command: 'analyze',
  aliases: ['analyze', 'a'],
  desc: 'analyze file',
  builder: (yargs) => {
    return yargs
    .option('rule', {
      alias: 'r',
      describe: 'The ruler of name',
      default: 'lowerCamel'
    })
  },
  handler: (argv) => {
    console.log(argv, 'llll')
    // let obj = lib.filterAttr(argv);
    // let url = obj.dir || obj.d || './';
    // tree.genFile(url, obj).then(res => {
    //   util.writeFile(res, obj.n, obj.t);
    // })
  }
}
