const fs = require('fs');
const findUp = require('find-up');

const configPath = findUp.sync(['.tree', '.tree.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const util = require('../util/index.js');
const lib = require('../util/lib.js');
const analyze = require('../util/analyze.js');
const colors = require('colors');

module.exports = {
  command: 'analyze',
  aliases: ['analyze', 'a'],
  desc: 'analyze file',
  builder: (yargs) => {
    return yargs
    .config(config.analyze || {})
    .option('dest', {
      describe: '指定生成的目录',
      default: './_doc'
    })
    .option('deep', {
      describe: '深度遍历文件',
      default: false
    })
    .option('name', {
      alias: 'n',
      describe: '生成文件的名称',
      default: 'readme'
    })
    .option('type', {
      alias: 't',
      describe: '生成文件的类型',
      default: 'md'
    })
    .option('sign', {
      alias: 's',
      describe: '根据文件呢首行标识分类生成md说明文档'
    })
    .help('h')
  },
  handler: (argv) => {
    let obj = lib.filterAttr(argv);
    let url = obj.dir || obj.d || './';
    analyze(url, obj).then(res => {
      let url = util.dealUrl(obj.dest);
      let file = `${url}/${obj.n}.${obj.t}`;

      if (fs.existsSync(file)) {
        console.warn(colors.green(`${obj.n}.${obj.t}文件夹已存在，是否覆盖？：y/n`));

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
