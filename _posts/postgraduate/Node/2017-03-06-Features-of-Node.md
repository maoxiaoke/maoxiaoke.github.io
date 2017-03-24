---
layout: post
title: "Node的特点"
date: 2017-03-06 09:26:15 +0800 
categories: 研究生涯
tag: Node
---
* content
{:toc}


## 异步 I/O

在`Node`中，绝大多数的操作都是以异步的方式进行调用。 这样的意义在于：在`Node`中，我们可以从语言层面很自然地进行并行`I/O`操作。

每个调用之间无须等待之前的`I/O`调用结束，极大提高了效率。<!-- more -->

举例：

```javascript
var fs = require('fs');

fs.readFile('/path', function (err, file){
    console.log ('Well Done!')
});
console.log('Calling for file!');
```

> `"Well Done!"`是在`"Calling for file!"`之后输入的。

--------

## 事件与回调函数

无论在**前端**和**后端**，事件都是常用的。

```javascript
var http = require('http');
var querystring = require('querystring');

//侦听服务器的request事件
http.createServer(function(req, res){
    var postData = '';
    req.setEncoding('utf8');

    //侦听请求的data事件
    req.on('data', function (trunk){
        postData += trunk;
    });

    //侦听请求的end事件
    req.on('end', function(){
        res.end(postData);
    });
}).listen(8080);
console.log('服务器启动完成！')
```

> `Node`创建了一个`Web`服务器，并侦听`8080`端口。对于服务器，为其绑定了`request`事件，对于请求对象，我们为其绑定了`data`事件和`end`事件。

相应地，我们在前端为`Ajax`请求绑定了`success`事件，在发出请求后，只需关心请求成功时执行相应的业务逻辑即可。

```javascript
$.ajax({
    'url': '/url',
    'method': 'POST',
    'data': {},
    'success': function (data){
        // success事件
    } 
});
```

除了事件外，**回调函数**也无处不在。但是，回调函数也是最好的接收**异步调用**返回数据的方式。

## 单线程

在`Node`中，`javascript`与其余线程是无法共享任何状态的。

> 单线程的最好好处是不用像多线程那样要在意状态的**同步**问题，没有**死锁**的存在，也没有线程上下文交换所带来的性能上的**开销**。

**缺点**也是有的：

+ 无法利用多核`CPU`
+ 错误会引起整个应用的退出，健壮性问题
+ 大量计算占用`CPU`导致无法继续调用异步`I/O`

`Node`采用**子进程**来解决单线程中大计算量的问题： `chile_process`。

> 朴灵. 深入浅出Node.js[M]. 人民邮电出版社, 2013.