---
layout: post
title: "再谈原型和继承"
date: 2017-03-23 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

在[`Object Model`]({{ '/2017/03/15/Object-model' | prepend: site.baseurl }})这一节简单介绍了一下原型链和继承，由于最近在读`Nicholas C.Zakas`的`The Principles of Object-Oriented JavaScript`，又有了很多的启发，特记录在本文中。

最开始，也是最基本的，我们需要了解构造函数、原型和实例的概念和它们之间的关系。

<!-- more -->

## Constructor, Prototype and Instances

先看一段代码：

```javascript
function Person(name){
    this.name = name;
}
Person.prototype = {
    constructor: Person,

    sayName: function(){
        console.log(this.name);
    },

    toString: function(){
        return "[Person" + this.name + "]";
    }
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");
```

下图描述了这个关系：

![An instance and its constructor are linked via the prototype]({{ '/styles/images/javascript/prototype-instance-constructor.png' | prepend: site.baseurl }})

其中的概念会在接下来一一解释。

### 构造函数

构造函数就是使用`new`创建对象时调用的函数。约定俗成的命名规则要求：首字母大写。

```javascript
function Person(){
    //something
}
var person1 = new Person();
var person2 = new Person();

// 你可以使用instanceof操作符获取对象的类型
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true

//constructor属性
console.log(person1.constructor === Person);//true
console.log(person2.constructor === Person);//true
```

> 每个对象再创建时都自动拥有一个*构造器属性*(constructor property)，表示一个指向构造器函数的引用。通过对象字面值形式或`Object`构造函数创建出来的*泛用*对象，其构造器属性指向`Object`；那些通过自定义构造函数创建出来的对象，其构造器属性指向创建它的构造函数。

### 原型

You can think of a *prototype* as a recipe for an object. 几乎所有(除了一些内建函数)的函数都有一个名为`prototype`的属性，该属性用在创建实例的过程中。所有创建的实例都共享该原型对象，且这些实例可以访问原型对象的属性。

```javascript
var book = {
    title: "I love China"
};

console.log("title" in book);   //true
console.log(book.hasOwnProperty("title"));  //true
console.log("hasOwnProperty" in book);      //true
console.log(book.hasOwnProperty("hasOwnProperty")); //false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //true
```

> `hasOwnProperty()`方法定义在泛用对象`Object`的原型对象中，但却可以被任何对象当作自己的属性访问。

### [[Prototype]]属性

一个实例通过内部属性[[Prototype]]跟踪其原型对象，该属性是实例指向原型对象的一个指针。**当你用`new`来创建一个新的对象时，构造器(函数)的`prototype`属性就赋予给该对象的`[[Prototype]]`属性**，请结合例图好好体会这句话。

可以调用对象的`Object.getPrototypeOf()`方法读取`[[Prototype]]`属性的值。

> 大部分`JavaScript`引擎在所有对象上都支持一个名为`__proto__`的属性，该属性使你可以直接读写`[[Prototype]]`。`Firefox`、`Safari`、`Chrome`和`Node.js`都支持该属性。新的`ECMAScript`有望加入该属性到标准中。

也可以使用`isPrototypeOf()`方法检查某个对象是否是另一个对象的原型对象。该方法被包含在所有对象中。

当读取一个对象的属性时，`JavaScript`引擎首先在该对象的自有属性中查找属性名字，如果找到则返回。如果自有属性不包含该名字，则`JavaScript`会搜索`[[Prototype]]`中的对象。找到则返回，找不到则返回`undefined`。

```javascript
var object = {};
console.log(object.toString());     //"[object Object]"

object.toString = function(){
    return "[object Custom]";
};
console.log(object.toString());     //"[object Custom]"

delete object.toString;
console.log(object.toString());     //"[object Object]"
```

代码说明以下几点：

+ `delete`只能删除自有属性，无法删除一个独享的原型属性
+ 无法给一个对象的原型属性赋值，试图赋值的结果时创建了一个新的自有属性，而不是改变了原型属性

### 在构造函数中使用原型对象

```javascript
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log(this.name);
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");
```

> 这样，原型所创建的方法很方便地被所有实例共享。

