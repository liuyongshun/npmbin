#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const yargs = require('yargs');
const findUp = require('find-up');

const tree = require('./util/tree.js');
const lib = require('./util/lib.js');
const command = require('./command/commandtree.js');

const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

let argv = yargs
.option('ignore', {
  alias: 'i',
  describe: 'ignore folder'
})
.option('dir', {
  alias: 'd',
  describe: 'custom dir'
})
.option('file', {
  alias: 'f',
  describe: 'ignore for file or dir',
  default: false
})
.command(command)
.help('h')
.argv

if (argv._.length === 0) {
  let obj = lib.filterAttr(argv);
  let url = obj.dir || obj.d || './';
  tree.carryOut(url, obj).then(res => {
    console.log(res);
  });
}
