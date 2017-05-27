---
layout: post
title: "CSS解密"
date: 2017-05-13 09:00:00 +0800 
categories: 研究生涯
tag: CSS
---
* content
{:toc}

最近再看`<<CSS解密>>`，是由`W3C CSS`工作组专家，设计`CSS`语言得委员之一，`Lea Verou` -- 是一位漂亮、得体得女士，所写。主要讲述了`CSS3`新版本得一些特性，对网页得设计难题，有难得一见得解决方法。特将一些重点勾勒如下。

另外，所强调的一点是：[CSS tricks](https://css-tricks.com/)是一个相当棒的网站，提供了很多`CSS`的处理和难题解决方案。

<!-- more -->

## 有关文字的一些难题

### 难题一： 断字

指的是有些语言得单词很长，可以使用连字符`(&shy;)`从而将长单词分割。`CSS3`为这种方法引入了一个新属性：`hyphens`。接受`none`、`manual`、`auto`三个值。`none`会禁用这种效果，`manual`需要手工插入。

所以，通常情况下，只要这短短一行。

```css
hyphens: auto;
```

> 更多参见：[https://css-tricks.com/almanac/properties/h/hyphenate/](https://css-tricks.com/almanac/properties/h/hyphenate/)

可是，中文不需要断字符的呀。

### 难题二： 插入换行

比如我们写简历的时候，我们当然希望`姓名：`和自己的名字`Xiaoke Mao`放在一行了。但我们一般都是这样构建的。

```html
<dl>
  <dt>Name:</dt>
  <dd>xiaoke Mao</dd>
  <dt>Email:</dt>
  <dd>maoxiaoke@outlook.com</dd>
  <dd>thebigyellowbee@qq.com</dd>
  <dt>Location:</dt>
  <dd>NanKing</dd>
</dl>
```

不过，`<dt>`和`<dd>`都是块级元素。所以所有的名和值都会占据一行。我们可以用`display: inline`将它们变成行内元素。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/Lzp3b33s/3/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

看上面的`css`代码，我们解决问题的思路是怎样的呢？

1. 我们引入了一个`Unicode`字符来代表换行符，在`CSS`中，写作`"\000A"`或`"\A"`，用来做`::after`的内容，放在每个`<dd>`元素的尾部(也就是`</dd>`元素的前面)。但光有这是无效的，因为默认情况下，换行符会和其他空白符进行合并，但是我们想要保留这个换行符。
2. 所以，我们使用到`white-space: pre`。
3. 为了增强健壮性，我们假设我有多个邮箱(我确实拥有多个邮箱)的情况，单独在`<dd>`元素后面加换行符好像不太够，那我们在每个`<dt>`元素的前面插入换行怎样？欸。不错，但是第一行会出现一行空白。
4. 我们再次换个方向思考，如果`<dd>`后面跟着一个`<dt>`元素，我们就在`<dt>`的前面插入换行符，这就是`dd + dt::before{}`所表达的意思。
5. 为了更美观，我们在每个`<dd>`元素之间插入逗号，为了去除逗号前面的一个空格，我们使用`margin-left`负外边距的方法来解决。
6. 这样，就完美了。

> 更多参考： [https://css-tricks.com/injecting-line-break/](https://css-tricks.com/injecting-line-break/)

### 难题三： 文本行的斑马条纹

`:nth-child()/:nth-of-type()`这样的伪类，我们解决了表格的*斑马条纹*。如果我们也想给文本提供这样的条纹呢，怎么解决。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/pxrwka2h/3/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

---

## 结构和布局

### 难题一： 垂直居中

`CSS`中对元素进行**水平居中**要简单很多：如果它是一个行内元素，就对它的父元素应用`text-align:center`；如果它是一个块级元素，就对它自身应用`margin:auto`。

垂直居中较为麻烦：

#### 基于绝对定位的解决方案

这是一种早期的垂直居中方法，要求元素*具有固定的宽度和高度*。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/6mf6emfj/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

关键代码如下：

```css
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

我们先把这个元素的左上角放置在视口(或最近、具有定位属性的祖先元素)的正中心，然后利用`translate()`基于百分比对元素进行偏移。

#### 基于视口单位的解决方案

`CSS3`定义了一套新的单位，称为与适口有关的长度单位。

+ `vw`与视口宽度有关，`1vw`表示视口宽度的`1%`
+ `vh`与视口宽度有关

所以我们的代码可能是这样子：

```css
main {
  width: 18em;
  padding: 1em 1.5em;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

但是，这种方法只适用于在视口中居中的场景。

#### 基于Flexbox的解决方案

`Flexbox`(弹性盒)是专门针对这类需求设计的。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/nk9e74vL/1/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

关键代码如下：

```css
body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}
main {
  margin: auto;
}
```

先给这个待居中的父元素设置`display: flex`，再给这个元素自身设置`margin: auto`。

> 当我们使用flexbox时，margin: auto不仅在水平方向上将元素居中，垂直方向上也是。

### 紧贴底部的页脚

有了弹性盒之后，我们对这个问题也有很好的处理。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/d5zk6eLp/1/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

关键代码：

```css
body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
main {
  flex:1;
}
```

这里，首先对`<body>`设置弹性盒属性，同时设置`flex-flow: column`，否则子元素会被水平排放在一行上。然后，将`<body>`元素的`min-height`设置为`100vh`，使之至少会占据整个视口的高度。接下来，我们所希望的是，页头和页脚的高度由其内部元素决定，而内容区块的高度可以自由伸展并占满所有的可用空间。而这，只要给`<main>`这个容器的`flex`属性指定一个大于`0`的值。

---

## 视觉效果

### 毛玻璃效果

毛玻璃效果经常在`Apple`公司的设计中使用。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/bufyh93b/1/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

核心代码在这里：

```css
main::before {
	content: '';
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	margin: -30px;
	z-index: -1;
	-webkit-filter: blur(20px);
	filter: blur(20px);
}
```

+ 首先，我们添加一个伪元素，将其绝对定位，并把所有偏移量置为`0`，这样就可以将它完整地覆盖到`<main>`元素之上
+ 为了防止毛玻璃效果覆盖在字体之上，所以设置`z-index`的值
+ 但是，对伪元素应用`blur()`滤镜，模糊效果在接近边缘处会逐渐消退，这是因为模糊效果会削减实色像素所能覆盖的范围，这个幅度正好是模糊半径的长度(`20px`)。为了补偿这种情况，我们让伪元素相对宿主元素的尺寸再向外扩大至少`20px`，由于不同浏览器对模糊算法存在的差异，所以我们使用一个更大的绝对值`-30px`
+ 但是，这样又出现了一个问题，就是有一圈模糊效果超出了容器，看上去有点问题。解决这个问题也很简单，对`<main>`元素应用`overflow:hidden`，就可以将多余的模糊区域裁切掉了。


### 通过模糊来弱化背景

我们通过模糊来把关键元素之外的一切元素都模糊掉，可以营造一种*景深*效果：当我们的实现聚焦再距离较近的物体上是，远处的背景就是虚化的。

<iframe width="100%" height="300" src="//jsfiddle.net/maoxiaoke/Lmuoqtmy/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>