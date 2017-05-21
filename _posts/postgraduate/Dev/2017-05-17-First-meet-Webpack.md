---
layout: post
title: "Webpack第一课 -- 初识Webpack"
date: 2017-05-17 09:00:00 +0800 
categories: 研究生涯
tag: Webpack
---
* content
{:toc}

其他链接：

+ [Webpack第二课 -- HTML、插件和webpack-dev-server篇]({{ '/2017/05/18/Webpack-second' | prepend: site.baseurl }})
+ [Webpack第三课 -- HTML、CSS篇]({{ '/2017/05/19/Webpack-third' | prepend: site.baseurl }})

代码`Github`地址：

+ [https://github.com/maoxiaoke/You-know-what-is-webpack](https://github.com/maoxiaoke/You-know-what-is-webpack)

想不到`webpack`比我想象中要难一点。

`webpack`是一个现代的`JavaScript`应用程序的**模块打包器**(`module bundler`)。但随着它的发展，有向前端代码管理工具演变的趋势。

对于一个网站而言，之前的管理方式是：`HTML`文件、`CSS`样式、`JavaScript`文件、图片文件各自都是独立的，需要分开地管理每一个文件，然后确保一切正常运行。`Gulp`这样的任务管理工具就是在这个基础上发展而来，能处理不同的预处理器和编译器，任务一个接着一个进行。

而`webpack`抛开了这种管理方式，在开发过程中的某一个阶段通过`JavaScript`去处理所有的依赖。比如说，我们可以利用`loader`将`HTML/CSS`文件打包成`JS`文件，然后再解析出来(这里说的有点糊涂，下次理解透彻再来)。

<!-- more -->

## 基本概念

我觉得最先应该对基本概念有个了解(就算这些名词你半知半解或者完全不知道，我觉得也是有必要的)。

> 以下基本概念都摘自官方文档：[https://doc.webpack-china.org/concepts/](https://doc.webpack-china.org/concepts/)

### 入口 -- entry

`webpack`将创建所有应用程序的依赖关系图表(dependency graph)。图表的起点被称之为入口起点(entry point)。入口起点告诉`webpack`从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将您应用程序的入口起点认为是根上下文(contextual root)或app第一个启动文件。

在`webpack`中，我们使用**webpack 配置对象**(webpack configuration object)中的`entry`属性来定义入口。

### 输出 -- output

有`Entry`就有`Output`，该选项影响`compilation`对象的输出。`output`选项控制`webpack`如何向硬盘写入编译文件。

> 注意，即使可以存在多个入口起点，但只指定一个输出配置。

### Loader

`loader`用于对模块的源代码进行转换。`loader`可以使你在`require()`或"加载"模块时预处理文件。因此，`loader`类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。

`loader`可以将文件从不同的语言(如`TypeScript`)转换为`JavaScript`，或将内联图像转换为`data URL`。`loader`甚至允许你在`JavaScript`中`require()` CSS文件。

### 插件 -- Plugins

插件是`webpack`的*支柱*功能。

插件目的在于解决`loader`无法实现的功能。

以上四点的关系有点类似与下面这个图：

![relationship-map]({{ '/styles/images/webpack/webpack-04.png' | prepend: site.baseurl }})

---

## 第一个webpack项目

我们第一个项目使用了官方的一个例子。作为起步，非常有指导意义。主要的步骤先列举如下：

+ `webpack`的安装
+ 创建一个`bundle`文件
+ 配置`webpack.config.js`

### webpack的安装

对于一个`nodejs`项目，我们通常会先建立一个`package.json`，这个我们在[初识Gulp]({{ '/2017/04/26/First-Meet-Gulp' | prepend: site.baseurl }})进行进一步了解。

```bash
$ npm init -y
```

然后，我们可以进行全局安装：

```bash
$ npm install -g webpack
```

或本地依赖安装：

```bash
$ npm install --save-dev webpack
```

### 第一个bundle文件

```bash
$ mkdir demo-01 && cd demo-01
$ npm init -y
$ install --save-dev webpack
```

然后，我们建立一个`app`子目录并创建一个`index.js`文件。

```bash
$ mkdir app && cd app
$ touch index.js
```

```js
//index.js
function component () {
  var element = document.createElement('div');
  /* 需要引入 lodash，下一行才能正常工作 */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}
document.body.appendChild(component());
```

这里，我们`_.join(['Hello','webpack'], ' ')`代码需要依赖`lodash`，而且是运行时依赖。

正常情况下，我们会在相应的`.html`文件中利用`<script>`标签引入这个依赖。这样的管理方式有一些问题：

+ 如果依赖不存在或引入顺序错误，程序将无法运行
+ 如果依赖被引入但是没有使用，就会浪费很多时间下载无用的代码

我们来利用`webpack`解决。

首先，我们安装`lodash`运行时依赖。

```bash
$ npm install --save lodash
```

然后，我们在`index.js`文件中import `lodash`。

```js
import _ from 'lodash';

function component() {
    ...
}
```

在项目根目录下，我么创建一个`index.html`文件将它显示出来。

```html
<html>
  <head>
    <title>webpack 2 demo</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

> 这里的代码明显告诉我们：`index.html`只引入`bundle.js`文件，即`webpack`最终编译的文件。

### 配置webpack

通常情况下，我们使用一个配置文件来打包代码。在项目根目录下，我们创建一个`webpack.config.js`文件。

```js
var path = require('path');

module.exports = {
  entry: './app/index.js', //入口文件
  output: {
    filename: 'bundle.js', //输出文件名
    path: path.resolve(__dirname, 'dist') //输出文件地址
  }
};
```

然后，此文件可以被执行：

```bash
$ .\node_modules\.bin\webpack
```

![]({{ '/styles/images/webpack/webpack-01.png' | prepend: site.baseurl }})

输出的编译文件就存放在`dist`文件夹中。

> 如果全局安装了`webpack`的话，我们直接`$ webpack`就可以。但这并不是最佳实践，最佳实践还是利用本地命令。

#### 配合npm来使用

考虑到用`CLI`的方式来运行`webpack`不是特别方便，我们可以设置一个快捷方式。像这样调整`package.json`：

```json
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
```

这样，我们可以用以下命令来运行`webpack`:

```bash
$ npm run build
```

![]({{ '/styles/images/webpack/webpack-02.png' | prepend: site.baseurl }})

第一个章节到此结束。