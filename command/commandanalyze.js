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
    .option('dest', {
      describe: '指定生成的目录',
      default: './_doc'
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
      let exists = util.getDir(url);
      let fileName = `${obj.n}.${obj.t}`;

      if (true) {
        console.warn(colors.green(`${fileName}文件夹已存在，是否覆盖？：y/n`));

        process.stdin.setEncoding('utf8');
        process.stdin.on('data', async input => {
          let chunk = input.replace(/\s/g, '');

          if (chunk.toLowerCase() === 'y') {
            let tip = await util.writeFile(res, obj.n, obj.t, obj.dest);
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
        util.writeFile(res, obj.n, obj.t, obj.dest);
      }
    })
  }
}
