---
layout: post
title: "Chrome Dev Tools手册"
date: 2017-01-05 09:00:00 +0800 
categories: 研究生涯
tag: Chrome
---
* content
{:toc}

Chorme Dev Tools 是前端都要打交道的一个工具，以前一直没有非常系统的研究过。

因此，主要是放一些使用要点。

<!-- more -->

## Elements 面板

功能：

Elements 面板检查和实时编辑页面的 HTML 与 CSS。

+ Elements 面中可以查看 html 元素，这个功能用得多。编辑 html 元素，**双击选定的元素**
+ 实时编辑样式，在 Styles 窗格。样式的修改一般不是永久性的
+ 查看和编辑当前元素的盒模型参数，在 Computed 窗格。盒模型中的所有值都可以进行修改，双击盒模型的值。

---

## Console 面板

+ 消息堆叠：如果一条消息连续重复，控制台会“堆叠”消息并在左侧显示一个表示重复次数的数字。(可以在 setting 中更改，`Show timestamps`)
+ 有一个下拉菜单是 Execution Context Selector，通常是 `top`，可以选择其他环境。

#### 如何打开抽屉式 console 面板

在其他面板中，右侧有一个 `Customize and control DevTools`，点击 `Show console drawer`

> 打开 Console 面板时，抽屉式 console 面板自动折叠。

---

## Source 面板

Source 面板用来调试 JavaScript 代码。

除了在文件中自行加入断点，还有一种是利用**右侧**的 XHR/fetch、DOM Breakpoints、Event Listener Breakpoints 等设置。在这个面板中，还可调出 console drawer 面板对代码进行调试。参考这里[在 Chrome DevTools 中调试 JavaScript 入门](https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=zh-cn)

---

## Performance 面板

Performance 面板记录和分析应用在运行时的所有活动

- 火焰图有三条垂直的虚线，蓝线代表 DOMContentLoaded 事件；绿线代表首次绘制的时间；红线代表 load 事件


参考这里[如何使用 Timeline 工具](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=zh-cn)

