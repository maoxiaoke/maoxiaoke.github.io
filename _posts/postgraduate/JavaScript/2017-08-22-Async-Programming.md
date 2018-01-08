---
layout: post
title: "JavaScript 异步编程"
date: 2017-08-23 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

异步编程是 JavaScript 中一个非常重要的概念。异步的核心是**现在**和**稍后**。也就是说我们的一个 JavaScript 程序，仅有其中的一个代码块会在 *现在* 执行，而其他的会 *稍后* 执行。

最常见的异步编程就是回调函数了。

<!-- more -->

```js
//ajax() 是某个包中任意的 Ajax 函数
ajax ('http://xiaokedada.com',function callbackFunction(data){
    //应答代码
});
```

在异步调用 ajax 的过程中，`callbackFunction()` 不会马上执行，而是 稍后 执行。

最开始，我们要理解一些概念之类的东西。

## 一个概念

### Event Loop

就拿上面这个 ajax 的回调函数来讲，当有数据需要返回时，就会将这个回调函数插入 Event Loop 来安排它的执行。Event Loop 类似于下面的代码:

```js
//Event Loop 表现得像一个队列

var eventLoop = [];
var event;

//不断轮询
while(true){
    // 执行一个 tick
    if (eventLoop.length > 0){
        event = eventLoop.shift(); //shift() 模拟队列，取得下一个事件
    }
    // 执行下一个事件
    try (){
        event();
    }
    catch (err){
        reportErr(err);
    }
}
```

### 并行

异步和并行是两个不同的概念。并行表示事情可以同时发生，最常见的就是 *线程* 和 *进程*。进程和线程独立地、可能同时地执行。

### 运行至完成

因为 JavaScript 是单线程，所以一个函数(比如: `foo(){...}`) 内部的代码是 **原子性** 的，意味着 `foo()` 一旦执行，就必须全部执行，而不会被其他 *函数* 打断。

### 并发

并发是当两个或多个 *进程* 在同一时间段内同时执行。可以认为并发是 *进程* 级别的并行机制，而不是 *线程* 级别的并行机制。

### Job queue

Job queue 是 Event Loop 之上的一层新概念，可以认为:

> Job queue 是挂靠在事件轮询队列的每个 tick 末尾的队列。

有点像 `setTimeout(...,0)` 的黑科技，以一种更明确的方式告诉你: **稍后，但尽快**。

---

## 回调函数

异步编程就基本的形式，就是 事件模型。

```js
let button = document.getElementById("my-btn");
button.onclick = function(event) {
    //do something
};
```

按钮在被点击之后，`onclick` 内部的代码才会加入 EventLoop 进行执行。

在比如:

```js
setTimeout(function(){...}, 100);
console.log('i love yuer');
```

`setTimeout()` 中的回调函数并不会马上执行，而是会在 100ms 之后被加入到 Event Loop。

Node.js 诞生之后，回调模式就更广泛了。

```js
readFile ("my.txt", function(err,contents){
    if (err)
      throw err;
    console.log(contents)
});
console.log('i love yuer');
```

回调函数是万能的吗？并不是。

### callback hell

**回调地狱** 是回调函数面临的第一个问题。

```js
listen("click",function handler(evt){
    setTimeout(function request(){
        ajax('http://xiaodedada.com',function response(text){
            ...
        })
    })
})
```

### 信任问题

还是我们那个开头的 `ajax()` 函数。

```js
//A
ajax("http://xiaodedada.com", function(){
    //B
});
//C
```

`A` 和 `C` 是 现在 发生的，而且在我们的控制之下，但是 `B` 推迟到 稍后 发生，而且是在 `ajax()` 的控制之下。如果这个 `ajax()` 不是你写的，更一般的情况是，它是由第三方提供，这意味着 **控制权被转交给第三方**(控制反转)。你当然希望第三方是可靠的，但是你只是寄希望于自己所无法控制的事物身上而已。

### 拯救回调

#### 分离回调的设计

```js
function success(data) {
    //do something
}
function failure(err) {
    //handler error
}
ajax('http://xiaokedada.com', success, failure);
```

API 设计的时候通过分离回调，例如上面的例子，一个用于成功的通知，一个用于错误的通知。

> Promise 就是采用这种 分离回调 的设计。

#### 错误优先风格

这个 Node.js 惯常使用的一个回调风格。上面的这个例子就是这样的一个风格。

```js
readFile ("my.txt", function(err,contents){
    if (err)
      throw err;
    console.log(contents)
});
console.log('i love yuer');
```

但是，这两种方法都不能真正地拯救回调，并不能真正地解决信任危机。

---

## Promise

### 基本概念

Promises 是针对回调的 *控制反转* 提供解决方案。这意味着 *不是将程序交给第三方，而是希望它返回给我们一个可知道它何时完成的东西，让我们自己决定下一步做什么*。也就是，将 *控制反转* 再反转过来。

