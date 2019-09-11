# npmbin

### NODE API

#### 1、 fs.Stats 对象提供有关文件的信息。

1. fs.readdirSync()

#### 2、 node全局变量

process： 对象是全局变量，提供当前 Node.js 进程的信息并对其进行控制。无需使用 require()。

**2.1.1、 process.argv** 

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

**2.1.2、 process.cwd()**

process.cwd() 方法返回 Node.js 进程的当前工作目录。 

例如我们在package.json的目录执行依赖中的脚本，但是需要获取package.json的路径。

**2.2、 `__dirname`同`path.dirname()`**

path.dirname() 方法返回 path 的目录名，尾部的目录分隔符将被忽略。

```
path.dirname('/foo/bar/baz/asdf/quux')
// 返回: '/foo/bar/baz/asdf'
```

*二者返回相同：*

```
console.log(__dirname)
// 打印: /Users/mjr
console.log(path.dirname(__filename))
// 打印: /Users/mjr
```


**2.3、 `__filename`**

```
console.log(__filename)
// 打印: /Users/mjr/example.js
```

#### 3、path 对象