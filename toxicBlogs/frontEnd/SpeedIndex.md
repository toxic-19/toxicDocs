---
title: 优化首屏时间
date: 2024-04-14
tags: 
 - 性能优化
categories:
 - 前端
sidebar: 'auto'
sticky: 1
---

> 优化首屏时间是 性能优化 避不开的一个方向。

## 1. 区分

### 1.1 白屏时间

从地址栏输入网址，点击访问或者回车开始  :arrow_right: 到浏览器出现第一个字符或者元素结束。

通常认为浏览器开始渲染body标签或者解析完head标签之后就是白屏时间结束的时间点。

1. `Date.now() - performance.timing.navigationStart`
2. `Date.now() - window.start`

**中间包括DNS查询、建立TCP链接、发送首个HTTP请求、返回HTML文档、HTML文档head解析完毕。**

### 1.2 首屏时间

从地址栏输入网址，点击访问或者回车开始  :arrow_right: 到浏览器 **首屏** 内容渲染完毕的时间。

对于用户体验来说，首屏时间是重要的一个因素。

不一定要整页网页渲染完成。

#### 首屏时间的计算？

Vue中的 mounted 生命周期执行并不代表首屏所有元素都加载完毕了。

原因是 mounted 内部可能使用 `$nextTick` 。回调中是在视图渲染完毕之后才执行的代码。

#### MutationObserver

能监听dom树变化，在首屏的加载中，会涉及到dom的增加、修改、删除，所以会触发多次MutationObserver。

(1) 利用 MutationObserver 监听 document 对象，每当 dom 变化时触发回调函数；

(2) 判断监听的dom是否在首屏内，如果在首屏内，将该dom放到指定的数组中，记录下当前dom变化的时间点；

(3) 在MutationObserver的callback函数中，通过防抖函数，监听document.readyState状态的变化；

(4) 当document.readyState === 'complete'，停止定时器和 取消对document的监听；

(5) 遍历存放dom的数组，找出最后变化节点的时间，就是首屏加载完成的时间。



## SSR

> Server-Sider-Rendering 服务端渲染。网页内容在服务端渲染完成，一次性传输到浏览器。

对于首屏呈现渲染：用户无需等待页面中所有JS加载完成后才可以看到页面视图。

由服务器端来权衡哪些需要用服务端加载，哪些交给客户端渲染。

### Web发展史

SSR（传统服务端渲染）:arrow_right:   SPA （单页面应用）:arrow_right:  SSP（服务端渲染）

## SPA 首屏加载时间慢？

### 原因

- 网络延迟问题。
- 资源文件体积是否过大。
- 资源是否重复发送请求去加载。
- 加载脚本的时候，渲染内容堵塞了。

### 优化

- 减小入口文件体积。
- 静态资源本地缓存。
- ui框架按需加载。
- 图片资源的压缩。
- 组件重复打包。
- 开启GZip压缩。
- 使用SSR。