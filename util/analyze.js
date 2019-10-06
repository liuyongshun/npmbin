const readline = require('readline');
const fs = require('fs');

const util = require('./index.js');
const lib = require('./lib.js');

let output = '';
let count = 0;

function genMd (dir, options) {
  let record = [];
  let patt = ''

  if (options.i) {
    let arr = options.i.split(',');
    patt = arr.map(n => (new RegExp('.*' + n + '(\\.\\w+)?$', 'i')));
  }

  if (util.isFile(dir)) return;

  let files = util.getDir(dir);
  files.map((file, index) => {
    let subDir = `${dir}/${file}`;
    if (options.i && patt && patt.some(n => n.test(subDir)) && util.isFile(subDir) === JSON.parse(options.f)) return;

    if (util.isFile(subDir)) {

      if (options.s) {
        let fd = fs.openSync(subDir, 'r');
        let fRead = Buffer.alloc(50);
        fs.readSync(fd, fRead, 0, 50, 0);
        let content = fRead.toString('utf8', 0);
        let breakLine = content.indexOf('\n');
        if (breakLine !== -1) {
          content = content.substr(0, breakLine + 1);
        }
        if (content.includes(options.s)) {
          count ++;
          let name = util.getDirName(subDir);
          output += joinStr(name, count);
        }
      } else {
        count ++;
        let name = util.getDirName(subDir);
        output += joinStr(name, count);
      }
    } else if (JSON.parse(options.deep)) {
      genMd(subDir, options);
    }
  });
}

function joinStr (name, count) {
  return (`#### ${count}、 组件${name}\n\n**组件截图：**\n\n![]()\n\n|参数名|参数类型|字段描述|是否必填|默认值|\n|:-----|:-----|:-----|:-----|:-----|\n|  |  |  |  |  |\n\n**使用示例：**\n\n\`\`\`\n\`\`\`\n\n`)
}

function carryOut (url, options) {
  return new Promise((resolve, reject) => {
    genMd(url, options);
    resolve(output);
  });
}

module.exports = carryOut