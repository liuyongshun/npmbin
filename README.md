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

**2.1.3、 process.exit()**

退出node执行。

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


#### 4、 fs模块

**PS: 如果你想知道文件的详细信息，或者判断一个名字是文件还是目录，如下内容**

**4.1、 异步： fs.stat(path[, options], callback)，可以用来获取文件的信息内容**

path: 文件的路径。

options: 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false。

callback: 

 &#x3000;参数： err， 如果出现错误，则 err.code 将是常见系统错误之一。  

 &#x3000;参数：stats： stats 是一个 fs.Stats 对象，关于文件的信息。 [地址](http://nodejs.cn/api/fs.html#fs_class_fs_stats)

```
fs.stat(dir, (err, stats) => {
  console.log(err, stats, 'kzzzzz')
})
```

**4.2、 同步： fs.statSync(path[, options]) ,直接返回fs.Stats 对象**

path: 文件的路径。

options: 返回的 fs.Stats 对象中的数值是否应为 bigint 型。默认值: false。

```
fs.statSync(dir).isFile() // true or false
```

**4.3、 fs.Stats对象的方法**

- stats.isDirectory() ： true 文件系统目录 

- stats.isFile() ： true 常规文件 

**4.4、 fs.readdir(path[, options], callback)， 异步读取目录内容**

- path:

- options:

&#x3000;encoding: 默认utf-8编码

&#x3000;withFileTypes： 默认值false。设置为 true，则返回的结果将包含 fs.Dirent 对象。

- callback: 

&#x3000;err: 错误提示

&#x3000;files: 内容数组

**4.5、 fs.readdirSync(path[, options])，同步读取目录内容**

参数同异步