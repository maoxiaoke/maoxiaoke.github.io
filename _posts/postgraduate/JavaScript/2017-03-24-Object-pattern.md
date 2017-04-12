---
layout: post
title: "对象模式"
date: 2017-03-24 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}

`JavaScript`的所有属性都是公有的，没有显式的方法可以指定某个属性不能被外界某个对象访问。通常的方法是通过*命名规则*，比如我们在不希望公有的属性名前加上下划线(`_`)。此外，还有些其他的方法。

<!-- more -->

## 模块模式 -- Modulet Pattern

模块模式是一种对象创建模式，被设计用来创建一个拥有私有数据的单一对象(The *module pattern* is an object-creation pattern designed to create singleton objects with private data)。

基本的方法是使用`IIFE`(immediately invoked function expression)来返回一个对象。`IIFE`是一个一经定义就立即调用并运行的函数表达式。它可以包含任意数量的本地变量，这些Local variable在函数外并不可见。因为返回的对象被定义在函数内部，对象的方法可以访问这些数据。以这种方式访问私有变量的方法，叫`privileged method`。

```javascript
var yourobject = (function(){
    //private data variable

    return {
        //public methods and properties
    }; //此处，返回的是一个对象
}());
```

该模式创建了一个匿名函数并立即执行，这意味着这个函数仅存在于被调用的瞬间，一旦执行后立即被销毁了。

模块模式允许你使用普通变量作为非公有的对象的属性，通过创建*闭包*函数作为对象的方法来操作它们。**闭包函数就是一个可以访问外部作用域数据的函数**。在模块模式中，变量定义在`IIFE`中，而访问变量的函数也定义在`IIFE`中。

```javascript
var person = (function(){
    var age = 25;
    return {
        name: "Nicholas",
        getAge: function(){
            return age;
        },
        growOlder: function(){
            age++;
        }
    };
}());

console.log(person.name);   //"Nicholas"
console.log(person.getAge());   //25

person.age = 100;   //外部无法访问
console.log(person.getAge());   /25
```

> 变量`age`就是`person`对象的一个私有属性，它无法被外界直接访问，但可以通过对象的方法来操作。该对象上有两个特权方法：`getAge()`和`growOlder()`。它们是可以直接访问`age`的，因为都定义在同一个`IIFE`中。

还有一种*暴露式写法*：

```javascript
var person = (function(){
    var age = 25;
    function getAge(){
        return age;
    }
    function growOlder(){
        age++;
    }
    return {
        name: "Nicholas",
        getAge: getAge,
        growOlder: growOlder
    };
}());
```

> 这个例子与前例是一样的。

---

## 构造函数的私有成员

在前面的例子中，我们提过对象字面值的方式构建了一个具有私有变量的对象。但如果是构造函数呢，我们指导，构造函数也是函数，函数内定义的变量不能被外部访问。

```javascript
function Person(name){
    //define a variable only accessible inside of the Person constructor

    var age  = 25;
    this.name  = name;
    this.getAge = function(){
        return age;
    };
    this.growOlder =  function(){
        age++;
    };
}

var person = new Person("Nicholas");
var person1 = new Person("Greg");

console.log(person.name);   //"Nicholas"
console.log(person.getAge());   //25

person.age = 100;   //外部无法访问
console.log(person.getAge());   //25

person.growOlder();
cosole.log(person.getAge());    //26

console.log(person1.getAge());  //25
```

> 正如我们在`再谈原型与继承`时说的，将方法放在实例上不如放在原型上有效。但是，如果你想要私有的实例化的数据，这是唯一的方法。

但是，如果需要所有实例都可共享私有数据，就好像它被定义在原型里那样，你可以结合两者：

```javascript
var Person = (function(){
    //everyone shares the same age
    var age = 25;
    function InnerPerson(name){
        this.name = name;
    }
    InnerPerson.prototype.getAge = function(){
        return age;
    };
    InnerPerson.prototype.growOlder = function(){
        age++
    };
    return InnerPerson;
}());

var person1 = new Person("Nicholas");
var person2 = new Person("Greg");

person1.growOlder();
console.log(person1.getAge());  //26
console.log(person2.getAge());  //26
```

最终，所有实例得以共享`age`变量。

## Mixins -- 混入

混入时一种给对象添加功能，同时避免继承的强有力的方式。混入将一个属性从一个对象复制到另一个，从而使得接收者在不需要继承的情况下就能获得其功能。