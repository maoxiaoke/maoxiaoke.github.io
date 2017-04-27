---
layout: post
title: "css的利器：使用Sass样式"
date: 2017-04-25 19:00:00 +0800 
categories: 研究生涯
tag: Sass
---
* content
{:toc}

`Sass`是怎么来的？我是这样理解的，有那么一群进入前端领域的攻城狮，发现`css`竟然不是程序语言，那怎么在其他前端攻城狮面前装逼呢？那能不能让`css`能听懂程序语言的指令呢？然后呢，他们就整了一套`css`预处理器，把编程的语法引入进来，然后美言之：`less is more`。

`Sass`更让人寻味的地方是它处理的是`.scss`文件。为什么不把后缀名改成`.sass`呢？

下面是`Sass`的网络资源：

* 其一当然是官方网站：[http://sass-lang.com/](http://sass-lang.com/)
* 官方参考文档： [http://sass-lang.com/documentation/file.SASS_REFERENCE.html](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)

现在，让我们开始`Sass`的旅途。

<!-- more -->

## 安装Sass

`Sass`最初是使用`Ruby`编程语言开发的，所以我们需要安装`Ruby`，访问[http://www.ruby-lang.org/en/downloads/](http://www.ruby-lang.org/en/downloads/)来下载。同时我们需要下载`Ruby`的包管理工具`gem`，访问[https://rubygems.org/pages/download](https://rubygems.org/pages/download)来进行下载。

之后，输入

```
$ gem install sass
```

---

## 使用Sass编译命令

当然我们想实时看到编译的效果，所以我们使用`--watch`命令。

```
$ sass --watch <存放.scss的文件夹>:css
```

这个命令启动`Sass`预处理器，寻找`<存放.scss的文件夹>`中所有扩展名为`.scss`的文件夹，任何改动的结果都会存放到`css`文件中。

如果想得到压缩的`.css`文件，操作是：

```
$ sass --watch <存放.scss的文件夹>:css --type compressed
```

---

<h2 id='local'>使用Sass组织局部文件</h2>

通常，一个网站可能会要使用大量`css`，所以把所有`css`放在一个`.css`文件中是不方便开发者的。但如果将其分离成多个易于管理的小文件，则访客就要使用更多的时间请求来下载文件，所以这也是不建议的做法。

没错，`Sass`能兼顾这两个方面。比如，我们按照一定的逻辑，把`Sass`规则分成多个文件，然后，让`Sass`预处理器把这些文件编译成一个`.css`文件。是不是很棒。它是怎么做到的呢？

这些独立的文件，`Sass`称为*局部文件*，这种文件的名称和用法有特别之处，为了不让`Sass`预处理器把局部文件转换成单独的`.css`文件，局部文件的名称**必须**以下划线`(_)`开头。

有设计师提供了一种基本的`Sass`文件夹结构：

```
│  styles.scss          #Sass主文件
│
├─helpers               #特殊的Sass文件
│      _mixins.scss
│      _variables.scss
├─base                  #项目的基础文件
│      _grid.scss
│      _reset.scss
│      _typography.scss
│
├─layout                #装饰页面各个区域的文件
|       _footer.scss
|       _forms.scss
|       _header.scss
|       _sidebar.scss
│
└─components            #UI组件的文件
       _buttons.scss
       _dropdown.scss
       _navigation.scss
```

由于文件中样式的顺序对层叠规则有影响，所以我们一般在`styles.scss`文件中这样引入：

```scss
@import 'helpers/variables';
@import 'helpers/mixins';
@import 'base/reset';
@import 'base/grid';
@import 'base/typography';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';
@import 'components/buttons';
@import 'components/dropdown';
@import 'components/navigtion';
```

> 因为`Sass`处理局部文件超智能，所以我们可以省略后缀和`_`。

---

## Sass变量

在`Sass`中，变量的名称以`$`开头。为变量赋值的方法是：在变量名后加英文`:`号。

```scss
/*variables of colors*/
$blue: #092B40;
$lightBlue: #85DEF2;
$water: #52A5D9;
$sky: #5BB5D9;
$orange: #D96F32;
```

当然，不止是颜色，你可以大胆发挥自己的想象。

有了变量之后，我们这样使用它。

```scss
html {
background-color: $blue;
}
```

变量之间的计算，也大胆地交给`Sass`来做吧。

---

## 嵌套选择符

在`css`中的后代选择器由多个选择器组成，来表示嵌套。如果你使用了`Sass`，就不必这么麻烦了。

举例：

```scss
.nav {
    display:flex;
    /*content*/
    li {
        width:30%;
        /*content*/
    }
    a {
        text-decoration:none;
        /*content*/
    }
}
```

上面的例子中，`.nav`样式中嵌套了`li`和`a`，其表现和后代选择器`.nav li`和`.nav a`是一致的。

### 注意伪元素

如果像创建的不是后代选择器，而是伪类，`Sass`同样有办法：就是在伪类前加上`&`符号。

```scss
a {
    color:blue;
    &:hover {
        color:green;
    }
}
```

上面的`.scss`编译成`.css`文件就是：

```css
a {
    color:blue;
}
a:hover {
    color:green;
}
```

在这个过程中`Sass`把`&`符号直接替换成父辈选择器的名称。只是简单的替换而已，所以也有其他的用法可以发掘。

---

## 扩展

比如说，我们有多个选择器想应用同一种样式，当然，这些选择器不是父子的关系，否则我们直接用嵌套就好了。为了这个需求，`Sass`就引入了`@extend`指令。

```scss
h1 {
    font-family: "Raleway",Arial,sans-serif;
    color: #222;
}
h2 {
    @extend h1;
    border-top: 1px solid #444;
}
```

上面的`.scss`编译成`.css`文件就是：

```css
h1, h2 {
    font-family: "Raleway",Arial,sans-serif;
    color: #222;
}
h2 {
    border-top: 1px solid #444;
}
```

`@extend`指令可以放在任何位置，但我们一般放在其他属性之前，更容易显而易见。

### 使用占位符

`@extend`是霸道总裁，因为它不仅会扩展指定的选择器，还会扩展引用了那个选择器的其他样式。所以我们使用它的时候需要小心。

`Sass`引入`%`符号来解决这个问题，来用作其他样式基底的样式。

所以我们通常的做法是，用`%`表示一个基底样式，用作其他选择器的引入。

```scss
%btn {
    display: inline-block;
    padding: 1em;
    border-radius: 3px;
}
.btn-order {
    @extend %btn;
    background-color: green;
    color:white;
}
.btn-delete {
    @extend %btn;
    background-color: red;
    color:white;
}
```

> `%btn{}`当然是可以放在任何位置的。

上面的`.scss`编译成`.css`文件就是：

```css
.btn, .btn-order, .btn-delete {
    display: inline-block;
    padding: 1em;
    border-radius: 3px;
}
.btn-order {
    @extend %btn;
    background-color: green;
    color:white;
}
.btn-delete {
    @extend %btn;
    background-color: red;
    color:white;
}
```

这当然也是一个很棒的设计。

---

## Mixin 混入

我的理解是，`Mixin`类似于`Word`里的*宏*指令，可以帮你执行很多操作的小型程序代码片段。一个很单纯的作用就是，我们编写`css`的时候，有些元素是需要提供厂商前缀的，如果你每个厂商前缀都敲出来，是不是很累。`Mixin`就可以帮你干这个事，利用可重用的代码来解放你的双手。

比如，我们经常需要使用厂商前缀的弹性盒。我们`Mixin`一段可重用的代码(也许不是这样称呼，但我喜欢)。

```scss
@mixin flex {
    display: -webkit-flex;
    display:flex;
}
```

> 这个代码片段其实跟变量一样，可以放在局部文件中。[见上面的组织局部文件](#local)。

使用这个`Mixin`的方式是：在`@include`指令后写上混入的名称。

```scss
.container {
    @include flex;
    background-color:#444;
}
```

哦！厉害了。但是我们会这样去添加厂商前缀吗？当然不会，有人给我们做好这一切，比如`autoprefixer`。

但是，`Mixin`的厉害之处不仅仅于此。某种情况下，你甚至可以把`Mixin`看成一个函数。比如，我们像创建一个混入，让它接受四个字体属性。

```scss
@mixin text ($size:1em, &line-height:null, $weight:null, $color:null){
    font-size: $size
    line-height: $line-height;
    font-weight: $weight;
    color: $color;
}

/*使用这个Mixin*/

h1 {
    @include text (1.25em,1.2,bold,#FF0000);
}

/*
*只想设置font-size 和 line-weight的值
*null即表示参数是可选的
* $size: 1em，则是为形参设定默认值*/

h2 {
    @include text (1em,1.2);
}

/*我们只想明确font-size 和 color的值*/

h3 {
    @include text (1em,$color:red);
}
```

此外，还可以为媒体查询提供`Mixin`，所以能用上混入的地方真是不胜枚举。