
### INSTALL

`npm install npm-tool-cli`

### USAGE

#### 1. print dir in terminal

```
command: tool

```


|param|alias|default|des|
|:-----|:-----|:-----|:-----|
|--ignore| --i |node_modules,.git |ignore file or folder|
|--dir   | --d | ./     |Directory of files to process|
|--file  | --f | false  |Cooperate with "ignore"|


**params:**

#### 2. generate file of tree

```
command: tool gen

```

**params:**

|param|alias|default|des|
|:-----|:-----|:-----|:-----|
|--name  | --n | tree |the name of generate|
|--type  | --t | .json    |the type of generate|
|--ignore| --i |node_modules,.git |ignore file or folder|
|--dir   | --d | ./     |Directory of files to process|
|--file  | --f | false  |Cooperate with "ignore"|


#### 3. analyze folder and generate '.md' file to component

```
command: tool analyze

```

**params:**

|param|alias|default|des|
|:-----|:-----|:-----|:-----|
|--dest  |     | _doc   |destination of generate|
|--deep  |     | false  |deep recursion|
|--name  | --n | readme |the name of generate|
|--type  | --t | .md    |the type of generate|
|--sign  | --s |        |Analyze the first line of the file in order to generate data|
|--ignore| --i |node_modules,.git |ignore file or folder|
|--dir   | --d | ./     |Directory of files to process|
|--file  | --f | false  |Cooperate with "ignore"|

### In addition

You can also use the “.tree” profile


#### Attention

It must be standard json

**config：**

```
{
  "analyze": {
  "dest": "./_doc",
  "deep": "false",
  "type": "md",
  "name": "readme",
  "sign": "node"
  },
  "generate": {
    "name": "dirTree",
    "type": "js"
  },
  "global": {
    "ignore": "node_modules,.git",
    "dir": "./",
    "file": "false"
  }
}
```


