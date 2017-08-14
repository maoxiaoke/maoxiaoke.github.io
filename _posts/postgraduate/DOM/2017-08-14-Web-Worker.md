---
layout: post
title: "Web Workers的前世今生"
date: 2017-08-14 19:00:00 +0800 
categories: 研究生涯
tag: DOM
---
* content
{:toc}

Web Worker 的引入是因为 JavaScript 的单线程问题，使大计算量的问题会造成页面阻塞。为此，HTML 5 制订了 Web Worker 标准，通过创建**工作线程**来进行计算。

Web Workers 一般说来分为三类：

+ Dedicated workers: 专用 workers，Dedicated workers 只能被创建它的 JavaScript 所调用。它们是专门为某个特定的页面服务的，不能在页面中共享。
+ Shared workers: 共享 workers，Shared worker 可以多个浏览器上下文中调用，所有这些浏览器上下文必须同源(相同的协议，主机和端口号)。
+ Service workers

<!-- more -->

## Dedicated workers

### worker 特性检测

为了处理向下兼容，这样是有必要的。

```js
if (window.Worker){
    //do something
}
```

### 使用 worker

实例化 Worker 对象，并传入要执行的 JavaScript 文件名。

```js
var worker = new Worker("worker.js");
```

### 专用 worker 消息的接收和发送

Worker 是通过 message 和 error 事件与页面通信的。通过 postMessage() 传递数据，该数据保存在 event.data 中。

> 也就是说，postMessage() 可以进行父子数据传递，message 和 error 事件都可以在父子之间发生。

```html
<!DOCTYPE html>
<html>
<body>

<p>Count numbers: <output id="result"></output></p>
<button onclick="startWorker()">Start Worker</button>
<button onclick="stopWorker()">Stop Worker</button>

<script>
var worker;
function startWorker()
{
if(window.Worker){
  if(typeof(worker)=="undefined"){
    worker = new Worker("worker.js");}
  worker.onmessage = function (event) {
    document.getElementById("result").innerHTML=event.data;
  };
}
else{
  document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";}
}
function stopWorker(){
  worker.terminate();
}
</script>
</body>
</html>
```

下面是 worker.js 的代码。

```js
var i=0;
function timedCount(){
  i=i+1;
  postMessage(i);
  setTimeout("timedCount()",500);
}
timedCount();
```

其中，消息内容是任何能够被序列化的值。

### 终止 worker

从主线程中立即终止一个运行中的 worker，可以调用 worker 的 terminate 方法。

```js
worker.terminate();
```

在 worker 线程内部，workers 有可以通过自己的 close() 方法进行关闭。

```js
self.close();
```

> self 指向 worker 本身。

### 引入 subworker

worker 的全局作用域提供一个 `importScripts()`，该方法接受一个或多个 JavaScript 文件，每个加载过程都是异步的，但执行顺序会按照先后执行。

```js
importScripts('foo.js','bar.js');
```

值得注意的是，这些脚本是在 worker 的全局作用域中运行。

### worker 的全局作用域

Web worker 所执行的代码和当前页面的代码不共享作用域。所以，Web worker 的代码不能访问 DOM，也无法通过任何的方式影响页面的外观。

Web worker 中的全局对象就是 `workder` 本身。

---

## Shared workers

Shared worker 有自己的全局作用域 SharedWorkerGlobalScope。

### 生成一个 Shared worker

```js
var sharedWorker = new SharedWorker('sharedWorker.js');
```

和 Dedicated worker 一个非常大的区别，**与 shared worker通信必须通过 port 对象**。传递消息前，端口必须被显式打开，打开方式是使用 onmessage 事件处理函数或者 start() 方法。start() 方法的调用只在一种情况下需要，那就是消息事件被 addEventListener() 方法使用。

如果使用 start() 方法打开端口连接时，如果父级线程和 worker 线程需要双向通信，那么它们都需要调用 start() 方法。

