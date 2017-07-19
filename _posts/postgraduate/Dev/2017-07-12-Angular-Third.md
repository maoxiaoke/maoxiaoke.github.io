---
layout: post
title: "Angular4第三课 -- 从Heroes的栗子看Angular"
date: 2017-07-12 09:00:00 +0800 
categories: 研究生涯
tag: Angular
---
* content
{:toc}

Angular系列教程:

+ [Angular4第一课 -- 启动]({{ '/2017/07/04/First-Meet-Angular' | prepend: site.baseurl }})
+ [Angular4第二课 -- 基本概念解析]({{ '/2017/07/06/Angular-Second' | prepend: site.baseurl }})

为了学习Angular，实现了主页教程的`Heroes`例子。代码放在仓库[Angular4-heroes](https://github.com/maoxiaoke/Angular4-heroes)下。但是，希望写单独为此写一篇的目的在于，这是一个非常好的例子，通过这个例子，我们可以详细地了解Angular有关**表单**、**服务**、**注入**、**HTTP**、**路由**等概念，所以非常值得初学者学习。

<!-- more -->

## 表单

在我们的hero-detail组件中，我们有一个双向绑定的输入框。

```html
<!--hero-detail.component.html-->
<div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
</div>
```

表面上看，表单似乎很简单: 创建一个`<input>`标签，用户填入数据，然后点击提交。但是很多商业用途上，我们可能需要对内容进行验证，轻松地测试表单，同时在页面和服务器端修改这份数据等等，都意味着需要一个很好的解决方案。

Angular通过三个方面来解决这个问题:

+ 表单控件 封装表单输入
+ validator 验证器，验证表单输入
+ observer 监听表单变化并做出回应

创建表单的方式有两种，一种*模板驱动的表单*(Template-driven forms)，另一种是*响应式表单*(reactive or mode-driven forms)。我们先对对一种方式进行介绍。

### 引入表单

```js
//app.ts
import { FormsModule } from '@angular/forms'
```

然后将它加入到`@NgModule`中。

```js
@NgModule({
  ...
  imports: [
    BrowserModule,
    FormsModule
  ]
  ...
})
```

### 一个例子

为了介绍表单，我们引入一个这样的例子:

```html
<h1>Hero Form</h1>
<form (ngSubmit)="onSubmit(heroForm.value)" #heroForm="ngForm">
  <div class="form-group">
    <label for="name">Name</label>
      <input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name" #name="ngModel">
      <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
          Name is required
      </div>
  </div>
  <button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">Submit</button>
</from>
```

#### 模板驱动的指令

上面的栗子中，我们看到两个模板驱动的指令:

+ **NgForm** 注意，Angular做了一件非常隐晦的事，就是当我们导入FormsModule时候，NgForm就会被自动附加到视图中所有的`<form>`标签上(仔细想想着很可怕呀)。它会控制那些带有`ngModel`指令和`name`属性的元素，监听它们的属性。这个指令给我们提供了两个东西。
  + 一个叫做`ngForm`的`FormGroup`对象
  + 一个输出事件`(ngSubmit)`

`#heroForm="ngForm"`表示了一个引用，也就是为`ngForm`创建了一个别名，绑定到了`#heroForm`，这样我们就可以在上下文中使用这个变量了。上面提到，这个变量是`FormGroup`对象，`FormGroup`是Angular中基本的表单对象。`heroForm.value`会以键值对的方式返回FormGroup中所有控件的值。

`<form (ngSubmit)="onSubmit(heroForm.value)" #heroForm="ngForm">`这行代码总结起来，就是当我提交表单时，就会以该表单的值作为参数，调用组件实例上的onSubmit方法。

+ **ngModel** 它实现了双向绑定。此外，它还有更多控制权，可以用来跟踪修改状态和有效性验证，比如控件是否有效(vaild/invaild)、控件的值是否变化(dirty/pristine)、控件是否被访问过(touched/untouched)。

ngModel是NgModel指令指定的selector。NgModel会创建一个新的`FormControl`对象，把它自动添加到父`FormGroup`上。FormControl也是一个表单对象(就是input对象)，多个FormControl就形成了FormGropt对象(也就是form表单对象)。**这种关联是通过input元素的name属性**，Angular表单用它注册控件(就是FormControl)。通常，我们使用name属性进行有效性验证和表单元素的变更进行追踪。

---

## 多个组件通信

> 小窍门，使用命令生成组件的方法: `ng generate component componentName`

我们回到Heroes这个例子上来。组件的目的不言而喻，就是为了代码复用。但是当我们有了很多的组件，父组件和子组件，子组件和子组件之间的通信又该怎么办呢。比如，我们有一个父组件是这样的:

```html
//app.component.html
<hero-detail [hero]="selectedHero"></hero-detail>
```

`hero`是子组件`HeroDetailComponent`(官方建议组件的命名使用大驼峰)的一个属性，`selectedHero`是父组件`AppComponent`的一个属性。这是一种*属性绑定*的方式。数据流的方式是`selectedHero -> hero`。

子组件通过`@Input`接收父组件穿过来的数据。首先，我们要导入`Input`。

```ts
//hero-detail.component.ts
import { Component, Input } from '@angular/core';
```

然后，在`hero`属性前面加上`@Input`装饰器，来表明它是一个输入属性。

```ts
//hero-detail.component.ts
...
export class HeroDetailComponent {
  @Input() hero: Hero;
}
```

---

## 服务

在Heroes这个例子中，我们的英雄数据会被多个组件共享，还有一些方法呀，比如`getHero()`、`update()`等等也会被多个组件共享。则我们的想法是，创建一个可以被多个组件共享的服务类，用来存放共享的英雄数据和方法。

> 窍门，使用命令生服务的方法: `ng generate service serviceName`

### 创建服务

这个例子中，我们创建了一个`HeroService`服务。

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
}
```

我们导入了`Injectable`函数，并作为`@Injectable()`装饰器使用了这个函数。

### 导入服务

创建服务的目的是为了在多个组件中使用它。首先，我们要在AppModule中导入它，以便我们所有组件都能使用它。

```ts
//app.module.ts
import { HeroService } from './hero.service';
```

此外，我们还要注册一个HeroService提供商，来告诉注入器如何创建HeroService。为此，我们在AppModule添加providers数组属性。

```ts
//app.module.ts
@NgModule({
  ...
  providers: [HeroService]
  ...
})
```

现在，在需要服务的组件中注入HeroService服务。方法是，添加一个构造函数，并定义一个私有属性。比如，在HeroesComponent注入HeroService服务。

```ts
//heroes.component.ts
export class HeroesComponent implements OnInit {
  ...
  constructor(private heroService: HeroService) { }
}
```

---

## 路由

> Routing is another name for navigation. The router is the mechanism for navigating from view to view<sup>[来源](https://www.angular.cn/docs/ts/latest/tutorial/toh-pt5.html)</sup>.

所以说，路由这个概念其实很简单，说就是相对或绝对地址都不为过。

为什么需要路由呢？路由告诉路由器，当用户点击链接或者直接把URL黏贴到浏览器地址栏时，应该显示哪个视图。使得不同组件之间通过路由器进行导航。对于Angular应用，你就算不使用路由也可以变换“页面”。但是所有的页面都使用同一个URL，后果就很严重。比如，刷新后无法保留位置，无法分享当前页面URL，不方便为页面添加书签等等。所以，路由时非常有必要的。

Angular路由器是一个可选的外部`Angular NgModule`，叫`RouterModule`。路由器包含了多种服务(RouterModule)、多种指令(RouterOutlet、RouterLink、RouterLinkActive)、 和一套配置(Routes)。

### 基地址

打开`index.html`，`<head>`区顶部有一个`<base href="/">`元素。

路由器使用浏览器`history.pushState`进行导航。往`index.html`中添加`<base href>`元素，引用CSS文件、脚本和图片时，浏览器会用`<base href>`的值作为**相对URL**的前缀。

```html
<!--html-->
<head>
  <base href="/">