很多人会使用更简洁的方式：使用一个对象字面值形式替换原型对象

```javascript
function Person(name){
    this.name = name;
}
Person.prototype = {
    sayName: function(){
        console.log(this.name);
    },
    toString: function(){
        return "[Person" + this.name + "]";
    }
};
```

这种写法的好处在于不用多次键入`Person.prototype`，但有一个副作用需要注意：**使用字面值形式改变了构造函数的属性**。原因在于：**原型对象有个一`constructor`属性，而实例没有。当一个构造函数被创建时，它的`prototype`属性被创建，且该原型对象的`constructor`属性指向该构造函数。**所以当使用字面值形式改写原型对象时，`constructor`属性的值来自泛用的`object`。因此需要重置`constructor`的值。这就是我们这一节开头的代码。

```javascript
function Person(name){
    this.name = name;
}
Person.prototype = {
    constructor: Person,

    sayName: function(){
        console.log(this.name);
    },

    toString: function(){
        return "[Person" + this.name + "]";
    }
};

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");
```

### 内建的对象原型

所以呢，原型对象也允许你改变`JavaScript`引擎的标准内建对象。所有内建对象都有构造函数，因此也都有原型对象。例如，在所有数组上添加一个新的方法，只需要简单地修改`Array.prototype`即可。

```javascript
Array.prototype.sum = function(){
    return this.reduce(function(previous, current){
        return previous + current;
    });
};

var numbers = [1,2,3,4,5,6];
var result = numbers.sum();
```

---

## 继承

### 原型链和Object.prototype

`JavaScript`内建的继承方法叫做`prototype chaining`或者`prototype inheritance`. 原型同样也是个对象。

所有的对象都自动继承自`Object.prototype`，这是更为准确的说法。**任何以对象字面值形式定义的对象，其`[[Prototype]]`都被设置为`Object.prototype`**，这意味着它继承`Object.prototype`的属性。

#### 继承自Object.prototype的方法

+ `hasOwnProperty()` : 检查是否存在一个给定名字的自有属性
+ `propertyIsEnumerable()` : 检查一个自有属性是否可枚举
+ `isPrototypeOf()` : 检查一个对象是否是另一个对象的原型对象
+ `valueOf()` : 返回一个对象的值表达
+ `toString()` : 返回一个对象的字符串表达

> 这几个方法都是定义在`Object.prototype`上的，因此可以别其他对象继承。

#### 修改Object.prototype

所有的对象都默认继承自`Object.prototype`，所以改变`Object.prototype`会影响所有的对象，所以建议不要这样做。

### 对象继承

对象继承是最简单的继承类型。你需要做的就是指定哪个对象是新对象的`[[Prototype]]`。对象字面值形式会隐式指定`Object.prototype`为其`[[Prototype]]`，你也可以用`Object.create()`方法显式指定。

```javascript
var book = {
    title: "I Love China"
};

//is the same as
var book = Object.create(Object.prototype, {
    title:{
        configurable: true,
        enumerable: true,
        value: "I Love China",
        writable: true
    }
});
```

> `Object.create()`接受两个参数，第一个是需要被设置为新对象的`[[Prototype]]`的对象，第二个可选参数是一个属性描述对象。

下面我们开始玩对象的继承。

```javascript
var person1 = {
    name: "Nicholas",
    sayName: function(){
        console.log(this.name);
    }
};
var person2 = Object.create(person1, {
    name:{
        configurable: true,
        enumerable: true,
        value: "Greg",
        writable: true
    }
});
```

原型链如图：

![prototype-chaining-of-object]({{ '/styles/images/javascript/prototype-chainning-01.png' | prepend: site.baseurl }})

当访问一个对象的属性时，`JavaScript`引擎会执行一个搜索过程，如果在实例上发现该(自有)属性，该属性值就会使用。如果没有，则搜索`[[Prototype]]`，如果还没发现，继续搜索该原型的`[[Prototype]]`，直至继承链的末端。末端通常是一个`Object.prototype`，其`[[Prototype]]`被置为`null`。

你可以通过`Object.create()`创建一个`[[Prototype]]`为`null`的对象，即没有原型对象的对象。

