
# weex开发踩坑

[weex官方文档](https://weex.apache.org/zh/docs/components/a.html)

### 标签类

#### `<div>`

1. 直接写文本web上可以显示，但是在手机上不显示，正确使用，所有文本都应该用`<text>`标签。

2. `<div>` 是不可滚动容器，如果布局高度超过一屏，最外层容器不可使用div。

3. 父子级： 可以是任何标签。

#### `<text>`

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

#### `<image/>`

1. 必须指定宽高，不然无法显示。

#### `<list>`
 
1. <list> 需要显式的设置其宽高，可使用 position: absolute; 定位或 width、height 设置其宽高值。

2. 子组件只能包括以下四种组件或是 **fix 定位的组件**，其他形式的组件将不能被正确渲染。 **写组件时也必须注意这个问题。**

```
<cell>, <header>, <refresh>, <loading>
```

#### `<cell>`
 
1. 必须以一级子组件的形式存在于 list recycler waterfall 中。

2. cell多数情况是要被循环的，但是如果给cell直接指定margin在手机上不生效。

```
<list>
    <cell style="margin-bottom: 430px;">3333</cell>
    <cell>4444</cell>
</list>
```

#### `<input/>`

1. `input` 使用disabled 会导致数据清空。 

2. `input` 无法赋值 ''。采用加个空格的方式间接实现 ' '，但是当接口入参时，一定不要忘了清空前后空格。

3. 另外在@input事件内，赋值在手机上不是实时更新。

```
无法使用disabled的情况下如何实现input不可点击。

采用div覆盖，阻止事件穿透，覆盖input的标签必须设置点击事件并阻止事件穿透。
<div @click="stop"></div>

stop (e) {
  e.stopPropagation()
}


实时处理首位不能为0的数字类型：

  <input type="number"
     ref="domBudget"
     autofocus="false"
     :maxlength="6"
     placeholder="请输入"
     v-model="budget"
     @input="handleBudgetInput"
     placeholder-color="#77777d" />

// input事件handleBudgetInput方法的修改值不是实时的。需要用异步来实现赋值。
// 赋值时不能为 '' ，空字符串是无法在手机上生效的，可以用空白符实现' '，一定不要忘了清空前后空格
    handleBudgetInput (val) {
      let patt = /^(\s?)0+/g
      this.budget = val.value.trim()
      if (patt.test(val.value)) {
        this.$nextTick(() => {
          this.budget = ' '
        })
      }
    },

```

#### `<textarea/>`

1. 多行显示问题，官网提供row是错误的文档，正确的应该是rows才是设置多行。
2. 偶然一次，给textarea指定了type的类型（text）。指定后会导致textarea不可换行。（尽管官网描述textarea支持input所有属性，但是表现形式还是有区别的。）

#### `<scroller>`

1. scroller是滚动容器，为了处理那些超出一屏的布局，当在scroller里使用fix固定底部按钮时。在ios上会出现键盘抬升导致的按钮位置变动。

解决方案：将fix定位按钮放到scroller外侧。一级容器采用div布局。顺便一提，weex没有button标签，且文本只能写在text内。

```
问题写法：
<scroller>
    <text style="position: fixed;">确认</text>
</scroller>

解决方案：
<div>
<scroller>可滚动内容</scroller>
<text style="position: fixed;">确认</text>
</div>
```

### 样式类：

**PS：前端开发weex不要想当然的使用样式，要多看官方文档，可以简单理解，文档里写的就是可以用，没写的就不要用了。不然出问题很难定位，会有前端的思维定式。**

**1、 不支持类的子集，后代的写法，支持一级类名。**

```
错误：
.classA .classB {}

正确： 
.classA {} 
.classB {}
```

**2、 不支持属性简写。**

```
错误：
margin: 0px;
padding: 0px;
border: 1px solid #ffffff;

正确：
margin-top: 0px;margin-left: 0px;margin-bottom: 0px;margin-right: 0px;

padding-top: 0px; ...

border-width: 1px;
border-style: solid;
border-color: #ffffff;

```

**3、 盒模型及布局**

- 盒模型和前端基本一样，margin — border — padding。默认采用了border-box布局。

- 所有标签都是前端中的block模式独立占一行，没有display: inline-block;等。

- 所有标签默认是弹性布局，想要一行显示，设置flex-direction: row;页面布局，玩好弹性布局就够了。

**4、色值** 

```
精简写法的十六进制                          如 #f00
十六进制                                   如 #ff0000
RGB                                       如 rgb(255, 0, 0)
RGBA                                      如 rgba(255, 0, 0, 0.5)
色值关键字（只支持weex提供的关键字）         如 red
```

**5、超出一行省略**

需要使用weex提供的lines，而不是采用前端的常见写法，前端写法在手机上不生效。

```
  max-width: 300px;
  lines: 1;
  text-overflow: ellipsis;

```

**6、z-index不生效**

布局靠下面的层级会高于上面的层级，无法使用z-index。

**7、100%的单位在手机上不生效**

- Weex 不支持类似 em、rem、pt,% 这样的 CSS 标准中的其他长度单位；

- 单位 px或wx 不可省略，否则在 H5 环境无法正确渲染；


### 其他类：

**1、 vue插槽问题**

vue2.6版的插槽目前来看使用是有问题的，尽管你安装了2.6的vue但是weex不支持v-slot指令。

```
正确使用：

<template slot="listItem"></template>

错误使用：

<template v-slot:header></template>
```

**2、 list的下拉loadmore（指定了loadmoreoffset）。在web端可以用但是在手机上不行。**

用refresh标签和loading标签的各自事件模拟。

```


      <list style="padding-bottom: 15px;"
            loadmoreoffset="10px">

        <refresh class="refresh"
                 @refresh="refreshData"
                 :display="refreshDisplay">
        </refresh>

               <cell v-for="item in listData"> <text>列表循环处的内容</text></cell>

                <loading class="loading"
                 @loading="onloading"
                 :display="showLoadMore ? 'show' : 'hide'">
          <text class="indicator-text">加载中...</text>
        </loading>
      </list>


js code:

    refreshData () {
      this.listParam.pageNo = 1
      this.refreshDisplay = 'show'
      this.lastPage = false
      this.getCustomerList()
    }

    onloading () {
      if (this.totalPage > this.listParam.pageNo) {
        this.showLoadMore = true
        this.listParam.pageNo++
        this.getCustomerList()
      } else {
        this.showLoadMore = true
        this.lastPage = true
        // 如果没有调用接口，也必须用异步重置上拉和下拉，不然无法生效。
        setTimeout(() => {
          this.refreshDisplay = 'hide'
          this.showLoadMore = false
        }, 200)
      }
    }
```

**3、样式不支持@import的css处理方式**（我怀疑是loader配置问题，后面研究一下）

@import导入的样式，无法转化px。可以向下面的方式引入公共样式。

```
<style scoped src='../../common.css' />
```

**4、 vue的v-show不可用**

没有display: block;的属性。