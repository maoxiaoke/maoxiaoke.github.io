---
layout: post
title: "Iterators and generators"
date: 2017-03-16 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


处理集合中的每个项是非常常见的操作。

<!-- more -->

## Iterators -- 迭代器

一个迭代器对象 ，知道如何每次访问集合中的一项， 并记录它的当前在序列中所在的位置。在`JavaScript`中迭代器是一个对象，它提供了一个`next()`方法，返回序列中的下一项。这个方法返回包含`done`和`value`两个属性的对象。

迭代器对象创建后，可以反复调用`next()`使用:

```javascript
function makeIterator(array){
    var nextIndex = 0;

    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}
```

一旦初始化,`next()`方法可以用来依次访问对象中的**键-值**：

```javascript
var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true
```

---

## Generators -- 生成器

While custom iterators are a useful tool, their creation requires careful programming due to the need to explicitly maintain their internal state. `Generators` provide a powerful alternative: they allow you to define an iterative algorithm by writing a single function which can maintain its own state. (虽然迭代器是个有用的工具，但是由于需要显示地维持他们的内部状态，所以必须仔细地构建。生成器提供了一个可替代的选择，它允许你编写一个可以保持自己状态的简单函数来定义一个迭代算法。)

A generator is a special type of function that works as a factory for iterators. A function becomes a generator if it contains one or more `yield` expressions and if it uses the `function*` syntax. (生成器是一种特殊类型的函数，也作为是迭代器的工厂。)

```javascript
function* idMaker() {
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// ...
```

---

## Iterables -- 可迭代

An object is *iterable* if it defines its iteration behavior. Some built-in types, such as `Array` or `Map`, have a default iteration behavior, while other types (such as `Object`) do not. (一个可迭代的对象需要定义可迭代行为)

In order to be iterable, an `object` must implement the `@@iterator` method, meaning that the `object` (or one of the objects up its prototype chain) must have a property with a `Symbol.iterator` key.

### User-defined iterables

We can make our own iterables like this:

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

for (let value of myIterable) {
    console.log(value);
}
// 1
// 2
// 3

or

[...myIterable]; // [1, 2, 3]
```

### Built-in iterables

`String`, `Array`, `TypedArray`, `Map` and `Set` are all built-in iterables, because the prototype objects of them all have a `Symbol.iterator` method.

### Syntaxes expecting iterables

Some statements and expressions are expecting iterables, for example the `for-of` loops, `spread operator`, `yield*`, and `destructuring assignment`(解构赋值).

```javascript
for (let value of ['a', 'b', 'c']) {
    console.log(value);
}
// "a"
// "b"
// "c"

[...'abc']; // ["a", "b", "c"]

function* gen() {
  yield* ['a', 'b', 'c'];
}

gen().next(); // { value: "a", done: false }

[a, b, c] = new Set(['a', 'b', 'c']);
a; // "a"
```

---

## Advanced generators

除了`next()`方法，`generator-iterator`对象也有一个`send()方法可以用来修改生成器的内部状态。传递一个值给`send()`将被视为最后一个`yield`表达式的结果（**生成器暂停**）。

这里是斐波那契生成器使用`send()`来重新启动序列：

```javascript
function* fibonacci(){
  var fn1 = 1;
  var fn2 = 1;
  while (1){
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    var reset = yield current;
    if (reset){
        fn1 = 1;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
print(sequence.next());     // 1
print(sequence.next());     // 1
print(sequence.next());     // 2
print(sequence.next());     // 3
print(sequence.next());     // 5
print(sequence.next());     // 8
print(sequence.next());     // 13
print(sequence.send(true)); // 1
print(sequence.next());     // 1
print(sequence.next());     // 2
print(sequence.next());     // 3
```

