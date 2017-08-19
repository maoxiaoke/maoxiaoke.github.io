---
layout: post
title: "两栏和三栏布局详解"
date: 2017-07-16 09:00:00 +0800 
categories: 研究生涯
tag: CSS
---
* content
{:toc}

布局中的两栏和三栏布局还是面试当中常考的一个点。其一是如何有多种方案，其二如果还要考虑优先加载内容区域呢。

所以，这里总结的是这么四种情况，其中优先加载内容区域也是两栏、三栏布局中的一员。

<!-- more -->

## 普通两栏布局

这里说的普通布局是说，html 文档加载的时候，Left 在前，Right 在后。这里主要探讨 Left 定宽，Right 自适应的这种情况。

### float + margin

float 的目的是让元素脱离文档流，从而使得其他的元素可以占据本该它持有的空间。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>tworows</title>
    <style media="screen">
      .body-wrap {
        box-sizing: border-box;
      }
      .left{
        width: 200px;
        background: yellow;
        float: left;
      }
      .right {
        margin-left: 200px;
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="body-wrap">
      <div class="left">
        A
      </div>
      <div class="right">
        B
      </div>
    </div>

  </body>
</html>
```

### fixed/absolute + margin

fixed/absolute 的目的和 float 一样，为了让元素脱离文档流。

```css
body {
     margin: 0px;
     padding: 0px;
}
.left{
    position: fixed; /*position: absolute;*/
    width: 200px;
    background: yellow;
    }
.right {
    margin-left: 200px;
    background: red;
}
```

> `body{margin: 0px;padding: 0px}` 的目的是为了去掉浏览器保留的默认的空白

> 这种也适合后面所说的内容优先的两栏布局

### flex

弹性盒是最好的方法了。

```css
.body-wrap {
    display: flex;
}
.left{
    flex: 0 1 100px;
    background: yellow;
}
.right {
    flex: 1;
    background: red;
}
```

---

## 内容优先的两栏布局

这种情况可以想成一个博客的样子，我们希望内容区先加载，然后再加载边栏区，下面的例子，就是先加载 Main 然后是 Left。其实这种也是两栏布局一种方式。

### float

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>two rows</title>
    <style media="screen">
    .wrap {
        padding-left: 100px;
        box-sizing: border-box;
    }
    .main {
        width: 100%;
        background-color: red;
        float: left;
    }
    .left {
        float: left;
        width: 100px;
        margin-left: -100%;
        position: relative;
        right: 100px;
        background: yellow;
    }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="main">
        Main
      </div>
      <div class="left">
        Left
      </div>
    </div>
  </body>
</html>
```

> 这其实利用了三栏布局里圣杯布局的办法，利用 margin-left 为负值来解决。

### fixed/absolute + margin

```css
* {
    margin: 0px;
    padding: 0px;
}
.wrap {
    box-sizing: border-box;
}
.main {
    margin-left: 100px;
    width: 100%;
    background-color: red;
}
.left {
    width: 100px;
    position: fixed;
    top: 0px;
    background: yellow;
}
```

### flex 

flex 真的是非常方便，对于这种布局，跟普通的两栏是一致的，只要改变子容器的 order 顺序即可。

```css
.wrap {
    display: flex;
}
.left {
    order: -1;
    flex: 0 1 200px;
    background: yellow;
}
.main {
    background: red;
    flex: 1;
}
```

---

## 普通三栏布局

这里的三栏布局，我们指的是**左右两栏固定宽度，中间栏宽度自适应**。

### absolute/fixed + margin

和两栏布局中的一样，让左右边栏脱离文档流。

```html
<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
        <style media="screen">
        *{
          margin: 0;
          padding: 0;
        }
        body {
          box-sizing: border-box;
        }
        .left {
          position: absolute;
          width: 100px;
          top: 0px;
          left: 0px;
          background: red;
        }
        .right {
          position: absolute;
          width: 200px;
          top: 0px;
          right: 0px;
          background: yellow;
        }
        .center {
          margin-left: 100px;
          margin-right: 200px;
          background-color: grey;
        }
        </style>
      </head>
      <body>
        <div id="main">
          <div class="center">
            Center
          </div>
          <div class="left">
            Left
          </div>
          <div class="right">
            Right
          </div>
        </div>
      </body>
    </html>
```

> 这种方法也适用于我们所说的内容优先的三栏布局

## float + margin

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>layout3col</title>
    <style media="screen">
      * {
        margin: 0px;
        padding: 0px;
      }
      .main {
        box-sizing: border-box;
      }
      .left {
        width: 100px;
        float: left;
        background: red;
      }
      .center {
        margin-left: 100px;
        margin-right: 200px;
        background: grey;
      }
      .right {
        width: 200px;
        float: right;
        background: yellow;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="left">
        Left
      </div>
      <div class="right">
        Right
      </div>
      <div class="center">
        Center
      </div>
    </div>
  </body>
</html>
```

> 注意，这里 DOM 的渲染次序是 Left、Right 和 Center。

### flex 

这种很简单，不多说，可参考 内容优先的三栏布局 的 flex 实现。

### BFC

利用 BFC 区域，不会与浮动元素重叠来实现。两栏也可以这样。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>layout3col</title>
    <style media="screen">
      * {
        margin: 0px;
        padding: 0px;
      }
      .main {
        box-sizing: border-box;
      }
      .left {
        width: 100px;
        float: left;
        background: red;
      }
      .center {
        overflow: hidden; /*这里这里，看这里*/
        background: grey;
      }
      .right {
        width: 200px;
        float: right;
        background: yellow;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="left">
        Left
      </div>
      <div class="right">
        Right
      </div>
      <div class="center">
        Center
      </div>
    </div>
  </body>
</html>

```

---

## 内容优先的三栏布局

这种布局可以想象成左边导航栏、右边广告栏、中间内容区的网页。在这种网页中，为了体现用户优先，先加载内容。即 Center 在前，然后是 Left 和 Right。

### 圣杯布局

![圣杯布局](https://bitsofco.de/content/images/2016/03/Holy_Grail_CSS_Grid.gif)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Holy Grail Layout</title>
    <style media="screen">
      body {
        text-align: center;
        margin: 0;
        padding: 0;
        min-width: 400px;
      }
      .header, .footer {
        width: 100%;
        clear: both;
        height: 40px;
        background: yellow;
        line-height: 40px;
      }
      .body-wrap {
      padding-left: 100px;
      padding-right: 200px;
      box-sizing: border-box;
     }
      .center {
      width: 100%;
      float: left;
      background-color: #b3d1c1;
      }
      .left {
      float: left;
      width: 100px;
      margin-left: -100%;
      position: relative;
      right: 100px;
      background-color: #e57b85;
      }
      .right {
      float: left;
      width: 200px;
      margin-left: -200px;
      position: relative;
      left: 200px;
      background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="header">Header</div>
    <div class="body-wrap">
      <div class="center column">
        Center
      </div>
      <div class="left column">
        Left
      </div>
      <div class="right column">
        right column
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </body>
</html>
```

## 双飞翼布局

双飞翼布局是在 Center 内部加了一个 `<div class="inner">`，使得可以不使用相对定位。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Holy Grail Layout</title>
    <style media="screen">
      body {
        text-align: center;
        margin: 0;
        padding: 0;
        min-width: 400px;
      }
      .header, .footer {
        width: 100%;
        clear: both;
        height: 40px;
        background: yellow;
        line-height: 40px;
      }
      .body-wrap {
      box-sizing: border-box;
     }
      .center {
      width: 100%;
      float: left;
      background-color: #b3d1c1;
      }
      .center .inner {
        margin-left: 100px;
        margin-right: 200px;
      }
      .left {
      float: left;
      width: 100px;
      margin-left: -100%;
      background-color: #e57b85;
      }
      .right {
      float: left;
      width: 200px;
      margin-left: -200px;
      background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="header">Header</div>
    <div class="body-wrap">
      <div class="center column">
        <div class="inner">
          Center
        </div>
      </div>
      <div class="left column">
        Left
      </div>
      <div class="right column">
        right column
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </body>
</html>
```

## flex 布局

```css
body {
    text-align: center;
    margin: 0;
    padding: 0;
    min-width: 400px;
}
.header, .footer {
    width: 100%;
    clear: both;
    height: 40px;
    background: yellow;
    line-height: 40px;
}
.body-wrap {
    display: flex;
}
.center {
    order: 0;
    flex: 1;
    background:  orange;
}
.left {
    order: -1;
    flex: 0 0 100px;
    background: red;
}
.right {
    order: 1;
    flex: 0 0 12em;
    background:  green;
}
```