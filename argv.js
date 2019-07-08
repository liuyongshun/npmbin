const yargs = require('yargs')
yargs.options({
  'run': {
    alias: 'r',
    describe: 'run your program',
    demandOption: true
  },
  'path': {
    alias: 'p',
    describe: 'provide a path to file',
    demandOption: true
  },
  'spec': {
    alias: 's',
    describe: 'program specifications'
  }
})
.help()
.argv