---
layout: post
title: "Web缓存知多少(缓存机制和数据存储)"
date: 2017-08-15 09:00:00 +0800 
categories: 研究生涯
tag: Performance
---
* content
{:toc}

Web 缓存有很多种，比如数据库缓存、代理服务器缓存、CDN 缓存，以及浏览器缓存。

浏览器缓存指的是将缓存文件保存在客户端，一般是通过 HTTP 进行缓存。

<!-- more -->

## HTTP 缓存机制

HTTP/1.1 标准中固定了 HTTP 缓存的两种方式: expiration 机制 和 validation 机制。前者是通过减少服务器和浏览器的循环次数，后者通过只响应头部信息较少网络带宽。(有些参考资料，将前者称为*强缓存*，后者称为*协商缓存*)

**强缓存优先级高于协商缓存**，也就是说，当执行强缓存的规则，缓存生效，则不再执行协商缓存。

### expiration Model -- 强缓存

expiration 机制通过 `Expires` 和 `Cache-Control` 两个字段来标明失效规则。

**Expires**

Expires 的值为服务器返回的到期时间，即下一次请求时，请求时间小于服务器返回的到期时间，直接使用缓存数据。但是由于客户端和服务器可能有时间差，会导致较大的缓存命中误差，所以 HTTP/1.1 使用了 `Cache-Control` 替代。

**Cache-Control**

Cache-Control 是非常重要的规则。取值如下:

+ private: 默认取值，表示客户端可以缓存
+ public: 客户端和代理服务器都可以缓存
+ max-age: 缓存内容会在 xxx 秒后失效
+ no-cache: 缓存前确认必须先确认其有效性
+ no-store: 所有内容都不会缓存

> 注意，Cache-Control 是一个通用的首部字段。所以，取值对客户端和服务器端含义会有所不同。

应用 HTTP/1.1 版本的缓存服务器同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略 Expires 首部字段。

强缓存请求数据流程如下: 客户端向缓存服务器(缓存数据库)请求数据，如果有缓存数据且未失效，则返回数据。如果没有缓存数据或缓存数据失效，则向服务器请求数据，服务器返回数据和缓存规则，客户端收到并将数据和缓存规则存入缓存。

### validation Model -- 协商缓存

协商缓存的方式是客户端发送请求验证缓存标识所对应的数据是否失效，如果服务器判断数据有效，则返回一个 304 状态码(即报文首部和状态行)，而不用返回报文主体。协议中规定了两种缓存标识。

**Last-Modified/If-Modified-Since**

客户端第一次请求服务器时，服务器在响应报文的首部通过 `Last-Modified` 字段告知浏览器资源的最后修改时间。

再次请求时，客户端在请求报文的首部添加 `If-Modified-Since` 字段，该字段的值是上次请求时，服务器返回的 `Last-Modified` 的值。

服务器收到请求发现有 If-Modified-Since 则与被请求资源的最后修改时间进行比对，若资源的最后修改时间大于 If-Modified-Since 所提供的值，说明资源被改动过，则响应资源内容，返回状态码 200。否则，说明资源没有被改动，则返回 304，告知浏览器可以使用所保存的 cache。

**Etag/If-None-Match** 优先级高于 Last-Modified/If-Modified-Since

客户端第一次请求服务器时，服务器在响应报文的首部通过 `Etag` 字段告知浏览器当前资源在服务器的唯一标识(生成规则由服务器决定)。

同理，再次请求时，缓存数据的唯一标识被添加到请求报文的 `If-None-Match` 字段中。

服务器收到请求发现有 If-None-Match 则与被请求资源的唯一标识进行比对，不同，说明资源被修改过，返回 200。相同，则说明资源未被修改，返回 304。

> 为什么需要 Etag?

Etag 的出现是为了解决 Last-Modified/If-Modified-Since 比较难以解决的问题。比如:

+ 一些文件会周期性地更改，但是内容并不会改变，只是改变修改时间，这个时候我们不太需要客户端认为文件内容被修改过了，而请求资源
+ 某些文件修改非常频繁(指的是内容)，比如每秒之内修改了多次，If-Modified-Since 能检查到的粒度是秒级，这种修改可能导致无法判定。

所以，Etag 的优先级高于 Last-Modified 也是应该的。但是，性能上，Etag 要逊于 Last-Modified，因为 Last-Modified 指记录修改的时间值，而 Etag 的值需要算法计算一个 hash 值。

### HTTP 缓存过程总结

