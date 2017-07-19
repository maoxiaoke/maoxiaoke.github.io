---
layout: post
title: "Angular4第一课 -- 启动"
date: 2017-07-04 09:00:00 +0800 
categories: 研究生涯
tag: Angular
---
* content
{:toc}

Angular系列教程:

+ [Angular4第二课 -- 基本概念解析]({{ '/2017/07/06/Angular-Second' | prepend: site.baseurl }})
+ [Angular4第三课 -- 从Heroes的栗子看Angular]({{ '/2017/07/12/Angular-Third' | prepend: site.baseurl }})

> One framework. Mobile & desktop.<sup>[来源](https://angular.io/)</sup>

而Angular是什么呢？我看到这句话

> Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges.<sup>[来源](https://angular.io/docs)</sup>

上面说，Angular是一个框架，还整合了声明式模板、依赖注入和端对端工具。具体点呢？

<!-- more -->

> Angular is a framework for building client applications in HTML and either JavaScript or a language like TypeScript that compiles to JavaScript.<sup>[来源](https://angular.io/guide/architecture)</sup>

这一段的描述就很到位了。告诉我们，**Angular是使用HTML和JavaScript来构建客户端(前端)应用的框架**。

之前有写过AngularJS相关的博客，但是被我一直雪藏在_drafts中。最近开始感觉，Angular经过重构之后，又开始焕发新生了。

新一版只以Angular命名，以区分旧版AngularJS，新版的每次更新都冠以数字后缀，社区目前已经更新到Angualr 4.0版本，这篇博客也是在这个版本的基础之上的。

Angular整合了TypeScript，但这并不意味着你一定需要使用TypeScript，但是它能极大地提高开发效率，所以也是非常建议的。

Angular的学习可能会分成好几节来介绍，这一节主要介绍非常非常简单的概念和起步的内容。


学了Angular，还是非常建议[官方网站](https://angular.io/)。

## 起步

开始使用Angular，首先要安装Node和npm，这个不赘述。然后安装TypeScript。

然后，安装命令行工具。

### 安装@angular/cli

Angular4中命令行工具版本名称为`@angular/cli`。旧版angular-cli已经被移除或建议弃用。

```bash
λ npm install -g @angular/cli
```

### 创建一个新项目

我们使用下面的命令来创建一个Angular应用，并生成相应的骨架。

```bash
λ ng new angular-hello-world
```

你会看到如下信息:

```text
installing ng
  create .editorconfig
  create README.md
  create src\app\app.component.css
  create src\app\app.component.html
  create src\app\app.component.spec.ts
  create src\app\app.component.ts
  create src\app\app.module.ts
  create src\assets\.gitkeep
  create src\environments\environment.prod.ts
  create src\environments\environment.ts
  create src\favicon.ico
  create src\index.html
  create src\main.ts
  create src\polyfills.ts
  create src\styles.css
  create src\test.ts
  create src\tsconfig.app.json
  create src\tsconfig.spec.json
  create src\typings.d.ts
  create .angular-cli.json
  create e2e\app.e2e-spec.ts
  create e2e\app.po.ts
  create e2e\tsconfig.e2e.json
  create .gitignore
  create karma.conf.js
  create package.json
  create protractor.conf.js
  create tsconfig.json
  create tslint.json
Installing packages for tooling via npm.
```

请稍等(不是片刻，是很长一段时间，因为它在安装依赖)。一旦安装结束，就会看到一条成功信息。

### 运行这个应用

我们运行以下命令:

```bash
λ ng serve --open
```

> `--open`或`-o`这个选项指的是完成后直接打开浏览器，并定位到`http://localhost:4200/`。

打开浏览器，输入地址http://localhost:4200/。你会看到如下结果。

![angular]({{ '/styles/images/angular/angular.png' | prepend: site.baseurl }})

---

## 骨架

仔细研究文件骨架对我们理解整个应用有很多好处。首先，是我们的`src`文件夹。

### src 文件夹

所有的应用程序代码应该位于这个文件夹下。所有的Angular组件、模板、样式、图片以及你的应用所需的任何东西都处于这个文件夹。而这个文件夹之外的文件都是为构建应用提供支持的。它的结构如下:

```text
│  favicon.ico
│  index.html
│  main.ts
│  polyfills.ts
│  styles.css
│  test.ts
│  tsconfig.app.json
│  tsconfig.spec.json
│  typings.d.ts
│
├─app
│      app.component.css
│      app.component.html
│      app.component.spec.ts
│      app.component.ts
│      app.module.ts
│
├─assets
│      .gitkeep
│
└─environments
        environment.prod.ts
        environment.ts
```

用途如下:

| File | Purpose |
|:---:|:---:|
| app/app.compoent.{ts,html,css,spec.ts} | **根**组件。使用HTML模板/CSS/单元测试定义的`AppComponent`组件，随着应用成长会变成一棵*组件树*的根节点 |
| app/app.module.ts | 定义`AppModule`，**根**模块，用来声明组件和组装应用 |
| assets/* | 这个文件夹可以放任何东西，在构建应用时，会全部拷贝到发布包里 |
| environments/* | 这个文件夹包括为各个目标环境准备的文件，导出一些应用中要用到的配置变量 |
| favicon.ico | 你可以换成自己喜欢的图标 |
| index.html | 别人访问网站所看的主页面的html文件，大多数情况下不用编辑它。在构建应用时，CLI会自动把所有js和css文件添加进去，所以你不必在这里手动添加任何`<script>`或`<link>`标签 |
| main.ts | 应用的主要入口点 |
| polyfills.ts | 补丁 |
| styles.css | 全局样式，大多数情况下，希望在组件内的css文件中使用样式，但全局样式还是该放在这里 |
| test.ts | 单元测试的主要入口 |
| tsconfig.{app,spec}.json | TypeScript编译的配置文件。前者为应用准备，后者为单元测试准备 |

### 根目录

根目录下除`src`外的文件是用来构建、测试、维护、文档化和发布应用的。和`scr`放在同意目录下，表示他们是同级生。

```text
│  .angular-cli.json
│  .editorconfig
│  .gitignore
│  hello.txt
│  karma.conf.js
│  package.json
│  protractor.conf.js
│  README.md
│  tsconfig.json
│  tslint.json
│  
├─e2e
│      app.e2e-spec.ts
│      app.po.ts
│      tsconfig.e2e.json
└─src
```

用途如下:

| File | Purpose |
|:---:|:---:|
| e2e/* | 端到端(End-to-End)测试 |
| .angular-cli.json | Angular CLI配置文件 |
| .editorconfig | 给编辑器看的一个简单配置文件 |
| .gitignore | Git的配置文件 |
| karma.conf.js | 给Karma的单元测试配置，运行`ng test`会用到 |
| package.json | npm配置文件 |
| protractor.conf.js | 给Protractor使用的端到端测试配置文件 |
| README.md | 项目基础文档 |
| tsconfig.json | TypeScript编译器的配置 |
| tslint.json | 给TSLint和Codelyzer用的配置信息，运行`ng lint`会用到 |

### 应用是如何启动的

在上面，我们知道，我们使用下面的命令来启动一个Angular应用:

```bash
λ ng serve
```

每个应用都有一个入口点，而Angular是如何映射的呢？

> 我们的应用是使用Angualr CLI构建的，而这个CLI是基于Webpack。

当我们运行该命令，首先，ng为查阅`angular-cli.json`文件，在上面的解释中，我们知道这个文件是Angular CLI的配置文件，我们试图在这个文件中找到应用的入口。我们查看该文件的具体内容:

```json
//angular-cli.json
...
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
...
```

可以看到，入口文件就是`main.ts`。这与我们描述的所一致。

然后，我们打开`main.ts`，看看有什么:

```ts
//main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; //look here
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule); //and look here
```

我们又发现，这个应用的入口点会*bootstrap*(引导)一个根模块`AppModule`。而在第五行，说明这个根模块是由`./app/app.module.ts`文件提供的。

我们知道，`AppModule`是用来声明组件和组装应用的。让我们打开`app.module.ts`文件，看看它是怎么做到的。

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

欸！！！这里有一个`@NgModule`。NgModule是Angular的一个模块系统，当引导一个应用时，不是直接引导一个组件，而是创建一个`NgModule`，它指向你要加载的组件。

这个注解@NgModule有三个属性:

+ `declaraitons` 指定了该模块中定义的组件，我们这个初始程序只有一个根组件，就是AppComponent
+ `imports` 描述了该模块有哪些依赖。我们正在创建一个浏览器应用，因此导入了BrowserModule
+ `bootstrap` 告诉Angular，当使用该模块引导应用时，将谁加载为顶层组件。这里我们只有一个组件，就是AppComponent

然后，我们看第五行，我们的这个`AppComponent`组件是由`./app.component.ts`文件提供的。而`./app.component.{ts,html,css}`就会渲染出我们的页面。

到现在为止，整个启动过程就结束了。啧啧啧，好厉害的样子。