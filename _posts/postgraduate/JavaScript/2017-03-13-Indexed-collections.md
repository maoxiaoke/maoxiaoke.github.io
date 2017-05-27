---
layout: post
title: "JavaScript数组操作"
date: 2017-03-13 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


以索引排序的数据组合，包括**Arrays**、**Array object**和**TypeArray**。

An `array` is an ordered set of values that you refer to with a name(数组名) and an index(索引).

`JavaScript`中没有明确的数组数据类型。但是，我们可以通过使用内置`Array`对象和它的方法对数组进行操作。

<!-- more -->

> 定义了七种数据类型：`Boolean`、`null`、`undefined`、`Number`、`String`、`Symbol`、`Object`

## 数组对象 -- Array object

### 创建数组

```javascript
var arr = new Array(element0, element1, ..., elementN);
var arr = Array(element0, element1, ..., elementN);
var arr = [element0, element1, ..., elementN];//使用字面值的方式
```

> `var arr = [4]`与`var arr = new Array(4)`不是等价的，后者是指数组的长度。所以，通常使用**字面值**初始化数组常常是首选。

为了创建一个长度不为`0`，但是又没有任何元素的数组，可选以下任何一种方式：

```javascript
var arr = new Array(arrayLength);
var arr = Array(arrayLength);

// This has exactly the same effect
var arr = [];
arr.length = arrayLength;
```

除了如上所示创建新定义的变量，数组也可以作为一个属性(property)分配给一个新的或者已存在的对象(object)：

```javascript
var obj = {};
// ...
obj.prop = [element0, element1, ..., elementN];

// OR
var obj = {prop: [element0, element1, ...., elementN]}
```

如果你希望用单个元素初始化一个数组，而这个元素恰好又是数字，那么你必须使用**字面值来初始化数组**。

```javascript
var arr = [42];      // 创建一个只有唯一元素的数组:
                     // the number 42.
var arr = Array(42); // 创建一个没有元素的数组,
                     // 但是数组的长度被设置成42.

var arr = Array(9.2); // RangeError: Invalid array length
var arr = [9.2];      // 创建一个元素为9.2的数组
```

### 填充数组 -- populating an array

使用赋值。

```javascript
var emp = [];
emp[0] = "Casey Jones";
emp[1] = "Phil Lesh";
emp[2] = "August West";
```

如果索引值不是一个整型数值，那么将作为代表数组对象的一个属性创建。

```javascript
var arr = [];
arr[3.4] = "Oranges";
console.log(arr.length);                // 0
console.log(arr.hasOwnProperty(3.4));   // true
```

如果创建的是*稀疏数组*，即含有空白或空缺单元的数组，要格外注意。

```javascript
var a = [];
a[0] = 1;
a[2] = 3;
a[1]; // undefined
a.length; //3
```

>另外，值得注意的是：这与显示将`a[1] = undefined`也是有所区别的。

### 引用数组元素 -- referring to array elements

元素的索引从`0`开始。

```javascript
var arr = ["one", "two", "three"];
arr[2];  // three


//在JavaScript中，数组也是对象，所以可以使用方括号来访问数组的属性
arr["length"];  // 3
```

### 遍历数组 -- interating over array

#### 常规操作

```javascript
var colors = ['red', 'green', 'blue'];
for (var i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```

#### 使用 for...in操作

Since `JavaScript` elements are saved as standard object properties, it is not advisable to iterate through JavaScript arrays using `for...in`loops because normal elements and all enumerable properties will be listed.(什么意思？)

#### forEach() 方法提供了遍历数组元素的其他方法

```javascript
var colors = ['red', 'green', 'blue'];
colors.forEach(function(color) {
  console.log(color);
});
```

被传递给`forEach()`的函数会在数组的每个元素上执行一次，元素作为参数传递给寒素。**未赋值的值不会在`forEach()循环`**。

注意，在数组定义时省略的元素不会在`forEach()`遍历时被列出，但是手动赋值为`undefined`的元素是会被列出的：

```javascript
var array = ['first', 'second', , 'fourth'];

// returns ['first', 'second', 'fourth'];
array.forEach(function(element) {
  console.log(element);
})

if(array[2] === undefined) { console.log('array[2] is undefined'); } // true

var array = ['first', 'second', undefined, 'fourth'];

// returns ['first', 'second', undefined, 'fourth'];
array.forEach(function(element) {
  console.log(element);
})
```

### 类数组

有一些`DOM`查询操作，会返回`DOM`元素列表，他们并不是真正意义上的数组，十分类似而已。另一个例子是通过`arguments`对象将函数的参数当作列表来访问。这些都是类数组。

---

## 数组的方法

+ `concat()` 连接两个数组并返回一个新的数组
+ `join(deliminator = ',')` 将数组的所有元素连接成一个字符串
+ `push()` 在数组末尾添加一个或多个元素，并返回数组操作后的长度
+ `pop()` 从数组移出最后一个元素，并返回该元素
+ `shift()` 从数组移出第一个元素，并返回该元素
+ `unshift()` 在数组开头添加一个或多个元素，并返回数组的新长度
+ `slice(start_index, upto_index)` 从数组提取一个片段，并作为一个新数组返回
+ `splice(index, count_to_remove, addElement1, addElement2, ...)` 从数组移出一些元素，（可选）并替换它们
+ `reverse()` 颠倒数组元素的顺序：第一个变成最后一个，最后一个变成第一个
+ `sort()` 给数组元素排序
+ `indexOf(searchElement[, fromIndex])` 在数组中搜索searchElement并返回第一个匹配的索引
+ `lastIndexOf(searchElement[, fromIndex])` 和`indexOf`差不多，但是是从结尾开始，并且是反向搜索
+ `forEach(callback[, thisObject])` 在数组每个元素项上执行callback
+ `map(callback[, thisObject])` 在数组的每个单元项上执行callback函数，并把返回包含回调函数返回值的新数组
+ `filter(callback[, thisObject])` 返回一个包含所有在回调函数上返回为true的元素的新数组
+ `every(callback[, thisObject])` 当数组中每一个元素在callback上被返回true时就返回true
+ `some(callback[, thisObject])` 只要数组中有一项在callback上被返回true，就返回true
+ `reduce(callback[, initialValue])` 使用回调函数 callback(firstValue, secondValue) 把数组列表计算成一个单一值
+ `reduceRight(callback[, initalvalue])` 和 reduce()相似，但是是从最后一个元素开始的


---

## 多维数组 -- multi-demensional arrays

```javascript
var a = new Array(4);
for (i = 0; i < 4; i++) {
  a[i] = new Array(4);
  for (j = 0; j < 4; j++) {
    a[i][j] = "[" + i + "," + j + "]";
  }
}

/*
Row 0: [0,0] [0,1] [0,2] [0,3]
Row 1: [1,0] [1,1] [1,2] [1,3]
Row 2: [2,0] [2,1] [2,2] [2,3]
Row 3: [3,0] [3,1] [3,2] [3,3]
*/
```
