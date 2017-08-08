---
layout: post
title: "原生JavaScript的DOM操作"
date: 2017-03-31 19:00:00 +0800 
categories: 研究生涯
tag: DOM
---
* content
{:toc}


`DOM`中的`D`指的是`document`，`O`指的是`Object`，在`JavaScript`语言中，有三种对象类型，分别是`user-defined object`、`native object`、`host object`，对于`host object`，指的是浏览器提供的对象，最基础的就是`window`本身了。其中的`M`，指的就是模型。

那整个模型怎么解释呢？

<!-- more -->

下面是一个基本的网页。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'/>
        <title>Shopping list</title>
    </head>

    <body>
        <h1>What to buy</h1>
        <p title='a gentle reminder'>Don't forget to buy this stuff.</p>
        <ul id='purchases'>
            <li>A tin of beans</li>
            <li class='sale'>Cheese</li>
            <li class='sale important'>Milk</li>
        </ul>
    </body>
</html>
```

这份文档可以用下面这个模型来表示：

![DOM-model]({{ '/styles/images/javascript/dom-model.png' | prepend: site.baseurl }})

这都是一些元素，有些有*父元素*、有些有*子元素*、有些有*兄弟元素*。

同时每个元素标签又以*节点*(`node`)作为一个整体。比如，在`<p></p>`标签所包裹的区域。

![node]({{ '/styles/images/javascript/node.png' | prepend: site.baseurl }})

> 并不是所有元素都包裹*文本节点*和*属性节点*。

总结以下：

- 一份文档就是一颗节点树
- 节点分为不同的类型：元素节点、属性节点和文本节点等
- 每个节点都是一个对象

以上这些就是基本概念了，那么我们怎么去操纵这些元素呢？第一步，我们需要获取元素。

---

## 获取元素

有三种`DOM`方法可以获取元素节点。

### getElementById() -- 通过元素ID

方法返回一个与那个有着给定`id`属性值的元素节点对应的对象。它是`document`对象特有的函数，使用方法是：

```javascript
document.getElementById(id)
```

### getElementByTagName() -- 通过标签名字

方法返回一个对象的数组。使用方法是：

```javascript
document.getElementByTagName(tag)
```

### getElementByClassName() -- 通过类名来获取

方法返回一个具有相同类名的元素的数组。

```javascript
document.getElementByClassName(class)
```

---

## 获取和设置属性

得到需要的元素以后，我们就可以设法获取它的各个属性。

### getAttribute() -- 获取你打算查询的属性名字

`getAttribute()`方法不属于`document`对象，所以不能通过`document`对象调用，它只能通过元素节点对象调用。

```javascript
object.getAttribute(attribute)
```

### setAttribute()

`setAttribute()`允许我们对属性节点的值做出修改。与`getAttribute()`一样，`setAttribute()`也只能用于元元素节点。

```javascript
object.setAttribute(attribute, value)
```

---

## DOM属性

搭配DOM的各种属性，我们可以进行更多的操作。

### childNodes属性

在一棵节点树上，`childNodes`属性可以用来获取任何一个元素的所有子元素，它是一个包含这个元素全部子元素的数组。

```javascript
element.childNodes
```

### nodeType属性

每个节点都有一个`nodeType`属性，通过这个属性我们知道我们在与哪种节点打交道。

```javascript
node.nodeType
```

`nodeType`属性总共有12种可取值，但其中仅有3种具有实用价值。

- 元素节点的`nodeType`属性值是1
- 属性节点的`nodeType`属性值是2
- 文本节点的`nodeType`属性值是3

### nodeValue属性

如果想改变一个**文本节点**的值，那就使用`DOM`提供的`nodeValue`属性，它用来得到(或设置)一个节点的值。

```javascript
node.nodeValue
```

### firstChild和lastChild属性

有时候我们只需要访问`childNodes`数组的第一个元素`childNodes[0]`，可以使用`firstChild`属性。

```javascript
node.firstChild
```

> 这与`node.childNodes[0]`完全等价。

同理，`node.lastChild`代表`childNodes`数组的最后一个元素。

---

## 事件处理函数

事件处理函数的作用是，在特定的事件发生时调用特定的`JavaScript`代码。

- 如果想在鼠标指针悬停在某个元素上时触发一个动作，就使用`onmouseover`事件处理函数
- 如果想在鼠标指针离开某个元素时触发一个动作，可以使用`onmouseout`事件处理函数
- 如果想点击某个链接时触发一个动作，可以使用`onclick`事件处理函数

添加事件处理函数的语法如下：

```javascript
event = "JavaScript statement(s)"
```

> `JavaScript`代码包含在一对引号之间。

在`onclick`事件处理函数，我们可以这样使用。

```javascript
onclick = "xxx(this);return false;"
```

> `xxx`是调用的`JavaScript`函数，使用`this`关键字指代`这个对象`，`return false;`是为了防止默认行为。

这种在`HTML`中指定事件处理程序有缺点。

+ 时差问题。如果页面在解析`JavaScript`就调用了事件处理函数，就会引发错误
+ `HTML`和`JavaScript`代码紧密耦合

所以很多开发员转而使用`JavaScript`指定事件处理程序。有三种方式。

### DOM0级事件处理函数

```javascript
var btn=document.getElementById("mybtn"); // 取得该按钮的引用
btn.onclick=function(){
alert('clicked');
alert(this.id); // mybtn
}

