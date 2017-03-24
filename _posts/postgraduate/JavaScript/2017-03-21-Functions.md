---
layout: post
title: "JavaScript中的函数"
date: 2017-03-21 19:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

在`JavaScript`中，函数其实就是对象。使函数不同于其他对象的*决定性*特点时**函数存在一个被称之为`[[Call]]`的内部属性**。内部属性无法通过代码访问，而是定义了代码执行时的行为。

> `ECMAScript`为对象定义了多种内部属性，这些内部属性都使用`[[]]`来标记。

`[[Call]]`属性是函数独有的，表明该对象可以被执行。

你可以像使用对象一样使用函数，可以将它们赋给变量，在对象中添加它们，将它们当成参数传递给别的函数，或从别的函数中返回。函数就是值。

A function is a `JavaScript` procedure - **a set of statements that performs a task or calculates a value**.

<!-- more -->

## Defining functions -- 函数定义

### Function declarations -- 函数声明

A **function definition** (also called a **function declaration**, or **function statement**) consists of the `function` keyword, followed by:

+ The name of the function
+ A list of arguments(参数) to the function, enclosed in parentheses(括号) and separated by commas(逗号)
+ The JavaScript statements that define the function, enclosed in curly brackets, `{ }`

> 注意：在`C++`语言中，函数声明和定义可是两码事哦，要记清楚哦。

参数以**值传递**的方式传递给被调函数(比如`a number`)，如果被调函数改变了这个参数的值，这样的改变不会影响到全局或调用函数。

但是，如果`object`作为参数传递(比如`Array`、`user-defined object`)，而函数改变了该对象的属性，则这种改变对外是可见的。

> 函数声明会被提升至上下文的顶部，这意味着你可以先使用函数后声明它们。

### Function expressions -- 函数表达式

Functions can also be created by a function expression.(函数同样可以由函数表达式创建) Such a function can be **anonymous**(匿名的); it does not have to have a name.

```javascript
var square = function(number) (return number * number;)
var x = square(4); // x gets the value 16
```

However, a name can be provided with a function expression and can be used inside the function to refer to itself, or in a debugger to identify the function in stack traces:

```javascript
var factorial = function fac(n) {return n < 2 ? 1 : n * fac(n-1);}
```

Function expressions are convenient when passing a function as an argument to another function.(当将一个函数作为一个参数传递给另一个函数，函数表达式就十分方便)

> 当一个函数是一个对象的属性时，称之为**方法**。

---

## Calling functions -- 调用函数

Functions must be in scope when they are called, but the function declaration can be hoisted (appear below the call in the code).(函数必须在被他们被调用的域当中，但是函数声明可以被提升--出现在调用代码的下方)

```javascript
console.log (square(5));
/* ... */
function square(n) {return n * n;}
```

> The scope of a function is the function in which it is declared, or the entire program if it is declared at the top level.

> 注意： 函数提升只对函数声明有效，对函数表达式是无效的。

```javascript
console.log(square); // square is hoisted with an initial value undefined.
console.log(square(5)); // TypeError: square is not a function
var square = function(n) {
  return n * n;
}
```

