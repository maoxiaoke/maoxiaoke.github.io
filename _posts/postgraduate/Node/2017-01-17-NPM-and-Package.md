---
layout: post
title: "包和NPM"
date: 2017-01-17 17:26:15 +0800 
categories: 研究生涯
tag: Node
---
* content
{:toc}

`Node`组织了自身的核心模块，也使得第三方文件模块可以有序地编写和使用。

<!-- more -->

## 包和模块的关系 ##
### 包目录 ###
包是一个存档文件，即一个目录。可以直接打包为`.zip`和`tar.gz`格式的文件。完全符合CommonJS规范的包目录应该含有如下文件：

- `package.json`：包描述文件
- `bin`: 用于存放可执行二进制文件的目录
- `lib`: 用于存放JavaScript代码的目录
- `doc`: 用于存放文档的目录
- `test`: 用于存放单元测试用例的代码



### 模块 ###

> 在NPM官方文档中有一段介绍`module`的[文字][moudle]，引用如下：

- A folder with a **package.json** file containing a **main** field.
- A folder with an **index.js** file in it.
- A **JavaScript** file.

### [Most npm packages are modules][package-and-module] ###

这句话所表达的含义是：并非所有的包会挂载`require()`,所以那些没有挂载`require()`方法的包就不是模块。

> 大多挂载`require()`的包是模块。

## [包描述文件package.json][paceage.json] ##

> 以著名开源框架`express`为例，其`package.json`[文件地址][express.json]。[本目录下地址](express-package.json)。

## NPM ##
暂略

1/17/2017 8:01:17 PM 


[moudle]:https://docs.npmjs.com/how-npm-works/packages#what-is-a-module "what-is-a-moudle"

[package-and-module]:https://docs.npmjs.com/how-npm-works/packages#most-npm-packages-are-modules 

[package.json]:https://docs.npmjs.com/getting-started/using-a-package.json#requirements 

[express.json]:https://github.com/expressjs/express/blob/master/package.json