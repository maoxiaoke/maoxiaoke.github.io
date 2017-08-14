---
layout: post
title: "编写自己的代码库"
date: 2017-07-20 09:00:00 +0800 
categories: 面试与笔试经历
tag: Interview
---
* content
{:toc}

做好基本总结，对于每一个程序员来讲都是重要的。最近看到一篇文章，文中说。

> 前端工程师要忘记前端二字。

我深为折服，也颇为赞同。程序员所面临的无非是一个个问题，所做的也是解决一个一个难题。所谓语言、框架、工具、策略都是为了解决问题而服务的。很多人觉得JavaScript只能做一些写写脚本这一类前端的事，如果单纯这样去考虑，眼光未免太狭隘了。**JavaScript大有所为**，只有你想不到的，没有你做不到的，只有开拓语言的新应用范围，才能做到**创造力**，而不是单纯的紧跟时代所趋或追求于所谓的再创造力。

周杰伦有一次接受采访，说，我从不关心流行，我创造流行(有待考据)。盲目去追求时代热潮也是不可取的，但这并不意味你要固步自封。良好的知识储备是必要的，是一切发展的基石。所以，不要看我们是前端程序员，算法、数据库、编译原理、操作系统等都应该具备。

所以，勉励自己。

<!-- more -->
<!-- TOC -->

- [1. 数组操作](#1-数组操作)
    - [1.1. 数组元素的最大最小值](#11-数组元素的最大最小值)
        - [1.1.1. 使用apply](#111-使用apply)
        - [1.1.2. es6的...操作符](#112-es6的操作符)
        - [1.1.3. Array.reduce()](#113-arrayreduce)
        - [1.1.4. 排序](#114-排序)
- [2. 对象操作](#2-对象操作)
    - [2.1. 对象的深拷贝](#21-对象的深拷贝)
        - [2.1.1. Underscore.js 的实现](#211-underscorejs-的实现)
        - [2.1.2. 利用 JSON 的解析和序列化](#212-利用-json-的解析和序列化)
        - [第三方库的实现](#第三方库的实现)

<!-- /TOC -->

# 1. 数组操作

## 1.1. 数组元素的最大最小值

我们知道对象`Math`有两个最大值最小值方法`Math.max()`和`Math.min()`，接受一系列数字，返回给定数字的最大值最小值。

```Syntax
Math.max([value1[, value2[, ...]]])
```

但是需要注意的几点是:

+ 不接收数组参数
+ 对于非`Number`类型，会进行隐式类型转换。如果其中某个参数不能转换成数字，返回`NaN`
+ 没有给定参数，返回`-Infinity`(对Math.max()而言，Math.min()则返回`Infinity`)

所以我们采用`Math.max()`的思路(以Math.max()为例)，关键变成如何对数组进行处理。

### 1.1.1. 使用apply

我们知道，`apply()`接收一个数组参数。

```Syntax
theFunction.apply(valueForThis, arrayOfArgs)
```

`apply()`会unwrap参数的第一层`[]`(?why)。

所以方法如下:

```js
let arr = [6,4,1,8,1,11,23];
function getMaxOfArray(numArray){
    return Math.max.apply(null, numArray);
}
getMaxOfArray(arr); // 23
```

### 1.1.2. es6的...操作符

ES6新增一个[spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)，可以展开数组元素。

```js
let arr = [6,4,1,8,1,11,23];
let max = Math.max(...arr); // 23
```

### 1.1.3. Array.reduce()

```js
let arr = [6,4,1,8,1,11,23];
let max = arr.reduce((a, b) => Math.max(a, b)); //23
```

### 1.1.4. 排序

这种是最容易想到的方式了，对数组元素进行排序，最大最小的分别在数组两端。排序，我们可以用`Array.prototype.sort()`方法。

```js
let arr = [6,4,1,8,1,11,23];
arr.sort((a,b) => a-b);
let max = arr[arr.length-1]; //23
```

>参考: [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

---

# 2. 对象操作

## 2.1. 对象的深拷贝

由于 Object 是引用类型，所以对对象的简单拷贝是引用拷贝，也就是浅拷贝。所谓深拷贝，指的就是我们将对象所在的内存空间的内容重新拷贝了一份。

> 拓展，有些数组方法不会对原数组造成影响的原因，就是因为在内部对数组进行了一次深拷贝处理。

### 2.1.1. Underscore.js 的实现

Underscore.js 库有一个 `snapshot` 是进行对象的深拷贝处理。代码的实现如下(自己有重构)。

```js
function deepClone(obj) {
  var temp = {};
  //If obj is primary types
  if (obj == null || typeof(obj) != "object"){
    return obj;
  }
  //If obj is an object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)){ //Make sure key is not from of Prototype
      temp[key] = deepClone(obj[key]);  //Recursion
    }
  }
  return temp;
}
```

但还是有点问题，如果传入的是一个 Array 类型、Date 类型和 RegExp 类型会将它们转换为简单对象(虽然它们也是对象，如数组只是属性从 0 开始逐个递增的对象而已)，但我们还是不太想这样。这种情况下，我们可以对 Array 类型和 Date 类型进行一次判定。

> 需要额外注意的是，如果是嵌套 Array 类型，也要进行递归。

```js
function deepClone(obj) {
  var temp;
  //If obj is primary types
  if (obj == null || typeof(obj) != "object"){
    return obj;
  }
  //If obj is Date type
  if (obj instanceof Date) {
    temp = new Date();
    temp.setTime(obj.getTime());
    return temp;
  }
  //If obj is Array type
  if (obj instanceof Array){
    temp = [];
    for (var item of obj){
      temp.push(deepClone(item)); //Considering nested array
    }
    return temp;
  }
  //Otherwise
  temp = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)){ //Make sure key is not from of Prototype
      temp[key] = deepClone(obj[key]);  //Recursion
    }
  }
  return temp;
}
```

> 即便如此，上述代码对于对象方法还是无能为力

### 2.1.2. 利用 JSON 的解析和序列化

JSON 对象有两个方法: `stringify()` 和 `parse()`。stringfy() 用于将 JavaScript 对象序列化为 JSON 字符串，而 parse() 用于将 JSON 字符串解析为原生 JavaScript 字符串。

```js
var cloneObj = JSON.parse(JSON.stringify(obj));
```

但是它也有缺点，会忽略掉值为 undefined 以及函数表达式。

### 第三方库的实现

Underscore -- `_.clone()`
jQuery -- `&.extend()` 调用 `$.extend(true, {}, obj);`就可以进行深复制
lodash -- `_.clone()` 和 `_.cloneDeep()`，这个库效果要更好。

参考:
+ [深入剖析 JavaScript 的深复制](https://segmentfault.com/a/1190000002801042)
+ [How to Deep clone in javascript](https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript)