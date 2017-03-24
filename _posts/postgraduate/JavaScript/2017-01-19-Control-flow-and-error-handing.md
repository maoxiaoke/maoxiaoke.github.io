---
layout: post
title: "Control flow and error handling"
date: 2017-01-19 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

`JavaScript`的流程控制和差错控制。

<!-- more -->

## Control flow ##

> Any JavaScript expression is also a statement.

### Block statement ###

> The block is delimited by a pair of curly brackets.

```javascript
{
	statement_1;
	statement_2;
}
```

Block statements are commonly used with **control flow statement**(e.g. `if`, `for`, `while`).

> **Warning**: JavaScript prior to ECMAScript2015 does **not** have block scope. Variables introduced within a block are scoped to the containing function or script, and the effects of setting them persist beyond the block itself. In other words, block statements do not define a scope. Instead, the `let` variable declaration is block scoped.

### Conditional statements ###

A conditional statement is a set of commands that executes if a specified condition is true. JavaScript supports two conditional statements: `if...else` and `switch`.

#### Falsy values ####

The following values evaluate to false (also known as Falsy values):

- false
- undefined
- null
- 0
- NaN
- the empty string (`""`)

**All other values, including all objects, evaluate to true when passed to a conditional statement.**

#### boolean values and Boolean object ####

```javascript
var b = new Boolean(false);	// b is a Boolean object
if (b) // this condition evaluates to true
if (b == true) //this condition evaluates to false
```

## Error handling ##

We can **throw exceptions** using the `throw` statement and **handle them** using the `try...catch` statement.

### throw statement ###

You can throw any expression, not just expressions of a specific type.

```javascript
throw expression;
```

### try...catch statement ###

The `try...catch` statement consists of a `try` block, which contains **one or more statements**, and a `catch` block, cpntaining statement that **specify what to do if an exception is thrown in the try block**.

```javascript
	function getMonthName(mo) {
		mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
                "Aug","Sep","Oct","Nov","Dec"];
		if (months[mo]) {
			return months[mo];
		} else {
			throw "InvalidMonthNo"; //throw keyword is used here
		}
	}

	try { // statements to try
		monthName = getMonthName(myMonth); // function could throw exception
	}
	catch (e) {
		monthName = "unknown";
		logMyErrors(e); // pass exception object to error handler -> your own function
	}
```

> That is, you want the `try` block to succeed, and if does not succeed, you want control to pass to the catch block. If any statement within the `try` block(也包括在`try` block中调用的函数) throws an exception, control immediately shifts to the catch block. If no exceptions is thrown in the `try` block, the catch block is skipped.

#### The catch block ####

```javascript
	catch (catchId){
	statements
	}
```

> JavaScript creates this identifier when the catch block is entered; the identfier lasts only for the duration of the catch block; after the catch block finishes executing, the identifier is no longer available.

#### The finally blcok ####

The `finally` block contains statements to execute after the `try` and `catch` blocks execute but before the statements following the `try...catch` statement. The `finally` block executes whether or not an exception is thrown. If an exception is thrown, the statements in the `finally` block execute even if no catch block handles the exception.

> Note: you can use the finally block to make your script fail gracefully when an exception occurs.

```javascript
	openMyFile();
	try {
		writeMyFile(theData); //This may throw a error
	} catch(e) {  
		handleError(e); // If we got a error we handle it
	} finally {
		closeMyFile(); // always close the resource
	}
```

> If the finally block returns a value, this value becomes the return value of the entire try-catch-finally production, regardless of any return statements in the try and catch blocks.

```javascript
	function f() {
		try {
			console.log(0);
			throw "bogus";
		} catch(e) {
			console.log(1);
			return true; // this return statement is suspended
                 		// until finally block has completed
			console.log(2); // not reachable
		} finally {
			console.log(3);
			return false; // overwrites the previous "return"
			console.log(4); // not reachable
		}
		// "return false" is executed now  
		console.log(5); // not reachable
	}
	f(); // console 0, 1, 3; returns false
```

#### Nesting try...catch statements ####

You can nest one or more try...catch statements. 

### Utilizing Error objects ###

Depending on the type of error, you may be able to use the `name` and `message` properties to get a more refined message.


`name` provides the general class of Error, while `message` generally provides a more succinct message than one would get by converting the error object to a string.

## Promises ##

Starting with ECMAScript2015, JavaScript gains support for Promise objects allowing you to control the flow of deferred and asynchronous operations.

A Promise is in one of these states:

- `pending`: initial state, not fulfilled or rejected.
- `fulfilled`: successful operation
- `rejected`: failed operation.
- `settled`: the Promise is either fulfilled or rejected, but not pending.