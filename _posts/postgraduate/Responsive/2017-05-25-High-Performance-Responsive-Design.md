---
layout: post
title: "High Performance Responsive Design"
date: 2017-05-25 09:00:00 +0800 
categories: 研究生涯
tags: 
 - Responsive
 - Performance
---
* content
{:toc}

最近读了`Tom Barker`的*High Performance Responsive Design*。对响应式设计有了更多的新理解，尤其是利弊和测试方面。

在很多响应式架构中，我们都只注意到响应式的优点：能同时兼顾移动端和PC端，方便了开发。但是很多网站在设计时，并不能秉承**移动优先**的策略，或者完全放弃该策略。你就会发现，对于使用响应式构建的网站，需要加载更多的资源。这也意味着，相对于单独进行移动端和PC端建站，响应式页面加载的时间更长。这是值得响应式开发者深思的问题。

<!-- more -->

## 显然不正确的模式

我们可以在[`The Search Agency`](https://www.thesearchagency.com/our-work/white-papers/)得到一些有关`.m`网站和响应式网站比较的一些报告。设计网站的时候，这样的一些*反模式*值得我们注意：

- 为所有设备加载同样的内容： 比如，一些网站会为手机和桌面渲染加载完全一样的资源。加载同样的`CSS`文件，然后通过媒体查询给不同的分辨率设备提供不同的体验
- 加载额外的资源：一般情况下，会为手机体验加载除了通用资源意外的资源
- 加载双倍图片：有些站点会为手机加载另一组图片，这真是个糟糕的注意

> 在[`Alexa`](http://www.alexa.com/)网站上，你可以查看各大网站排名。可惜，是收费服务。

---

## 浏览器和Web服务器的关系

页面是如何达到浏览器并展现给用户的。如下图所示

![浏览器和Web服务器的协商过程]({{ '/styles/images/responsive/web-and-br.png' | prepend: site.baseurl }})

无论是建立还是关闭`TCP`连接，都需要三次握手。

另外，我们还要理解一点，就是现代浏览器的架构。

![现代浏览器架构]({{ '/styles/images/responsive/br-architure.png' | prepend: site.baseurl }})

+ `UI`层： 浏览器自身的绘制界面，如地址栏，刷新等等
+ 网络层： 这一层处理网络连接，将内容下载，传递给渲染引擎
+ 渲染引擎： 负责将内容绘制到界面上，最流行的渲染引擎就是`Webkit`,当渲染引擎遇到`JavaScript`，就将其传递给`JavaScript`解释器
+ `JavaScript`引擎会解析并执行`JavaScript`。最流行的就是`Google`的`V8`了

---

## 追踪Web性能的工具

追踪`Web`性能的工具非**瀑布图**莫属了。

一个是，**Firebug**，现在已经集成到`Firefox`浏览器*Web开发者工具*中了。

另一个是`Chrome`的开发者工具。

还有另外一个提供免费服务的[`WebPageTest`](http://www.webpagetest.org/)，能提供在线的网站性能分析，相当不错。

对于移动端的性能工具，推荐`HTTPWatch`。有免费版提供，但缺失部分功能。付费版贵得吓人。

此外，在控制台(`chrome console`)键入`window.performance`，这个对象对外暴露了多个对象。

---

## Web运行时性能

前面`web`性能跟踪的是内容传递到用户的耗时。`web`运行时性能，跟踪的是用户与应用交互时应用的行为。

### 每秒帧数 -- fps

`fps`是系统重绘屏幕的速率。

按照某些人的说法(这张说法可能没有科学依据)，让人类感觉动作平滑、逼真的理想帧率是`60 FPS`。

`Google chrome`开发者工具`Rendering`有追踪`FPS`的能力。另外，就是`Timeline`工具，对帧率方面体验下降进行调试的最有用的工具。

### 内存分析

在`Chrome`已用的管理工具中，首先看的是`MemoryInfo`对象，它存在于`Performance`对象中。有三个属性：

+ `jsHeapSizeLimit` : 堆大小的上限
+ `usedJSHeapSize` : 堆中当前所有对象使用的内存总量
+ `totalJSHeapSize` : 堆的总大小，包括没有被对象使用的空闲空间

另外，就是`Timeline`工具的`Memory`模式。

---

## 服务端实现

[`Charles`](https://www.charlesproxy.com/)是一个可以观察到网络传输情况的工具，能深入分析网络传输。不过很可惜的是，它是收费的。

+ `HTTP`监测工具
+ `HTTP`代理工具

浏览器请求页面的架构如下图：

![服务端架构]({{ '/styles/images/responsive/ser.png' | prepend: site.baseurl }})

在我们的`HTTP`请求报文当中，有一个`User Agent`的选项，它描述了客户端的特征。所以，我们可以在**服务端来确定客户端的特征和能力**。

比如，我们可以对**设备进行检测**，从而以恰当的内容做出响应。`Wurfl`能提供这样的一个设备检测服务，现在隶属于[`Scientiamobile`公司](https://www.scientiamobile.com/)。

不过这个解决方案的一个潜在的风险就是如何处理缓存内容。一个解决方式就是使用响应`header`中的`Vary`参数。另一种方式就是通过使用`ESA`(Edge Side Include)，把我们的设备或者能力检测逻辑从我们的服务器移到`CDN edge`服务器上。

---

## 响应式前端实现

### 图片操作

无论是哪个网站，对页面负载影响最大的就是页面上的图片。如何避免这些问题产生。建议利用下面两个新型技术，但注意的是，可能不被所有浏览器接受，尤其是老式浏览器版本。

#### srcset属性

这个属性用在`<img>`标签中为加载响应式图片服务的。使用方式如下：

```html
<img src="1x.jpg" srcset="2x.jpg 2x">
```

`1x.jpg`是为了向后兼容，防止浏览器不支持`srcset`。如果设备像素比是`2`，那么我们设置的`srcset`属性和它指定的图片就会起作用。设备像素比是物理像素和设备独立像素之间的比例。控制台的`window.devicePixelRatio`会告诉你数值，比如大多数`iphone`设备就是`2`。

#### picture元素

`<picture>`是`HTML5`新增的一个元素。它是一个容器元素，可以基于不同的视口宽度像素密度指定不同的图片。`<source>`元素支持`media`属性。

```html
<picture>
  <source media="(min-width:640px, min-device-pixel-ratio:2)" src="hi-res_small.jpg">
  <source media="(min-width:2048px, min-device-pixel-ratio:2)" src="hi-res_large.jpg">
  <img src="1x.png>
</picture>
```

当然，你可以将`srcset`属性和`<picture>`一同使用。


### 延迟加载

我们在客户端使用一种策略，直到真正需要的时候才去加载相关内容。这就是*延迟加载*。典型的例子就是无限滚动。

---

## 持续集成(CI)

对软件工程来说，持续集成是一种很好的机制。它可以在新代码提交之后，检查各种软件指标和组织构建，从而有效遏制了问题代码的提交和部署。

![CI]({{ '/styles/images/responsive/ci.png' | prepend: site.baseurl }})

对`web`进行单元测试，`headless web browser`是一个极好的选择。其中最流行的测试库是[`PhantomJS`](http://phantomjs.org/)

另一个开源的`CI`工具是[`Jenkins`](https://jenkins.io/)，可以把相关逻辑集成到`CI`工作流中。

---

## 一些响应式框架

+ `Twitter Bootstrap`
+ `ZURB Foundation`
+ `Skeleton`
+ `Semantic UI`

---

## 增加一些响应式的相关知识

### 像素和像素密度的概念

`ppi`(Pixel Per Lnch)称为像素密度，指的是*每英寸容纳的像素个数*。举个例子，`iPhone 5`的像素为：1136px \* 640px，对角线长度为4英寸，则`ppi = Math.sqrt(1136*1136 + 640*640) / 4`计算得到。

### 放弃图片

有时候，我们可以选择放弃图片。使用`Data URI`，[http://duri.me](http://duri.me)提供一个在线的`Data URI`转换。但它也并非优秀的可选方案。

### 了解近年来流行的趋势

开发设计人员能了解这些年来所流行的趋势是十分必要的，当然我们也应当把创造流行元素作为己任。通常我们在`Google`中输入关键词`web design`、`trend`还有年份等词汇，就能查看很多讨论。这些论点不是真理，因人而异。