```javascript
var nakedObject = Object.create(null);

console.log("toString" in nakedObject); //false
```

> 这是个有趣的诡计。

### 构造函数继承

对象继承也是构造函数继承的基础。上面曾提到，几乎所有的函数都有一个`prototype`属性，可以被修改或替换。这个属性会自动赋值给一个继承自`Object.prototype`的泛型对象，也获得一个自由属性`constructor`。

```javascript
//you write this
function YourConstructor(){
    //initialization
}

//JavaScript自动为你做这些事
YourConstructor.prototype = Object.create(Object.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: YourConstructor,
        writable: true
    }
});
```

如下图所示：

![prototype-of-constructor]({{ '/styles/images/javascript/constructor.png' | prepend: site.baseurl }})

> `constructor.prototype`继承自`Object.prototype`。

由于`prototype`属性可写，你可以通过它来改变原型对象链。

```javascript
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function(){
    return this.length * this.width;
};
Rectangle.prototype.toString = function(){
    return "[Rectangle" + this.length + "x" + this.width + "]";
};

//inherits form Rectangle
function Square(size){
    this.length = size;
    this.width = size;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

Square.prototype.toString = function(){
    return "[Square" + this.length + "x" + this.width + "]";
};

var rect = new Rectangle(5, 10);
var square = new Square(6);
```

`Square`构造函数的`prototype`属性被改写为`Rectangle`的一个实例。不需要为`Rectangle`的调用传递参数，否则参数会被`Square`所有实例共享。但是同时，你也必须保证构造函数缺失参数时不会抛出错误。`Square.prototype`被改写后，其`constructor`属性会被重置为`Square`。

如下图所示：

![prototype-of-constructor]({{ '/styles/images/javascript/prototype-chaining-02.png' | prepend: site.baseurl }})

`Square.prototype`并不是真的需要被改写为一个`Rectangle`对象，只要将`Square.prototype`指向`Rectangle.prototype`，就能使得继承得以实现。我们使用`Object.create()`来简化。

```javascript
//inherits from Rectangle
function Square (size){
    this.length = size;
    this.width = size;
}
Square.prototype = Object.create(Rectangle.prototype,{
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
Square.prototype.toString = function(){
    return "[Square" + this.length + "x" + this.width + "]";
};
```

> 这个版本中，`Square.prototype`被改写为一个新的继承自`Rectangle.prototype`的对象，而`Rectangle`构造函数没有被调用，不需要担心参数调用构造函数会导致错误。除此之外，这段代码与前面的行为完全一致。


到这里为止，我们还有两点有关继承的还需要处理。
其一，构造函数的窃取。

### 构造函数的窃取

正如上面说的，继承是通过原型链来实现的，因此不需要调用对象的父类的构造函数。那么问题是：如果你确实需要在子类构造函数中调用父类构造函数，你可以使用`call()`和`apply()`来调用父类的构造函数，并传入新创建的对象。这种说法，就是利用自己的对象窃取父类的构造函数。

```javascript
//inherits from Rectangle
function Square (size){
    Rectangle.call(this,size,size);
}
Square.prototype = Object.create(Rectangle.prototype,{
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
Square.prototype.toString = function(){
    return "[Square" + this.length + "x" + this.width + "]";
};
```

> 这是一种避免在构造函数中重新定义你希望继承的属性的手段，你可以在调用完父类的构造函数后继续添加新属性或覆盖已有的属性。这种做法模仿了那些基于类的语言的特性，通常被称为**伪类继承**。

其二，如何访问父类方法。

### 访问父类方法

子类提供新方法覆盖了父类的方法非常常见，但是，如果你还是想访问父类的方法怎么办呢？方法还是通过`call()`或则`apply()`改变`this`的调用来实现。

```javascript
//inherits from Rectangle
function Square (size){
    Rectangle.call(this,size,size);
}
Square.prototype = Object.create(Rectangle.prototype,{
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
//call the supertype method
Square.prototype.toString = function(){
    vartext = Rectangle.prototype.toString,call(this);
    return text.replace("Rectangle","Square");
};
```

> 这种方式有点麻烦，但这是访问父类方法的唯一手段。