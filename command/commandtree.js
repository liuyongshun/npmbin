const util = require('../util/index.js');
const lib = require('../util/lib.js');

module.exports = {
  command: 'gen',
  aliases: ['gen', 'g'],
  desc: 'generate file',
  builder: (yargs) => {
    console.log('builder', yargs)
      // util.writeFile(getTree(init))
  },
  handler: (argv) => {
    console.log('handler', argv)
  }
}
