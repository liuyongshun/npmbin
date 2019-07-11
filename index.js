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
// const type = process.env.getDirTreeType;
// 正则表达式 ["/node_modules|.git/i"]
// let reg = process.env.getDirTreeReg;

// // 正则表达式转换
// let modifier = reg.substring(reg.lastIndexOf('/')+1, reg.lastIndexOf(']')) || 'i'; // 修饰符
// reg = reg.substring(reg.indexOf('/')+1, reg.lastIndexOf('/')); // 截取表达式模型

// reg = new RegExp(reg, modifier); // 生成正则表达式

// let firstRun = true; // getDirTree首次执行
let output = ''; // 生成目录结构字符串
/**
 * 获取目录下的文件树
 * @param {读取的路径} dir
 * @returns 返回 dir目录下的文件树
 */
getDirTree('./test')
console.log(output)
// let record = []
function getDirTree (dir) {
  const record = []
  const obj = {}
  if (util.isFile(dir)) return;
  const files = util.getDir(dir);
  // if (firstRun) {
  //   output=`${dir}\n`;
  //   // 根据正则过滤文件、文件夹
  //   files = filesFilter(files);
  //   // 过滤之后的文件、文件夹列表
  //   log('files: ', files);
  // }

  // firstRun = false;

  // // 遍历文件
  files.map((file, index) => {
    const subDir = `${dir}/${file}`;
    const item = {
      name: file,
      dir: subDir,
      children: null
    }
    const dirname = util.getDirName(subDir);
    let dirDeep = new Array(subDir.split('/').length - 2).fill(0);
    dirDeep = dirDeep.reduce((acc,cur) =>
      acc = (dirDeep.length > 1 ? '  ' : '') + acc,
      index === files.length - 1 ? '└─ ' : '├─ '
    );
    output += `${dirDeep}${dirname}\n`;
    obj.output = output;
    if (!util.isFile(subDir)) {
      item.children = getDirTree(subDir);
    }
    record.push(item)
  });
  return record
}