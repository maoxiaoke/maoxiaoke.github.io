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