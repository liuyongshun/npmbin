#!/usr/bin/env node
// const yargs = require('yargs')
// yargs.command({
//     command: {
//       url: {
//         alias: 'u',
//         default: 'http://yargs.js.org/'
//       }
//     },
//     aliases: ['config', 'cfg'],
//     desc: 'Set a config variable',
//     builder: (yargs) => yargs.default('value', 'true'),
//     handler: (argv) => {
//       console.log(`setting ${argv.key} to ${argv.value}`)
//     }
//   })
//   // provide a minimum demand and a minimum demand message
//   .demandCommand(1, 'You need at least one command before moving on')
//   .help()
//   .argv
//
const fs = require('fs');
const util = require('./util');
// 获取获取目录的类型，过滤i: ignore/包含c: contain
// const type = process.env.getTreeType;
// 正则表达式 ["/node_modules|.git/i"]
// let reg = process.env.getTreeReg;

// // 正则表达式转换
// let modifier = reg.substring(reg.lastIndexOf('/')+1, reg.lastIndexOf(']')) || 'i'; // 修饰符
// reg = reg.substring(reg.indexOf('/')+1, reg.lastIndexOf('/')); // 截取表达式模型

// reg = new RegExp(reg, modifier); // 生成正则表达式

// let firstRun = true; // getTree首次执行
let output = ''; // 生成目录结构字符串
/**
 * 获取目录下的文件树
 * @param {读取的路径} dir
 * @returns 返回 dir目录下的文件树
 */
let init = './test'
// filter dir by input first to format consistent
// init = '(' + init.replace(/\/$/, '') + ')'
console.log
getTree(init)
console.log(output)

function getTree (dir) {

  const record = []
  const obj = {}
  if (util.isFile(dir)) return;
  const files = util.getDir(dir);

  files.map((file, index) => {
    let subDir = `${dir}/${file}`;
    const item = {
      name: file,
      dir: subDir,
      children: null
    };
    const dirname = util.getDirName(subDir);
    const cont = subDir.replace(new RegExp('('+init+'\/)'), '')
    let dirDeep = cont.split('/');
    console.log(dirDeep, 'llll')
    dirDeep = dirDeep.reduce((acc,cur) => {
      acc = (dirDeep.length > 1 ? '  ' : '') + acc
      return acc
    }, index === files.length - 1 ? '└─ ' : '├─ ');
    output += `${dirDeep}${dirname}\n`;
    obj.output = output;
    if (!util.isFile(subDir)) {
      item.children = getTree(subDir);
    }
    record.push(item)
  });
  return record
}