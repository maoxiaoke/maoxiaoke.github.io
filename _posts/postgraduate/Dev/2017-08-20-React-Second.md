---
layout: post
title: "React+Webpack+ES6+JSX 脚手架工具"
date: 2017-08-20 09:00:00 +0800 
categories: 研究生涯
tag: React
---
* content
{:toc}

完成一个 React 之初，就是要构建一个脚手架工具，要支持 ES6 和 JSX 语法。在这一块，用 Webpack 就胜过 Gulp，所以我们使用 Webpack 来进行模块打包。当然，也可以使用 Gulp + Webpack 来构建，这个有心情的时候再整整吧。

> 官方也提供一个 `react-scripts` 模块来提供脚手架。你也可以使用它，但能够自定义的话，也许是最好的选择。

<!-- more -->

原材料:

**devDependencies**
+ Webpack v3.5.5 版本更新换代，保不定这篇文章就失效了
+ webpack-dev-server 提供热更新
+ babel-core 核心模块
+ babel-loader 加载器
+ babel-preset-es2015 提供 ES6 语法支持
+ babel-preset-react 提供 JXP 语法支持
+ html-webpack-plugin 提供 html 插件

**dependencies**
+ react
+ react-dom

用包管理器 `npm` 将上述模块都加载好。

---

## 初始化配置 Webpack

在根目录建立一个 `webpack.config.js` 文件，这个文件类似于 Gulp 的 `gulpfile.js`。初始配置如下:

```js
//webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:'./app/app.js', //入口文件
    output: {
        filename: 'bundle.js', //出口文件
        path: path.resolve(__dirname,'./build')
    }
};
```

这里，只简单地配置了入口和出口。

---

## 目录结构

作为最为一个最简单的应用，我们用最简单的目录结构。

```bash
.
|-- index.html
|-- package.json
|-- webpack.config.js
|-- app
    |-- components
        |-- Tab.jsx
    |-- app.js
|-- node_modules
```

我们的 React 应用的入口是 `./app/app.js` 文件，组件存放在 `./app/components` 文件夹中，为了配合 React 的命名规范，首字母大写，后缀使用 `.jsx` 或 `.js` 都可以，为了区分，我们使用 `.jsx` 后缀(之后的 babel 设置也因此会有所不同)。

之后，我们添加 `app.js`、`Tab.jsx` 和 `index.html` 的内容。

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>react-webpack</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

> 我们并没有通过 `<script>` 来引入出口文件 `bundle.js`，这个我们是交给 `html-webpack-plugin` 来处理的。

```js
//app.js
import React from 'react';
import ReactDOM from 'react-dom';
import Tab from './components/Tab.jsx'; // attention

ReactDOM.render(
    <Tab />,
    document.getElementById('app')
);
```

入口文件 `app.js` 用来渲染整个 react 应用。需要注意的是，我们引入 `Tab` 组件的时候，是加上了后缀名 `.jsx` 的。

```js
//Tab.jsx
import React from 'react';

class Tab extends React.Component {
    render(){
        return (
            <div style={{textAlign: 'center'}}>
              <p>yuer <span style={{color:'red'}}>❤</span> xiaoke</p>
              <p>xiaoke <span style={{color:'red'}}>❤</span> yuer</p>
            </div>
        )
    }
}
export default Tab;
```

好的，我们的目录文件基本完成。

---

## 配置 Babel

我们需要这么几个插件，babel-core/babel-loader/babel-preset-es2015/babel-preset-react，请先安装这几个模块。然后我们配置 `webpack.config.js` 文件。

```js
//webpack.config.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./app/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./build')
    },

    //我们在下面添加了 loader
    module: {
        loaders:[
            {test:/\.js?$/,loader:'babel-loader',exclude:/node_modules/},  //for .js files
            {test:/\.jsx?$/,loader:'babel-loader',exclude:/node_modules/}  //for .jsx files
        ]
    }
};
```