```

### 配置路由

单独将路由放入AppModule当然是可以了，但是我们为了不让根模块看上去太复杂，可以单独创建一个`app-routing.module.ts`。然后我们引入路由，这个路由模块如下。

```ts
//app-routing.module.ts
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

有以下特点:

+ 路由模块将路由抽出到一个变量中。
+ 添加RouterModule.forRoot(routes)到imports。
+ 把RouterModule添加到路由模块的exports中，以便关联模块(比如AppModule)中的组件可以访问路由模块中的声明，比如RouterLink 和 RouterOutlet。
+ 没有declarations。
+ 如果有守卫服务，把它们添加到本模块的providers中。

这里，我们主要看Routes定义的数组，它包括了路由的定义:

+ **Path**: 路由器会用它来匹配浏览器地址栏中的地址
+ **Component**: 导航到此路由时，路由器需要创建的组件

另外注意的是，我们使用了`forRoot()`方法，因为我们是在应用根部提供配置好的路由器。forRoot()方法提供了路由需要的路由服务提供商和指令，并基于当前浏览器URL初始化导航。

### 将路由器加入AppModule

只有将路由模块加入AppModule我们才能使用它。

```ts
import { AppRoutingModule } from './app-routing.module';
...
@NgModule({
  imports: [
    AppRoutingModule
  ]
  ...
})
```

### 路由出口和路由链接

举个例子，如果我们把路径`/heroes`粘贴到浏览器的地址栏，路由器会匹配到'Heroes'路由，并显示HeroesComponent组件。 我们必须告诉路由器它位置，所以我们把`<router-outlet>`标签添加到模板的底部。 **RouterOutlet是由RouterModule提供的指令之一**。 当我们在应用中导航时，路由器就把激活的组件显示在`<router-outlet>`里面。

我们当然不会真让用户往地址栏中粘贴路由的URL 而应该在模板中的什么地方添加一个锚标签。点击时，就会导航到HeroesComponent组件，这里我们使用路由器链接。

通常，我们使用AppComponent作为导航。所以，在其模板文件中，我们要添加这两个指令。

```html
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
  <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
</nav>

<router-outlet></router-outlet>
```

### 参数化路由

其实在上面我们都看到了，有一个路由器是这样写的。

```ts
  { path: 'detail/:id', component: HeroDetailComponent }
```

这其实就是一个带参数的路由，`:id`是一个占位符，当导航到这个HeroDetailComponent组件时，它将被填入一个特定英雄的id。

> 具体内容有点复杂，好像涉及到ActivatedRoute服务。这里暂时省略。

---

## 生命周期钩子

每个组件都有一个被Angular管理的生命周期。Angular提供了生命周期钩子，把这些关键生命时刻暴露出来，赋予我们在它们发生时采取行动的能力。除了那些组件内容和视图相关的钩子外,指令有相同生命周期钩子。

然而，我们最常见的还是`ngOnInit()`。按照官方的说法:

> ngOnInit用于在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。

也就是，在开发中我们经常在ngOnInit做一些初始化的工作，而这些工作尽量要避免在constructor中进行，constructor中应该只进行依赖注入而不是进行真正的业务操作。