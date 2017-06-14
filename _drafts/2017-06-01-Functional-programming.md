---
layout: post
title: "JavaScript函数式编程"
date: 2017-06-01 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


函数式编程(functional programming, FP)。

参考文档：

- [`JS`函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
- [Mostly adequate guide to FP in JavaScript](https://github.com/MostlyAdequate/mostly-adequate-guide)

## 相关概念

### 纯函数 -- Pure Functions

> 纯函数实际上就是等价于数学概念中的函数，`x -> y`的映射，对于相同的`x`值，只有唯一的一个输出，而且没有任何可观察的副作用。

举了例子，`Array.prototype.slice()`和`Array.prototype.splice()`有差不多的用法。但，`slice()`符合*纯*函数的定义。`splice()`会改变原始数组。


### 柯里化 -- Currying

`curry`的概念是：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

```js
function makeAdder(x) {
    return function(y){
        return x + y;
    };
}
var add5 = makeAdder(5);
var add10 = makeAdder(10);

add5(2); //7
add10(2); //12
```

这通常是作为*闭包*的一个优秀例子，调用`makeAdder`之后，返回的函数通过闭包的方式记住了第一个参数。这就是柯里化。它具有一种能力，通过传递一到两个参数调用函数，就能得到一个记住了这些参数的新函数。

### 代码组合 -- Compose

```js
var compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};
```

其中，`f`和`g`都是函数，`x`是它们之间通过“管道”传输的值。

用法如下：

```js
var toUpperCase = function(x) {
    return x.toUpperCase();
};
var exclaim = function(x) {
    return x + '!';
}
var shout = compose(exclaim, toUpperCase);
```

在`compose`的定义中，`g`将先于`f`执行，因此创建的是一个**从右到左**的数据流。这样做的可读性大大提高，可以避免嵌套一大堆的函数嵌套。就这个例子而言，传递的字符串会先被全部转换成大写字母，任何再在尾部追加一个惊叹号。

### pointfreee

`pointfree`模式指的是，永远不必说出你的数据。意思是说，函数无需提及将要操作的数据是什么样的。一等公民函数、柯里化以及组合协作起来非常有助于实现这种模式。

举个例子：

```js
//非 pointfree ，因为提到了数据: name
var initials = function (name) {
    return name.split(' ').map(compose(toUpperCase,head)).join('. ');
};

// pointfree
var initials = compose(join('. '), map(compose(toUpperCase,head)), split(' '));

initials("hunter stockton thompson"); // 'H. S. T'
```

通过*管道*(？)把数据在接受单个参数的函数间传递。利用`currying`，我们能够做到让每个函数都先接受数据，然后操作数据，最后再把数据传递到下一个函数那里去。比如在我们的`pointfree`版本中，不需要`name`就行进行操作。


### 声明式代码

于常见的命令式相比，声明式以为我们要写出*表达式*，而不是*一步一步*的指示。

```js
// 命令式
var makes = [];
for (i = 0; i < cars.length; i++){
    make.push(cars[i].make);
}

// 声明式
var makes = cars.map(function(car){
    return car.make;
});
```

我们可以尝试从`SQL`来解释，它只有一个指明我们想要从数据库取出什么数据的表达式。至于如何取数据则是由它自己决定的。以后数据库升级，`SQL`引擎优化也好，根本不需要更改查询语句。

### Hindley-Milner 类型签名

再`Hindley-Milner`系统中，函数都写成类似`a -> b`的样子，其中`a`和`b`是任意类型的变量。例子：

```js
// capitalize :: String -> String
var capitalize = function(s) {
    return toUpperCase(head(s)) + toLowerCase(tail(s));
};
```

上面这个函数`Capitalize`的类型签名可以理解为一个接受`String`返回`String`的函数。换句话说，它接受一个`String`类型作为输入，并返回一个`String`类型的输出。

所有说，类型签名的美妙之处在于： 能够一字一句地告诉我们函数做了什么事情。

再举些例子：

```js
//join :: String -> [String] -> String
var join = curry(function(what, xs){
    return xs.join(what);
});

// replace :: Regex -> String -> String -> String
var replace = curry(function(reg,sub,s){
    return s.replace(reg,sub);
});
```