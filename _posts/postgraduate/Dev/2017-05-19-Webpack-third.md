---
layout: post
title: "Webpack第三课 -- CSS篇"
date: 2017-05-19 09:00:00 +0800 
categories: 研究生涯
tag: Webpack
---
* content
{:toc}

其他链接：

+ [Webpack第一课 -- 初识Webpack]({{ '/2017/05/17/First-meet-Webpack' | prepend: site.baseurl }})
+ [Webpack第二课 -- HTML、插件和webpack-dev-server篇]({{ '/2017/05/18/Webpack-second' | prepend: site.baseurl }})

代码`Github`地址：

+ [https://github.com/maoxiaoke/You-know-what-is-webpack](https://github.com/maoxiaoke/You-know-what-is-webpack)

当然了，`webpack`也可以对`CSS`文件进行打包，将其作为模块引入到`JavaScript`代码中，然后利用`Loader`输出。本篇文章主要针对的就是对`CSS`的操作。

<!-- more -->

## 引入CSS

我们还是利用第二课的例子，但是我们不打算用`HtmlWebpackPlugin`插件。我们新建一个`index.html`文件，放在`dist`文件夹中(因为我们将它作为`build`的结果文件夹)。

```html
<!--index.html-->
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
      <script src="bundle.js"></script>
  </body>
</html>
```

在`app`文件夹中，我们新建一个`css`文件夹用来存放样式文件`style.css`。

```css
/*style.css*/
body {
    background-color: red;
}
```

我们将背景定义为红色。接着，我们要在`index.js`入口文件`import``css`文件。

```js
//index.js
import './css/style.css';

function component () {
  var element = document.createElement('div');
  element.innerHTML = "Hello World！";

  return element;
}
document.body.appendChild(component());
```

到此，我们的基础文件已经安排好了。要使得`webpack`能*识别*`css`文件。我们需要`Loader`，分别是`css-loader`和`style-loader`。`css-loader`用来返回有`@import`和`url()`的`css`文件，`style.css`用来将`css`文件插入页面。

> 有关`css-loader`和`style-loader`的更多讨论，可参考`stackoverflow`的问题：[http://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader](http://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader)

我们这样来安装`Loader`依赖。

```bash
npm install --save-dev css-loader style-loader
```

在`webpack.config.js`中配置如下

```js
//webpack.config.js
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  //style-loader 和 css-loader
  module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true
    }
};
```

`test`指的是给出一个正则表达式，找到以`.css`为后缀的样式文件。`use`中定义了`style-loader`和`css-loader`，使用方式是**从右往左**，所以`style-loader`在前，`css-loader`在后。

我们开启了`WDS`(Webpack Dev Server)，并配置`contentBase`参数，将服务器定向于`dist`文件。默认情况下，`WDS`会服务于根目录。`inline`参数在`dev-server`的两种模式间切换，`true`就是`inline`模式，修改文件就会重载浏览器窗口；`false`代表`iframe`模式；默认为`inline`模式。

让我们开启服务器

```shell
$ npm run build && npm run start
```

这时，在`8080`端口，我们看到了文字下面的红色背景。

> 更多有关`css-loader`设置的问题，请参考[https://doc.webpack-china.org/loaders/css-loader/](https://doc.webpack-china.org/loaders/css-loader/)，尤其是有关`css`作用域和`css module`的内容，因为默认情况下，`CSS`将所有的类名暴露到全局的选择器作用域中。`css module`就是启用局部作用域`CSS`。

---

## ExtractTextWebpackPlugin插件

上面的做法有一个性能上的问题，就是无法使用浏览器去异步并并行地加载`CSS`。反而，你的文件需要等待整个`JavaScript`文件加载完，才能进行渲染。但是在我们的网页设计中，有一种**平稳退化**的概念。就是说，`HTML`是最重要的，其次是`CSS`，最后是`JavaScript`。

所以呢，这个插件的作用就是将`CSS`单独打包，然后交给浏览器率先加载。

首先，我们对插件进行开发依赖安装

```shell
$ npm install --save-dev extract-text-webpack-plugin
```

然后，我们需要修改我们的`webpack.config.js`配置文件：

```js
//webpack.config.js
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
        rules: [{
            test: /\.css$/,
            //use: [ 'style-loader', 'css-loader' ]
            use: ExtractTextPlugin.extract({
              use: 'css-loader'
            })
        }]
    },
    //ExtractTextPlugin
    plugins: [
      new ExtractTextPlugin('styles.css'),
    ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true
    }
};
```

这样的设置下，`webpack`会在`dist`文件夹中生成一个汇总的`styles.css`文件。你需要将它作为一个单独的样式加入到`index.html`中。