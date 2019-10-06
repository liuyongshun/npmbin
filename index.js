#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const yargs = require('yargs');
const findUp = require('find-up');

const tree = require('./util/tree.js');
const lib = require('./util/lib.js');
const command = require('./command/commandtree.js');
const analyze = require('./command/commandanalyze.js');

const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

let argv = yargs
.config(config.global)
.option('ignore', {
  alias: 'i',
  describe: '要忽略的文件或目录名',
  default: 'node_modules,.git'
})
.option('dir', {
  alias: 'd',
  describe: '需要处理的目标目录',
  default: './'
})
.option('file', {
  alias: 'f',
  describe: '忽略的是文件还是目录，与i参数配合使用',
  default: false
})
.command(command)
.command(analyze)
.help('h')
.argv

if (argv._.length === 0) {
  let obj = lib.filterAttr(argv);
  let url = obj.dir || obj.d || './';
  tree.carryOut(url, obj).then(res => {
    console.log(res);
  });
}
