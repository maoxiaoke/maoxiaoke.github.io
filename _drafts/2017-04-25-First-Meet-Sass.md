---
layout: post
title: "使用Sass样式"
date: 2017-04-26 19:00:00 +0800 
categories: 研究生涯
tag: Sass
---
* content
{:toc}

`Sass`是怎么来的？我是这样理解的，有那么一群进入前端领域的攻城狮，发现`css`竟然不是程序语言，那怎么在其他前端攻城狮面前装逼呢？那能不能让`css`能听懂程序语言的指令呢？然后呢，他们就整了一套`css`预处理器，把编程的语法引入进来，然后美言之：`less is more`。

`Sass`更让人寻味的地方是它处理的是`.Scss`文件。为什么不把后缀名改成`.sass`呢？

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

## 使用Sass组织局部文件

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

## 嵌套选择符