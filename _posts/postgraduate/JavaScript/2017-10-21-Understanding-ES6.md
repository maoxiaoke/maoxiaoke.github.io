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

### 解构中的不定参数

### 将 Set 集合转换为数组

---

## 箭头函数

箭头函数的特点：

+ 没有 this/super/arguments/new.target。都是由最外一层非箭头函数决定
+ 不能更改 this 的绑定 - 函数内部的 this 值不可以更改，这一点贯穿函数的整个周期。
+ 不能通过 `new` 关键字调用 - 没有`[[Construct]]`方法
+ 没有原型 - 不能通过 `new` 来关键字调用，因而也没有构建原型的需求，没有 `prototype` 属性
+ 不支持 `arguments` 对象，所以只能通过命名参数和不定参数来访问函数的参数

> 箭头函数内部当然能使用 `call()`、`apply()` 和 `bind()` 函数，但是对 `this` 毫无影响。

### 箭头函数的写法

```js
// 只有一个参数
let reflect = value => value;

//  多个参数
let sum = (num1, num2) => num1 + num2;

// 没有参数
let name = () => "yuer";

// 函数体包含多个语句
let sum = (num1, num2) => {
    return num1 + num2;
}

// 空函数
let doNothing = () => {}

//匿名函数的箭头函数
let person = ((name) => {
    return {
        getName: function() {
            return name;
        }
    }
})('yuer')
``` 

---

## 对象的扩展

### 对象字面量的扩展

**属性初始值的简写**- 有时候，对象的属性名和函数的参数相同，可以使用简写方式。比如：

```js
function createPerson(name, age) {
    return {
        name: name,
        age: age
    }
}

// 简写
function createPerson(name, age) {
    return {
        name,
        age
    }
}
```

**对象方法的简写**- es6 中可以消除冒号和 `function` 关键字。简写方式可以使用 `super` 关键字

```js
var person = {
    name: 'xiaoke',
    sayName: function() {
        // do something
    }
}

// 简写
var person = {
    name: 'xiaoke',
    sayName() {
        // do something
    }
}
```

**可计算属性**- es6 中属性可以通过计算得到，即使用一个方括号 `[]`

```js
let suffix = 'name'
let person = {
    ['first' + suffix] : 'yuer',
    ['last' + suffix] : 'mao'
}
```

### Object.prototype的新增方法

`Object.is()` - 用来解决 `===` 误判的情况

```js
console.log(+0 === -0) // true 实际上是两个完全不同的实体
console.log(Object.is(+0, -0)) // false

console.log(NaN === NaN) // false 实际上是完全一样的
console.log(Object.is(NaN, NaN)) // true
```

> NaN 还可以使用 `isNaN()` 来进行判断

`Object.assign()` - 混合(mixin)操作，即一个对象接收来自另一个对象的属性和方法

```js
var receiver = {}
Object.assign(receiver, {
    type: 'js',
    name: 'yuer'
}, {
    type: 'css'
})
console.log(receiver.type) // css 注意，同名属性，前者被覆盖
console.log(receiver.name) // yuer
```

`Object.assign` 进行的是**浅拷贝**，如果源对象的属性值是一个指向对象的引用，只拷贝引用值。

实际上，也不是一个一般的“浅拷贝”，只是一级属性的拷贝，而没有继续递归做下一层拷贝。因此，用来“深拷贝”对象是不可以的。

```js
let supplier = {
    sex: 'male',
    name: 'yuer',
    lover: {
        name: 'xiaoke',
        age: 22
    },
    favorite: ['junk food', 'meat']
}
let cloneReceiver = supplier
let DeepCloneReceiver = Object.assign({},supplier)

supplier.sex = 'female'
console.log(supplier.sex, cloneReceiver.sex, DeepCloneReceiver.sex,)

supplier.lover.age = 23
console.log(supplier.lover.age, cloneReceiver.lover.age, DeepCloneReceiver.lover.age)

supplier.favorite.push('yogurt')
console.log(supplier.favorite, cloneReceiver.favorite, DeepCloneReceiver.favorite)
/*
female female male
23 23 23
[ 'junk food', 'meat', 'yogurt' ] [ 'junk food', 'meat', 'yogurt' ] [ 'junk food', 'meat', 'yogurt' ]
*/
```

`Object.assign` 还有一个语义化功能是合并对象：

```js
let o1 = { a: 1 };
let o2 = { b: 2 };
let o3 = { c: 3 };
let obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }
```