```js
sharedWorker.port.start(); // 父级线程中的调用

port.start(); // worker 线程中的调用
```

### 共享 worker 中消息的接收和发送

postMessage() 方法必须被端口对象调用。其他都和 Dedicated worker 一致。

### 例子

比如我们有两个页面 `index.html` 和 `index2.html` 分别是计算普通乘法和平方的页面。

```html
<!--index.html 计算普通乘法-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Shared Woker</title>
  </head>
  <body>
    <div class="controls" tabindex="0">
      <form class="" action="index.html" method="post">
        <div class="">
          <label for="number1">乘数1：</label>
          <input type="text" name="" value="0" id="number1">
        </div>
        <div class="">
          <label for="number2">乘数2：</label>
          <input type="text" name="" value="0" id="number2">
        </div>
      </form>
      <p class="result1">结果是：0</p>
      <p>
        <a href="./index2.html" target="_blank">Go to another page</a>
      </p>
    </div>
    <script type="text/javascript" src="./multiply.js"></script>
  </body>
</html>
```

```html
<!--index2.html 计算平方-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Shared Woker</title>
  </head>
  <body>
    <div class="controls" tabindex="1">
      <form class="" action="index.html" method="post">
        <label for="number3">数字3：</label>
        <input type="text" name="" value="0" id="number3">
      </form>
      <div class="result2">Result: 0</div>
    </div>
    <script type="text/javascript" src="./square.js"></script>
  </body>
</html>
```

`multiply.js` 如下:

```js
var first = document.querySelector('#number1');
var second = document.querySelector('#number2');

var result1 = document.querySelector('.result1');

if (!!window.SharedWorker) {
  var myWorker = new SharedWorker("./worker.js");

  first.onchange = function (){
    myWorker.port.postMessage([first.value, second.value]);
  };
  second.onchange = function (){
    myWorker.port.postMessage([first.value, second.value]);
  };
  myWorker.port.onmessage = function(e){
    result1.textContent = e.data;
  };
}
```

`square.js` 如下:

```js
var squreNumber = document.querySelector('#number3');
var result2 = document.querySelector('.result2');

if (!!window.SharedWorker){
  var myWorker = new SharedWorker("./worker.js");

  squreNumber.onchange = function(){
    myWorker.port.postMessage([squreNumber.value,squreNumber.value]);
  };
  myWorker.port.onmessage = function(e) {
    result2.textContent = e.data;
  };
}
```

这两个页面，共享同一个 worker，代码如下:

```js
onconnect = function(e) {
  var port = e.ports[0];

  port.onmessage = function(e){
    var workResult = "Result: " + (e.data[0] * e.data[1]);
    port.postMessage(workResult);
  };
}
```

参考: [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Shared_workers)

---

## Service workers

虽然 Service worker 定义为 web worker，但已经不是一个普通的 worker 了。前者如 Dedicated worker 和 Shared worker 主要是进行**并行计算**，解决**耗时的 JS 执行影响 UI 响应**的问题。而 Service worker 主要是为了解决 Web app 的用户体验不如 Native app 的普遍问题而提供的一系列的技术的集合。

> Service worker 有点像 Shared worker，但是 Service worker 控制多个页面，而不是页面控制 Shared worker。 -- 《Service Worker - first draft published》

> Service worker 充当 Web app、浏览器和网络代理服务器的角色。基于网络是否可用的情况下，提供良好的离线体验、拦截网络请求和采取合适的行为。 -- MDN

有关 Service worker 可参考的内容:

+ [Service Worker - first draft published](https://jakearchibald.com/2014/service-worker-first-draft/)
+ [Service Workers Nightly](https://w3c.github.io/ServiceWorker/)
+ [深入了解 Service Worker，看这篇就够了](https://zhuanlan.zhihu.com/p/27264234)
+ [Service Worker API](https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API)
+ [The ServiceWorker: The network layer is yours to own](https://www.youtube.com/watch?v=4uQMl7mFB6g&feature=youtu.be)