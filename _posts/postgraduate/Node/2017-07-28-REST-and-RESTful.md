---
layout: post
title: "REST和RESTful和Node"
date: 2017-07-29 09:26:15 +0800 
categories: 研究生涯
tag: Node
---
* content
{:toc}

> REST is a set of architectural constraints that aid you when developing an API over HTTP. -- Nicolas Bevacqua <<JavaScript Application Design-A build first approach>>

REST: Resource Representational State Transfer。采用正译，叫*资源表征状态转移*。挨个理解:

+ Resource : 资源，也就是data(数据)。需要说明的是，资源的表征方式不是一个具体的物理文件，而是特定的格式类型。在HTTP中，由`content-type`描述。每一份资源都有特定的URL来标识。
+ Representational: 指的就是资源的表征形式。比如，json、xml、jpeg等等
+ State Transfer: 状态转移，即通过HTTP谓词来实现资源的状态变化。参考阮一峰的文章，他说。HTTP是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"。而这种手段，就是HTTP谓词。这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

有人总结了下面这句话来描述REST：

> URL定位资源，使用HTTP谓词来描述操作。

<!-- more -->

## REST的几个Principles

### 任何东西都是资源

关于这个，意会就可以。同时也说，这种任何东西(这种东西本身是一种资源)的表征形式不是物理文件，而是特定的格式类型。

> 换句更难懂的化是说，资源是一切信息的抽象。

### 每个资源都有特定的标识符(URL)

也就是说，我们的各种资源都可以被URLs访问得到。而URLs最好也是human-readeable。

### 使用标准的HTTP谓词

| 谓词|操作|响应状态码|
| :---: | :---: | :---: |
|PUT|创建或更新资源|"201 CREATED" 如果资源创建; "200 OK" 表示更新成功; "500 Internal Serval Error" 其他错误|
|GET|请求一个已存在的资源|"200 OK" 如果资源存在; "404 Not Found" 资源不存在;"500 Internal Serval Error" 其他错误|
|POST|更新一个已存在的资源|"200 OK" 资源成功更新; "404 Not Found" 待更新的资源未找到;"500 Internal Serval Error" 其他错误|
|DELETE|删除一个资源|"200 OK" 成功删除; "404 Not Found" 待删除的资源未找到;"500 Internal Serval Error" 其他错误|

所以，这是一种CRUD(Create、Read、Update和Delete)应用。

### 资源可以有多种表征形式

举个例子，当我们post一份资源，如果服务器支持XML，也支持JSON。则这样也可以:

```
POST /data/balance HTTP/1.1
Content-Type: application/json
Host: www.mydatastore.com

{
    ...
}
```

### 无状态通信

HTTP是无状态的: 再同一个链接中，两个成功执行的请求之间是没有关系的。REST的无状态，意味着请求中要有足够的信息，让后端知道你想做什么，而且服务器不能使用存储在自身中的任何上下文。**也就是说，响应只能由请求决定**。

---

## REST架构风格约束

根据参考2，风格约束主要有6个:

+ 客户-服务器（Client-Server） 通信只能由客户端单方面发起，表现为请求-响应的形式。
+ 无状态（Stateless） 通信的会话状态（Session State）应该全部由客户端负责维护。
+ 缓存（Cache） 响应内容可以在通信链的某处被缓存，以改善网络效率。
+ 统一接口（Uniform Interface） 通信链的组件之间通过统一的接口相互通信，以提高交互的可见性。
+ 分层系统（Layered System） 通过限制组件的行为（即，每个组件只能“看到”与其交互的紧邻层），将架构分解为若干等级的层。
+ 按需代码（Code-On-Demand，可选） 支持通过下载并执行一些代码（例如Java Applet、Flash或JavaScript），对客户端的功能进行扩展。

---

## RESTful API

简而言之，符合REST架构的API就是RESTful API。更直观的理解，就是对URL进行规范，写符合RESTful格式的URL。

RESTful API的目的呢，就是通过一套统一的接口，为web、ios和android提供服务。

而RESTful API的设计有一些best practice:

+ 最好为所有的API断点指定一个前缀，比如`xiaokedada.com/api`
+ URI使用名词而不是动词，且推荐使用复数
+ 全部小写，推荐使用连字符
+ 使用正确的HTTP方法
+ 保证HEAD和GET方法是安全的，不会对资源状态造成污染
+ 资源的地址推荐使用嵌套结构
+ 使用正确的HTTP Status Code表示访问状态
+ 关于API的版本，一种观点建议在HTTP首部中设定；另一种观点建议在URL中设定，比如`xiaodedada.com/api/v1/...`


参考1: [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
参考2: [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style/)
参考3: [What exactly is RESTful programming?](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)
参考4: [What Is REST?](http://www.restapitutorial.com/lessons/whatisrest.html)
参考5: <<JavaScript Application Design-A build first approach>>