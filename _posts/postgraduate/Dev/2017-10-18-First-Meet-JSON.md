---
layout: post
title: "JSON 必知必会"
date: 2017-10-18 09:00:00 +0800 
categories: 研究生涯
tag: JSON
---
* content
{:toc}

> 本文部分内容来自 《Introduction to JavaScript Object Notation》，<http://www.json.org/>。

JSON (**J**ava**S**cript **O**bject **N**otation)，是一种轻量级的数据交换格式<sup>[来源](http://www.json.org/)</sup>。**源于** JavaScript 的一个子集。但是它**独立于**编程语言。JSON 之父是 [Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford)。

<!-- more -->

## 标准的 JSON 语法

JSON 标准语法基于两种结构:

+ name/value pairs
+ ordered list of values，一般就是数组

### 与 JavaScript 对象的区别

值得注意的是，虽然 JSON 源于 JavaScript 的子集，但是基于目前的发展，有些 JavaScript 对象不是 JSON，有些 JSON 并不是 JavaScript 对象<sup>[来源](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)</sup>。

+ JSON 属性名称使用双引号，而 JavaScript 对象的属性可以不使用、使用单引号或者双引号。
+ JavaScript 对象中常包含方法(函数)，JSON 不会涉及对象字面量中的函数。

### JSON 验证工具

下面提供几个 JSON 在线验证的网站：

+ [JSON Formatter & Validator](https://jsonformatter.curiousconcept.com/)
+ [JSON Editor Online](http://jsoneditoronline.org/)

### JSON 的媒体类型

JSON 的 MIME 类型是 `application/json`。

### JSON 的数据类型

#### 对象数据类型

非常简单，就是花括号包裹的 name/value 对。是一种复合数据类型。

#### 字符串类型

```json
{
    "title": "xiaoke love yuer"
}
```

**注意转义**。

#### 数字类型

```json
{
    "age": 25,
    "earthMass": 5.97219e+24,
    "decimal": 2.3,
    "negativeNumber": -122.23
}
```

可以是整数、小数、负数或者指数。

#### boolean 类型

```json
{
    "xiaokeLoveYuer": true
}
```

#### null 类型

```json
{
    "color": null
}
```

null 可以用来表达*无*的意思。需要注意的是，json 中没有 undefined 类型。

#### 数组类型

数组类型就是值构成的列表和集合。一般来说，数组中的值应具有相同的数据类型(不是必须，而是为了可移植性)。数组类型也是复杂数据类型。

```json
{
    "name":[
        "xiaoke","yuer"
    ]
}
```

比如这种:

```json
[
    {
        "title": "xiaoke love yuer",
        "xiaokeLoveYuer": true
    },
    {
        "title": "yuer love xiaoke",
        "yuerLovexiaoke": true
    }
]
```

---

## JSON Schema

JSON Schema，即 JSON 的一致性验证 (conformity validation)。之前提到的 JSON 验证器是确保 JSON 不存在**语法错误**，而 JSON 的一致性检查意在确保**数据符合要求**。主要有三点验证：

+ 值的数据类型是否正确
+ 是否包含所需要的数据
+ 值的形式是不是需要的

JSON Schema 还处于草案当中，官网地址是 <http://json-schema.org/>。

这是一个摘自官网的例子:

```json
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "Product",
    "description": "A product from Acme's catalog",
    "type": "object",
    "properties": {
        "id": {
            "description": "The unique identifier for a product",
            "type": "integer"
        },
        "name": {
            "description": "Name of the product",
            "type": "string"
        },
        "price": {
            "type": "number",
            "minimum": 0
        }
    },
    "required": ["id", "name", "price"]
}
```

上面的代码是一个 Production Schema，也是一个 JSON。内容有点长，待我一步一步解释。

+ `$schema` 关键字

```json
{
    "$schema": "http://json-schema.org/draft-06/schema#"
}
```

声明其为一个 schema 文件，值为所用 draft 版本的链接，因为还处于草案阶段。

+ `title` 关键字

```json
{
    "title": "Product"
}
```

JSON Schema 的标题。这是个描述性的关键字，和 `description` 一样，用于 JSON Schema 的描述，不施加任何验证性内容。

+ `type` 关键字

```json
{
    "type": "object"
}
```

type 关键字用于对 JSON 数据类型的限制。

+ `properties` 关键字

`properties` 关键字就是我们想要的 JSON 的 name/value 对。

+ `required` 关键字

`required` 关键字用来表示必填字段。

从而，对于上述的第一个问题和第二个问题，我们就可以很好地解决了。对于第三个问题，我们可以通过 `minimum`、`maxLength/minLength`、`exclusiveMinimum` 来解决。

下面就是一个验证通过的 JSON：

```json
{
"id": 1,
"name": "xiaokeloveyuer",
"price": 4
}
``` 

---

## JSON 序列和反序列化

JSON 对象拥有两个方法：`stringify()` 和 `parse()`。

+ `stringify()` 将 JavaScript 序列化为 JSON 字符串。这叫*序列化*，本意是**将对象转换为文本**的过程。
+ `parse()` 将 JSON 字符串解析为原生 JavaScript 对象。这叫*反序列化*，也叫解析，是**将文本转换为对象**的过程。

---

## JSON 中的安全问题

暂时略。

---

## JSON 的其他应用场景

### 与数据库交互

### 服务器端的 JSON

### 作为配置文件

作为静态配置文件也让 JSON 大放异彩。比如 npm 的 package.json 文件，VSCode 都采用 JSON 作为静态配置文件。

