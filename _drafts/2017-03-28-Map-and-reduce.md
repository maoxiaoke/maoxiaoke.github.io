---
layout: post
title: "网易笔试问题"
date: 2017-03-28 19:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

最近经常用到`Array.prototype.map()`和`Array.prototype.reduce()`函数，根据自己的理解，在此处记录。

这两个都是内置对象`Array`的两个函数，用法也存在相似性。

## map()

`map()`方法创建一个新数组，其结果是为该数组的每个元素调用一个函数。

```javascript
let numbers = [1, 5, 10, 15];
let roots = numbers.map(function(x) {
    return x * 2;
});
// roots is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]

let numbers = [1, 4, 9];
// let roots = numbers.map(Math.sqrt);
let roots = numbers.map(function(x){
    return Math.sqrt(x);
});
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]
```

> 你当然可以使用循环，但显然这样更方便。

`map()`不会修改调用它原数组本身。

举例：反转字符串

```javascript
var str = '12345';
Array.prototype.map.call(str, function(x) {
  return x;
}).reverse().join('');

// Output: '54321'
```

## reduce()

`reduce()`方法对累加器和数组的每个值 (从左到右)应用一个函数，以将其减少为单个值。

```javascript
let sum = [0, 1, 2, 3].reduce(function(acc, val) {
  return acc + val;
}, 0); // 0是可选的参数

console.log(sum);//6
```

`reduce()`的返回值是函数累积处理的结果。

你也可以使用箭头函数来编写。

```javascript
let sum = [0, 1, 2, 3].reduce((acc, val) => acc + val, 0); // 0是可选的参数

console.log(sum);//6
```