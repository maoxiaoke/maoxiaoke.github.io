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
+ 阮一峰博客: [http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt](http://www.ruanyifeng.com/blog/2016/07/yaml.html?f=tt)

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

2017-07-16更新

前几天收到一封邮件，内容如下:

![网易云跟帖]({{ '/styles/images/jekyll/yungentie.png' | prepend: site.baseurl }})

那么给我的有三条路了，放弃评论系统、更换为DISQUS和选择其他的评论系统。博客本来就没啥访问量，你说放弃吧，如果有一天访问量多起来了呢。被墙的DISQUS也不能用。然后，就看到了一个叫`Gitment`的评论系统，这个东西好像是一个年纪比我还小的程序员开发的，想一想，哎，真是汗颜。地址在这: [Gitment](https://github.com/imsun/gitment)

按照教程，首先。

### 注册 OAuth Application

首先，注册一个新的[OAuth Application](https://github.com/settings/applications/new)。

+ Application name : Whatever you like
+ Homepage URL : 主页地址，比如我的是[http://xiaokedada.com](http://xiaokedada.com)
+ Application description : Whatever you like
+ Authorization callback URL : 这个很重要，比如我的就是[http://xiaokedada.com](http://xiaokedada.com)

然后，就会生成client-id和client-secret，后边需要提供该值。

### 引入Gitment

我们把下面这段代码嵌入到`post.html`的后面:

![gitment]({{ '/styles/images/jekyll/gitment.png' | prepend: site.baseurl }})

+ owner: Github ID 或者直接账户昵称经测试都是可以的
+ repo: 存放comment仓库的名称，名称就好，不要地址。比如我的comments就直接放在博客仓库maoxiaoke.github.io
+ client-id: 你拥有你自己的
+ client-id: 你拥有你自己的

Github ID如何获取呢，访问https://api.github.com/users/GitHub name。比如想查看我的Github信息，访问[https://api.github.com/users/maoxiaoke](https://api.github.com/users/maoxiaoke)就ok了。

### 上线

每一篇文章都需要进行`Initialize Comments`之后，其他用户才能正常使用。

### 测试

经过测试，这个版本的Gitment问题还比较大。浏览器兼容问题如下:

+ Chrome通过
+ Firefox 能正常显示评论，但login时出现[object ProgressEvent]
+ Edge 只显示评论，无法进行评论
+ IE 11完全不显示

移动端没有进行测试。

版本问题很大，但作为一个过渡，我还是可以接受的。大家也可以参与进去，更好地完善它。

---

## 加入搜索功能

博客首页有一个搜索栏，使用的是一个[`Simple-Jekyll-Search`](https://github.com/christian-fei/Simple-Jekyll-Search)插件，项目地址在[这里](https://github.com/christian-fei/Simple-Jekyll-Search)。

+ 按照使用方法，我们需要创建一个`search.json`文件。如果要进行全文搜索，[就需要这样](https://github.com/christian-fei/Simple-Jekyll-Search/wiki#enabling-full-text-search)。代码参见源码中的`search.json`。

+ 如何是使用插件，将下列代码放在你想要具有搜索功能的页面。

```html
<!-- Html Elements for Search -->
<div id="search-container">
<input type="text" id="search-input" placeholder="search...">
<ul id="results-container"></ul>
</div>
```

因为我们只在首页使用，所以我们放进了`./_includes/banner.html`中。

同时，我们将`jekyll-search.js`中的源码拷贝至`./styles/js/function.min.js`文件中。

+ 最后配置，我们在`./styles/js/lessismore.js`中进行配置。

```js
SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">. {title}</a></li>',
    noResultsText: '',
    limit: 5,
    fuzzy: true,
    exclude: ['Welcome']
});
```
我们大概就完成了。

---

## Jekyll Plugins

在了解Jekyll插件的过程中，可以查看官网的[这个页面](http://jekyllrb.com/docs/plugins/)。中文[页面在这里](http://jekyll.com.cn/docs/plugins/)。

这个网站集合了很多的Jekyll插件: [Jekyll-Plugins](http://www.jekyll-plugins.com/)。

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