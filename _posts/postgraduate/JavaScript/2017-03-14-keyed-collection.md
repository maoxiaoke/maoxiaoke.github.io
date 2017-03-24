---
layout: post
title: "Keyed collection"
date: 2017-03-14 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


`Map` and `Set` objects contain elements which are iterable in the order of insertion，是使用`Key`值来标记数据的集合。

<!-- more -->

## Maps -- 映射

### Map对象

`Map object`是在`ECMAScript 6`引入的。A `Map object` is a simple **key/value** map and can iterate its elements in insertion order。

> `Map`对象，就是简单的**key/value**映射

```javascript
var sayings = new Map();    //Map对象的创建
sayings.set('dog', 'woof'); //set(key, value)方法设置key/value
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.size;               //属性size返回key/value的数量。此处返回3
sayings.get('fox');         //get(key)方法返回键对应的值，如果不存在，返回undefined。此处返回undefined
sayings.has('bird');        //has(key)判断是否包含键对应的值，返回布尔值。此处返回false
sayings.delete('dog');      //delete(key)移除任何与键相关的值
sayings.has('dog');         // false

for (var [key, value] of sayings) {
  console.log(key + ' goes ' + value);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();            //clear()方法移除所有的key/value
sayings.size;               // 0
```

> 我们可以使用`for...of`循环得到所有的`[key, value]`。也可以使用`forEach()`方法迭代。

### Object 和 Map的比较

一般地，`objects`会被用于将**字符串类型**映射到数值。`Object`允许设置键值对、根据键获取值、删除键、检测某个键是否存在。而`Map`具有更多的优势。

+ `Object`的键均为`Strings`类型或`Symbol`类型，在`Map`里键可以是任意类型
+ 必须手动计算`Object`的尺寸，但是可以很容易地获取使用`Map`的尺寸
+ `Ma`p的遍历遵循元素的插入顺序
+ `Object`有原型，所以映射中有一些缺省的键。可以理解为`map = Object.create(null)`

这两条提示可以帮你决定是使用`Map`还是`Object`：

+ 如果键在运行时才能知道，或者所有的键类型相同，所有的值类型相同，那就使用`Object`
+ 如果需要对个别元素进行操作，使用`Object`

### WeakMap对象

`WeakMap`对象也是键值对的集合。它的键必须是**对象类型**，值可以是任意类型。它的键被弱保持，也就是说，当其键所指对象没有其他地方引用的时候，它会被`GC`(垃圾回收器)回收掉。

与`Map`对象不同的是，`WeakMap`的键是不可枚举的。不提供列出其键的方法。列表是否存在取决于垃圾回收器的状态，是不可预知的。


## Sets -- 集合

### Set对象

`Set`对象是一组值的集合，这些值是**不重复的**，可以按照添加顺序来遍历。

```javascript
var mySet = new Set();
mySet.add(1);
mySet.add('some text');
mySet.add('foo');

mySet.has(1); // true
mySet.delete('foo');
mySet.size; // 2

for (let item of mySet) console.log(item);
// 1
// "some text"
```

> 可以使用`for...of`进行迭代

### Array和Set的转换

可以使用`Array.from`或`扩充操作符`来完成**集合到数组的转换**。同样，集合的构造器接受数组作为参数，可以完成从数组到集合的转换。需要重申的是，集合对象中的值不重复，所以数组转换为集合时，所有重复值将会被删除。

```javascript
var myArray = ["value1", "value2", "value3"];

// 用Set构造器将Array转换为Set
var mySet = new Set(myArray);

mySet.has("value1"); // returns true

// 用...(展开操作符)操作符将Set转换为Array
console.log([...mySet]); // 与myArray完全一致

//or
Array.from(mySet);

```

### Array和Set的对比

一般情况下，在`JavaScript`中使用数组来存储一组元素，而新的集合对象有这些优势：

+ 数组中用于判断元素是否存在的`indexOf`函数效率低下
+ 集合对象允许根据值删除元素，而数组中必须使用基于下标的`splice`方法
+ 数组的`indexOf`方法无法找到`NaN`值
+ 集合对象存储不重复的值，所以不需要手动处理包含重复值的情况

### WeakSet对象

`WeakSet`对象是一组对象的集合。`WeakSet`中的对象不重复且不可枚举。

`WeakSets`中的值必须是对象类型，不可以是别的类型。

## Map的键和Set的值的等值判断

+ 判断使用与`===`相似的规则
+ `-0`和`+0`相等
+ `NaN`与自身相等（与`===`有所不同）

