# npmbin

### NODE API

#### 1、 fs.Stats 对象提供有关文件的信息。

1. fs.readdirSync()

#### 2、process 对象是全局变量，提供当前 Node.js 进程的信息并对其进行控制。无需使用 require()。

#### 2.1 process.argv 

- 属性返回一个数组，包含当启动 Node.js 进程时传入的命令行参数。 

- 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，参阅 process.argv0。

- 第二个元素将是正在执行的 JavaScript 文件的路径。 

- 其余元素将是任何其他命令行参数。

```
// process-args.js
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// 运行
$ node process-args.js one two=three four

输出如下：
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four

```

#### 3、path 对象