### 允许重复的对象字面量属性

这一点，在之前的标准在严格模式下是不允许的，现在是可以了。


### 自有属性的枚举顺序

es5 未定义对象属性的枚举顺序，而由厂商自行决定。现在做了如下规定：

1. 所有数字键按升序
2. 所有字符串按照它们被加入对象的顺序
3. 所有 `symbol` 键按照它们被加入对象的顺序

这会影响到 `Object.getOwnPropertyName()` 和 `Refect.ownkeys` 返回属性的方式。

> `for...in` 的枚举顺序并未明确，而 `Object.keys()` 和 `JSON.stringfy()` 方法都依赖 `for...in` 的枚举顺序，因此也未明确。

### 方法的定义

在 es6 之前，没有**方法**这个标准的定义，社区对方法的定义是：一个具有功能而非数据的属性。

es6 正式将方法定义为一个函数，使用内部属性 `[[HomeObject]]` 来容纳这个方法从属的对象。

```js
let person = {
    //method
    getGreeting() {
        return "hello"
    }
};
//function
function shareGreeting() {
    return "hi!"
}
```

上面的代码中，`getGreeting()` 有内部属性 `[[HomeObject]]` 的值为 `person`，而 `shareGreeting()` 不是方法，没有这个内部属性。

这个内部属性关系到 `super` 的使用。

+ 首先，在 `[[HomeObject]]` 属性上调用 `Object.getPrototypeOf()` 来检索原型的引用
+ 然后，搜寻原型找到同名函数
+ 最后，设置 `this` 绑定并且调用相应的方法

---

## 增强对象原型
### 改变对象的原型

 es6 允许通过 `Object.setPrototypeOf()` 方法来改变指定对象的原型。

 > 对象原型的真实值存放在内部属性 [[Prototype]] 中，调用 `Object.getPrototypeOf()` 返回

 ### super 引用：简化原型访问

 `super` 引用指向对象原型。必须在简写方法的对象中使用 `super` 。

---

## 解构

what is Destructuring for...

编码过程中定义很多数组和对象，需要有组织地从中提取相关的信息片段 - 解构就是朝着这一目的出发，打破数据结构，将其拆分为更小部分的过程。

> 注意，解构都放在赋值语句的左侧，且需要提供初始化
### 对象解构

```js
let lover = {
    name: 'yuer',
    age: 18
}
let {name, age} = lover

//or 
let lover = {
    name: 'yuer',
    age: 18
},
    name = 'xiaoke',
    age = 20
({name, age} = lover)  //需要括号，这很好理解。

// 默认值
let lover = {
    name: 'yuer',
    age: 18
}
let {name, age, value = true } = lover
```

> 右侧如果是 null 或 undefined 就会抛出错误

#### 为非同名局部变量赋值

```js
let lover = {
    name: 'yuer',
    age: 18
}
let {name: localName, age: localAge} = lover;
console.log(localName) // 'yuer'
console.log(localAge) // 18
```

#### 嵌套对象解构

```js
let lover = {
    name: 'yuer',
    age: 18,
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
}

let {loc: {start}} = lover

// 还可以替换名称
let {loc: {start: localStart}} = lover
```

### 数组解构

```js
let colors = ['red', 'yellow', 'blue']
let [ , secondColor, thirdColor] = colors

//or
let colors = ['red', 'yellow', 'blue']，
    secondColor = 'black',
    third = 'purple'
[, secondColor, thirdColor] = colors //注意，不需要大括号
```

#### 交换

es6 中交换变量。

```js
let a = 1,
    b = 2
[a, b] = [b, a]
```

注意，左边是一个解构模式，右侧是一个临时创建的数组字面量。

默认值和嵌套数组解构 和 对象解构都差不多。

#### 不定参数和不定元素

数组解构中又一个不定元素的概念与函数参数中的不定参数的概念有点类似，都是使用 spread 运算符 (`...`) 来实现。

```js
let colors = ['red', 'green', 'blue']
let [firstColor, ...restColors] = colors
```

### 解构用在函数参数传递

当定义接受大量可选参数的时候，可采用解构。

```js
//一般，有一个问题，如果setCookie不提供第三个参数会报错，这是因为解构的右侧为 null 和 undefined 会报错
function setCookie(name, value, { secure, path, domain, expires}) {
    //...
}
setCookie('type', 'js', {
    secure: true,
    expires: 600000
})

//可以改成这样
function setCookie(name, value, { secure, path, domain, expires} = {}) {
    //...
}
```

