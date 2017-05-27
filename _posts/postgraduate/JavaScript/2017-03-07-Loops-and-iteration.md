---
layout: post
title: "JavaScript的循环和迭代"
date: 2017-03-07 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


Loops offer a quick and easy way to do something repeatedly.

<!-- more -->

## for statement

---

## do while

----

## while

----

## labeled statement

A `label` provides a statement with an identifier that lets you refer to it elsewhere in your program(引用到别的位置).

The syntax:

```javascript
label :
   statement
```

> For example, you can use a `label` to identify a loop, and then use the `break` or `continue` statements to indicate whether a program should interrupt the loop or continue its execution.

```javascript
markLoop:
while (theMark == true) {
   doSomething();
}
```

> The label `markloop` identifies a while loop.

----

## break statement

Use the `break` statement to **terminate** a loop, switch, or in conjunction with (链接到) a labeled statement.

The syntax：

```javascript
break;
break label;
```

> The first form of the syntax terminates the innermost(最内层) enclosing loop or switch; the second form of the syntax terminates the specified enclosing labeled statement.

---

## continue statement

The `continue` statement can be used to **restart** a `while`, `do-while`, `for`, or `label statement`.

The syntax：

```javascript
continue;
continue label;
```

### Example 

```javascript
checkiandj:
  while (i < 4) {
    console.log(i);
    i += 1;
    checkj:
      while (j > 4) {
        console.log(j);
        j -= 1;
        if ((j % 2) == 0) {
          continue checkj;
        }
        console.log(j + ' is odd.');
      }
      console.log('i = ' + i);
      console.log('j = ' + j);
  }
  ```

  > A statement labeled `checkiandj` contains a statement labeled `checkj`. If `continue` is encountered, the program terminates the current iteration of `checkj` and begins the next iteration.

  > If `continue` had a label of `checkiandj`, the program would continue at the top of the `checkiandj` statement.(如果`continue`只有一个`label`标记，就会从标记循环语句的上面的代码执行)

---

## for...in statement

The `for...in` statement iterates a specified variable over all the enumerable properties(可枚举的属性) of an object.

The syntax：

```javascript
for (variable in object){
    statement;
}
```

---

## for...of statement

The `for...of` statement creates a loop Iterating over iterable objects (including `Array`, `Map`, `Set`, arguments object and so on), invoking a custom iteration hook with statements to be executed for the value of each distinct property (对值的每一个独特的属性调用一个将被执行的自定义的和语句挂钩的迭代).

```javascript
for (variable of object){
    statement;
}
```

### The difference of for ... of and for ... in

```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs 3, 5, 7
}
}
```

> While `for...in` iterates over property names(属性名), `for...of iterates over property values(属性值).