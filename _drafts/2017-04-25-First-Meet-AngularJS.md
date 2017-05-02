---
layout: post
title: "初识AngularJS"
date: 2017-04-25 09:00:00 +0800 
categories: 研究生涯
tag: AngularJS
---
* content
{:toc}


这里的`AngularJS`指的是第一代，据说第二代`Angular2`比`AngularJS`有一个大跃进，有机会也想去了解一下。

首先，`AngularJS`是一套基于`MVC`结构的`JavaScript`开发框架，主要就是以`HTML`作为模板语言并进行扩展。它是一种框架，而不是类库(比如，`jQuery`通常意义来说就是`js`库)。特点是：

* `MVVM`
* 模块化
* 自动化双向数据绑定
* 语义化标签
* 依赖注入

简而言之，`AngularJS`通过指令扩展了`HTML`的语法，是增强的`HTML`。当然，并不是所有的`web`应用都适合使用`AngularJS`，在构建一个`CRUD(Create、Retrieve、Update、Delete)`应用时采用`AngularJS`是较好的选择，而不适用于图形编辑、游戏开发等。当然，什么都不是绝对的。

## 1. 从Hello World开始

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

## 2. 表达式 {{}}

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

---

## 3. 双向数据绑定

建立数据绑定，使用的是内置指令`ng-model`，该指令只能用于表单元素之上。

```html
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<form >
    <p>用户名：</p>
    <input type="text" ng-model="name" placeholder="your name">
    <p>{{name}}<p>
</form>
</body>
</html>
```

上面的代码中，我们使用`ng-model`指令将内部数据模型对象(`$scope`)中的`name`属性绑定到了文本输入字段上。

`$scope`是一个`JavaScript`对象，其中的属性可以被视图访问，也可以同控制器进行交互。

`ng-bind`是一个单向的数据绑定，可用于向界面中输出作用域中的数据。

---

## 4. MVC 和 MVVM

`MVC`是一种*软件(架构)设计模式*。全称是`Model`、`View`、`Controller`。核心思想是把数据的管理、业务逻辑、数据展示分离开来。

---

## 5. 模块 -- module

将函数代码都定义在全局命名空间中绝对不是什么好主意，所以我们可以将代码封装在**模块**里。

`AngularJS`使用`angular.module()`方法来声明模块。

```js
angular.module('appModule',[]);
```

函数参数列表如下：

* `name`(字符串): 模块的名称
* `requires`(字符串数组): 依赖的模块

---

## 6. 作用域

`AngularJS`启动并生成视图时，会将根`ng-app`元素同`$rootScope`进行绑定。`$rootScope`时所有`$scope`对象的顶层，也是根作用域。

`$scope`对象在`AngularJS`中充当*数据模型*，但与传统的模型不一样，它不负责处理和操作数字，只是视图和`HTML`之间的桥梁。它的所有属性，都可以自动被视图访问到。

> 作用域包含了渲染视图时所需的功能和数据，它是所有视图的唯一源头。可以将作用域理解成视图模型(`view model`)，这也是有人认为`AngularJS`是`MVVM`模型的原因。

---

## 7. 控制器

控制器在`AngularJS`中的作用是增强视图。

在`AngularJS`中，**它就是一个函数**。用来向视图的作用域中添加额外的功能。比如，用它来给作用域对象设置初始状态，并添加自定义行为。当我们在页面上创建一个新的控制器时，`AngularJS`会生成并传递一个新的`$scope`给这个控制器。

```js
var app = angular.module('app',[]);
app.controller('FirstController',function($scope){
    /*some content*/
});
```

`AngularJS`应用的任何一个部分，都有父级作用域存在。对于`ng-app`所处的层级来讲，父级作用域就是`$rootScope`。

> 有一个例外：在指令内部创建的作用域被称为孤立作用域

---

## 8. 过滤器

过滤器用来格式化需要展示给用户的数据。

