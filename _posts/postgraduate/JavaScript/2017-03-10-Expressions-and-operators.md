---
layout: post
title: "JavaScript的表达式和运算符"
date: 2017-03-10 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}



常见的表达式和运算符都已经了解了，所以主要是一些不同的以及需要注意的点。

<!-- more -->

## Destructuring -- 解构

对于更复杂的赋值, 这个解构赋值[`destructuring assignment`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)语法是一个能从数组或对象对应的数组结构或对象字面量里提取数据的`Javascript`表达式。

```javascript
var foo = ["one", "two", "three"];

// 不使用解构
var one   = foo[0];
var two   = foo[1];
var three = foo[2];

// 使用解构
var [one, two, three] = foo;
```

---

## 求模与求余运算

### 求余运算符`%` -- Remainder

`JavaScript`中的`%`就是求余运算，返回求余结果。

即：`result = number1 % number2`

返回的符号由`number1`的符号确定，返回值的大小在`0`和`number2`的绝对值之间。

```javascript
-19 / -2  // output: -1
19 / 6.7    //output: 5.6
```

`JavaScript`中的`/`是普通的除法运算。

```javascript
5 / 3   //output: 1.6666666666666667
-5 /-3  //outpuy: 1.6666666666666667
```

### 求模运算

`JavaScript`中的求模运算可以采用以下方法实现：

```javascript
Number.prototype.mod = function (n){
    return ((this % n) + n) % n;
};
console.log((-13).mod(64));  // 51
```

### 总结

对于整型数`a`，`b`来说，取模运算或者求余运算的方法都是：

+ 求整数商： `c = a/b`
+ 计算模或者余数： `r = a - c*b`.

**求模运算和求余运算在第一步不同**: 取余运算在取`c`的值时，向`0`方向舍入；而取模运算在计算`c`的值时，向负无穷方向舍入。

举例： 计算`-7 Mod 4`, 那么`a = -7; b = 4`

+ 第一步：求整数商`c`，进行**求模运算** `c = -2`(向负无穷方向舍入)，进行**求余运算** `c = -1`(向`0`方向舍入)
+ 第二步：由公式`r = a - c*b`，由于`c`值不一样，求模时`r = 1`，求余时`r = -3`

因此，当`a`和`b`符号一致时，求模运算和求余运算所得的`c`的值一致，因此结果一致。当**符号不一致时，结果不一样**。求模运算结果的符号和`b`一致，求余运算结果的符号和`a`一致。

> 不同语言对`%`的含义是不同的，`Python`是**取模**，`C/C++`是**取余**，`JavaScript`是**取余**

### 若只想要要得到整数商呢？

`JavaScript`有一个全局对象[`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)可以帮助我们解决这个问题。

语法是：

```javascript
parseInt (string, radix)
```

> 内置对象`Number`的方法`parseInt()`和这个结果是一致的。

```javascript
parseInt(7 /2); // 3
```

`JavaScript`的内置[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)还提供一些其他的方法：

+ `Math.ceil(x)`: 返回向上取整
+ `Math.round(x)`: 返回四舍五入后的整数
+ `Math.floor(x)`: 返回向下取整

---

## Exponentiation operator -- 指数运算符

`JavaScript`还提供指数运算符`**`。

```javascript
2 ** 3  // 8
```

---

## Conditional operator --  条件运算符

语法如下：

```javascript
condition ? val1 : val2
```

If condition is `true`, the operator has the value of `val1`. Otherwise it has the value of `val2`.

## Unary operators -- 一元操作符

### delete

The `delete` operator deletes an object, an object's property, or an element at a specified index in an array.(删除一个对象，或一个对象的属性，或一个数组中的元素或键值) The syntax is:

```javascript
delete objectName;
delete objectName.property;
delete objectName[index];
delete property;
```

> The fourth form is legal only within a `with` statement, to delete a property from an object.

你能使用`delete`删除各种各样的隐式声明(implicity declared)， 但是被`var`声明的除外。

如果`delete`操作成功, 属性或者元素会变成`undefined`. 如果`delete`可行会返回`true`，如果不成功返回`false`.

```javascript
x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)
```

#### Deleting array elements -- 删除数组元素

删除数组中的元素时，**数组的长度是不变的**，例如`delete a[3], a[4]`，`a[4]` 和`a[3]`仍然存在，只是变成了`undefined`.

```javascript
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
delete trees[3];
if (3 in trees) {
  // this does not get executed（不会被执行）
}
```

如果想让数组中存在一个元素但是是`undefined`值，使用`undefined`关键字而不是`delete`操作.

```javascript
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
trees[3] = undefined;
if (3 in trees) {
  // this gets executed（会被执行）
}
```

### typedof

[`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)的语法形式如下：

```javascript
typeof operand
typeof (operand)
```

### void

```javascript
void (expression)
void expression
```

`void`运算符,表明一个运算没有返回值。

下面的代码创建了一个超链接，当用户单击它时，提交一个表单。

```javascript
<a href="javascript:void(document.form.submit())">
Click here to submit</a>
```

### Relational operators -- 关系操作符

#### in operator

如果指定的**属性**(property)在指定的对象(object)中会返回`true`,语法如下:

```javascript
propNameOrNumber in objectName
```

例子：

```javascript
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
"bay" in trees;    // returns false (you must specify the index number,
                   // not the value at that index)
"length" in trees; // returns true (length is an Array property)

// Predefined objects
"PI" in Math;          // returns true
var myString = new String("coral");
"length" in myString;  // returns true

// Custom objects
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar;  // returns true
"model" in mycar; // returns true
```

#### instanceof

`instanceof operator`, 如果对象是某种指定类型(object type)返回`true`。语法如下：

```javascript
objectName instanceof objectType
```

> 当你需要确认一个对象在运行时的类型时使用`instanceof`。例如, 抓取异常, 你可以根据抛出异常的类型分类处理异常代码。

```javascript
var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
  // statements to execute 执行
}
```

---

## Expressions -- 表达式

An expression is any valid unit of code that resolves to a value.

·JavaScript· has the following expression categories:

+ **Arithmetic**: evaluates to a number, for example 3.14159. (Generally uses arithmetic operators.)
+ **String**: evaluates to a character string, for example, "Fred" or "234". (Generally uses string operators.)
+ **Logical**: evaluates to true or false. (Often involves logical operators.)
+ **Primary expressions**: Basic keywords and general expressions in JavaScript.
+ **Left-hand-side expressions**: Left values are the destination of an assignment.

### Primary expressions

#### this

使用[`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this) keyword关键字来指代当前对象(current object)，通常，`this`指代的是方法中正在被调用的对象。用法如下

```javascript
this["propertyName"]
this.propertyName
```

### Left-hand-side expressions -- 左值表达式

Left values are the destination of an assignment.

#### new

你可以使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) operator 创建一个自定义类型或者是预置类型的对象实例。用法如下：

```javascript
var objectName = new objectType([param1, param2, ..., paramN]);
```

#### super

[`super`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)关键字可以用来调用一个对象父类的函数，它在用来调用一个类的父类的构造函数时非常有用。

```javascript
super([arguments]); // calls the parent constructor. super.functionOnParent([arguments]);
```

#### Spread operator

[`spread`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator) operator允许一个表达式在原地展开，当需要多个参数(比如函数调用时)或者多个值(比如字面量数组)。