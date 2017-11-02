---
layout: post
title: "深入理解 ES6"
date: 2017-10-21 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

在[编写自己的代码库]({{ '/2017/07/20/Clean-Code' | prepend: site.baseurl }})中我曾经表达了自己对 JavaScript 的理解。今日(2017.10.21)阅读 Nicholas C.Zakes 的 《Understanding ES6》，Redux 的创造者 Dan Abramov 在序言中提到：

> JavaScript was not a toy language.

是的，JavaScript 并不是(或者说不再是)一门“玩具”语言了。所以不，本文主要聚焦于 ES6 的一些 new feature，以及表达一些自我的理解。

<!-- more -->

## 最佳实践，使用 let/const

### 块级作用域的理解

在 JavaScript 中，很多人会把*块级作用域*和*函数作用域*分离开来。其实，块级作用域(也叫词法作用域)包含两块：

+ 其一就是函数作用域，在函数内部
+ 其二就是块，即 `{}` 中间

所以，JavaScript 引入 `let/const` 就是为了解决第二类块级作用域的问题。

### temporal dead zone

涉及到 let/const 的具体实现方面，会接触到暂时性死区 (TDZ) 这个概念。首先，把我的结论亮出来：**使用 let/const 声明的变量存在 hoisting**。

在编译器在扫描代码发现变量声明时，遇到 var 声明的变量，就将它们提升至**作用域顶部**，遇到 let/const 声明的变量则放入 TDZ 中。**TDZ 在变量声明后终结，而不是赋值后**。在块级作用域结束时，变量立刻被垃圾回收器回收。我们看下面这个例子：

```js
let x = 'outer value';
(function() {
  console.log(x); // Reference error
  let x = 'inner value';
}());
```

这里，如果 let 声明的变量不提升的话，会输出 'outer value'，但实际输出会报错。这就是说 `lex x = 'inner value'` 会被提升，但在声明前无法被访问(放入 TDZ 区域)。

```js
//console.log(aLet); //Reference error
let yuer;
console.log(yuer); // undefined
yuer = 10;
console.log(yuer); // 10
```

上面这段代码是解释 TDZ 的一个 Life cycle。

再看一个例子：

```js
let a = f();
const b = 2;
function f() { console.log (b); } //Reference error
```