```html
{{expression | filter}} <!--最简单的方式-->

{{expression | filter1 | filter2}} <!--同时运行多个过滤器-->

{{expression | filter1:argument1:argument2 | filter2}} <!--向过滤器传递参数-->
```

### 常用过滤器

1. currency

将数字形式转换为货币形式，默认是美元，可以传递`￥`参数以传递人民币。

```html
{{expression | currency:"￥"}}
```

2. date

将日期格式化成需要的格式。具体参见[https://docs.angularjs.org/api/ng/filter/date](https://docs.angularjs.org/api/ng/filter/date)

3. filter

从给定数组中选择一个子集，并将其生成一个新数组返回。过滤器的第一个参数可以是字符串、对象、函数。

```html
<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
    <style>
        ul {padding-left: 0px;}
        li {list-style-type:none;}
    </style>
</head>
<body>
<div ng-controller="MainController">
    <p>personInfo:</p>
    <input type="text" ng-model="personInfo">
    <ul>
        <li ng-repeat="person in persons | filter:personInfo">
            Name: {{person.name}}, Age: {{person.age}}, Sex: {{person.sex}}
        </li>
    </ul>
</div>
<script>
    var app = angular.module("app",[]);
    app.controller("MainController", function ($scope) {
        $scope.persons = [{
            name: "Maoxiaoke", age: 26, sex: "male"
        },{
            name: "Chentata", age: 25, sex: "female"
        },{
            name: "Dayouzi", age: 25, sex: "female"
        },{
            name: "Jiaoqingqing", age: 25, sex: "female"
        }];
    });
</script>
</body>
</html>
```

4. limitTo

截取数组或字符串。

```html
{{san Francisco is very cloudy | limitTo: -6}} <!--cloudy-->

{{['a','b','c','d'] | limitTo: 1}} <!--["a"]-->
```

5. number

将数字格式化成文本，同时对数字的精度进行控制。

```html
{{1.23456 | number:2}} <!--1.23-->
```

6. json

将`JavaScript`对象转换为`json`字符串。

7. orderBy

将一个数组中的元素进行排序，接受一个参数来指定排序规则。第二个参数用来控制排序的方向(是否逆序)。

```html
<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="UTF-8">
    <title>My First AngularJS</title>
    <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css">
</head>
<body>
<div ng-controller="MainController">
    <table class="table table-bordered">
        <thead>
            <tr class="bg-info">
                <th><a href="#" ng-click="sortRule='name'" >Name</a></th>
                <th><a href="#" ng-click="sortRule='age'" >Age</a></th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="person in persons | orderBy:sortRule">
                <td>{{person.name}}</td>
                <td>{{person.age}}</td>
            </tr>
        </tbody>
    </table>
</div>
<script>
    var app = angular.module("app",[]);
    app.controller("MainController", function ($scope) {
        $scope.persons = [{
            name: "Maoxiaoke", age: 26, sex: "male"
        },{
            name: "Chentata", age: 25, sex: "female"
        },{
            name: "Dayouzi", age: 25, sex: "female"
        },{
            name: "Jiaoqingqing", age: 25, sex: "female"
        }];
    });
</script>
</body>
</html>
```

8. lowercase & uppercase

大小写转换。

### 自定义过滤器

在`AngularJS`中调用`filter()`方法即可自定义过滤器。

```js
var app = angular.module ("moduleName",[]);
app.filter ("filterName", function(){
    return function (input){
        /*some content*/
    }
});
```

### 表单验证

1. 必填项

```html
<input type="text" required>
```

2. 最小最大长度

```html
<input type="text" ng-minlength="5">

<input type="text" ng-maxlength="20">
```

3. 正则表达式匹配

```html
<input type="text" ng-pattern="/PATTERN/">
```

4. 电子邮件

```html
<input type="email" name="email" ng-model="user.email">
```

5. 输入内容是数字

```html
<input type="number" name="age" ng-model="user.age">
```

6. URL

```html
<input type="url" name="homepage" ng-model="user.facebook_url">
```

---

## 9. 指令