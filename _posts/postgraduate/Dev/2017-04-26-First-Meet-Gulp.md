---
layout: post
title: "初识gulp"
date: 2017-04-26 09:00:00 +0800 
categories: 研究生涯
tag: gulp
---
* content
{:toc}

`Gulp`是一个基于`Node.js`的流式构建工具。可以使用它进行项目管理，方便地执行一些常见的任务。下面的文章按以下两点组织。

* `gulp`的基本知识
* `gulp`执行的常见任务

首先，贴出一些可供参考的网站：

* [`gulp`官网](http://gulpjs.com/)
* [`gulp`github 地址](https://github.com/gulpjs/gulp)
* [`gulp`官方插件地址](http://gulpjs.com/plugins/)
* [`gulp`详细入门教程](http://www.ydcss.com/archives/18#lesson6)

使用`gulp`的基本步骤是：

安装`node.js` -> 全局安装`gulp` -> 在项目里安装`gulp`和`gulp`插件 -> 配置`gulpfile.js`文件 -> 运行任务

<!-- more -->

## 常见的命令行操作

先列出一些常见的命令行操作：

* `cd`: 进入目录
* `dir`: 列出文件列表
* `cls`: 清空命令提示符窗口内容
* `touch 文件名.文件类型`: 在当前新建一个文件
* `tree`: 列出当前目录的目录树

## 安装node.js

因为`gulp`是基于`node.js`，所以需要先安装`node.js`。[官网传送门](https://nodejs.org/en/)

安装完`Node.js`之后，`Node.js`的包管理工具`npm`也应该安装好了。可以用以下方法测试一下：

```bash
node -v
npm -v
```

---

## npm介绍

`npm`是`node`包管理工具。用它来安装插件的操作是：`npm install <name> [-g] [--save-dev]`:

* `-g`: 全局安装，这种方式会安装在所属的系统盘的`node-modules`目录下(`C:\Users\timi\AppData\Roaming\npm\node-modules`)，并且写入系统环境变量，这样的话，就可以通过命令行在任何地方调用它。不使用`-g`进行全局安装，则该插件会安装在当前目录新生成`node-modules`文件夹里。
* `--save`: 这条命令是说将配置保存至`package.json`
* `-dev`: 保存至`package.json`的`devDependencies`节点，不指定`-dev`则将保存至`dependencies`节点。

### 答疑解惑 -- package.json

每次初始化一个`node`项目，最好需要添加一个`package.json`的配置文件。这个文件的目的有以下几个方面：

* 相当于一个项目说明
* 定义项目运行和开发所依赖的各种模块以及配置信息，根据这个配置文件，`npm install`会自动下载所需模块，非常方便地配置项目所需的运行和开发环境
* 正因为上面第二点，所以更便于项目共享

可以选择`npm init`初始化一个`package.json`文件，或者手动添加这个文件，都是有效的。

使用`npm init`添加一个`package.json`文件时，会有一个向导提示我们输入项目名称、版本信息等内容，这么多的属性可以在`npm`的参考文档中查阅。传送门：[https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

### 答疑解惑 -- devDependencies依赖 和 dependencies依赖

`package.json`文档中有`devDependencies`和`dependencies`两个属性。这两个属性的介绍也可以在[https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)页面中查到，官方解释好难懂呀。但简单解释就是：项目运行过程中依赖的模块，你就使用`dependencies`依赖，开发过程中，比如测试，压缩，文档框架这些东西，就使用`devDependencies`依赖。即，想要使用`devDependencies`依赖，安装的时候就加上`-dev`。

当然，`npm`还有其他操作：

* `npm uninstall <name> [-g] [--save-dev]`: 删除插件
* `npm update <name> [-g] [--save-dev]`: 更新插件
* `npm help`: 查看帮助
* `npm list`: 列出当前目录已安装插件

`npm`的一些其他命令，可参考[`npm`官方文档](https://docs.npmjs.com/)

---

## gulp的安装和运行

敲黑板，讲重点啦。

`gulp`的[官网](http://gulpjs.com/)给了下面的一张图简单明了地讲明了如何安装`gulp`:

![gulp安装]({{ '/styles/images/gulp/gulp-install.png' | prepend: site.baseurl }})

但我们一般都是这样进行的：

#### 1.全局安装`gulp`

```
$ npm install --global gulp
```

#### 2.如果你需要使用`gulp`命令行

```
$ npm install gulp-cli -g
```

> 以上这两种全局安装的写法都是一样的。

#### 3.作为项目的开发依赖安装(`devDependencies`)，安装到项目所在目录

```
$ npm install --save-dev gulp
```

#### 4.在项目所在目录新建`gulpfile.js`文件

```
$ touch gulpfile.js
```

> 你当然也可以手动新建一个`gulpfile.js`文件。

这个文件大概如下所示：

```js
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});

gulp.task('default',['testLess', 'elseTask']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
```

#### 5. 运行gulp

如果执行特定任务：

```
$ gulp 任务名称
```

如果执行`default`任务：

```
$ gulp
```

则将会`default`任务中所有的任务。

如果你想了解更多，可以访问`gulp`的中文文档：[http://www.gulpjs.com.cn/docs/](http://www.gulpjs.com.cn/docs/)或者他们的`Github`仓库的`API`文档[https://github.com/gulpjs/gulp/blob/master/docs/API.md](https://github.com/gulpjs/gulp/blob/master/docs/API.md)。

---

## 常见的gulp插件

话不多说。

+ gulp-uglify : 解析、最小化、压缩和美化JavaScript文件
+ gulp-cssnano : 压缩css
+ gulp-autoprefixer : 解析css和提供供应商前缀
+ gulp-htmlmin : 压缩HTML
+ gulp-imagemin : 压缩图片
+ gulp-concat : 合并JavaScript文件
+ gulp-clean : 删除文件和文件夹
+ gulp-rename : 重命名文件
+ gulp-if : 判断语句
+ run-sequence : 控制顺序执行的任务
+ gulp-sourcemaps
+ browser-sync : 浏览器同步
+ require-dir : 对gulpfile进行分文件处理
+ gulp-changed : 仅仅让更改过的文件经过管道
+ gulp-sass : 编译sass文件成css文件
---

## gulp的应用

### 我的第一个应用 -- autoprefixer给常规css文件加厂商前缀

`autoprefixer`可以根据浏览器版本自动处理浏览器前缀，使我们写代码的时候可以不考虑各浏览器兼容问题。

`autoprefixer`的`Github`地址是：[https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)

#### 该项目结构如下

```
│  gulpfile.js
│  index.html
│  package.json
│
├─css
│      style.css
│
├─dist
├─node_modules
└─scss
        style.scss
```

解释以下：`.scss`文件由`Sass`预处理器编写，放在`scss`文件夹，进过`Sass`编译过的`.css`文件被放在`css`文件夹。我们的目的呢，就是给`Sass`编译过的`style.css`文件添加厂商前缀，然后放在`dist`文件夹。

#### 本地安装gulp-autoprefixer

这个插件当然不是我们项目运行过程中需要的模块，所以使用`devDependencies`依赖。

```
$ npm install gulp-autoprefixer --save-dev
```

#### 配置gufile.js

```js
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('testAutoFx', function () {
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});
```

函数`autoprefixer(options)`的选项有`8`。可参见[https://github.com/postcss/autoprefixer#options](https://github.com/postcss/autoprefixer#options)

#### 执行任务

我们在命令行执行：

```
$ gulp testAutoFx
```

现在，在`dist`文件中多个一个`css`文件夹，`css`文件夹中有一个添加了厂商前缀的`style.css`文件，正是我们需要的。美滋滋😄

#### 福利

`autoprefixer`还有一个`online`服务，网址是：[https://autoprefixer.github.io/](https://autoprefixer.github.io/)。

---

## gulp有关的问题

### 为啥有些要return 有些不需要

> 参考: [Running tasks in series](https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md#running-tasks-in-series-ie-task-dependency) [Does a gulp task have to return anything?

](https://stackoverflow.com/questions/26079118/does-a-gulp-task-have-to-return-anything) [Gulp.js task, return on src?

](https://stackoverflow.com/questions/21699146/gulp-js-task-return-on-src)