> **函数也是对象**，也有自己的**方法**。[具体参见](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

在函数调用过程中，时刻记住函数就是对象，很多行为就变得容易理解了。比如，你可以将函数当作参数传递给其他的函数：

```javascript
var numbers = [1,5,8,4,7,10,2,6];
numbers.sort(function(first, second){
  return first - second;
});
console.log(numbers); //"[1,2,4,5,6,7,8,10]"

numbers.sort(numbers);
console.log(numbers);//"[1,10,2,4,5,6,7,8]"
```

> 此处，被传递给`sort()`的比较函数其实是一个函数表达式，是一个匿名函数。若使用默认的比较函数，会将所有的值都转换成字符串进行比较。

### 参数

函数的另一个独特之处在于你可以给函数传递任意数量的参数却不造成错误。那是因为函数参数实际上被保存在一个称为`arguments`的*类似数组*(不是数组)的对象中，可以自由增长包含任意个数的值，这些值可通过数字索引来引用。`arguments`的`length`属性会告诉你目前有多少个值。

`arguments`对象自动存在于函数中，也就是说，函数的命名参数不过是为了方便，并不真正限制了该函数可接受参数的个数。

另一方面，`JavaScript`也没有忽视那么命名参数。函数期望的参数个数保存在函数的`length`属性中。因为函数也是对象，所以也具有属性，从而我们不必大惊小怪。

> 注意：一个是对象`arguments`的`length`属性，一个是函数`function`的`length`属性。

```javascript
function reflect(value){
  return value;
}
console.log(reflect("Hi!"));  //"Hi!"
console.log(reflect("Hi!", 25));  //"Hi!"
console.log(reflect.length);  //返回函数期望的参数个数："1"

reflect = function(){
  return arguments[0];
}
console.log(reflect("Hi!"));  //返回传入的第一个参数 "Hi!"
console.log(reflect("Hi!", 25));  //返回传入的第一个参数"Hi!"
console.log(reflect.length);  //返回函数期望的参数个数："0"
```

在某些场合，使用`arguments`比命名参数更有效。比如：你不知道会有多少个参数，所以你无法使用命名参数。

```javascript
function sum(){
  var result = 0,
  i = 0,
  len = arguments.length;

  while (i < len){
    result += arguments[i];
    ++i;
  }
  return result;
}
console.log(sum(1,3));  //4
console.log(sum(1,2,3));  //6
```

### JavaScript函数没有重载

大多数语言都支持重载，但上面也提到，`JavaScript`函数可以接受任意数量的参数且参数类型完全没有限制。这说明`JavaScript`函数其实根本没有签名(signature)，因此也不存在重载。

```javascript
function sayMessage(message){
  console.log(message);
}

function sayMessage(){
  console.log("Default message");
}

sayMesssage("Hello!");  //"Default message"
```

> 这说明，当试图定义多个同名函数时，只有最后定义的是有效的，之前的函数声明被完全删除。我们可以使用对象来帮助理解：

```javascript
var sayMessage = new Function("message", "console.log(message);");

sayMessage = new Function("console.log("Default message");");

sayMessage("Hello!");
```

但这并不是说`JavaScript`不能*模仿函数重载*。我们可以使用`arguments`对象获取所传入的参数个数(`arguments.length`)，然后决定如何处理。

---

## this对象

我们先看一个例子：

```javascript
var person = {
  name: "Nicholas",
  sayName: function(){
    console.log(person.name);
  }
}
```

我们之前提到，如果**属性值是函数**，则该属性就被称为**方法**。定义好以后，我们可以通过`person.sayName()`进行调用。

但是问题之处在于，`sayName()`方法直接引用了`persion.name`，在方法和对象间建立了*紧耦合*。

`JavaScript`所有的函数作用域内都有一个`this`对象代表**调用该函数的对象**。在全局作用域内，`this`代表全局对象(浏览器里的`window`)，当一个函数作为对象的方法被调用时，默认`this`的值等于那个对象。

```javascript
var person = {
  name: "Nicholas",
  sayName: function(){
    console.log(this.name);
  }
}
```


### 改变this

一般`this`会被自动设置，但是可以改变它的值来完成不同的目标。有三种方法：

#### call()方法

`call()`的第一个参数指定了函数执行时`this`的值，其后所有参数都是需要被传入函数的参数。

```javascript
function sayNameForAll(label){
  console.log(label + ":" + this.name);
}
var person1 = {
  name:"Nicholas"
};
var person2 = {
  name:"Greg"
};

var name = "Micael";

sayNameForAll.call(this, "global"); //"global:Micael"
sayNameForAll.call(person1, "person1"); //"person1:Nicholas"
sayNameForAll.call(person2, "person2"); //"preson2:Greg"
```

> 注意：调用函数时在函数名后没有小括号，**因为它被作为对象访问而不是被执行的代码**。

#### apply()方法

与`call()`类似，只不过第二个参数接受一个数组或者类似数组的对象。哈哈，没错，就是`arguments`对象。

```javascript
function sayNameForAll(label){
  console.log(label + ":" + this.name);
}
var person1 = {
  name:"Nicholas"
};
var person2 = {
  name:"Greg"
};

var name = "Micael";

sayNameForAll.call(this, ["global"]); //"global:Micael"
sayNameForAll.call(person1, ["person1"]); //"person1:Nicholas"
sayNameForAll.call(person2, ["person2"]); //"preson2:Greg"
``` 

> 如果你有一个数组，用`apply()`，如果你只有一个单独的变量，则用`call()`。

#### bind()方法

看例子。

```javascript
function sayNameForAll(label){
  console.log(label + ":" + this.name);
}
var person1 = {
  name:"Nicholas"
};
var person2 = {
  name:"Greg"
};

var sayNameForPerson1 = sayNameForAll.bind(person1);
sayNameForPerson1("person1"); //"person1:Nicholas"

var sayNameForPerson2 = sayNameForAll.bind(person2,"person2");
sayNameForPerson2(); //"person2:Greg"

person2.sayName = sayNameForPerson1;
person2.sayName ("person2");    //"person2:Nicholas"
```

> `sayNameForPerson1()`没有绑定参数，所以你需要传入`label`参数用于输出；`sayNameForPerson2()`不仅绑定`this`为`person2`，同时也绑定了第一个参数为`person2`，那么你调用`sayNameForPerson2()`就不需传入参数；例子最后将`sayNameForPerson1()`设置为`person2`的`sayName`方法，由于`this`的值已经绑定，所以输出仍然是`person.name`的值。

---

## Function scope -- 函数作用域

+ 定义在函数内部的变量不能被外部访问，因为这个变量仅仅在函数内有定义
+ 函数被定义为**全局**，所以可以访问所有的**全局变量**
+ 在另一个函数中定义的函数可以访问在其父函数中定义的所有变量和父函数有权访问的变量

---

## Scope and the function stack -- 作用域和函数堆栈

### Recursion -- 递归

函数可以指向和调用自身，有三种方法：

+ 使用函数名
+ `arguments.callee` -- 这个属性包含当前正在执行的函数，被`ES5`严格模式删除
+ 作用域内指向函数的变量名(指使用函数表达式的方式)

```javascript
var foo = function bar() {
   // statements go here
};
```

The following are all equivalent:

+ `bar()`
+ `arguments.callee()`
+ `foo()`

A function that calls itself is called a *recursive* function.

> 将递归算法转换成非递归是可能的，但逻辑更复杂，也会需要使用到**堆栈**。

### Nested functions and closures -- 嵌套函数和闭包

可以在一个函数里面嵌套另外一个函数。**嵌套（内部）函数**对其**容器（外部）函数**是私有的。它自身也形成了一个**闭包**(`closure`)。A closure is an expression (typically a function) that can have free variables together with an environment that binds those variables (that "closes" the expression).**一个闭包是一个可以自己拥有独立的环境与变量的的表达式(通常是函数)**。

既然**嵌套函数是一个闭包**，就意味着一个嵌套函数可以”继承“容器函数的参数和变量。换句话说，内部函数包含外部函数的作用域。

+ 内部函数只能在外部函数中访问
+ 内部函数形成一个闭包： 内部函数可以访问外部函数的参数和变量，反之则不行

```javascript
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5); // returns 8

result1 = outside(3)(5); // returns 8
```

> 因为形成闭包，所以你可以调用外部函数并未外部和内部函数指定参数

### Preservation of variables -- 保存变量

一个闭包必须保存它范围内的所有参数和变量。

### Multiply-nested functions -- 多层嵌套函数

Functions can be multiply-nested.

```javascript
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // logs 6 (1 + 2 + 3)
```

+ B形成了一个包含A的闭包，B可以访问A的参数和变量
+ C形成一个包含B的闭包
+ 所以，C可以访问A和B的任何参数和变量
+ 反之则不行

> 这种递归式成为**域链**(scope chaining)

### Name conflicts -- 命名冲突

When two arguments or variables in the scopes of a closure have the same name, there is a `name conflict`. More inner scopes take precedence, so the inner-most scope takes the highest precedence, while the outer-most scope takes the lowest(更近的作用域有更高的优先权，所以最近的优先权最高，最远的最低). This is the **scope chain**. The first on the chain is the inner-most scope, and the last is the outer-most scope(链的第一个元素是最里面的域，最后一个元素是最外层的域).

```javascript
function outside() {
  var x = 10;
  function inside(x) {
    return x;
  }
  return inside;
}
result = outside()(20); // returns 20 instead of 10
```

> 命名冲突发生在`return x`，此时`inside()`参数`x`与`outside()`的变量`x`发生了冲突。此时域链是`{inside,outside,global object}`，所以`inside()`的`x`有最高的优先权，所以返回的是传递给内部函数的`20`。


---

## Closures -- 闭包

闭包是JavaScript中最强大的特性之一。JavaScript允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。但是，外部函数却不能够访问定义在内部函数中的变量和函数。这给内部函数的变量提供了一定的安全性。而且，当内部函数生存周期大于外部函数时，由于内部函数可以访问外部函数的作用域，定义在外部函数的变量和函数的生存周期就会大于外部函数本身。**当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了**。

外部函数的参数和变量对内嵌函数来说是可取得的，而除了通过内嵌函数本身，没有其它任何方法可以取得内嵌的变量。内嵌函数的内嵌变量就像内嵌函数的保险柜。它们会为内嵌函数保留*稳定*而又安全的数据参与运行。

```javascript
var pet = function(name) {          //外部函数定义了一个变量"name"
  var getName = function() {
    //内部函数可以访问 外部函数定义的"name"
    return name;
  }
  //返回这个内部函数，从而将其暴露在外部函数作用域
  return getName;
};
myPet = pet("Vivie");

myPet();                            // 返回结果 "Vivie"
```

闭包中的神奇变量`this`是非常诡异的。使用它必须十分的小心，因为`this`指代什么完全取决于**函数在何处被调用**，而不是在何处被定义。

---

## Using the arguments object -- 使用arguments对象

函数的参数被保存为一个类似于数组的对象中。在函数内，可以使用如下方式找到传入的参数：

```javascript
arguments[i]
```

> `i`是序号编号，以`0`开始。参数的数量由`arguments.length`表示。

---

## Function parameter -- 函数参数

从`ECMAScript 6`开始，有两个新的类型参数：默认参数(default parameter)和剩余参数(rest parameter).

### default parameter

In JavaScript, parameters of functions default to `undefined`. 你也可以直接在函数头设置默认参数。

```javascript
function multiply(a, b = 1) {
  return a*b;
}

multiply(5); // 5
```

### rest parameter

剩余参数语法允许将不确定数量的参数表示为数组。

语法：

```javascript
function(a, b, ...theArgs) {
  // ...
}
```

---

## Arrow functions -- 箭头函数

An [arrow function expression](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) has a shorter syntax compared to function expressions and lexically binds the `this` value.(箭头函数表达式相比函数表达式具有较短的语法并以词法的方式绑定`this`)

箭头函数**总是匿名的**。

造成箭头函数引入的两个原因：

+ 更简洁的函数
+ `this`

### 更简洁的函数

```javascript
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium"
];

var a2 = a.map(function(s){ return s.length });
console.log(a2); // logs [ 8, 6, 7, 9 ]

var a3 = a.map( s => s.length );
console.log(a3); // logs [ 8, 6, 7, 9 ]
```

### this的词法

在箭头函数出现之前，每一个新函数都重新定义了自己的`this`值。(例如，构造函数的 `this` 指向了一个新的对象；严格模式下的函数的 `this` 值为 `undefined`；如果函数是作为对象的方法被调用的，则其 `this` 指向了那个调用它的对象)

```javascript
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this` 
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();
```

在`ECMAScript 3/5`里，通过把`this`的值赋值给一个变量可以修复这个问题。

```javascript
function Person() {
  var self = this; // Some choose `that` instead of `self`. 
                   // Choose one and be consistent.
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;
  }, 1000);
}
```

箭头功能捕捉闭包上下文的`this`值，所以下面的代码工作正常:

```javascript
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```

### 箭头函数的语法

基础语法：

```javascript
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
         // equivalent to:  => { return expression; }

// 如果只有一个参数，圆括号是可选的:
(singleParam) => { statements }
singleParam => { statements }

// 无参数的函数需要使用圆括号:
() => { statements }
```

高级语法：

```javascript
// 返回对象字面量时应当用圆括号将其包起来:
params => ({foo: bar})

// 支持 Rest parameters 和 default parameters:
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// 参数列表中的解构赋值也是被支持的
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```


## IIFE(Immediately Invoked Function Expression) -- 立即执行函数表达式

传统的方法，函数的定义和执行分开写。为了能够在函数定义之后立即执行，我们使用`IIFE`这种语法：

```javascript
var result = (function () {
    return 2 + 2;
}());

// or
var result = (function(){
  return 2 + 2;
})();
```

> 上面这两种写法都是可以的。

也可以为`IIFE`传递参数：

```javascript
(function(who, when) {
    console.log("I met " + who + " on " + when);
} ("Joe Black", new Date()));
```

参考：

+ [https://en.wikipedia.org/wiki/Immediately-invoked_function_expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
+ [http://benalman.com/news/2010/11/immediately-invoked-function-expression/](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

> [更多解析参见：](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)


编辑备注：

+ 2017-03-07第一次编辑
+ 2017-03-21第二次编辑