//删除指定的事件处理函数
btn.onclick=null; // 删除事件处理程序
```

以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。

### DOM2级事件处理函数

`DOM2`级事件定义了两个方法，用于处理指定和删除事件处理程序的操作：`addEventListener()`和`removeEventListener()`。所有`DOM`节点中都包含这两个方法，并且它们都接受`3`个参数：要处理的事件名，做为事件处理程序的函数和一个布尔值。最后这个参数如果是`true`，表示在捕获阶段调用事件处理程序；如果是`fasle`，表示在冒泡阶段调用事件处理程序。

```javascript
var btn=document.getElementById("mybtn");
btn.addEventListener("click",function(){
alert(this.id);
},false);
btn.addEventListener("click",function(){alert("hello world!");},false);
```

使用`DOM2`级事件处理程序的主要好处是可以添加多个事件处理程序。

通过`addEventListener()`添加的时间处理程序只能使用`removeEventListener()`来移除，移除时传入的参数与添加时使用的参数相同。这也意味着通过`addEventListener()`添加的匿名函数将无法移除。

### IE事件处理函数

`IE`实现了与`DOM`中类似的两个方法:`attachEvent()`和`detachEvent()`。这两个方法接受相同的两个参数：事件处理程序名称和事件处理程序函数。由于`IE`只支持时间冒泡，所有通过`attachEvent()`添加的事件处理程序都会被添加包冒泡阶段。

---

## 动态创建标记

前面我们是查找并更改已存在的元素，但是，`JavaScript`也可以用来改变网页的结构和内容。

### 传统方法

+ `document.write`: `document`对象的`write()`方法可以方便快捷地把字符串插入到文档中
+ `innerHTML`: `innerHTML`属性可以用来读、写某给定元素里的`HTML`内容

### DOM方法

首先，我们需要明白的一点是，在浏览器看来，`DOM`节点树才是文档。所以，在动态创建标记的时候，我们并不是在创建标记，而是在改变`DOM`节点树。

#### createElement()方法

语法是：

```javascript
document.createElement(nodeName)
```

比如：

```javascript
//创建一个p元素
document.createElement("p");
```

#### appendChild()方法

把新创建的节点插入某个文档的节点树的最简单的方法，就是让他称为这个文档某个现有节点的一个子节点。

```javascript
parent.appendChild(child)
```

#### createTextNode()方法

`createElement()`方法只能创建元素节点，如果你需要创建一个文本节点，你可以用`createTextNode()`方法来实现它。

语法是：

```javascript
document.createTextNode(text)
```

> 需要了解的是，`JavaScript`脚本只应该用来充实文档的内容，避免使用`DOM`技术来创建核心的内容。

---

## CSS-DOM

显而易见，`CSS-DOM`显然是操纵表现层`CSS`的。

### style属性

文档的每个元素节点都是一个对象，有着多种类型属性，比如：

+ 元素在节点树的位置信息: `parentNode`/`nextSibling`/`previousSlibling`/`childNodes`/`firstChild`/`lastChild`这些属性
+ 包含元素本身的属性：`nodeType`/`nodeName`这些属性
+ 除此之外，还有一个`style`属性，包含了元素的样式，这个属性返回一个对象而不是一个简单的字符串。

样式都存在`style`属性的返回对象中：

```javascript
element.style.property
```

#### 获取样式

```javascript
element.style.property

