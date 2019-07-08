#!/usr/bin/env node
const yargs = require('yargs')
yargs.command({
    command: {
      url: {
        alias: 'u',
        default: 'http://yargs.js.org/'
      }
    },
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  // provide a minimum demand and a minimum demand message
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .argv