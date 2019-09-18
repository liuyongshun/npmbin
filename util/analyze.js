const util = require('./index.js');
const lib = require('./lib.js');

let output = '';
let count = 0;

function genMd (dir, options) {
  let record = [];
  let patt = null

  if (options.i) patt = new RegExp('.*' + options.i + '(\\.\\w+)?$', 'i');
  if (util.isFile(dir)) return;

  let files = util.getDir(dir);
  files.map((file, index) => {
    let subDir = `${dir}/${file}`;
    if (options.i && patt.test(subDir) && util.isFile(subDir) === JSON.parse(options.f)) return;

    if (util.isFile(subDir)) {
      count ++;
      let name = util.getDirName(subDir);
      output += `#### ${count}、 组件${name}\n\n**组件截图：**\n\n![]()\n\n|参数名|参数类型|字段描述|是否必填|默认值|\n|:-----|:-----|:-----|:-----|:-----|\n|  |  |  |  |  |\n\n**使用示例：**\n\n\`\`\`\n\`\`\`\n\n`;
    } else if (JSON.parse(options.deep)) {
      genMd(subDir, options);
    }
  });
}

function carryOut (url, options) {
  return new Promise((resolve, reject) => {
    genMd(url, options);
    resolve(output);
  });
}

module.exports = carryOut