1，浏览器第一次加载资源，服务器返回 200，并将数据和缓存规则存入缓存。
2. 再次请求资源时，如果当前时间和上一次返回 200 的时间差不超过 Cache-Control 设置的 max-age，则没有过期，命中缓存(如果浏览器不支持 HTTP/1.1，则用 expires 判断是否过期)。如果时间过期，则向服务器发送 If-None-Match 和 If-Modified-Since 请求。
3. 服务器收到请求，首先根据 Etag 的值判断被请求的文件有没有被修改，Etag 值一致，则命中协商缓存，返回304；如果不一致，返回新的资源的缓存规则和状态码，并返回 200。
4. 如果服务器收到的请求没有 Etag 值，则将 If-Modified-Since 和被请求的文件的最后修改时间做对比，一致则命中协商缓存，返回 304；否则返回新的 Last-Modified 和数据，返回 200。

### 用户操作对缓存的影响

对于一下操作，如地址栏回车、页面链接跳转、新开窗口、前进和回退，两种机制( expires/validation )都是有效的。

F5 刷新操作，Expires/Cache-Control 是无效的，Last-Modified/Etag 是有效的，也就是说强制协商缓存。

Ctrl + F5 强制刷新，两者都是无效的。

> 抓包工具: Fiddler

> 查看 chrome 缓存 `chrome://view-http-cache/`

参考: [彻底弄懂HTTP缓存机制及原理](http://www.cnblogs.com/chenqf/p/6386163.html)

---

## HTML5 应用缓存

应用缓存(application cache)，简称 appcache，是专门为开发离线 Web 应用设计的。它是从浏览器的缓存中分出来的一块缓存区，使用一个 `manifest` 文件，列出要下载和缓存的资源。

第二步， 在需要离线使用的页面中添加 manifest 属性，用于指定缓存清单文件的路径。比如:

```html
<html manifest="/offline.manifest">
```

---

## 数据存储

随着 Web 应用的出现，也产生了能够直接在客户端上存储用户信息能力的要求。

Cookie 是在**客户端**存储数据的其中一种选项。

### Cookie

Cookie 的工作机制是用户识别及状态管理。它是怎样工作的呢？比如，当要对某个用户进行识别的时候，服务器对任意的 HTTP 请求发送 `Set-Cookie` 首部字段作为响应的一部分。

```text
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
...
```

这之后，浏览器的每个请求都添加 `Cookie` 字段将信息发送回服务器。服务器就知道你是属于哪个用户了。

```text
GET /index.html HTTP/1.1
Cookie: name=value
...
```

**Set-Cookie** 字段的属性

+ name 名称 一个唯一确定的 cookie 的名称，名称必须被 URL 编码
+ value 值 存储在 cookie 中的字符串的值。值必须被 URL 编码
+ domain 域名 确定 cookie 有效的域，所有向该域发送的请求中都包含这个 cookie 信息
+ path 路径 对于制定域中的那个路径，才应该向服务器发送 cookie
+ expire 失效时间
+ secure 安全标识 指定后，cookie 只能在使用 SSL 连接时(即HTTPS通信时)才发送到服务器
+ HttpOnly 它使得附加在 HttpOnly 属性后的 Cookie 内容无法被 JavaScript 读取，可以防止 XSS 攻击

**Cookie** 字段只包含 `Cookie` 属性。该属性在请求中包含从服务器接收到的 Cookie，接收到多个 Cookie 时，同样可以以多个 Cookie 形式发送。

值得注意的时，为了不会占据太多磁盘空间，每个域的 cookie 总数有限的，不同浏览器之间各有不同。此外，对于 cookie 的尺寸也有限制。

另外，避免在 cookie 中存储敏感信息。

### Web Storage

Web Storage 是 HTML5 的一部分，目的是克服由 cookie 带来的一些限制。

+ 提供一种在 cookie 之外存储会话数据的途径
+ 提供一种存储大量可以**跨会话**存在的数据的机制

Web Storage 提供两种用于存储数据的对象，`sessionStorage` 对象和 `localStorage` 对象。

#### sessionStorage

sessionStorage 对象存储特定于某个会话的数据，该数据只保持到浏览器关闭。存储在 sessionStorage 中的数据可以跨越页面刷新而存在。

另外，sessionStorage 对象应该主要用于仅针对会话的小段数据的存储。如果需要跨越会话存储数据，那么 localStorage 更合适。

#### localStorage

存储在 localStorage 中的数据保留到通过 JavaScript 删除或者是用户清除浏览器缓存。同时，localStorage 支持同源策略。也就是说，要访问同一个 localStorage 对象，页面必须来自同一个域。

同理，和其他客户端存储方案类似，Web Storage 也有大小限制，因浏览器而异。

### IndexedDB

IndexedDB 是在浏览器中保存结构化数据的一种数据库。

参考:

+ 《JavaScript 高级程序设计》
+ [What is the difference between localStorage, sessionStorage, session and cookies?](https://stackoverflow.com/questions/19867599/what-is-the-difference-between-localstorage-sessionstorage-session-and-cookies)