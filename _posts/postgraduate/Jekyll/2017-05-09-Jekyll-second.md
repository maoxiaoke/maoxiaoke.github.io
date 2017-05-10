---
layout: post
title: "Jekyll搭建博客--人类补完计划"
data: 2017-05-09 19:27:00 +0800
categories: 研究生涯
tag: Jekyll
---
* content
{:toc}

这个是搭建`Jekyll`博客的第二个篇章，主要讲述如何增加博客一些新的功能，以及在此过程中遇到的一些新的知识。有关于如何搭建服务器，依托`github pages`来搭建`Jekyll`博客，可以[点击此处找到]({{ '/2017/02/22/Jekyll-Cpanel' | prepend: site.baseurl }})。

当然，对`Jekyll`的一些用法也会在此提及和归纳。

<!-- more -->

## 如何加入多个标签

之前的博客只能为每篇博客添加一个标签，如果我们需要添加多个标签的时候，那该怎么办？。在我们每篇`.md`的头部，添加多个标签有两种方式。比如，我们这篇文章只有`Jekyll`一个标签，如果我还想添加一个`人类补完计划`的标签。

```yaml
# 方式一
tags:
 - Jekyll
 - 人类补完计划

 # 方式二
 tags: [Jekyll, 人类补完计划]
```

> 说明： 其实这是一种`YAML`语法，一种用来表达数据序列的格式，通常以`.yaml`或`.yml`为后缀。这种语法用空格来表达层次关系(但是不能使用`TAB`键)，`#`表示注释，提供`block format`和`inline format`两种格式来表示清单(数组)和散列表(key: value键值对)。上面的方式一就是使用的`block format`格式，注意，端杠(`-`)和标签之间有个空格，逗号(`,`)与标签之间有个空格，短杠前面也有一个空格。

这种语法更多请参考：

+ `YAML`官方文档: [http://www.yaml.org/](http://www.yaml.org/)
+ `YAML` wiki百科: [https://zh.wikipedia.org/wiki/YAML](https://zh.wikipedia.org/wiki/YAML)
+ 廖雪峰博客: [http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt](http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt)

当然，这之后还需要在我们的页面中添加这个多个标签。以我的博客为例，我的标签是放在首页(`index.html`)。

![many tags]({{ '/styles/images/jekyll/tag.png' | prepend: site.baseurl }})

这样就将多个标签循环添加到了首页上。

---

## 添加网站统计

好像大家用的都是[`CNZZ`](http://www.umeng.com/)这个统计分析平台。我也注册了一个账号，但是觉得客户端并不友好。所以另寻他处，找到了[`百度统计`](https://tongji.baidu.com/web/welcome/login)，感觉还不错。

这个使用很简单，按照网站说明将一段`js`代码添加到所有网页中。为了添加到所有网页中，而所有网页都有一个`header`，所以我在`header.html`之后将这段代码加上去。另一点需要注意的是，新版的百度统计所使用的`js`代码是异步代码，所以设置的图标不起作用。我觉得这个真不错。如下图：

![百度统计图标失效原因]({{ '/styles/images/jekyll/baidu-icon.png' | prepend: site.baseurl }})

---

## 网页的pv/uv计数器

一开始我想，既然有百度统计，那么应该有`API`可以导出数据。可是，并没有找到。不知道怎么做，如果大家知道，希望能告诉我。

后来找到了[`不蒜子`](http://busuanzi.ibruce.info/)，使用方式可以见创建者的[博客文章](http://ibruce.info/2015/04/04/busuanzi/)。

概念解释：

+ `pv`: Page View，即页面的浏览量和点击量，用户每次刷新被计算一次
+ `uv`: Unique Visitor，访问网站的一台电脑客户端为一个访客。00:00-24:00内相同的客户端只被计算一次

在我的博客中，不蒜子被加入到`footer.html`中，

```html
<!--不蒜子pv/uv统计-->
<div class="post-meta">
        <p>Total <span id="busuanzi_value_site_pv"></span> views，您是本站的第<span id="busuanzi_value_site_uv"></span>个小伙伴，<span id="busuanzi_value_page_pv"></span> Hits</p><br/>
</div>

<!--异步js代码-->
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

---

## 社会化网页评论

采用的第三方评论平台，最开始使用的是[`多说`](http://dev.duoshuo.com/threads/58d1169ae293b89a20c57241)，但是他们将于`2017/6/1`正式关闭服务。所以，评论准备向国际化靠拢，更换了一段时间的[`DISQUS`](https://disqus.com/)。但是，好像被墙了，所以也没法使用。后来，就转战[`网易云跟帖`](https://gentie.163.com/info.html)。

按照网站流程获取`Web`代码，对我的博文来讲，我只需要在`post`类别中添加，所以将代码添加到`post.html`的最后面。

---

## Jekyll的一些使用技巧

### 文章引用

有时候，我们在文章内引用博客内另一篇文章是经常性的。比如，这篇文章的开头引用了搭建`Jekyll`的文章。文章名是：2017-02-22-Jekyll-Cpanel.md。引用的方式是：

```md
[点击此处找到]({{ '/2017/02/22/Jekyll-Cpanel' | prepend: site.baseurl }})
```

### 查看草稿

在我的目录下，有一个`_drafts`文件夹，用来存放我未完成的或者弃用的文章。`Jekyll`正常构建的时候，这个文件里的文章是没法看见的。如果我想查看包括草稿在内的所有文档，可以使用如下命令：

```shell
& jekyll server --watch --drafts
```

如果你安装了`jekyll bundles`：

```shell
& bundle exec jekyll server --watch --drafts
```

---

会持续更新...