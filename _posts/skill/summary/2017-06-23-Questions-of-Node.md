---
layout: post
title: "Node服务器端面试集锦"
date: 2017-06-23 09:00:00 +0800 
categories: 面试与笔试经历
tag: Interview
---
* content
{:toc}

在这里，主要是记录遇到的面试 Node 相关的面试题。

---

<!-- more -->
<!-- TOC -->

- [有哪些常见的 Web 服务器](#有哪些常见的-web-服务器)
- [简述 HTTPS 的工作原理，如何实现的加密传输](#简述-https-的工作原理如何实现的加密传输)

<!-- /TOC -->

## 有哪些常见的 Web 服务器

+ 业界主流: Apache (阿帕奇)

优点: 跨平台，高效和稳定
缺点: 越来越重，被认为是重量级的 web server。什么是重量级？ Apache 主要采用的是基于进程的 Prefork 模式，也就是，对于每个请求会用一个进程去进行服务，进程非常占资源，当并发量大的时候，就需要等额的进程，导致的是高内存占用和CPU占用，这就是所谓的“重量级”。

+ 轻量级的 Web 服务器、反向代理服务器及电子邮件代理服务器: nginx

优点: 内存小，并发能力强，和 apache 相比，占用更小的内存和资源，负载均衡。
缺点: 不如 apache 稳定

以上两者的总结: 

1. apache 和 nginx 最核心的区别是 apache 是同步多进程模型，一个连接对应一个进程；nginx 是异步的，多个连接(万级别)对应一个进程
2. nginx 的优势是处理静态请求，cpu 内存使用率低，apache 适合处理动态请求，所以现在一般前端用nginx作为反向代理抗住压力，apache作为后端处理动态请求。

+ tomcat，严格来说 apache/nginx 是 HTTP Server，而 Tomcat 是 Application Server，是运行 Servlet 应用的容器。

---

## 简述 HTTPS 的工作原理，如何实现的加密传输

[HTTPS加密通信]({{ '/2017/08/16/First-Meet-HTTPS' | prepend: site.baseurl }})