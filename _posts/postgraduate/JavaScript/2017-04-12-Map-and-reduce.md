---
layout: post
title: "JavaScript的map/reduce"
date: 2017-04-12 19:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

最近经常用到`Array.prototype.map()`和`Array.prototype.reduce()`函数，根据自己的理解，在此处记录。

这两个都是内置对象`Array`的两个函数，用法也存在相似性。

<!-- more -->

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

---

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

这只是`reduce()`的简单介绍，真正有意思的是下面的知识点，你会发现`reduce()`没有你想象的那么单纯。

### 语法解释

```javascript
arr.reduce(callback,[initialValue])
```

`callback`包含四个参数：

- `accumlator`: 上一次调用返回的值或者提供的初始值(`initialValue`)
- `currentValue`: 数组中正在处理的元素
- `currentIndex`: 数组中正在处理的元素索引，如果提供了`initialValue`，从`0`开始，否则，从`1`开始
- `array`: 调用`reduce`的数组

`initialValue`: 可选项，其值用于第一次调用`callback`的第一个参数。 

其上，反复说到`initialValue`，这到底是什么东西。

我们来举个例子：

#### 数组降维(扁平化)处理

代码如下：

```javascript
var list1 = [[0, 1], [2, 3], [4, 5]];
var list2 = [0, [1, [2, [3, [4, [5, [6]]]]]]];

function flatten(arr){
    return arr.reduce(function(acc, val){
        return acc.concat(Array.isArray(val) ? flatten(val) : val);
    }, []);
}

console.log(flatten(list1));  // [0, 1, 2, 3, 4, 5]
console.log(flatten(list2));  // [0, 1, 2, 3, 4, 5, 6]
```

注意，简化一下，`arr.reduce(xxx, [])`，则，`[]`是作为`initialValue`添加进去的。那么，我们以数组`list1`为例，前两个传入`reduce(function(acc,val)){}`的值分别是`[]`和`[0,1]`。如果我们没有初始化值，则传入的是`[0,1]`和`[2,3]`。

如果使用`ES6`的`=>`函数，我们有更优雅的形式：

```javascript
var list1 = [[0, 1], [2, 3], [4, 5]];
var list2 = [0, [1, [2, [3, [4, [5, [6]]]]]]];

var flatten = (arr) => {
    return arr.reduce(
        (acc, val) => {
            return acc.concat(Array.isArray(val) ? flatten(val) : val);
        }, []);
};

flatten(list1); // [0, 1, 2, 3, 4, 5]
flatten(list2); // [ 0, 1, 2, 3, 4, 5, 6 ]
```

再看下面这个例子

#### 用reduce()擦出对象的火花

```javascript
cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]];
var register = cid.reduce(function(acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
}, {total: 0});

console.log(register);
/*
{ total: 335.40999999999997,
  PENNY: 1.01,
  NICKEL: 2.05,
  DIME: 3.1,
  QUARTER: 4.25,
  ONE: 90,
  FIVE: 55,
  TEN: 20,
  TWENTY: 60,
  'ONE HUNDRED': 100 }
*/
```

这个程序中，`initialValue`是`{total: 0}`，然后我们试着走第一遍，先传入的两个值是`{total:0}`和`["PENNY", 1.01]`，传入的`{total:0}`是对象，函数内则是对象的添加属性操作。