解构参数含有默认值时的写法如何？

```js
const setCookieDefaults = {
    secure: false,
    path: "/",
    domain: "xiaokedada.com",
    expires: new Date(Data.now() + 360000000)
}
function setCookie (name, value,{
    secure = setCookieDefaults.secure,
    path = setCookieDefaults.path,
    domain = setCookieDefaults.domain,
    expires = setCookieDefaults.expires
} = setCookieDefauts) {
    //...
}
```

---

## Set 和 Map

What is Set and Map for...

Set 和 Map 的语义性非常强，Set 是一种**无序**元素的集合，检测某个元素是否存在； Map 是一种键值对集合，经常用来缓存经常取用的数据。

Set 的一些方法和属性：

+ new Set() - 创建 Set 集合
+ add() - 添加元素
+ size - 元素数量
+ delete() - 移除某个元素
+ clear() - 移除所有元素
+ forEach() - 遍历元素

就算 Set 有 `forEach()` 法可以操作集合中的每一个元素，但是不能通过索引进行访问。

可以转换成数组。采用的是 spread 扩展符

```js
let set = new Set([1, 2, 3, 3, 4, 6]) // 初始化
let array = [...set]
```

### WeakSet

What is WeakSet for...

针对 Set 中存储对象的情况，垃圾回收器机制不能释放改对象的内存空间，是一个**强引用**。

```js
let set = new Set()
let key = {}
set.add(key);
console.log(set.size) // 1

//移除原始引用
key = null
console.log(set.size) //1

//重新取回
key = [...set][0]
```

WeakSet 就是针对这个问题提出来的，支持三个方法：

+ add()
+ has()
+ delete()

和普通 Set 集合有几个不同点：

+ 向 `add()`、`has()` 和 `delete()` 三个方法传入非对象参数会报错
+ WeakSet 集合不可被迭代
+ 不支持 size 属性

Map 集合存储的是键值对集合。方法和属性：

+ set() - 传入键名和对应值
+ get()
+ has()
+ delete()
+ clear()
+ forEach()

初始化。

```js
let map = new map([['name', 'xiaoke'], ['title', 'love yuer']]) // 二维数组
```

Map 集合和传统对象的区别：

+ Map 键和值可以是任意类型，Object 只是字符串和 Symbol 类型
+ Object 和 Map 迭代方式不一致

### WeakMap

WeakMap 的引入和 WeakSet 类似，其键名必须是一个对象。WeakMap 集合目前最大的用途是保存 Web 页面中的 DOM 元素。

---

## 改进数组功能

### Array.of() 和 Array.from()

What is Array.of() for...

解决使用 `new Array()` 怪异之处。`Array.of()` 只包含括号内的元素。

```js
let items = new Array(2) // 包含两个元素的数组，2 赋值给 length
let items = new Array(1, 2) // 包含元素1 和 2的数组
let items = new Array('2') // 包含元素 '2' 的数组

//不怪异的 Array.of()
let items = Array.of(2) // 包含元素2 的数组
let items = Array.of(1, 2) //包含元素 1 和 2的数组
let items = Array.of('2') //包含元素 '2' 的数组
```

What is Array.from() for...

解决类数组转换为数组的问题。当然，这个方法也接受可迭代的对象

```js
// 传统的解决方法
Array.prototype.slice.call(arrayLike)

//语义清晰的方法
Array.from(arrayLike)
```

Array.from() 的第二个参数还能提供一个**映射函数**。

```js
function translate() {
    return Array.from(arguments, (value) => value + 1)
}
let numbers = translate(1, 2, 3) // 2, 3, 4
```

如果传入一个可迭代对象，Array.from() 可提供参数来指定 this 的值。

### 其他方法

#### find() 和 findIndex()

函数的语义： 在数组中根据某个条件查找匹配的元素

函数接受两个参数：一个回调函数和一个可选参数，指定回调函数的 this 的值

```js
let numbers = [25, 30, 35, 40, 45]

console.log(numbers.find( n => n > 33)) // 35
console.log(numbers.findIndex( n => n > 33)) //2
```

> indexOf() 和 lastIndexOf() 的语义：查找与某个值匹配的元素

#### fill()

填充一个或多个数组元素。接收三个参数：要填充的元素、起始索引和结束索引。后两者都是可选的，标记方式是前闭后开。