> Promise 是一个对象，用来传递异步操作的消息。代表了某个未来才会知道结果的事件。 《ES6 标准入门》

Promise 的对象的状态不受外部影响，也称为 promise 的生命周期。

+ `pending`: 挂起状态，一开始都处于这个状态。
+ `resolved`: 异步操作已完成
+ `rejected`: 异步操作失败

> pending 状态的 promise 被认为是 `unsettled`。一旦异步操作完成(不管是成功还是失败)，就被认为是 `settled`。

Promise 的状态一旦改变就不会再变。也就是说，promise 对象的改变只有两种方式: 从 pending 变成 resolved 和 从 pending 变成 rejected。只要二者之一发生，状态就凝固了，不会再变，任何时候访问都是这个结果。

> 这和 事件机制 完全不同，一旦错过，再去监听就得不到结果。

所以的 promise 都有一个 `then()` 方法来指定异步操作完成后的一些操作，接受两个参数，第一个参数是 promise 为 fulfilled 状态下调用的函数，第二个参数是 promise 为 rejected 状态下调用的函数。其中，第二个参数是可选的。

我们举个 promise 操作 AJAX 的例子来认识一下:

```js
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

> 例子来源 《ES6 标准入门》

这个例子中，promise 对象通过 Promise 构造函数构建。构造函数接收一个执行函数，该执行函数接收 resolve() 和 reject() 两个参数。resolve() 函数会在执行函数成功运行后表示该 promise 可用，而 reject() 函数代表该执行函数运行失败。然后调用 `then()` 方法，这个方法会在 promise 状态改变的时候进行 **异步调用**，返回一个新的 Promise 实例。

比如下面我写的这个例子:

```js
function foo(x) {
    return new Promise(function (resolve,reject) {
        if (x <= 0)
            reject(x);
        resolve(x);
    });
}
let promise = foo(1);

promise.then(function(){
    console.log('resolved');
},function () {
    console.log('error');
});
console.log('yuer');
/*
yuer
resolved
*/
```

由于 `then()` 是异步调用，所以会先输出 `yuer`，然后是成功的结果。

> 以这种方式实现 then() 方法的对象称为 thenable。所有的 promise 都是 thenable，但不是所有的 thenable 都是 promise。

```js
var thenable = {
    then: function(resolve,reject){
        resolve('yuer');
    }
};
let p = Promise.resolve(thenable);
p.then(function(value){
    console.log('I love ' + value);
});
```

`thenable` 根本不像 Promise，但会被认为是一个 thenable。通过调用 Promise.resolve() 将这个对象转化为 完成 状态的 promise。

### catch()

刚才我们讲过 `then()` 函数，而 `catch()` 主要是接受一个 rejected 作为回调，等同于 `then(null,rejected)`。这也就是说，它和 then() 一样，返回一个 Promise 对象。

```js
function foo(x) {
    return new Promise(function (resolve,reject) {
        if (x <= 0)
            reject(x);
        resolve(x);
    });
}
let promise = foo(1);

promise.catch(function () {
    console.log('rejected');
})

console.log('yuer');
/*
yuer
*/
```

### promise 链

刚才有说到，then() 和 catch() 都会返回一个 Promise 实例，就可以使用它们构建 promise 链。

```js
function foo(x) {
    return new Promise(function (resolve,reject) {
        if (x <= 0)
            reject(x);
        resolve(x);
    });
}
let promise = foo(1);

promise.then(function(){
    console.log('resolved');
},function () {
    console.log('error');
}).then(function () {
    console.log('another resolved');
});
console.log('yuer');
/*
yuer
resolved
another resolved
*/
```

### new Promise() 构造器

上面我们展示了 new Promise() 的用法，接收一个处理回调函数，这个函数是 **同步或者立即执行** 的。同时，这个函数还接收两个函数回调，`resolve()` 和 `reject()`。reject() 用于拒绝这个 promise，但 resolve() 可能完成 promise，也可能需要进一步决议这个 promise。

如果传给 `resolved()` 的是一个非 Promise、非 thenable 的立即值，这个 promise 就会这个值立即完成。如果是一个真正的 Promise 或 thenable 值，这个值会被递归展开，而且无论它最终解析结果/状态是什么，都会被 promise 采用。

### 创建 settled promise

通过 new Promise() 我们创建的是 unsettled 的 promise，也就是说创建完 promise 之后，它的状态是未定的。而创建 已定 的promise，我们是通过 `Promise.resolve()` 和 `Promise.reject()` 来创建。

+ Promise.resolve() 方法接收单个参数并返回一个 完成状态 的 promise。

```js
var promise = Promise.resolve('yuer');

