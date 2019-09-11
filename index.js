#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const findUp = require('find-up');
const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};
const path = require('path');
const tree = require('./util/tree');

// The first element in the array is considered the canonical command,
// which may define positional arguments,
// and the remaining elements in the array are considered aliases.
// [app] will be set value ('commond' generate 22), app get 22

// one way
// yargs
// .command(['gen', 'g'], 'generate the file', {}, (argv) => {
//   console.log(argv)
// })

// other way
if (!process.argv[2]) {
  tree('./').then(res => {
    console.log(res)
  })
} else {
  yargs
  .command({
    // must be (configure <key> [value]), if not, handler arguments wont't get key and value correct
    command: 'gen',
    aliases: ['gen', 'g'],
    desc: 'generate file',
    builder: (yargs) => {
      console.log('builder')
      return yargs.options({

      })
    },
    handler: (argv) => {
      // console.log(util.readFile('./'))
      console.log('handler')
    // keep consistent with expectations
    // init = init.replace(/\/$/, '');
  // util.writeFile(getTree(init))
    }
  })
  .help('h')
  .argv
}
