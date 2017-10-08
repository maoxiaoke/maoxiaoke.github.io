---
layout: post
title: "参与开源翻译的正确姿势"
date: 2017-10-08 09:00:00 +0800
categories: 研究生涯
tag: Github
---
* content
{:toc}


开源是一种精神。

从今年三月份开始，就参与到一个开源的翻译项目中。项目名称是：[JavaScript tutorial](https://github.com/iliakan/javascript-tutorial-cn)，是一个免费的 JavaScript 的教程，作者在 Github 开源。欢迎大家加入进来。

<!-- more -->

首先，我想大家会提到的一个问题是：

## 如何找到一个开源翻译项目

搜索的能力是一个优秀程序员所必备的功能，现在社会，不再是闭门造车。[Github trending](https://github.com/trending) 页面就是一个收集最近 Github 上的一些开源流行库。

那么，找到一个可供翻译的开源库之后，怎么办呢？第一步当然是向原作者提出翻译申请。比如，我们的这个翻译项目中，原作者提供一个 `javascript-tutorial-cn`，接下来，可以开始我们的翻译工作。

---

## 正确姿势

一千个人中有一千个翻译姿势，哪种姿势较为正确，不伤身体呢？这值得考量。

### fork

通常情况下，我们需要 `fork` 原作者的仓库。

![fork]({{ '/styles/images/translation/trans_01.png' | prepend: site.baseurl }})

### clone 自己的仓库到本地

使用 `git clone` 将仓库 `clone` 到本地。

### 同步原作者的仓库

我们 `clone` 了原作者的仓库，可是，如果原作者的仓库有修改，我们如何同步原作者的仓库呢。

使用命令 `git remote add upstream`，后面跟随的是原作者的仓库地址。

```bash
$ git remote add upstream https://github.com/iliakan/javascript-tutorial-cn
```

我们使用 `git remote -v` 来查看。

```bash
$ git remote -v
origin  https://github.com/maoxiaoke/javascript-tutorial-cn (fetch)
origin  https://github.com/maoxiaoke/javascript-tutorial-cn (push)
upstream        https://github.com/iliakan/javascript-tutorial-cn (fetch)
upstream        https://github.com/iliakan/javascript-tutorial-cn (push)
```

之后，只要原作者有更改，就可以使用 `git pull` 来拉取更改的内容了。

```bash
$ git pull upstream master
From https://github.com/iliakan/javascript-tutorial-cn
 * branch            master     -> FETCH_HEAD
Already up-to-date.
```

> 关于 `git fetch` 和 `git pull` 的区别，不严格地说，`git pull` 等于 `git fetch` 加 `git merge`。就是说 `git fetch` 只是拉取内容，而不会合并到 master 分支。

然后，你可以使用 `git push` 将内容推送到自己的仓库。

```bash
$ git push origin master
```

> 以上的操作，我们一般在 master 分支进行。

### 在分支上更改内容

非常不建议在 master 上修改内容。所以我们为我们的翻译创建一个分支。在这里，我的做法是，为每一个要翻译的章节创建一个分支。

比如，我为第四小节( `variable` )的创建了一个 variable 的分支。

```bash
$ git checkout -b variables
```

在 variables 翻译完成后，使用 `git add` 和 `git commit` 进行提交。

我的这种情况下，就需要向自己的远程仓库添加分支。如下：

```bash
$ git push origin variables:first-steps/variables
```

第一个是本地分支的名字，第二个是远程分支的名字。

### PR

这个时候，就可以给原作者的仓库提 pull request 了。

![pull request]({{ '/styles/images/translation/trans_02.png' | prepend: site.baseurl }})

### 给你的 PR 加 label

通常翻译完成，我们也许还需要校对。所以需要加一个 `need review` 的标签是比较合适的。

---

## 静静等待原作者的答复吧

嗯，没错。这就结束了。