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