promise.then(function (str) {
    console.log('I love '+ str);
});
/*
I love yuer
*/
```

如果传递的是 catch() 处理，则永远不会被调用，因为 promise 不存在 rejected 状态。

```js
var promise = Promise.resolve('yuer');

// 永远不会被调用
promise.catch(function (str) {
    console.log('I love '+ str);
});
```

### Promise.all([...]) 和 Promise.race([...])

有两个辅助函数 Promise.all([...]) 和 Promise.race([...])。对 Promise.all([...]) 来说，只要传入的所有 promises 都完成，返回 promise 才能完成。如果有任何 promise 被拒绝，返回的 promise 就会被拒绝。

```js
var p1 = Promise.resolve('xiaoke'); // 完成
var p2 = Promise.resolve('yuer'); // 完成
var p3 = Promise.reject('Oops'); // 拒绝

Promise.all([p1,p2,p3]).catch(function (err) {
    console.log(err);
}); // p3 拒绝，所以 Promise.all() 返回的 promise 被拒绝
Promise.all([p1,p2]).then(function (msgs) {
    console.log(msgs);
}); // p1, p2 都完成，返回的 promise 为完成
/*
Oops
[ 'xiaoke', 'yuer' ]
*/
```

Promise.race([...]) 也好理解，只有第一个决议的 promise 取胜(有可能是 完成，也有可能是 拒绝)。

```js
Promise.race([p2,p1,p3]).then(function (msg) {
    console.log(msg);
});
/*
yuer
*/
```

> 向 Promise.all([...]) 传入空数组会立即完成，但 Promise.race([...]) 会永远挂起，永远不会决议。

### Promise 不可撤销

一旦创建了 Promise 并且注册了一个 完成/拒绝 的回调函数，就没有什么可以从外部取停止这个过程。

---

## async 和 await

`async` 和 `await` 将 Generator 和 Promise 结合起来，以一种更为“优雅”的方式进行异步调用。

`async` 用在 `function` 关键字前面(并不一定非在 function 前面，对象的方法前面也是可以的)。表达一个意思：**函数总是返回的一个promise**。如果函数返回一个 `<non-promise>` 的代码，会被自动包装成一个 resolved promise。

```js
async function foo() {
    return 1
}
foo().then(console.log) // 1

//显式
async function foo() {
    return Promise.resolve(1)
}
```

`await` 只能用在 `async function` 内部，使代码停止运行直到 Promise 完成(解析成功或被拒绝)并返回一个结果。

```js
async function foo() {
    let promise = new Promise((resolve, reject) => setTimeout(() => resolve("done!"), 1000))
    let result = await promise // *
    console.log(result)
}
foo() // "done!"
```

代码运行到 * 处暂停，然后等待 Promise 完成。在等待期间，`await` 不占用 CPU 资源，CPU 可以处理其他事情。

`async` 和 `await` 的优雅之处是，以同步的方式书写异步代码。在之前的介绍中，Promise 可以解决回调函数 “回调地狱” 问题，但是同样带来了 “链式地狱” 的问题。

先写一个 Promise 的例子，使用 Github 的 API。

```js
fetch('https://api.github.com/users/maoxiaoke') //获取用户 maoxiaoke 的 github 信息
.then(response => response.json())
.then(githubUser => {
    let img = document.createElement('img')
    img.src = githubUser.avatar_url
    img.className = 'maoxiaoke'
    document.body.appendChild(img)
    setTimeout(() => document.body.removeChild(img), 3000)
})
```

现在用 `async` 和 `await` 改写。首先用 `async` 声明一个函数，然后在函数中使用 `await`。

```js
async function showAvatar() {
    let response = await fetch('https://api.github.com/users/maoxiaoke') 
    let githubUser = await response.json()

    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.appendChild(img)

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    document.body.removeChild(img)
}
showAvatar()
```

**处理异常情况**：Promise 使用 reject() 来处理拒绝的情况，`async` 和 `await` 采用 `try...catch...` 来处理。

```js
async function showAvatar() {
    try {
        let response = await fetch('...') //获取用户 maoxiaoke 的 github 信息
        let githubUser = await response.json()

        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.appendChild(img)

        await new Promise((resolve, reject) => setTimeout(resolve, 3000));

        document.body.removeChild(img)
    } catch (e) {
        alert(e)
    }
}
showAvatar()
```

也可以这样：

```js
async function showAvatar() {
    let response = await fetch('...') //获取用户 maoxiaoke 的 github 信息
    let githubUser = await response.json()

    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.appendChild(img)

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    document.body.removeChild(img)
}
showAvatar().catch(alert)
```

`await` 还支持 `thenable`。所有的 Promise 都是 thenable，但不是所有的 thenable 是 Promise。这样的一些 thenable 对象(一般包含可调用的 then 方法)如果支持可调用的 then 方法，就能使用 `await`。

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); 
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  let result = await new Thenable(1);
  alert(result);
}
f();
```