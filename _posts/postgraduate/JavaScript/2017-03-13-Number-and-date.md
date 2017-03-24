---
layout: post
title: "Numbers and dates"
date: 2017-03-13 09:00:00 +0800 
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}


How to work with numbers and dates in JavaScript?

<!-- more -->

## Numbers

在`JavaScript`，所有的数字都是**64-bit双精度浮点类型**。**没有特定的整数数据类型**。除了可以表示浮点数，the number type has three symbolic values: `+Infinity`、`-Infinity`、`NaN`。

### Decimal numbers -- 十进制数据

```
12345678
42
//如果第一个数字为零
0888 //被当作十进制处理
0777 //被当作八进制处理
```

### Binary numbers -- 二进制数据

```
var FLT_SIGNBIT  = 0b10000000000000000000000000000000; // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000; // 2139095040
var FLT_MANTISSA = 0B00000000011111111111111111111111; // 8388607
```

### Octal numbers -- 八进制数据

八进制数字语法是以`0`为开头的。假如`0`后面的数字不在`0`到`7`的范围内，该数字将会被转换成十进制数字。

```
var n = 0755; // 493
var m = 0644; // 420
```

> 在`ECMAScript 5`严格模式下禁止使用八进制语法，但是通过在八进制数字添加一个前缀0就可以被所有的浏览器支持。在`ECMAScript 6`中使用八进制数字是需要给一个数字添加前缀`0o`。

```
var a = 0o10; // ES6 :八进制
```

### Hexadecimal numbers -- 十六进制

```
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```

### 指数形式 -- EXponentiation

```
1E3   // 1000
2e6   // 2000000
0.1e2 // 10
```

---

## 数字对象 -- Number object

### 数字的属性

内置的`Number`对象有一些数字化常量属性:

+ `Number.MAX_VALUE` 可表示的最大值
+ `Number.MIN_VALUE` 可表示的最小值
+ `Number.NaN` 特指”非数字“
+ `Number.NEGATIVE_INFINITY` 特指“负无穷”;在溢出时返回
+ `Number.POSITIVE_INFINITY` 特指“正无穷”;在溢出时返回
+ `Number.MIN_SAFE_INTEGER` JavaScript最小安全整数
+ `Number.MAX_SAFE_INTEGER` JavaScript最大安全整数

### 数字的方法

+ `Number.parseFloat()` 把字符串参数解析成浮点数，和全局方法`parseFloat()`作用一致
+ `Number.parseInt()` 把字符串解析成特定基数对应的整型数字，和全局方法`parseInt()`作用一致
+ `Number.isFinite()` 判断传递的值是否为有限数字
+ `Number.isInteger()` 判断传递的值是否为整数
+ `Number.isNaN()` 判断传递的值是否为`NaN`，是全局函数`isNaN()`的健壮版本
+ `Number.isSafeInteger()` 判断传递的值是否为安全整数

### Methods of Number.prototype

+ `toExponential()` 返回一个数字的指数形式的字符串
+ `toFixed()` 返回指定小数位数的表示形式，如`var a=123,b=a.toFixed(2)//b=123.00`
+ `toPrecision()` 返回一个指定精度的数字，如`var a=123,b=a.toPrecision(2)//b=1.2e+2`

---

## Math object

对于内置的`Math`数字常数项和函数也有一些属性和方法。[具体参见](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)。

---

## Data object -- 日期对象

`JavaScript`没有日期数据类型。但是你可以在你的程序里使用`Date`对象和其方法来处理日期和时间。`Date`对象有大量的设置、获取和操作日期的方法。 它并不含有任何属性。

### 创建一个日期对象：

```javascript
var dateObjectName = new Date([parameters]);
```

+ 无参数： 创建今天的日期和时间 例如：`var today = new Data()`
+ 一个符合以下格式的表示日期的字符串: "月 日, 年 时:分:秒." 例如： `var Xmas95 = new Date("December 25, 1995 13:30:00")` 如果你省略时、分、秒，那么他们的值将被设置为`0`
+ 一个年，月，日的整型值的集合，例如： `var Xmas95 = new Date(1995, 11, 25)`
+ 一个年，月，日，时，分，秒的集合，例如： `var Xmas95 = new Date(1995, 11, 25, 9, 30, 0)`

### Date对象的方法

处理日期时间的`Date`对象方法可分为以下几类：

+ `set`方法, 用于设置`Date`对象的日期和时间的值
+ `get`方法, 用于获取`Date对象的日期和时间的值
+ `to`方法, 用于返回`Date`对象的字符串格式的值
+ `parse`和`UTC`方法, 用于解析`Date`字符串

例如：

```javascript
var Xmas95 = new Date("December 25, 1995");
```

那么，`Xmas95.getMonth()`返回`11`，`Xmas95.getFullYear()`返回`1995`。

以下代码展示了今年剩下的天数：

```javascript
var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // 设置日和月，注意，月份是0-11
endYear.setFullYear(today.getFullYear()); // 把年设置为今年
var msPerDay = 24 * 60 * 60 * 1000; // 每天的毫秒数
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); //返回这一年剩下的天数
```

> `getTime()`返回从**1970年1月1日00:00:00的毫秒数**

`parse()`方法对于从日期字符串赋值给现有的`Date`对象很有用。

```javascript
var IPOdate = new Date();
IPOdate.setTime(Date.parse("Aug 9, 1995"));
```