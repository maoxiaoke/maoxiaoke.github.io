---
layout: post
title: "Angular4第二课 -- 基本概念解析"
date: 2017-07-06 09:00:00 +0800 
categories: 研究生涯
tag: Angular
---
* content
{:toc}


Angular系列教程:

+ [Angular4第一课 -- 启动]({{ '/2017/07/04/First-Meet-Angular' | prepend: site.baseurl }})
+ [Angular4第三课 -- 从Heroes的栗子看Angular]({{ '/2017/07/12/Angular-Third' | prepend: site.baseurl }})

上一节中主要是介绍了Angular的启动和命令。这一节仍然是介绍基础概念，而且，而且，而且(重要的事情说三遍)，这一节也主要参考[官网的这篇文章](https://angular.io/guide/architecture)，所以呢，大致会一样。

<!-- more -->

## 架构

总的架构可以用下面这张图来表示。主要包括8大块。

![Angular总架构](https://www.angular.cn/resources/images/devguide/architecture/overview2.png)

> 图片[来源](https://www.angular.cn/docs/ts/latest/guide/architecture.html#!#component-code)

+ [模块](#模块)
+ [组件](#组件)
+ [模板](#模板)
+ [元数据](#元数据)
+ [数据绑定](#数据绑定)
+ [指令](#指令)
+ [服务](#服务)
+ [依赖注入](#依赖注入)

---

## 模块

模块 -- Module

![模块](https://www.angular.cn/resources/images/devguide/architecture/module.png)

### Angular模块系统: NgModule

Angular应用是模块化的，模块将应用组织成多个内聚的功能块。Angular模块是带有`@NgModule`装饰器函数(decorator function)的类。

> 装饰器是什么东西? 有些中文参考书上也译为*注解*，它实际上是用来修饰(modify)JavaScript类的函数。它们负责把[元数据](#元数据)附加到类上，以了解那些类的意图以及它们是如何工作的。

来来来，同志们。我们来看看，为什么我们说Angular模块是带有`@NgModule`装饰器函数的类。首先，我们将这句话简化，就是**模块是类**。还是我们第一节的例子。

```ts
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

最后一行，其实我们有`export`一个类`AppModule`(也就是一个根模块)。这个类带有一个`@NgModule`装饰器函数，接收一个[元数据](#元数据)对象(`{...}`的部分)。这个对象告诉Angular如何编译和运行模块代码。有以下重要的属性:

+ `declarations` - 本模块的*视图类*(view classes)，包括组件、指令和管道。
+ `exports` - declarations的子集，可用于其他模块的组件模板
+ `imports` - 本模块声明的组件模板需要的类所在的其他模块。这个数组中应该只有NgModule类。因为应用运行在浏览器中，所以都需要@angular/platform-browser里的BrowserModule。
+ `providers` - 服务的创建者
+ `bootstrap` - 根组件，是其他视图的宿主。只有根模块才能设置这个属性

### Angular模块 vs. JavaScript模块

上面说过。Angular模块是带有`@NgModule`装饰器函数(decorator function)的类。

JavaScript中的模块，是用来管理一组JavaScript对象，比如，每个文件就是一个模块。它和Angular的模块是不一样的。

### Angular模块库

Angular提供了一组JavaScript模块，可以看作是自带模块或者库模块。都带有`@angular`前缀，用npm安装它们。

比如上面的例子:

```ts
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
```

`BrowserModule`是一个Angular模块，`@angular/platform-browser`是一个Angular库。`NgModule`装饰器，`@angular/core`是个核心库。

---

## 组件

组件 -- Components

我们可以将组件理解为一种教**浏览器认识新HTML标签**的方式。它控制屏幕上的一小块区域，这一小块区域，就是*视图*(view)。组件就是通过一些由属性和方法组成的API与视图交互。看一下根组件的定义:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

每一个组件都由三部分组成的:

+ 组件装饰器(@Component)
+ 视图
+ 控制器

组件装饰器里的对象属性称之为[元数据](#元数据)，配置组件如何与外界交互。有以下主要属性:

+ selector: 指定当HTML模板被渲染时Angular如何找到组件
+ templateURl: 配置组件所用的HTML模板，这是一个单独的文件。有时候模板很短，就像放在这里，可以使用`template`属性，然后使用模板字符串。

组件的控制器就是一个JavaScript类定义的，比如AppComponent类。

---

## 模板

模板 -- Templates

通过组件自带的模板来定义组件视图。模板以HTML形式存在，告诉Angular如何渲染组件。比如，`./app.component.html`就是一个模板文件。

---

## 元数据

元数据 -- Metadata

通过上面的解释，元数据恐怕大家也理解了。它告诉Angular**如何处理一个类**。元数据通常使用在装饰器函数中，比如上面提到的`@Component`和`@NgModule`装饰器函数。以上面这个栗子为例。

首先，`AppComponent`真的只是一个简简单单的类，一点Angular的痕迹都没有，直到我们使用了`@Component`装饰器函数，添加了元数据，才告诉Angular这是一个组件。元数据告诉Angular从哪里获取你为组件指定的主要构建块。

![template-metadata-component](https://www.angular.cn/resources/images/devguide/architecture/template-metadata-component.png)

模板、元素据和组件共同渲染了一个视图(view)。

还有些其他元数据装饰器类。比如`@Injectable`、`@Input`和`@Output`。

---

## 数据绑定

数据绑定 -- Data bingding

我们来看这张图:

![数据绑定](https://www.angular.cn/resources/images/devguide/architecture/databinding.png)

数据绑定有四种形式，这四种形式要么绑定到DOM，要么绑定自DOM或者双向绑定。

+ `((value))` 叫插值表达式(interpolation)，在DOM中显示组件的value值。注意，我这里用`((value))`代替使用大括号`{}`，实在有难言之隐。看上面的图可好。
+ `[property] = "value"` 叫属性绑定(property binding)
+ `(event) = "handler"` 叫事件绑定(event binding)
+ `[(ng-model)] = "property"` 叫双向数据绑定(two-way binding)

上面的这些都属于模板语法的内容。

数据绑定的重要性表现在**模板与对应组件的交互**中。

![component-databinding](https://www.angular.cn/resources/images/devguide/architecture/component-databinding.png)

也表现在**父组件与子组件**的通信中。

![parent-child-binding](https://www.angular.cn/resources/images/devguide/architecture/parent-child-binding.png)

---

## 指令

指令 -- Directives

Angular模板时动态的。当Angular渲染它们时，会根据指令提供的操作对DOM进行转换。正如我们开始提供的那张架构图，通过指令我们可以改变视图。

> 严格来说，组件就是一个带模板的指令。但是它特别独特，所以我们不这么叫它。

指令分为两种: 一种结构型(strctural)，一种属性型(attribute)。

+ 结构型指令通过在DOM中添加、移除和替换元素来修改布局
  + `*ngFor`
  + `*ngIf`
  + `*ngSwitch`
+ 属性型指令修改一个现有元素的外观或行为
  + `ngModel`
  + `ngStyle`
  + `ngClass`

> 一般的结构型指令有一个`*`前缀。

---

## 服务

服务 -- Services

嗯。人如其言，大概就是某种诡秘的存在吧。

---

## 依赖注入

依赖注入 -- Dependency injection

什么是依赖？当我们遇到模块需要相互通信的情况，当模块A需要模块B才能运行时，我们就说B是A的依赖。获取依赖的最常见的方式之一就是直接导入(import)一个文件。

但还是会有些问题？？什么问题呢？？以后补充

依赖注入是一个这样的系统: 它让程序中的某部分可以访问其他部分，而且可以配置它们的访问方式。它算是一种设计模式，是基于一项被称为*控制反转*的设计原则。

依赖注入，会在以后介绍。