> 更多的参考：[What is the temporal dead zone?](https://stackoverflow.com/questions/33198849/what-is-the-temporal-dead-zone) [TEMPORAL DEAD ZONE (TDZ) DEMYSTIFIED](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified) [ES6 In Depth: let and const](https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/) [ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth)

### 不允许重复声明

在使用 var 的时代中，我们可以写出下面的代码：

```js
var xiaoke = 2;
var xiaoke = 3;
console.log(xiaoke);// 3
```

在严格模式下，这段代码是不报错的。但是 let/const 不允许这种行为发生。也就是下面的代码都会报错。

```js
'use strict';
let xiaoke = 1;
var xiaoke = 2;
console.log(xiaoke); //SyntaxError

let love = 1;
let love = 2;
console.log(love); //SyntaxError

var yuer = 1;
let yuer = 2;
console.log(yuer); //SyntaxError
```

const 也是同理。但是注意的是，如果内嵌另一个作用域，便可在内嵌的作用域中用 let 声明同名变量。

```js
let count = 2;
if (condition){
    let count = 3; //对的
}
```

### const 用来声明对象

const 用来表示一个常量，一般来说，我们该为常量使用大写命名，但这适用于一些在执行前就已知的值。对于在执行期间实时计算出来的不变的值，最好使用常规命名。

需要注意的是，const 声明不允许修改绑定，但允许修改值。也就是说，对于引用类型，引用是无法修改的，但所指向的内容是可以的。

```js
'use strict';
const person = {
    name: 'yuer'
};

person.name = 'xiaoke'; // 对

/*
person = {
    name: ‘xiaoke' // SyntaxError
}*/
```

我们可以这样来验证：

```js
'use strict';
const person = {
    name: 'yuer'
};
console.log(Object.getOwnPropertyDescriptor(person,'name'));
/*
{ value: 'yuer',
  writable: true,
  enumerable: true,
  configurable: true }
*/
```

### 全局作用域使用 let/const

全局作用域内使用 let/const 和 var 的一个区别是，var 创建的变量会成为全局对象(通常是浏览器，即 window 对象)的一个属性，也意味着会可能会无意中覆盖已经存在的全局变量。

如果使用 let/const，不会自动添加为全局对象的属性。

### 可以更新的写法

#### if/while/for/for...of/for...in 循环

使用 let 代替 var，这没什么好说的。

#### 保护现场

在循环中使用函数，经常我们会采用 IIFE 来保护现场。

```js
for (var i = 0; i< 10; ++i){
    setTimeout((function (value) {
        return function () {
            console.log(value);
        }
    })(i),100);
}
```

有了 let/const，就不需要这么折腾了。

```js
for (let i = 0; i< 10; ++i){
    setTimeout(function () {
        console.log(i);
    },100);
}
```

#### for...in/for...of 中 const 的异常表现

const 一般不会用在 for 循环中，比如：

```js
for (const i = 0; i< 10; ++i){
    //do something
}
```

i 被声明为常量，在 for 循环中会面临修改。因此会抛出错误。

但在 for...in 和 for...of 中使用不会产生错误：

```js
var obj = {
    name: 'yuer',
    age:22
};
for (const key in obj){
    console.log(key);
}
```

这是因为 for...in/for...of 中，每次迭代不会试图修改已有绑定，而是创建一个新绑定。但是如果你试图修改 key 的值，则会抛出错误：

```js
var obj = {
    name: 'yuer',
    age:22
};
for (const key in obj){
    key = Math.random().toString(); //TypeError
    console.log(key);
}
```

当然了，const 的安全性更强，所以社区的一个做法日益普及：**默认使用 const，只有确实需要改变变量的情况下使用 let**。

---

## 函数的性能优化

ES6 对函数进行了大量改进。

### 携带默认参数的函数

以前的写法中，通常使用 `||` 运算符来提供参数默认值。

```js
function foo(url, timeout, method){
    timeout = timeout || 2000;
    //do something
}
```

有一个弊端就是，如果我们给 `timeout` 传入 `0`，`timeout` 也会采用默认值 `2000`。我们可以通过下面的方法来解决：

```js
function foo(url, timeout, method){
    timeout = (typeof timeout !== "undefined") ? timeout || 2000;
    //do something
}
```

ES6 对这一操作进行了改进。

#### 默认参数值

```js
function foo(url, timeout = 2000, method = function () {return 'xiaoke'}){
    console.log(url, timeout,method());
}
foo();                                      //(1) undefined 2000 'xiaoke'
foo('http://xiaokedada.com');               //(2) http://xiaokedada.com 2000 xiaoke
foo('http://xiaokedada.com', 400);          //(3) http://xiaokedada.com 400 xiaoke
foo('http://xiaokedada.com', undefined,function bar(){return 'yuer'});  //(4) http://xiaokedada.com 2000 yuer
foo('http://xiaokedada.com', null,function bar(){return 'yuer'});       //(5) http://xiaokedada.com null yuer
```

总结一下：

+ 使用 `=` 给参数添加默认值
+ 需要给参数主动传入 `undefined`，才会使用默认值(示例4)。`null` 是个合法值(示例5)。

#### 默认参数表达式

```js
function getValue(x) {
    return x + 5;
}
function foo(first, second = getValue(first)){
    console.log(first + second);
}
foo (1);    //7
foo(1,1);   //2
```

上式表示，第二个参数不传入，会默认使用表达式计算出的值作为 second 的默认参数值。

但如果下面这样呢？ first 依赖 second 取得默认值的情况下，给 first 传递 `undefined`。

```js
function getValue(x) {
    return x + 5;
}
function foo(first = getValue(second), second){
    console.log(first + second);
}
foo(undefined,1);   //ReferenceError
```

这涉及到暂时性死区 (TDZ) 的问题，上述的调用可以想象成：

```js
let first = getValue(second);   //访问 TDZ 中的变量，错误
let second = 1;
```

> 函数参数有自己的作用域和暂时性死区，其与函数体的作用域是各自独立的，也就是说参数的默认值不可访问函数体内声明的变量。

#### arguments 的怪异之处

非严格模式下：

```js
function mix(first, second) {
    console.log(first === arguments[0]);    //true
    console.log(second === arguments[1]);   //true
    first = 'c';
    second = 'd';
    console.log(first === arguments[0]);    //true
    console.log(second === arguments[1]);   //true
}
mix('a','b');
```

在这种情况下，函数参数的变化会同步更新到 arguments 对象中。**在严格模式中，取消了这种怪异方式**。

```js
'use strict';
function mix(first, second) {
    console.log(first === arguments[0]);    //true
    console.log(second === arguments[1]);   //true
    first = 'c';
    second = 'd';
    console.log(first === arguments[0]);    //false
    console.log(second === arguments[1]);   //false
}
mix('a','b');
```

ES6 函数默认参数值的行为与 ES5 严格模式 arguments 保持一致。

```js
function mix(first = 'c', second='d') {
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mix('a','b');   //2 true true
mix('a');       //1 true false
mix();          //0 false false
mix(undefined,'b'); //2 false true
```

以第二个为例，和下面的代码是一致的。

```js
function mix(first, second) {
    second = 'd';
    console.log(arguments.length);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}
mix('a');
```

### rest 参数

```js
function foo(first,...keys){
    for(let item of keys){
        console.log(item);
    }
}
foo('a','b','c','d');   //b c d
```

用法很简单：**rest 参数 keys 包含了 first 之后传入的所有参数**。引入 rest 参数的设计初衷是替代 arguments。即这样：

```js
function foo(...keys){
    //do something
}
```

rest 参数的限制是：

```js
function foo(first,...keys,last){
    //do something
}
```

这种写法会抛出错误，也是不被允许的。

---

### name 属性

name 属性主要是由于匿名表达式地大量使用，调试难度增加，从而为所有函数提供 name 属性。

```js
function foo(){}
var bar = function(){};
var yuer = function xiaoke(){};

var person = {
    get firstName(){
        return "yuer";
    },
    sayName: function(){}
};

console.log(foo.name);  // "foo"
console.log(bar.name);  // "bar"
console.log(yuer.name); // "xiaoke"
console.log(person.sayName.name);   // "sayName"
console.log(bar.bind().name);   // "bound bar"
console.log((new Function()).name); // "anonymous"
```


---

## Spread 运算符

`...` 运算符作用于数组操作，将数组元素分离成为单独的元素。

> 在函数调用时，我们也用到这个 `...` 来表示 rest 参数

```js
console.log(...[1,2,3]);    //1 2 3
```

### 用来替换 apply

比如，下面这个例子求数组元素的最大值：

```js
let values = [3,5,10,34,-1];
console.log(Math.max.apply(Math, values));  //34
```

这是因为 `Math.max(arg1,arg2,arg3,...)` 只能处理分离的数字，我们可以巧妙地使用 `...` 操作符。

```js
let values = [3,5,10,34,-1];
console.log(Math.max(...values));   //34
```

将 `...` 运算符和数组的结合视为一般参数的话，能更多地扩展它的功能。比如：

```js
let values = [3,5,10,34,-1];
console.log(Math.max(...values,50));    //50
```

再举个例子：

```js
let values = [3,5,10];
function foo(x,y,z) {
    return x+y+z;
}
//console.log(foo.apply(null, values));
console.log(foo(...values));    // 终于可以不用该死的 null
```

### 将类数组转换为数组

以前，我们通常使用 `Array.prototype.slice.call()` 将 NodeList 和 arguments (类数组) 转化为数组。现在我们有一个更简单的方法。

```js
function foo(x,y,z) {
    console.log(Array.isArray(arguments]);  //false
    console.log(Array.isArray([...arguments])); //true
}
foo(1,2,3);
```

### 合并和复制数组

```js
//example 01
let arr1 = [3,5,10];
let arr2 = [];
arr2.push(...arr1);   //[3,5,10]

//example 02
let arr1 = ['two', 'three'];
let arr2 = ['one', ...arr1, 'four', 'five'];    //["one", "two", "three", "four", "five"]

//example 03
let arr1 = [1,2,3];
let arr2 = [...arr1];
arr2.push(4);
console.log(arr1);  //[1,2,3]
console.log(arr2);  //[1,2,3,4]

//example 04
let arr1 = [1,2,3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1);  //[1,2,3,4]
console.log(arr2);  //[1,2,3,4]
```

尝试比较例子 3 和例子 4，分别是深度拷贝和浅拷贝。

### 解构