---
layout: post
title: "初识AngularJS"
date: 2017-04-25 09:00:00 +0800 
categories: 研究生涯
tag: AngularJS
---
* content
{:toc}

## 从Hello World开始

```html
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<p> {{"Hello World!"}}</p>
</body>
</html>
```

`ng-app`是`AngularJS`的一个内置指令，`AngularJS`的内置指令都是从`ng-`开始的。

`ng-app`有两个作用：

* 启动`AngularJS`框架
* 告诉`AngularJS`框架从`ng-app`指令所在标签的开始到结束，之间的所有`DOM`元素都由`AngularJS`框架进行管理。

`{{}}`是`AngularJS`的表达式形式，中间的部分为表达式内容，

## 表达式 {{}}

表达式定义方法：

```angular
{{expression}}
```

### 进行四则运算

```html
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<h3>Sum two numbers:</h3>
<p> 1.98 + 2.98 = {{1.98 + 2.98 | number:0}}</p>
</body>
</html
```

`AngularJS`可以自己进行运算，然后将结果添加到页面中。`|`是管道符号，这个符号表示在`AngularJS`调用过滤器格式化数据。此处表示除去小数后的部分，保留整数部分。

### 访问作用于内的数据

`ng-init`用于初始化`AngularJS`当前的作用域。

```html
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-init="person={'name':'timi'};arr=['i','love','china']">
    <p>{{person.name}}</p>
    <p>{{arr[2]}}</p>
</body>
</html>
```