```js
let numbers = [1, 2, 3, 4]
numbers.fill(0, 1, 3) // 1, 0, 0, 4
```

#### copyWithin()

从数组中复制元素。接受两个参数：填充值的索引位置，复制值的索引位置

```js
let numbers = [1, 2, 3, 4]
numbers.copyWithin(2, 0) //1,2,1,2
```

### 定型数组

What is 定型数组 for...

定型数组是 WebGL 引入的，由于 JavaScript 中，数字是以 64 位浮点格式存储的，然后进行 `ToInt32` 操作，所以算术运算很慢，无法满足计算需求。

定型数组： 将任意数字转换为一个包含数字比特的数组。专门用来处理数值类型的。

---

## Class

### 类的声明

```js
class PersonClass {
    constructor(name) {
        this.name = name
    }
    sayName() {
        // do something
    }
}
let person = new PersonClass('yuer')
person.sayName()
```

特点。

+ 函数声明可以被提升。而类声明和 let 类似，存在暂时性死区的问题
+ 类声明中的语句强制运行在严格模式下
+ 类中的方法都是不可枚举的
+ 类中都有一个 `[[Construct]]` 的内部方法
+ 在类中修改类名会报错
+ 类也是一等公民

有意思的是，我们看一下如下代码：

```js
console.log(typeof PersonClass) // function
console.log(typeof PersonClass.prototype.sayName) // function
```

### 类的表达式

即字面量形式。

```js
let PersonClass = class {
    constructor(name) {
        this.name = name
    }
    sayName() {
        // do something
    }
}
let person = new PersonClass('yuer')
person.sayName()
```

还有一种类似 IIFE 的写法。

```js
let person = new class {
    constructor(name) {
        this.name = name
    }
    sayName() {
        // do something
    }
}('yuer')
person.sayName() 
```

### 其他特点

#### 访问器属性

```js
class PersonClass {
    constructor(name) {
        this.name = name
    }
    get name() {
        return this.name
    }
    set name(value) {
        this.name = value
    }
}
```

#### 可计算成员

```js
let methodName = 'sayName'
class PersonClass {
    constructor(name) {
        this.name = name
    }
    [methodName]() {
        // do something
    }
}
```

#### 定义生成器

```js
class MyClass {
    *createIterator() {
        yield 1
        yield 2
        yield 3
    }
 }
```

#### 静态成员

实例中不可访问静态成员，只能直接在类中访问静态成员。static 关键字可用于类中所有的方法和访问器属性。

```js
class PersonClass {
    constructor(name) {
        this.name = name
    }
    sayName() {
        // do something
    }
    static create(name) {
        return new PersonClass(name)
    }
}
let person = PersonClass.create('yuer')
```

### 继承和派生

`extends`关键字指定类继承的函数，`super()` 方法可访问基类的构造函数。

```js
class Rectangle {
    constructor(length, width) {
        this.length = length
        this.length = width
    }
    getArea() {
        return this.length * this.width
    }
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length)
    }
}

let square = new Square(3)
square.getArea()
```

`super()`：

+ 只能在派生类的构造函数中定义 `super()`
+ 在构造函数中访问 `this` 之前一定要调用 `super()`，它负责初始化 `this`
+ 不想调用 `super()`，唯一的方法是让类的构造函数返回一个对象

class 还能继承基于原型的方式。如下：

```js
function Rectangle(length, width) {
    this.length = length
    this.width = width
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width
}
class Square extends Rectangle {
    constructor(length) {
        super(length, length)
    }
}
```

Rectangle 具有 `[[Construct]]` 属性和原型，因此 Square 类可以直接继承它。

#### 内建对象的继承

```js
class MyArray extends Array {
    // 空
}
```

---

## Iterator and Generator

第一个问题，Iterator and Generator 是什么？
第二个问题，Iterator and Generator 解决了什么问题？即来自何方？
第三个问题，Iterator and Generator 未来如何？

暂时，我还没办法完整解答。

### 是什么？

Iterator 是一个特殊对象，专门为迭代设计的接口，都有一个 `next()` 方法，该方法返回一个包含两个属性的结果对象：

+ `value` - 下一个将要返回的值
+ `done` - 布尔类型值，没有更多可返回的数据时返回 true

Generator 是一种返回迭代器的函数。生成器和其他函数一样，只不过返回的是一个迭代器。关键字 `yield` 用来指定调用迭代器的 `next()` 方法时的返回值及返回顺序。

