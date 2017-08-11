---
layout: post
title: "Node异步编程"
date: 2017-06-07 09:26:15 +0800 
categories: 研究生涯
tag: Node
---
* content
{:toc}

在讲解异步编程的时候，有必要先提到`Event Loop`(事件轮询)的概念。首先是运行时的一些概念。

+ 函数调用形成了一个`Stack`(栈)

```js
function foo(){
    ...
}
function bar(){
    foo();
    ...
}
bar();
```

代码的最后一行调用`bar()`时，会在栈内创建第一个*帧*(帧的概念就是想表达一个意思)，包含了`bar`的参数和局部变量。当`bar`调用`foo`时，第二帧被创建，并压到`bar`创建的帧上。`foo`返回时，`foo`创建的帧就被弹出。直到所有函数返回，栈空。。

<!-- more -->

![event-model]({{ '/styles/images/node/event-model.svg' | prepend: site.baseurl }})

+ 对象被分配在`Heap`(堆)中

对象，也就是我们的引用类型。

+ `JavaScript`运行时包含了一个待处理的消息队列。

每个消息都是一个函数想关联。一旦我们的栈为空，就会从消息队列中取出一个消息进行处理。这个处理过程包含了调用于这个消息相关联的函数(同时，这个函数也会创建一个对应的堆或栈)。

所谓的异步编程，就是我们并不将函数处理完成，而是当回调函数产生结果时，再将其加入消息队列。所谓事件轮询，就是我们如何处理*消息队列*的这个过程。

> 参考： [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

比如我们调用`setTimeout()`函数，我们会在一个时间段过后向队列中添加一个消息(也就是将回调函数放进消息队列中)。如果消息队列中没有其他消息，消息就会被马上处理。但是，如果有其他消息，就必须要等其他消息处理完。所以说，`setTimeout()`的时间并不是确切时间。

再举个例子，当浏览器进行`I/O`操作时，因为这个`I/O`是异步的，所以该操作会在事件轮询的外面执行(?具体是哪里呢)，当这个`I/O`操作完成时，就会发出一个事件(消息)，进入消息队列，会有一个函数(也就是回调)处理它。

> 第二个例子参考：`Node.js in Action`第一章的1.2节。

接下来，我们重点讨论`Node`中的异步编程技术，其一是**回调**，其二是**事件监听器**。

## 回调 -- Callback

回调通常用来定义*一次性*响应的逻辑。以`I/O`读写为例：

```js
var fs = require('fs');
fs.readFile('./xxx.txt', function(err,data){
    if (err){
        ...
    } else {
        ...
    }
});
```

`function(err, data){}`就是一个回调函数，定义如何处理其中的内容。`fs`对`xxx.txt`文件的处理就是处于事件轮询之外(执行的主程序之外)的，处理结束后返回`error`或者数据。

> `Node`的大多数内置模块子啊使用回调时都会带有两个参数，第一个用来存放可能会发生的错误，第二个存放结果。

---

## 事件发生器 -- EventEmitter

事件发射器会触发事件，并且在那些事件被触发时能处理它们。事件是通过监听器进行处理的。监听器是跟事件相关的，事件出现时就会被触发的回调函数。

> 一些重要的`Node API`组件，比如`HTTP`服务器、`TCP`服务器和流，都被做成了事件发射器。

### on 方法响应事件

`Node`中的`TCP socket`就可以使用`on`方法**添加监听器**响应`data`事件。只要`socket`有新数据过来，就会触发`data`事件。

```js
socket.on ('data',function(data){
    ...
});
```

`data`是一个事件，紧随之后的回调函数就是一个监听器。

### 自定EventEmitter

```js
//EventEmitter被定义在Node的events模块中，所以直接使用EventEmitter类需要先引入模块
var events = require('events');
var channel = new events.EventEmitter();
channel.on('join',function(){
    ...
});
```

这里使用了`on`方法(也可以使用较长的`addListener`)给事件发射器添加了监听器。事件命名可以是任意字符串，除了一个特殊的`error`。

但是，上面的`join`事件的回调函数永远都不会调用，因为你还没有发射任何事件。所以，你在你需要的地方，用`emit()`函数发射这个事件。

```js
channel.emit('join');
```

---

## 用匿名函数保留全局变量的值

```js
function asyncFunction (callback){
    setTimeout (callback, 200);
}
var color = 'blue';
asyncFunction (function(){
    console.log (color);    //'green'
});
color = 'green';
```

如果我们想输出`blue`，该怎么做呢？使用闭包。

```js
function asyncFunction (callback){
    setTimeout (callback, 200);
}
var color = 'blue';

(function(color){
    asyncFunction (function(){
        console.log (color);    //'blue'
    })
})(color);

color = 'green';
```

---

## 异步逻辑的顺序化

其一是串行化流程控制，一个是并行化流程控制。建议使用比较流行的工具，比如`Nimble`。