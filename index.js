#!/usr/bin/env node
const yargs = require('yargs');
const findUp = require('find-up');
const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const tree = require('./util/tree');

tree('./test', (res) => {
  console.log(res)
})

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
.option('zz', {
  alias: 'z',
  describe: 'create a file'
})
// .command('hello', 'generate the file', (argv) => {
//   console.log(argv, '33333')

// }, (argv) => {
//   console.log(argv, 'fkffkfkfk')
// })
.command({
  // must be (configure <key> [value]), if not, handler arguments wont't get key and value correct
  command: 'configure <key> [value]',
  // alias for set config key and value，('command' config aa 3),handler method get key: aa , vakue: 3
  aliases: ['config', 'cfg'],
  desc: 'Set a config variable',
  builder: (yargs) => {
    console.log(yargs, 'kkkk')
    console.log(getTree('./'))
    yargs.default('value', 'true')
  },
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
