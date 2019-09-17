const fs = require('fs');
const findUp = require('find-up');

const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const util = require('../util/index.js');
const lib = require('../util/lib.js');
const tree = require('../util/tree.js');
const colors = require('colors');

module.exports = {
  command: 'gen',
  aliases: ['gen', 'g'],
  desc: 'generate file',
  builder: (yargs) => {
    return yargs
    .config(config.generate)
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
      let exists = util.getDir(process.cwd());
      let fileName = `${obj.n}.${obj.t}`;

      if (exists.includes(fileName)) {
        console.warn(colors.green(`${fileName}文件夹已存在，是否覆盖？：y/n`));

        process.stdin.setEncoding('utf8');
        process.stdin.on('data', async input => {
          let chunk = input.replace(/\s/g, '');

          if (chunk.toLowerCase() === 'y') {
            let tip = await util.writeFile(res, obj.n, obj.t);
            console.log(colors.green(tip));
            process.exit();

          } else if (chunk.toLowerCase() === 'n') {
            process.exit();

          } else {
             console.warn(colors.red('请输入正确指令'));
             process.exit();
          }
        });
      } else {
        util.writeFile(res, obj.n, obj.t);
      }
    })
  }
}