//比如
element.style.color
element.style.fontFamily
```

> 注意：当你需要引用一个中间带`-`号的`CSS`属性时，`DOM`要求你用驼峰命名法。即`font-family`变成`fontFamily`。

#### 设置样式

使用`style`返回的对象的各个属性都是可读写的。我们还可以通过它去更新样式。解决方法就是获取样式之后，进行赋值。


### className属性

要知道，用行为层(`JavaScript`)去改变表现层(`CSS`)的这种做法通常来说是不可取的。

我们可以使用`className`属性去获取或更改样式。

语法是：

```javascript
element.className
```

> 通过`CSS-DOM`去改变样式有一个最大的障碍就是：无法改变外部引用的`CSS`

---

## 总结

### 常用的DOM方法和属性集合

暂略。

### 混淆概念

### DOM-Core vs HTML-DOM

`DOM`是由`W3C`制定的一套访问和操作`XML`文档的标准，即`API`。`DOM`与特定的平台、浏览器、语言无关，很多种语言都实现了`DOM`，比如因为`JavaScript`和`PHP`都实现了`DOM`。

但为什么`DOM`可以用来访问和操作`HTML`呢？

`Web`语义化的一个发展方向是将`HTML`逐渐演变为更有语义、能将数据内容与现实分离的`XML`，但`HTML`不可能立即演变为`XML`，所以出现了一个过渡产物--`XHTML`。`HTML`与`XHTML`网页形成的节点树在结构上与`XML`节点树一样，可以看做是一个符合`DOM`的`XML`文档，因此可以使用实现了`DOM`的程序语言（如`JavaScript`、`PHP`等）来访问和操作`HTML`文档，即访问和操作那些节点。

由于`HTML`与`XML`的相似性及差异，`JavaScript`不仅实现了标准的`DOM`方法和属性（即由W3C制定的），而且还实现了`HTML`特有的`DOM`方法和属性，前者称为`DOM-Core`，并不专属于`JavaScript`，后者称`为HTML-DOM`。

比如：`innerHTML`就是特有的`HTML-DOM`方法

> [来源](http://blog.csdn.net/w11003060125/article/details/8549434)


### DOM vs BOM

`DOM`和`BOM`的结构关系示意图：

![DOM-BOM]({{ '/styles/images/html/BOM-DOM.png' | prepend: site.baseurl }})

[`stackoverflow`](http://stackoverflow.com/questions/4416317/what-is-the-dom-and-bom-in-javascript)上对这个问题的解释是：

> `BOM`包含了`window`对象的所有子对象`navigator`/`history`/`screen`/`location`/`document`，在`document`中，节点就是`DOM`，表示页面的所有内容。

`window`是一个全局对象，这意味着在网页中定义的任何对象，变量和函数，都以`window`作为其`global`对象。

+ `document`对象：实际上是`windows`对象的属性，`document === window.document`为`true`，是唯一一个既属于`BOM`又属于`DOM`的对象。

```
document.anchors[0]或document.anchors["anchName"] //访问页面中所有的锚  
document.forms[0]或document.forms["formName"]  //访问页面中所有的表单  
document.images[0]或document.images["imgName"]  // 访问页面中所有的图像  
document.links [0]或document.links["linkName"]  //访问页面中所有的链接 
document.applets [0]或document.applets["appletName"]  //访问页面中所有的Applet  
document.embeds [0]或document.embeds["embedName"]  //访问页面中所有的嵌入式对象  
```

+ `location`对象: 表示载入窗口的`URL`，也可用`window.location`引用它

+ `navigator`对象: 含大量有关`Web`浏览器的信息，在检测浏览器及操作系统上非常有用，也可用`window.navigator`引用它 

+ `screen`对象: 用于获取某些关于用户屏幕的信息，也可用`window.screen`引用它 


### 冒泡型事件 vs 捕获型事件

 `DOM`同时两种事件模型：冒泡型事件和捕获型事件 

 + 冒泡型事件： 事件按照从最特定的事件目标到最不特定的事件目标的顺序触发 

 ```html
 <body onclick="handleClick()">  
    <div onclick="handleClick()">Click Me</div>  
</body> 
 ```

触发的顺序是：`div`、`body`、`html`(IE 6.0和Mozilla 1.0)、`document`、`window`(Mozilla 1.0)  

+ 捕获型事件： 与冒泡事件相反的过程

上面例子触发的顺序是：`document`、`div`