```js
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.toString()) // [object Generator]
iterator.next().value  //1
iterator.next().value  //2
iterator.next().value //3
```

关键是，每执行完一条 `yield` 语句之后函数会自动停止运行，直到再次调用 `next()` 方法。这样，就可以打断函数的顺序执行。

`yield` 的特点。

+ yield 只可在 Generator 内部，嵌套函数内部也会导致错误

```js
function *createIterator(items) {
    items.forEach(function(item) {
        yield item + 1 // 语法错误
    })
}
```

Generator 表达式形式。

```js
let createIterator = function *() {

}
//or
let createIterator = function *createIterator2() {

}
```

Generator 本质是函数，因此可添加到对象中作为方法。

```js
//es5
let o = {
    createIterator: function *() {
        //
    }
}
//es6
let o = {
    *createIterator() {

    }
}
```

### 可迭代对象

+ 可迭代对象具有 `Symbol.iterator` 属性
+ 所有的集合对象(数组、Set 集合及 Map集合)和字符串都是可迭代对象，这些对象有默认的迭代器。
+ Generator 默认为 Symbol.iterator 属性赋值，所有通过 Generator 创建的迭代器都是可迭代对象

可迭代对象的 `for...of` 循环

es6 对 for...of 循环进行了重新设计，每执行一次调用可迭代对象的 `next()` 方法，将返回结果的 `value` 属性存储在一个变量中，循环持续这一过程直到返回结果的 `done` 属性的值为 `true`。

```js
let values = [1, 2, 3]
for (let item of values) {
    //
}
```

`for...of` 循环通过调用 values 的 `Symbol.iterator` 方法来获取迭代器。

`for...of` 可用于不可迭代对象、null 和 undefined。

默认迭代器 `Symbol.iterator` 属性

```js
let values = [1, 2, 3]
let iterator = values[Symbol.iterator]()  // 迭代器
```

因此可以使用 `Symbol.iterator` 属性来检测**可迭代对象**

```js
function isIterable(obj) {
    return typeof object[Symbol.iterator] === 'function'
}
```

创建可迭代对象 `Symbol.iterator` 属性

```js
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}
collection.items.push(1)
collection.items.push(2)
for (let x of collection) {
    //
}
```

### 内建迭代器

es6 中为数组、Map 和 Set 三种集合内建了三种迭代器。

+ entries() - 返回一个迭代器，多个键值对
+ values() - 返回一个迭代器，集合的值
+ keys() - 返回一个迭代器，集合中所有的键名

当使用的 `for...of` 时，没有显示指定则使用默认迭代器。数组和 Set 集合默认的迭代器是 `values()` 方法，Map 的默认迭代器是 `entries()` 方法。

> 当直接使用 yield * 'hello' 代码，会直接使用字符串的默认迭代器。

### NodeList 迭代器

HTML 标准(不是 ECMAScript 6标准)也拥有默认迭代器，其默认迭代器和数组的默认迭代器一致。也就是说，NodeList 也支持 for...of 循环操作。

### spread 运算符的本质

spread 可以将 Set 集合转换成一个数组。

```js
let set = new Set([1, 2, 3, 4])
let arr = [...set]
```

在这里，spread 扩展符就是利用默认迭代器，读取 values 属性然后依次插入到数组中。

将这种想法往 Map 集合扩展。

```js
let map = new Map([['name', 'yuer'], ['sex', 'female']])
let arr = [...[...map]] //转换成一个二维数组
```

### 迭代器的高级功能

#### 给 next() 传递参数，使用 yield 来生成值

+ 给 next() 传递参数 - 结果：这个参数会替代 Generator 生成器内部 yield 的返回值 ---> 对异步编程至关重要

```js
function *createIterator() {
    let first = yield 1
    let second = yield first + 2
    yield second + 3
}
let iterator = createIterator()

iterator.next() // {value: 1, done: false}
iterator.next(4) // {value: 6, done: false}
iterator.next(5) // {value: 8, done: false}
iterator.next()
```

有一个例外是，第一次调用 next() 方法时，无论传入什么参数都会被丢弃。

这样的结果是为什么呢？调用第一个 `next()`，执行的操作是：`yield 1` (因为遇到 yield 关键字要暂停)。

调用第二个 `next(4)` 执行的是 `let first = ` 赋值操作，然后暂停到 `yield first + 2`。

