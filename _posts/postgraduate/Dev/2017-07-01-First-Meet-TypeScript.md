---
layout: post
title: "TypeScript详解"
date: 2017-07-01 09:00:00 +0800 
categories: 研究生涯
tag: TypeScript
---
* content
{:toc}

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript<sup>[来源](http://www.typescriptlang.org/index.html)</sup>.

这意味着所有的`ES6`代码都是完全有效的且可编译的TypeScript代码(通俗一点，就是任何合法的JavaScript程序都是合法的TypeScript程序)。

**为什么我们需要使用TypeScript呢？**目前广泛应用的JavaScript标准还是ES5，在如今大规模JavaScript应用中，由于它缺乏很多必要的特性，一些可维护性问题就暴露出来了。ES6旨在解决上述可维护性问题，但并没有完全实现，其次该标准的广泛采用，也是个漫长的过程。TypeScript应运而生，其中类型检查是它的一个非常重要的特性。

**如何学习TypeScript？**目前我推荐的是[官方的语言主页](http://www.typescriptlang.org/index.html)和该语言开源仓库的[wiki主页](https://github.com/Microsoft/TypeScript/wiki)，我尤其推荐后者，非常便于学习和查询。

<!-- more -->

**为啥我会学习TypeScript呢？**因为最近在学习[`Angular 2`](https://angular.io/)，而且TypeScript是开发`Angular 2`的官方语言。

TypeScript最初是微软开发的，现在通过开源框架Angular2，Google也强势加入合作。在*后诺基亚时代*，我向来是不喜欢微软的，但不得不说他旗下的两个产品还是很优秀的，一个是`Visual Studio Code`，另一个就是`TypeScript`。

首先我们来看一下ES5、ES6和TypeScript的关系。

![ES5、ES6和TypeScript的关系]({{ '/styles/images/typescript/typescript.png' | prepend: site.baseurl }})

从上图可以看到，TypeScript的野心很大，不仅是想做ES6的超集，恐怕也是后续所有JavaScript版本的超集。

> 这个图是我所修改过的，原图还有介绍了[AtScript](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/mobilebasic?viewopt=127)，它由Google开发，定义为TypeScript的超集。但目前已经全部整合进TypeScript，促进相互合作，促进大一统，Google也是放下了面子。

## TypeScript的编译

### 到ES5的转换器

最开始先讲一下TypeScript的转换，因为我觉得这对TypeScript的理解很有好处，而且也适合边学边用。

通常来讲，我们会将TypeScript代码转换到ES5代码，唯一的一个转换器是由TypeScript核心团队编写的，也集成到[typescript](https://www.npmjs.com/package/typescript)包当中。将`ES6`转换到`ES5`，通常使用社区创建的[`Babel`](http://babeljs.io/)。

所以，为了转译typescript，我们需要安装:

```bash
$ npm install -g typescript
```

然后，我来创建一个`test.ts`文件。

```ts
//test.ts
let arr:number[] = [1,2,3];
arr.map(n => n**2);
```

> 第一行我使用了标准的typescript语法，第二行使用了ES6语法。

然后，我们在控制台执行下面的命令:

```bash
$ tsc test.ts
```
在同目录下，我们可以看到生成的一个`test.js`文件夹。打开文件查看代码:

```js
//test.js
var arr = [1, 2, 3];
arr.map(function (n) { return Math.pow(n, 2); });
```

已经转换成标准的ES5代码。

### 升级版Node

Node并不支持所有的TypeScript特性，所以我们没办法来使用Node对TypeScript进行编译。

有位大神编写了一个小工具，叫做[`TSUN`](https://github.com/HerringtonDarkholme/typescript-repl)(TypeScript Upgraded Node)。类似于一个升级版的Node，提供控制台程序书写。

```bash
$ npm install -g tsun
```

然后我们可以启动它。

```bash
$ tsun
TSUN : TypeScript Upgraded Node
type in TypeScript expression to evaluate
type :help for commands in repl

> let arr:number[] = [1,2,3];
undefined
> arr.map(n => n**2);
[ 1, 4, 9 ]
```

哎哟，不错哦。不过我看他的`readme.md`，好像目前只支持到typescript 2.0。

### VSCode上配置typescript + nodejs 开发环境

这个听起来也好棒，不过并非我想折腾的。所以，需要的伙伴们可以参看这个链接: [Click me](https://github.com/nshen/ts-node-vscode-starter)

---

## TypeScript的特性

虽然我们总说TypeScript是ES6的超集，但这里所说的很多，还是相对ES5的改善，其中很多在ES6中已经得到了实现，为此我会特别说明。包括:

+ [类型](#类型)
+ [函数](#函数)
+ [类](#类)

### 类型

TypeScript的一个非常非常棒的功能就是: 通过向JavaScript增加可选的静态类型声明来把JavaScript变成强类型的程序语言。而且，TypeScript的类型检查在编译器进行并且没有运行时开销。

> 虽然有时候，我们会觉得缺乏类型检查正是JavaScript的优点之一。但这是仁者见仁，智者见智的。某些情况下，类型检查有其需要的原因，比如便于代码书写，预防编译期的bug；比如有助于代码阅读。

当然，TypeScript的类型是可选的，你并不一定都需要加上。

| 类型 | 举例 | 描述 |
|:---:|:--:|:---:|
| boolean | let isDone: boolean = false; | 空 |
| number | let decimal: number = 6; | 所有的数字都是浮点数，这些浮点数都是number类型，支持多种进制 |
| string | let color: string = 'blue'; | 表示文本，也可以使用双引号 |
| array | let list: number[] = [1,2,3]; | 第二种写法可以使用泛型数组类型 var list: Array<number> = [1,2,3]; |
| tuple | let x: [string, number]; x=['hello', 10]; | 元组类型允许表示一个已知元素数量和类型的数组 | 
| enum | enum Color {Red, Green, Blue}; let c: Clor = Color.Green; | enum给一个数字集合更好的命名，默认从0开始，可手动改变|
| any | let notSure: any = 4; | 可以表示任意的JavaScript值 |
| void | function warnUser(): void {...} | any的对立面，在函数中使用表示没有返回值。对一个变量使用void类型没啥意义，因为你可以直接赋值undefined或null |
| null | let n: null = null; | 一个字面量，表示没有值的变量，其他类型的子类型，意味着你可以将它赋值给一个number类型的变量 |
| undefined | let u: undefined = undefined; | 全局作用域的一个属性，表示经声明但未被初始化的变量，也是其他类型的子类型 |
| never | 空 | never类型表示那些永远不存在的值的类型。是任何类型的子类型 |

> `let`和`const`已被ES6所支持，可以这样说，尽可能的使用`let`是一个最佳实践。

TypeScript当然也支持模板字符串(template string)。模板字符串可以表示多行文本和内嵌表达式。

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

#### Type assertions

类型断言指的是某些特殊情况下，你知道一个变量(实体)具有比它现有类型更确切的类型，从而通过*类型断言*告诉编译器。比如，我们有一个变量具有`any`类型。但是，作为程序员，我知道该变量存储的字符串。

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

这是一种*尖括号*语法来表示类型断言，有点类型于其他语言的类型转换。还有一种是使用`as`语法。

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

### 高级类型

#### Intersection Types

Intersection types是将多种类型合并成一种类型。这可以把现有多种类型叠加一起成为一种类型，它包含了所需的所有类型的特性。使用`&`。

#### Union Types

Union types用来声明那些可以存储多种类型值的变量。比如，有一个变量既可以是`number`类型，也可以是`string`类型。

```ts
let value: string | number;
value = 'xiaokedada.com'; // ok
value = '10'; // ok
```

#### Type Guards and Differentiating Types

#### Type Aliases

TypeScript使用`type`关键字声明类型别名。

```ts
type name = string;
let a: name = 'maoxiaoke';
```

### 函数

#### 为函数定义类型

函数类型包含两个部分: 参数类型和返回值类型

```ts
//具名函数
function add(x: number, y: number): number {
    return x + y;
}
//函数表达式(匿名函数)
let myAdd = function(x: number, y: number): number { return x+y; };
```

下面，我们来看函数本身的类型。

```ts
let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x+y; };
// 拆解
let myAdd: (x:number, y:number) => number;
myAdd = function(x: number, y: number): number { return x+y; };
```

这里使用了`=>`符号，并对匿名函数进行了拆解。第四行声明了变量`myAdd`的类型(接受两个`number`类型参数并返回`number`类型值的函数类型)。第五行也可以写成`myAdd = function(x, y) { return x+y; };`，因为有了第四行，TypeScript可以进行简单的类型推断。

#### 默认参数

TypeScript里的每个函数参数都是必须的。这意味着，传递给一个函数的参数个数必须与函数期望的参数个数一致。在TypeScript里，我们可以为参数提供一个默认值。这个值在用户灭有传递这个参数或传递的值为`undefined`时触发。

```ts
//参数放在参数列表后面
function bulidName (firstName: string, lastName: string = "Mao"){
    return firstName + " " + lastName;
}
//参数不放在参数列表后面
function bulidName (firstName = "xiaoke", lastName: string){
    return firstName + " " + lastName;
}
```

像第二种情况，你必须明确传入`undefined`值来获得默认值。

#### 可选参数

在JavaScript中，每个参数都是可传可不传的。没有传递的时候值就是`undefined`。TypeScript使用`?`实现该功能。

```ts
function bulidName (firstName: string, lastName?: string){
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
}
```

#### 剩余参数

使用过JavaScript的程序员都知道，可以向函数传入随意个数的参数，然后使用`arguments`来访问所有传入的参数就好。而TypeScript这样搞，恐怕我们会生气。所以呢，TypeScript也有办法: 把所有的参数收集到一个变量数组里。

比如，我们想定义一个加法运算，输入任意数量的加数。

```ts
function add (...foo: number[]) : number {
    let result = 0;
    return foo.reduce((acc,val) => acc+val);
}
```

#### 函数重载

JavaScript中，函数是没有重载的。但是TypeScript严格函数参数，所以存在重载。

```ts
function test (name: string) : string;  //重载签名
function test (age: number) : string;  //重载签名
function test (single: boolean) : string;  //重载签名

function test (value: (string | number | boolean)): string {  //实现
    ...
}
```

### 类

之前的版本中，JavaScript是基于*原型*的面向对象，在ES6中，类已经作为一个重要属性添加到标准中了，也意味着，JavaScript也同时拥有基于*类*的面向对象。

一个使用类的TypeScript实例。

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
```

我们声明了一个`Greeter`类，这个类有三个成员: 一个叫`greeting`的属性，一个构造函数和`greet()`方法。这三者在很多基于类的面向对象语言中都很好理解。

#### 继承

类中的继承，TypeScript使用`extends`关键字实现。

```ts
class Animal {
    ....
}
class Snake extends Animal {
    ...
}
```

#### 修饰符

默认为`public`，当成员被标记为`private`是，它就不能在声明它的类的外部访问。标记为`protected`成员在派生类中可以被访问。

`readonly`关键字可以将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

#### 存取器

TypeScript支持通过`getters`和`setters`来截取对对象成员的访问。举个栗子。

```ts
let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
```

未完待续。