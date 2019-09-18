const fs = require('fs');
const findUp = require('find-up');

const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const util = require('../util/index.js');
const lib = require('../util/lib.js');
const analyze = require('../util/analyze.js');

module.exports = {
  command: 'analyze',
  aliases: ['analyze', 'a'],
  desc: 'analyze file',
  builder: (yargs) => {
    return yargs
    // .config(config)
    .option('rule', {
      alias: 'r',
      describe: 'The ruler of name',
      default: 'lowerCamel'
    })
     .option('deep', {
      describe: '深度遍历文件',
      default: false
    })
  },
  handler: (argv) => {
    let obj = lib.filterAttr(argv);
    let url = obj.dir || obj.d || './';
    analyze(url, obj).then(res => {
      util.writeFile(res, obj.n, obj.t);
    })
  }
}