调用第三个 `next(5)` 执行的是 `let second =` 赋值操作，然后结束在 `yield second + 3`。

#### Generator return 语句

```js
function *createIterator() {
    yield 1;
    return 42;
    yield 2;
}
let iterator = createIterator()
iterator.next() //{ value: 1, done: false }
iterator.next() //{ value: 42, done: true }
iterator.next() //{ value: undefined, done: true }
```

`return` 可以指定一个返回值，这个值会作为 `value` 属性返回。其后的代码将不会执行。

### 生成器委托

委托的概念和好理解。

```js
function *createNumberIterator() {
    yield 1
    yield 2
}
function *createColorIterator() {
    yield 'red'
    yield 'green'
}
function *createCombinedIterator() {
    yield *createNumberIterator
    yield *createColorIterator
}
let iterator = createCombinedIterator()
iterator.next() //{value: 1, done: false}
iterator.next() //{value: 2, done: false}
iterator.next() //{value: 'red', done: false}
iterator.next() //{value: 'green', done: false}
iterator.next() //{value: undefined, done: true}
```

### Generator 的异步操作


---

## 模块

es6 对模块进行了规范。

### 两个关键字

`export` - 向其他模块暴露接口

```js
//暴露变量
export let name = 'yuer'

//暴露函数
export function sum(acc, val) {
    return acc + val
}

//暴露 class
export class Rectangle() {
    //
}

//定义一个变量，然后随后暴露
function multiply(num1, num2) {
    return num1 * num2
}
export { multiply }
```

+ 无法暴露匿名函数

`import` - 导入模块接口

```js
import { identifier1, identifier2 } from './xxx.js'
```

+ 这和对象解构不是一码事
+ 尽量使用 `/`、`./`、`../`，保证跨浏览器和 Node.js 兼容性。 `/` - 根目录；`./` - 当前目录；'../' - 父级目录
+ 这种绑定类似于 const 定义变量，identifier1 和 identifier2 无法被重新定义，也不可被重新赋值
+ `import` 和 `export` 是静态的，**独立于语句和函数之外**
+ `import` 建立的是变量、函数、类等的**只读**绑定。
+ 只执行一次

```js
import { sum } from './example.js'
import { multiply } from './example.js'
```

'./example.js' 只执行一次。

导入所有。

```js
import * as example from './example.js'
```

### export 和 import 导入接口的重命名

`as` 关键字

```js
function sum(acc, val) {
    return acc + val
}
export { sum as add }
``` 

在另一个文件中，`import` 需要后一个：

```js
import { add } from './example.js/'
```

同样，`import` 也可使用 `as` 关键字。

```js
import { add as sum } from './example.js'
```

### export default

`default` 关键字用来 export 默认的接口。用法：

```js
// 1
export default function(acc, val) {
    return acc + val
}
// 2
function sum(acc, val) {
    return acc + val
}
export default sum
// 3
function sum(acc, val) {
    return acc + val
}
export { sum as default }
```

导入默认接口。

```js
import sum from './example.js'
```

> 注意没有大括号包裹，sum 是默认 export 接口的“引用”。

#### 导出默认绑定和导出一个或多个非默认绑定

```js
export let name = 'yuer'
export default function(acc, val) {
    return acc + val
}
```

`import` 的代码

```js
import sum, { color } from './example.js'
```

#### 再次 export

在一个模块中引入接口后，可以再次被 export。

```js
import { sum } from './example.js'
export { sum }
```

上面这两个语句可并成一句：

```js
export { sum } from './example.js'
```

### 没有 export 的接口导出

有一些方法，在全局范围内对对象做一些修改。比如，为内建对象 `Array` 增加一个 `pushAll()` 的方法。

```js
Array.prototype.pushAll = functio9(items) {
    if (!Array.isArray(items)) {
        throw new TypeError("Argument must be an array.")
    }
    return this.push(...items)
}
```

这是一个有效的模块。可以作为模块和脚本引入。

```js
import './example.js'

let  colors = ['red', 'green']
let items = []
items.pushAll(colors)
```

> 这种常见于创建 polyfills 或 shims

### 模块和脚本的区别

+ 模块自动运行在严格模式下，无法逃离
+ 在模块顶部创建的变量不会自动共享到全局，存在于模块的最高级作用域
+ 模块顶层的 `this` 值是 undefined
+ 不允许 HTML 格式的注释





