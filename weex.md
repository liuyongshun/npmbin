
# weex开发踩坑

[weex官方文档](https://weex.apache.org/zh/docs/components/a.html)

### 标签类

**`<div>`**

1. 直接写文本web上可以显示，但是在手机上不显示，正确使用，所有文本都应该用`<text>`标签。

2. `<div>` 是不可滚动容器，如果布局高度超过一屏，最外层容器不可使用div。

3. 父子级： 可以是任何标签。

**`<text>`**

1. `<text>`子级只可以是文本。

2. `<text>`内容在书写格式上不可以使用html的换行风格。如下写法是无法在手机上展示的。

```
正确：
<text>这是内容</text>

错误：
<text>
  这是内容
</text>
```

**`<image/>`**

1. 必须指定宽高，不然无法显示。

**`<list>`**
 
1. <list> 需要显式的设置其宽高，可使用 position: absolute; 定位或 width、height 设置其宽高值。

2. 子组件只能包括以下四种组件或是 **fix 定位的组件**，其他形式的组件将不能被正确渲染。 **写组件时也必须注意这个问题。**

```
<cell>, <header>, <refresh>, <loading>
```

**`<cell>`**
 
必须以一级子组件的形式存在于 list recycler waterfall 中。

**`<input/>`**

1. `input` 使用disabled 会导致数据清空。 

2. `input` 无法赋值 ''。采用加个空格的方式间接实现 ' '，但是当接口入参时，一定不要忘了清空前后空格。

3. 另外在@input事件内，赋值在手机上不是实时更新。

```

```

**`<textarea/>`**

### 样式类：

3. vue2.6版的插槽目前来看使用是有问题的，尽管你安装了2.6的vue但是weex不支持v-slot指令。

正确使用：

<template slot="listItem"></template>

错误使用：

<template v-slot:header></template>

4.问题：list 的下拉loadmore （指定了loadmoreoffset），在web端可以用但是在手机上不行。
解决：
用refresh标签和loading标签的各自事件模拟。

5. weex文本超出省略号：
  max-width: 300px;
  lines: 1;
  text-overflow: ellipsis;

6. 问题两个cell同级margin在手机上不生效
   <cell style="margin-bottom: 430px;">3333</cell>
      <cell>4444</cell>

7.  <text class="send-custom">发送给客户</text> text标签不能换行。不然不显示内容。

8. weex官方文档存在问题。textarea的多行row不生效，rows才对。

9. sroller内容存在fix定位底部时，ios会使按钮卡在屏幕其他问题。

10. z-index不生效。布局靠下面的层级会高于上面的层级。