为了使用 ES6 和 JSX 语法，我们新建一个 `.babelrc`，文件内容如下:

```json
{
    "presets":["es2015", "react"]
}
```

Babel 配置完成。

---

## Html-Webpack-Plugin

安装 `html-webpack-plugin` 插件。在 `webpack.config.js` 中的配置如下:

```js
//webpack.config.js
var path = require('path');
var webpack = require('webpack');
//here, look here
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./app/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./build')
    },
    module: {
        loaders:[
            {test:/\.js?$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.jsx?$/,loader:'babel-loader',exclude:/node_modules/}
        ]
    },

    //添加了这一行
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './index.html',  //模板是根目录的 index.html 文件
                filename: 'index.html',   //会在 build 文件夹内生成一个 index.html 文件
                inject: 'body'  //插入到 body 元素后面
            }
        )
    ]
};
```

---

## webpack-dev-server 配置

webpack-dev-server 是一个小型的 Node.js Express 服务器，提供实时的页面重载。

安装 `webpack-dev-server` 插件。然后配置 `webpack.config.js` 文件。

```js
//webpack.config.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./app/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./build')
    },
    //添加这一行
    devServer: {
        inline: true,   //inline 模式
        port: 8181     //端口自定义
    },
    module: {
        loaders:[
            {test:/\.js?$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.jsx?$/,loader:'babel-loader',exclude:/node_modules/}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './index.html',
                filename: 'index.html',
                inject: 'body'
            }
        )
    ]
};
```

> inline 是默认，默认端口是 8080。如果不配置 devServer 参数，就会以 inline 模式打开 8080 端口。

到现在为止，只要在命令行运行 `webpack-dev-server` (这意味这你全局安装了这个模块)。当然，最好的方式是利用 `package.json` 的 `scripts` 属性。

```json
...
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server"
 }
 ...
```

直接在命令行运行 `npm start` 即可。

---

好。现在我们完整的代码已经上传至 [react-webpack-es6-jsx](https://github.com/maoxiaoke/react-webpack-es6-jsx)。

---

## 小甜点

### babel-preset-react-hmre

> Babel preset for React HMR and Error Catching.

备注: HMR: Hot Module Replacement

这个 Babel preset 的目的是因为，如果在 react 应用中，如果页面重新刷新的话，组件状态是无法保留的。所以我们用 HMR 来解决这个问题。

首先，我们要设计一个 有状态 的组件，为此更改 `Tab.jsx`。

```jsx
//Tab.jsx
import React from 'react';

class Tab extends React.Component {
    constructor(props){
        super(props);
        this.state = { counter: 0};
    }
    componentDidMount(){
        this.interval = setInterval(
            this.increment.bind(this),1000
        )
    }
    increment(){
        this.setState(({counter}) => {
            return {counter: counter + 1};
        });
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const {counter} = this.state;
        return (
            <div style={{textAlign: 'center'}}>
              <p>yuer <span style={{color:'red'}}>❤</span> xiaoke</p>
              <p>xiaoke <span style={{color:'red'}}>❤</span> yuer</p>
              <p>a timer of love</p>
              <p>{counter}</p>
            </div>
        )
    }
}
export default Tab;
```

安装 `babel-preset-react-hmre`，在 `.babelrc` 中补充:

```json
{
    "presets":[
        "es2015", "react"
    ],
    "env": {
        "development": {
          "presets": ["react-hmre"]
        }
      }
}
```

在 `webpack.config.js` 中引入 `hot` 模式。

```js
//webpack.config.js
...
 devServer: {
        inline: true,
        hot: true,
        port: 8181
    }
...
```

最后在命令行中引入 `hot` 模式。

```js
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --hot"
  }
...
```

代码放在 [react-webpack-es6-jsx](https://github.com/maoxiaoke/react-webpack-es6-jsx/tree/hmr) 的 `hmr` 分支上。

---

### react-hot-loader

和上面的这个 `babel-preset-react-hmre` 差别尚不明朗。还在专研中。