---
layout: post
title: "Introduction and Grammer"
date: 2017-01-18 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

`JavaSCript`相关介绍和语法

<!-- more -->

## Introduction ##
### what is JavaScript ###

- Client-side JavaScript extended the core language by supplying objects to control a browser and its DOM.
- Server-side JavaScript extended the core language by supplying objects relevant to running JavaScript on a Server.


### [JavaScript and Java](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction) ###

### [JavaScript and the ECMAScript specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction) ###

## Grammer ##

>JavaScript is **case-sensitive** and uses the **Unicode** charact set.

- Instructions are called **statements** and are separated by a **semicolon**(`;`).
- Spaces, tabs and newline characters are called whitespace.

### Comments ###

> The syntax of comments is the same as in C++ and in many other languages.

```javascript
// a one line comment
/* this is a longer
multi-line comment
*/
```
### Declarations ###

> There are **three** kinds of declarations in JavaScript

- **var** : declares a variable, optionally initializing it to a value.
- **let**: declares a **block scope local variable**.
- **const**: declares a read-only named constant.

#### Declaring variables ####

> We can declare a variable in three ways.

- With the keyword `var`. `var x = 42;//declare both local and global variables`
- By simply assigning it a value. `x =42;//always declares a global variable and generates a strict JavaScript warning`
- With the keyword `let`.

#### Evaluating variables ####

A variable declared using the var or let statement with no initial value specified has the value `undefined`.

> warning: the `underfined` value behaves as `false` when used in a **boolean context**.
>  The `underfined` value converts to `NaN` when used in **numeric context**.

When you evaluate a `null` variable, the `null` value behaves as 0 in numeric contexts and as false in boolean contexts.

#### variable scope ####

- Declare a varibale outside of any function, it is called a *global* variable.
- Declare a variable within a function, it is called a *local* variable.

```javascript
`if (ture){ var x = 5;} console.log(x);`
```
> `x` is 5. This behavior changes, when using the `let` declaration introduced in ECMAScript 2015.

```javascript
`if (ture){ let y = 5;} console.log(y); `
```

> ReferenceError: y is not defined.

#### Variable hoisting(提升) ####

You can refer to a variable decalred later, without getting an exception. This concept is konwn as **hoisting**. Variable are hoisted will return a value of `undefined`.

```javascript
console.log(x === undefined); //true
var x = 3;
```
This examples will be interpreted the same as:

```javascript
var x;
console.log(x === undefined);
x = 3;
```
> In ECMAScript 2015, `let` and `const` **will not hoist** the variable to the top of the block.

#### Function hoisting ####

For funtions, only **function declaration** gets hoisted to the top and **not the function expression**.

```javascript
/*function declartion*/
foo();
function foo(){
console.log('bar');}

/*funtion expression*/
baz(); //TypeError: baz is not a function
var baz = function(){
console.log("baz");};
```
#### Global variables ####

Global variables are in fact properties of the *global object*. In web pages the global object is `window`, so you can set and access global variables using the `window.variable` syntax.

#### Constants ####
You can create a read-only, named constant with the `const` keyword.
