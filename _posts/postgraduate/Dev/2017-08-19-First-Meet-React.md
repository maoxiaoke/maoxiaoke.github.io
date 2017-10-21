---
layout: post
title: "React 初体验"
date: 2017-08-19 09:00:00 +0800 
categories: 研究生涯
tag: React
---
* content
{:toc}

> A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES. [来源](https://facebook.github.io/react/)

React 就是定义用户界面的 UI 库。

接着，我们要从**更高的一个立意**来理解 React。很自然的对比，就是 `jQuery vs React`。在使用 jQuery 时，设计的理念是*通过 CSS 规则找到一个元素，然后操纵这个节点做一些事情*，这是个非常容易理解的理念。但是，打一个比方，我们将一个应用比作建房子。那么如果使用 jQuery，就意味着你必须事无巨细地告诉它“如何去做”，这是很累的，因为 jQuery 是一个没有文化的建筑工人。

**React 专注于 view 层**。 它提供一个新的思维方式，就是关注**视图层的渲染**，将*如何去做*转变为*想要显示什么*。有一个公式可以表现：

<p align="center"><i>UI</i> = render(data)</p>

> 这里的 `render()` 应该是个 **纯函数**，这是个函数式编程的概念。只接收 data，然后进行用户界面的渲染。

所以，想要更新 UI，要做的就是更新 data，对应的就是 React 中的 state 的概念。

<!-- more -->

就像这样：

![jquery-style-vs-react-style]({{ '/styles/images/react/jquery-style-vs-react-style.png' | prepend: site.baseurl }})

> 图片来源: <http://mateoclarke.com/blog/2015/08/26/what-i-learned-react/>

综上，React 有什么特点呢?

+ 利用响应式 ([Reactive programming](https://en.wikipedia.org/wiki/Reactive_programming)) 思维来解决 UI 渲染的问题，代码偏向于声明式 (declarative)。
+ 使用可管理的小型组件构造出一个强大的应用。
+ 不需要花费时间寻找 DOM 节点，而是去维护应用的状态。

而如何进行快速渲染，才提出了 Virtual DOM 和 diff 算法。这是一种解决途径，view 层渲染才是目的。好了，在理解这些的基础上，我们可以开始 React 的介绍了。

## Hello World

首先需要获取一份 React 库的[源代码](https://github.com/facebook/react/releases)，或者直接使用网络 CDN，在 `<head>` 标签内引入。在我们的 Hello World 例子中，我们只引入 `react`、`react-dom` 和 `babel`。babel 用于转译 `JSX` 语法。第二步，在使用 JSX 的 `<script>` 标签中标明 `type="text/babel"`，用以确认 babel 转码。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
  </head>
  <script src="https://unpkg.com/react@latest/dist/react.js"></script>
  <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
  <body>
    <div id="app"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello World</h1>,
        document.getElementById('app')
      );
    </script>
  </body>
</html>
```

此外，你还可以通过 React 官方提供的 [`create-react-app`](https://github.com/facebookincubator/create-react-app) 进行项目构建，它其实就是一个脚手架工具。

---

## JSX 语法

上面的例子中，我们使用了 JSX 语法，这是一项完全独立于 React 的技术。我们需要通过 Babel 进行转译，Babel 可以转译最新的 JavaScript 语言特性，也支持转译 JSX。

> 有两个网站可以参考，一个是将 JSX 转译成 JavaScript 的网站: [babel](https://babeljs.io/repl)；另一个将 HTML 转为 JSX 语法: [HTML-to-JSX](http://magic.reactjs.net/htmltojsx.htm)

**JSX 的基本语法规则，遇到 `<` 就以 HTML 规则解析，遇到 花括号，就使用 JavaScript 语法解析。**

Babel 将 JSX 向下编译成 `React.createElement()` 调用。

```js
const element = (
    <h1 className="greeting">
    Hello World!
    </h1>
);
```

和下面的是一致的。

```js
const element = {
    'h1',
    {className: 'greeting'},
    'Hello World!'
};
```

### JSX 也是表达式

转译之后，JSX 表达式变成普通的 JavaScript 对象。这意味着你可以在 `if` 语句、`for` 循环中使用 JSX，可以将它作为参数传递，也可以返回。

```js
function getGreeting(user){
    if (user){
        return <h1>Hello, {user.name}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
```

### 自动分号补全

如果我们将 JSX 表达式进行多行书写，最好加上 `(...)` 以防止 **自动分号补全**。

```js
const element = (
    <div>
    <h1>Hello World!</h1>
    </div>
);
```

### 闭合标签

从上面的例子可以看到，HTML 中有些标签不强制闭合；但 JSX 中，所有标签都强制闭合。

### 使用 JSX 确定属性

1. 可以直接使用 字符串字面量
```js
const element = <div className="wrap"></div>
```
2. 或直接使用花括号包裹 JavaScript 表达式
```js
const element = <img src={user.name}></div>
```

有这么几点注意:

+ 无法使用 class 和 for 属性，因为这两者是 JavaScript 的保留字，使用 `className` 和 `htmlFor` 替代。
+ CSS 属性名使用 驼峰命名法。
+ 在花括号外部不能包含 `" "`，因为 JSX 会当作字符串字面量处理。
+ `style` 属性值是一个对象

```js
var styles = {
    fontSize: '2em', /*驼峰命名法*/
    lineHeight:'1.6'
};
const em = <em style={styles} />;  /*传递一个对象*/

/*也可以使用内联模式*/
const em2 = <em style={{fontSize:'2em', lineHeight:'1.6'}} />
```

### JSX 注释

为了防止 右边的花括号 被注释掉，建议在花括号内使用 `/*...*/` 注释代码。

### 展开运算符

这是个 ES6 的属性，当定义的时候，可以使用便捷方式。

```js
var attr = {
    href: 'http://xiaokedada.com',
    target: '_blank'
}
const element = <a {...attr}>Hello</a>
```

### 自定义组件需要首字母大写

如果一个元素类型以 小写字母 开始，会被认为是 内建组件，而传递给 `React.createElement`。如果是类似于 `<Foo />` 就会被传递到 `React.createElement(Foo)`。

```js
import React from 'react';
function HelloWorld() {
    return <Hello />
}
```

---

## ReactDOM.render()

`react-dom` 包提供应用最顶层的 DOM 方法。其中 `ReactDOM.render()` 是最常用的。这个方法在给定的 container 将一个 React 元素渲染到 DOM，返回一个 组件的引用(如果是无状态组件，返回 null)。

```js
ReactDOM.render(
  element,
  container,
  [callback]
)
```

+ 如果先前已经有 React 元素渲染到 DOM，会使用新的 React 元素更新。
+ 如果提供可选的 callback 函数，会在组件渲染或者更新之后执行。
+ 已经存在 container 中的 DOM 元素会第一次被 ReactDOM.render() 渲染的内容取代，之后的调用会采用 React's DOM diffing algorithms。
+ ReactDOM.render() 不会修改 container 节点，只修改它的子节点。

```js
<div id="app">
    <p>xiaoke love yuer</p>
</div>
<script type="text/babel">
    var e = ReactDOM.render(
    <h1> Hello World</h1>,
    document.getElementById('app')
    );
    console.log(e);
</script>
```

> `<div>` 内的内容被 ReactDOM.render() 渲染的内容取代。`console.log(e)` 打印的内容是 `<h1 data-reactroot=""> Hello World</h1>`。


ReactDOM.render() **是渲染 React 元素的方法**。上面就是我们渲染一个 `Hello World` 的例子。

同时，React 元素是 *不可变* 的。一旦你创建了元素，你就不可以改变它们的子元素(children)和特性(attributes)。

> 上面这个例子，React 元素指的是，`<h1 data-reactroot=""> Hello World</h1>`

```js
  <div id="app"></div>
    <script type="text/babel">
      function tick (){
        const element = (
          <div>
            <h1>xiaoke love yuer</h1>
            <p>It is now {new Date().toLocaleTimeString()}.</p>
          </div>
        );
        ReactDOM.render(
          element,
          document.getElementById('app')
        );
      }
      setInterval(tick,1000);
    </script>
```

我们用上面这个例子来解释一下刚才提到的第三点 - React's DOM diffing algorithms。这个例子中我们设置了一个 `setInterval()` 定时器，每隔 1s 调用 `tick()` 函数。也就是说，每隔一秒我们就会去重新渲染 UI，但是除了第一次会被 ReactDOM.render() 渲染的内容取代，之后的调用只替换其中需要更新的部分 - 也就是时间。这就是 diffing algorithms。算法的实现以后会具体讲。

---

## 组件 -- Components

> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation<sup>[来源](https://reactjs.org/docs/react-component.html)</sup>.

组件是什么，其实就是用来 *可重用* 的视图。从 React 的角度来讲，组件类似于 JavaScript 的 函数。接收 `props` 参数，返回一个 React 元素。

简单写法:

```js
function Hello (props) {
    return <h1>xiaoke love {props.name}</h1>
}
```

ES6 语法:

```js
class Hello extends React.Component {
    render() {
        return <h1>xiaoke love {this.props.name}</h1>
    }
}
```

### 渲染一个组件

下面是一个例子:

```js
class Hello extends React.Component {
    render() {
        return <h1>xiaoke love {this.props.name}</h1>
    }
}
const element = <Hello name="yuer" />;
ReactDOM.render(
    element,
    document.getElementById('app')
)
```

### props

组件可以接收属性，所有的属性都可以通过 `this.props` 对象获取。`this.props` 是只读的。

---

## 组件的生命周期

下面我们要介绍 `state`。state 是负责组件内部数据的。和 props 正好相反，props 是外部传递给组件的；但 state 完全私有，并且完全由组件控制。

组件渲染自身时用到的数据，当 state 发生变化时，会自动重建用户界面。目的在于，只需要关心数据的变化即可，而不需要关心界面变化了。

`state` 最好当作 只读属性。可以通过 `this.state` 取得 state，更新 state 时，需要使用 `this.setState()` 方法。

需要注意的是，`this.props` 和 `this.state` 是异步更新。

下面是一个例子：

```js
<script type="text/babel">
    class Clock extends React.Component {
      constructor(props){
        super(props);
        this.state = {date: new Date()};
      }
      render(){
        return (
        <div>
        <h1>xiaoke love yuer</h1>
        <p>It is now {this.state.date.toLocaleTimeString()}</p>
        </div>
        )
      }
      componentDidMount () {
        this.timerID = setInterval(
        () => this.tick(), 1000
        );
      }
      componentWillUnmount () {
        clearInterval(this.timerID);
      }
      tick (){
        this.setState({
        date: new Date()
        });
      }
    }
    ReactDOM.render (
        <Clock />,
        document.getElementById('app')
      )
</script>
```

1. 我们添加了一个 类构造器 给 `this.state` 赋初值(有时候可能会通过 props)。
2. 当 `<Clock>` 第一次渲染到 DOM，我们称之为 `mounting`，`componentDidMount()`方法
3. 我们还增加了一个 `componentWillUnmount()`，这个称之为 `unmounting`，在组件从 DOM 中移除时触发

我们来看一下，这个应用是怎么工作的。

+ `<Clock />` 传递给 `ReactDOM.render()`，React 调用 Clock 组件的构造器。因为 Clock 需要展示当前时间，所以初始化 `this.state`。
+ React 然后调用 Clock 组件的 `render()` 方法，然后更新 DOM。
+ 当 Clock 插入到 DOM，React 调用 `componentDidMount()` 生命周期钩子(hook)。在函数的内部，每秒调用 `tick()` 函数。
+ 在 `tick()` 函数内部，通过 `setState()` 来更新 UI，React 知道 state 已经改变。然后再次调用 `render()` 函数。这时候的 `this.state.date` 已经不同了，相对应地 React 更新 DOM。
+ 如果 Clock 组件从 DOM 移除了，React 调用 `componentWillUnmount()` 钩子，然后清除定时器。

至此，我们来总结一下：

React 组件的声明周期会经历三个过程：**Mounting**、**Updating** 和 **Unmounting**。

### Mounting

在 Mounting 阶段，组件的实例被创建，并插入到 DOM 当中。以下声明周期函数会被**依次**调用：

+ `constructor(props)` --- 构造器是 ES6 Class 的一个语法。`super(props)` 会先被调用，否则在 constructor 中 this.props 会得到 `undefined`。

并不是所有的组件都需要 constructor，比如*无状态组件*。目的在于：

1. 初始化 state
2. 绑定 this

在使用 `React.createClass()` 方法来创建组件类的时候，是需要 `getDefaultProps()` 和 `getInitialState()`。前者的返回值作为 props 的初始值，ES6 中被 `defaultProps`属性替代；后者的返回值用来用来初始化 this.state，ES6 中被 constructor 通过给 this.state 直接赋值替代。即：

```js
class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
      }
}
Clock.defaultProps = {
    return {data: new Date()};
}
```
`React.createClass()` 已经逐渐被官方抛弃，所以，请跟随时代。

+ `componentWillMount()` --- mounting 发生前一刻，即 `render()` 前一刻立即被调用。

所以，这个时候调用 this.setState() 修改状态也不会引发重新绘制。也因此这个钩子也没有很大的作用，很多事情都可以放到 constructor 去完成。

此外，它有一点需要注意：它是唯一可以在服务器端被调用的生命周期钩子。

+ `render()` --- `render()` 是必须的。

render() 是纯函数，调用的时候，完全根据 `this.props` 和 `this.state` 来返回：

1. React elements：通常是 JPX 返回的结构
2. String and numbers：被渲染成文本节点
3. Portals：由 ReactDOM.createPortal 创建
4. null ： 什么都不渲染
5. Booleans：什么都不渲染

同时，它也不会修改组件的 state，且只返回上述五者之一。

+ `componentDidMount()` --- 这个函数在**组件被挂载之后**被调用。注意的是，并不一定是在 `render()` 之后被调用，而是发生在组件被挂载之后。因为 `render()` 本身只返回一些对象而已，并不与浏览器交互，也就是说最后是由 React 库来决定是否挂载组件。

这个钩子的主要用途：

1. 需要 DOM 节点的进行初始化的操作 (什么意思？)
2. 初始化网络请求，比如 AJAX

需要注意的是，此处修改 state 的值会导致重新渲染。

### Updating

Updating 阶段，props 和 state 值的变化会导致重新渲染，以下生命周期函数会依次调用：

+ `componentWillReceiveProps(nextProps)` --- 当组件接收到新的 props 时会被调用。注意措辞，这意味着父组件渲染的时候，子组件也会经历这么一个更新的过程，不管父组件传递给子组件的 props 是否改变，但作为子组件，都有接收一个新的 props，该钩子函数就会被触发。

这个阶段可以处理的内容：

1. 通过比较 `this.props` 和 `nextProps` 来更新 state (调用 this.setState())

注意，调用 this.setState 一般不会触发 `componentWillReceiveProps()`

+ `shouldComponentUpdate(nextProps, nextState)` --- 大多数情况下，每次 state 的改变都会引发重新渲染，也就是 `shouldComponentUpdate()` 会返回 `true`。这是一种默认行为，大多数情况你需要依赖这种默认行为。这个钩子不会发生在组件的初次渲染或者 `forceUpdate()` 使用的情况下。

返回 `false` 就会阻止子组件的进一步渲染，后续的 `componentWillUpdate()`、`render()`、`componentDidUpdate()` 一概不会被调用。**但是，React 在未来可能对该周期函数有个较大的修改**。

`shouldComponentUpdate()` 使用得当，会提高 React 组件的性能。

+ `componentWillUpdate()` --- 在 `render()` 之前被调用 (初始渲染不会被调用)。

注意的是，你不应该在这里调用 `this.setState()`，也不能在 `shouldComponentUpdate()` 没有 return 之前做一些会使组件更新的操作(比如 redux action 调度)。相反，这些操作你都应该在 `componentWillReceiveProps()` 中进行。

+ `render()`

+ `componentDidUpdate()` --- 和 `componentDidMount()` 类似，在 updating 发生后执行。在这个生命周期内，可以：

1. 操纵 DOM
2. 发起网络请求

### Unmounting

Unmounting 对应于组件从 DOM 移除。主要调用 `componentWillUnmount()`。

+ `componentWillUnmount()` --- 组件从 DOM 卸载和销毁之前被调用。主要是：

1. 清除定时器
2. 取消网络请求
3. 清除在 `componentDidMount()` 阶段创建的 DOM 元素

### Error Handling

+ `componenetDidCatch()` --- 在渲染期，生命周期方法期或者 constructor 期间遇到 error 被调用。

---

## React 事件处理函数

第一，React 使用 **合成事件** 来消除浏览器之间的不一致情况(其实就是代码封装)。比如，事件对象 `e`，可以直接使用。阻止浏览器的默认行为，可以显式调用 `preventDefault`。
第二，React 事件命名使用 camelCase。比如，点击事件是 onClick。

---

## this

在 JavaScript，class 内部的方法并不会默认绑定(`this` 的绑定丢失情况)。所以，通常会使用 `bind()` 进行强绑定。有三种方法可以解决:

1. 在 `constructor()` 使用 `bind()` 进行强制绑定。
```js
constructor(props){
  super(props);
  ...
  this.foo = this.foo.bind(this);
}
foo() {
  //...
}
```
2. 使用 ES7 的新语法，这种规避方法是因为 `=>` 的 `this` 指向包裹它的函数。
```js
foo = ()=>{
  //...
}
```
3. 这种方法和 2 是一致的，只不过是在回调阶段使用 `=>`。
```js
reder() {
  return (
    <button onClick={(e)=>this.foo(e)}>
  )
};
```

---

## Todo-list

最终的效果图如下:

![todo-list]({{ '/styles/images/react/todolist.png' | prepend: site.baseurl }})

材料：
+ 脚手架工具 访问[React+Webpack+ES6+JSX 脚手架工具]({{ '/2017/08/20/React-Second' | prepend: site.baseurl }}) 或者 [`github` 主页](https://github.com/maoxiaoke/react-webpack-es6-jsx)
+ Sass
+ Bootstap

### 组件分割

为了合成一个 `<TodoList />` 组件，我们将组件分割成
1. `<TodoForm />` ，由 `<input>` 输入框和 `<submit>` 按钮组成
2. `<ItmesList />` 构成 lists

### 入口文件

入口文件 `app.js` 引入 `ReactDOM.render()` 进行渲染。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList.jsx';
import './css/style.scss';

ReactDOM.render(
    <TodoList />,
    document.getElementById('app')
);
```

### 父组件 TodoList.jsx

```js
//TodoList.jsx
import React from 'react';
import TodoForm from './TodoForm.jsx';
import ItemsList from './ItemsList.jsx';

export default class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items:[
                'yuer love xiaoke',
                'xiaoke love yuer'
            ]
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem (item) {
        let newItems = this.state.items;
        newItems.push(item);
        this.setState({item: newItems});
    }
    deleteItem (idx) {
        let newItems = this.state.items;
        newItems.splice(idx,1);
        this.setState({item: newItems});
    }

    render(){
        return (
            <div className="main">
                <div className="todo-list">
                    <h1>To-Do <small>List</small></h1>
                    <TodoForm submitAction={this.addItem} />
                    <ItemsList items={this.state.items} clickAction={this.deleteItem} />
                </div>
            </div>
        )
    }
}
```

### 子组件 TodoForm.jsx

```js
//TodoForm.jsx
import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {task:''};
        this.updateText = this.updateText.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateText (e){
        this.setState({task:e.target.value});
    }
    submitForm (e){
        e.preventDefault();
        let item = e.target[0].value;

        if(!item) {
            alert('Please enter a task');
        }else {
            this.props.submitAction(item);
            this.setState({task: ''});
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="todo-form">
                <input type="text" className="form-control" placeholder="enter task" onChange={this.updateText} value={this.state.task} />
                <input type="submit" className="btn btn-primary self-btn" />
            </form>
        );
    }

}
```

### 子组件 ItemsList.jsx

```js
//ItemsList.jsx
import React from 'react';

export default class ItemsList extends React.Component {
    render() {
        let listItems = this.props.items.map((item,i) => {
            return (
                <li key={i}>
                    <div className="text">{item}</div>
                    <button onClick={this.props.clickAction.bind(this,i)} className="btn btn-danger">Del</button>
                </li>
            );
        });
        return <ul>{listItems}</ul>
    }
}
```

### 敲黑板，父子组件的通信

在我们的上面的父子组件中，涉及到父子组件的通信。组件 `<TodoForm />` 每添加一个 todo，就要传回 `<TodoList />`，再由 `<ItemsList />` 显示出来。

思路是这样的:

+ 父组件可以向子组件传递 props, props 带有初始化子组件的数据或者回调函数。
+ 子组件的 state 发生变化时，在子组件的事件处理函数中，手动触发父函数传递进来的回调函数，同时将子组件的数据传递出去。

也就是说，父子组件的通信是通过 `props` 和 `state` 来完成的。

我们仔细看一下父组件的代码:

```js
//TodoList.jsx
render(){
        return (
            <div className="main">
                <div className="todo-list">
                    <h1>To-Do <small>List</small></h1>
                    <TodoForm submitAction={this.addItem} />
                    <ItemsList items={this.state.items} clickAction={this.deleteItem} />
                </div>
            </div>
        )
    }
```

对于，`<TodoForm />` 我们传递了一个 `submitAction` 函数(submitAction 实际上是 addItem 的一个引用)。向 `<ItemList />` 传递了一个 `items` 数组 和一个 `clickAction` 函数。这样，这些内容都可以被 props 捕获。我们可以用 `console.log(props)` 验证一下。

在 `TodoForm.jsx` 加入:

```js
constructor(props){
        super(props);
        this.state = {task:''};
        this.updateText = this.updateText.bind(this);
        this.submitForm = this.submitForm.bind(this);
        // add this
        console.log(props); /*{submitAction: ƒ}*/
    }
```

在 `ItemsList.jsx` 加入:

```js
//add this
constructor(props){
        super(props);
        console.log(props);/*{items: Array(2), clickAction: ƒ}*/
    }
```

那么，子组件怎么向父组件通信呢。这里，只存在 `<TodoForm />` 向 `<TodoList />` 通信，也就是当我们点击提交按钮的时候，`<TodoForm />` 应该将保存在自己 state 的内容传回 `<TodoList />`。

```js
//TodoForm.jsx
submitForm (e){
        e.preventDefault();
        let item = e.target[0].value;

        if(!item) {
            alert('Please enter a task');
        }else {
            this.props.submitAction(item);  //通过回调函数传递参数给父组件
            this.setState({task: ''});
        }
    }
```

### 敲黑板，子组件间的通信

为了实现子组件间的通信，React 使用 State 提升，将需要共享的 state 提升到最近共同的祖先组件。

上面的例子中，我们需要将新建的 todo，传递给 `<ItemsList />`，而新建的 todo 是 `<TodoForm />` 中的 state。所以，state 先传递给父组件 `<TodoList />`。

### 敲黑板，处理列表 `<li>`

使用 `map()` 函数。

在我们的 `<ItemsList />` 是一个基本的 List Component。

```js
//ItemsList.jsx
import React from 'react';
export default class ItemsList extends React.Component {
    render() {
        let listItems = this.props.items.map((item,i) => {
            return (
                <li key={i}>
                    <div className="text">{item}</div>
                    <button onClick={this.props.clickAction.bind(this,i)} className="btn btn-danger">Del</button>
                </li>
            );
        });
        return <ul>{listItems}</ul>
    }
}
```

根据我们前面所解释的，`this.props.items` 初始状态是 `['yuer love xiaoke', 'xiaoke love yuer']`。也就是说，我们对这两个数组元素进行遍历，很简单，正常的 `map()` 函数是这样的:

```js
let listItems = this.props.items.map((item) =>{//...});
```

也就是说，这里平白出现的 `i` 和 `key` 属性是什么呢。`key` 是一个特殊的属性，用来帮助 React 辨认哪些项改变了、添加了、删除了。

当然，最好的方法是父组件传递过来一个 `object`，使用自定义唯一的 `id` 标识。但是我们如果没有这个 `id`，你可以像我们的例子中这样使用。

`key` 必须是 唯一的，唯一的意思指的是同属的 `<li>` 之间唯一，并不要求 globally 唯一。

### 敲黑板，受控组件

Controlled component，在 HTML 中，表单元素比如 `<input>` 、`<textarea>` 和 `<select>` 元素会根据用户输入维持并更新自己的状态。但是在 React 中，只能用 `setState()` 更新。在 `<TodoForm />` 中，我们就是这样处理的。

```js
//TodoForm.jsx
import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {task:''}; //look here
        this.updateText = this.updateText.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateText (e){
        this.setState({task:e.target.value}); //处理改变
    }
    submitForm (e){
        e.preventDefault();
        let item = e.target[0].value;

        if(!item) {
            alert('Please enter a task');
        }else {
            this.props.submitAction(item);
            this.setState({task: ''});
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="todo-form">
                <input type="text" className="form-control" placeholder="enter task" onChange={this.updateText} value={this.state.task} />
                <input type="submit" className="btn btn-primary self-btn" />
            </form>
        );
    }

}
```

`<input>` 元素设置了 `value` 属性，值一直都是 `this.state.task`。每次按键都会触发 `updateText` 函数，所以展示的值也会随着用户输入而更新。

### 引入 Bootstrap

为了非常非常简单，我们是直接在 `index.html` 引入 bootstrap。

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
    <title>todo-list</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### Github 地址

在这里:

[todoList](https://github.com/maoxiaoke/React-es6-demo/tree/master/todoList)