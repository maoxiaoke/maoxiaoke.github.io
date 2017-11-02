# 关于这个Jekyll模板主题 ⚽⚽⚽

## 预览

### 首页

![首页](https://github.com/maoxiaoke/maoxiaoke.github.io/blob/master/styles/images/blog/blog.png?raw=true)

+ 首页: 博客首页
+ 博文分类: 按照categories对文章进行分类
+ 标签分类: 按照tags对文章进行分类
+ 外域链接: 存放一些想要其他网站的链接
+ DEMO: 存放个人项目
+ 打赏我: 提供donation
+ 关于我: 个人CV

### 文章页

![文章页](https://github.com/maoxiaoke/maoxiaoke.github.io/blob/master/styles/images/blog/page.png?raw=true)

---

## 功能简介

### 提供全文搜索

博客使用[`Simple-Jekyll-Search`](https://github.com/christian-fei/Simple-Jekyll-Search)提供全文搜索功能。

相关介绍和操作可参考: [加入搜索功能](http://xiaokedada.com/2017/05/09/Jekyll-second/#加入搜索功能)

### 提供百度统计功能

博客使用[百度统计](https://tongji.baidu.com/web/welcome/login)提供统计功能。具体操作方法在官网有详细介绍。

相关介绍和操作可参考: [添加网站统计](http://xiaokedada.com/2017/05/09/Jekyll-second/#添加网站统计)

### 提供不蒜子pv/uv计数器

[不蒜子](http://busuanzi.ibruce.info/)可以提供pv/uv的计数。好处在于可以在界面上显示访问量。

相关介绍和操作可参考: [网页的pv/uv计数器](http://xiaokedada.com/2017/05/09/Jekyll-second/#网页的pvuv计数器)

### 添加社会化评论功能

<del>博客采用第三方评论平台[网易云跟帖](https://gentie.163.com/info.html)</del>。

博客采用第三方评论平台[Gitment](https://github.com/imsun/gitment)

相关介绍和操作可参考: [社会化评论](http://xiaokedada.com/2017/05/09/Jekyll-second/#社会化网页评论)

### 使用canvas实现首页动态效果

### 使用日历控件显示当前日期

[在线演示](http://xiaokedada.com/effects/demo/demo-calender/index.html)

### 使用tagCloud控件实现云标签效果

[在线演示](http://xiaokedada.com/effects/demo/demo-tagscloud/index.html)

---

## 博客使用方法

初识Jekyll博客，有必要了解[Jekyll](https://jekyllrb.com/)有关知识。

相关的内容我写了两篇文章可供参考

+ [基于Jekyll静态框架的Github站点设计](http://xiaokedada.com/2017/02/22/Jekyll-Cpanel/)
+ [Jekyll搭建博客--人类补完计划](http://xiaokedada.com/2017/05/09/Jekyll-second/)

### 部署和安装

请参考[Jekyll相关](http://xiaokedada.com/2017/02/22/Jekyll-Cpanel/#jekyll相关)。

### 下载本博客源码

欢迎fork, clone and star。

### 修改_config.yml文件

包括相关的一些设置参数，包括banner/motto/description等。

> 直接修改便会生效。

### 写文章

文章放在`_post`文件夹下，可创建自命名文件夹。支持markdown编写，提供`post`(知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议)/`original`(原创文章)两种方式。

文件命名示例如下:

```
2017-03-23-More-of-prototype.md
```

文章首部字段为:

```markdown
---
layout: post
title: "再谈原型和继承"
date: 2017-03-23 09:00:00 +0800
categories: 研究生涯
tag: JavaScript
---
* content
{:toc}
```

多tag可参考文章:[加入多个标签](http://xiaokedada.com/2017/05/09/Jekyll-second/#如何加入多个标签)

> 备注一: Jekyll使用时间对文章进行排序，所以无论如何建立文件夹和文件夹命名都行，你开心就好

> 备注二: 未完成的草稿文章可以放在`_draft`文件夹中

### 运行

使用下面命令可直接运行:

```bash
$ jekyll s
```

会开启jekyll服务器，监听在`http://127.0.0.1:4000/`，使用浏览器访问呢。

不想查看效果，可直接bulid。

```bash
$ jekyll build
```

> 备注: 草稿区的内容不会显示，如果想要对草稿去内容进行查看，可参考[开启草稿](http://xiaokedada.com/2017/05/09/Jekyll-second/#jekyll的一些使用技巧)

### 发布

发布请保留主题来源。

```text
Copyright © 2017 M/J. All rights reserved.
```

---

## Update Log

### 2017.07.16

- [-] 删除网易云跟帖
- [+] 将网易云跟帖更改为gitment
- [+] 添加一个新模块: TalkToMe

### 2017.06.17

- [^] 改变文章字体
- [+] 增加不蒜子
- [^] 将多说更改为网易云跟帖
- [+] 添加搜索功能
- [^] 代码高亮改为rouge


### 2017.04.20

- [+] First commit
- [+] 添加首页Canvas效果
- [+] 添加日历控件
- [+] 添加云标签控件
- [+] 添加社会化评论多说
- [+] 大量优化
- [+] 添加favicon.ico

---

## 打赏

<p align="center">所以，如果你喜欢这个博客，有些许收获。就请支持我。</p>

### 赞助方式1： 支付宝付款

您可以选择手机支付宝扫一扫

<img src="https://github.com/maoxiaoke/maoxiaoke.github.io/blob/master/styles/images/zhifubao.jpg?raw=true" alt="支付宝二维码付款给小可嗒嗒" />

### 赞助方式2： 微信扫一扫

您可以选择手机微信扫一扫

![微信二维码付款给小可嗒嗒](https://github.com/maoxiaoke/maoxiaoke.github.io/blob/master/styles/images/wechat.jpg?raw=true)

### 赞助名单

+ 2017-02-21 09:52:10 收到微信用户xxx的`￥1.00`
+ 2017-02-21 15:59:00 收到支付宝用户241***@qq.com的`￥6.66`
+ 2017-02-21 19:53:37 收到微信用户xxx的`￥6.66`
+ 2017-02-21 22:33:33 收到微信用户xxx`￥6.66`
+ 2017-02-22 08:36:00 收到支付宝用户116***@qq.com的`￥1.66`
+ 2017-07-24 22:05:00 收到支付宝用户118***10的`￥6.66`

手动笔芯

---