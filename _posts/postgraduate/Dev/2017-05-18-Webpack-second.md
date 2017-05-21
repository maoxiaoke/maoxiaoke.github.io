---
layout: post
title: "Webpack第二课 -- HTML、插件和webpack-dev-server篇"
date: 2017-05-18 09:00:00 +0800 
categories: 研究生涯
tag: Webpack
---
* content
{:toc}

其他链接：

+ [Webpack第一课 -- 初识Webpack]({{ '/2017/05/17/First-meet-Webpack' | prepend: site.baseurl }})
+ [Webpack第三课 -- HTML、CSS篇]({{ '/2017/05/19/Webpack-third' | prepend: site.baseurl }})

代码`Github`地址：

+ [https://github.com/maoxiaoke/You-know-what-is-webpack](https://github.com/maoxiaoke/You-know-what-is-webpack)


这里呢，打算将所有和`html`有关的操作都集合到这篇文章中来，用来熟悉`webpack`对`html`的操作。

<!-- more -->

## HTML 和 HtmlWebpackPlugin 插件

我们在这里就开始接触插件的内容了。插件是`webpack`支柱功能，也就是说用来扩展`webpack`功能的，`webpack`会提供一些官方插件，也有一些第三方插件。

> 官方的插件页面在这里: [https://webpack.js.org/plugins/](https://webpack.js.org/plugins/)

`HtmlWebpackPlugin`是一个可以创建简单的`html5`文件的插件，这意味这，我们可以不用手动直接创建`html`文档了。

这个插件的`Github`地址在这里： [https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

首先，我们在项目根目录下建立一个`app`文件夹，新建一个`index.js`作为`webpack`的入口文件。文件内容如下：

```js
//index.js
function component () {
  var element = document.createElement('div');
  element.innerHTML = "Hello World!";

  return element;
}
document.body.appendChild(component());
```

我们在`DOM`树中插入一个`div`元素，然后在这个元素中插入一个文本节点。

接下来，我们要使用这个插件来创建自己的`html5`文档了，使用步骤如下：

+ 作为依赖安装
+ 在`webpack.config.js`配置文件中进行配置

### 作为依赖安装

```bash
$ npm install --save-dev html-webpack-plugin
```

### 进行配置

打开我们的`webpack.config.js`文件：

```js
//webpack.config.js
var path = require('path');
//引入我们的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //插件配置
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack demo' //html5文档的title
    })
  ],
};
```

主要的修改内容是，我们要引入我们的`html-webpack-plugin`，然后对我们的插件进行配置。

> `html-webpack-plugin`插件的所有的配置选项，可以在这里找到：[https://github.com/jantimon/html-webpack-plugin#configuration](https://github.com/jantimon/html-webpack-plugin#configuration)

值得一提的是`template`参数，指的是利用自己的模板来生成特定的`html5`文件。这里的模板可以是`html`、`pug`、`ejs`等等。但是我们使用模板时，一定要安装对应的`Loader`，否则`webpack`无法正常解析。

这个例子中，我们没有设置`template`参数，设置了`title`参数为生成的`html5`文件设置`title`，没有设置`filename`参数，默认为`index.html`。接下来我们运行`webpack.config.js`。

```bash
$ .\node_modules\.bin\webpack
```

然后，在我们生成的`dist`文件中，可以发现编译完成的`bundle.js`和一个`index.html`文件。而且，`index.html`自动引用了`bundle.js`文件。下面是生成的`index.html`的文件内容。

```html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack demo</title>
  </head>
  <body>
  <script type="text/javascript" src="bundle.js"></script></body>
</html>
```

### 利用template参数

为了利用`template`参数，我们在`app`文件中增加一个`.html`模板文件，命名为`index.temp.html`，代码如下：

```html
<!--index.temp.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack template demo</title>
  </head>
  <body>
      <div>
          <p>I am Webpack.</p>
      </div>
  </body>
</html>
```

同时我们对`webpack.config.js`进行更改：

```js
//webpack.config.js
...
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack template demo',
        template: __dirname + "/app/index.temp.html"
    })
  ],
...
```

打开生成的`index.html`，有什么惊讶的发现。

---

## 开发

> 这一节内容和上一节有所脱离，但是因为我使用到了同一个例子，所以就放在一块。

开发，这里指的是我们如何通过`webpack`进行更快速地开发。第一个就是**监视模式**(Watch Mode)。

### 监视模式

很多例如`gulp`、`Sass`都会提供`Watch Mode`这个可选项。也很好理解，就是会**自动监视文件的更改。如果检测到任何的更改，就会再次执行编译来解放你的双手**。是不是很棒。

`webpack`打开监视模式非常简单：

```bash
$ webpack --progress --watch
```

敲下这个命令之后，`webpack`就会根据`webpack.config.js`配置文件进行编译。

![]({{ '/styles/images/webpack/webpack-03.png' | prepend: site.baseurl }})

现在，我们尝试改变`app`文件夹中的`index.temp.html`模板文件。

```html
<!--index.temp.html-->
...
      <div>
          <p>I am Webpack robot.</p>
      </div>
...
```

接着，我们来看一下变化。

![]({{ '/styles/images/webpack/webpack-05.png' | prepend: site.baseurl }})

同时，我们的`index.html`页面也改变了。

如果要退出监视模式，`Ctrl + C`是一个可供的选择。

### webpack-dev-server

`Watch Mode`当然很方便，但是，我们还有更方便的措施。`webpack-dev-server`会提供了一个服务器和实时重载功能，这很方便。

想利用`webpack-dev-server`(webpack 开发服务器)，首先我们需要从`npm`安装`webpack-dev-server`:

```bash
$ npm install --save-dev webpack-dev-server
```

进行项目开发依赖后，我们可以用下面的指令开启`webpack-dev-server`服务器：

```bash
& webpack-dev-server --open
or
$ .\node_modules\.bin\webpack-dev-server --open
```

当然，我们最好是将该命令加入`package.json`中。

```json
...
"scripts": {
    "start": "webpack-dev-server"
  }
...
```

直接运行：

```bash
$ npm run start
```

如下：

![]({{ '/styles/images/webpack/webpack-06.png' | prepend: site.baseurl }})

默认设置中，`webpack-dev-server`监听在本地的`http://localhost:8080/`端口。打开浏览器，输入地址就可以看到效果了。美得很！

我们也可以尝试对`index.temp.html`进行更改，不需刷新，我们就能在窗口看到效果。

如果你的`8080`端口被占用了或者你想要进行其他得配置，没有关系。你可以在`webpack.config.js`文件中，增加一个新属性`devServer`，并修改配置。

> 详细得配置参数在这里：[https://doc.webpack-china.org/configuration/dev-server/#devserver-watchoptions-](https://doc.webpack-china.org/configuration/dev-server/#devserver-watchoptions-)

```js
//webpack.config.js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //devServer配置
  devServer: {
    host: process.env.HOST,
    port: 4040
  },
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Webpack template demo',
        template: __dirname + "/app/index.temp.html"
    })
  ],
};
```

现在，我们监听的是`4040`端口了。你可以用浏览器打开查看效果。