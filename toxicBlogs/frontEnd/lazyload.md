---
title: 性能优化-懒加载
date: 2023-10-22
tags: 
 - 性能优化
categories:
 - 前端
sidebar: 'auto'
sticky: 1
---

## 1. 概念

懒加载是一种通过延迟加载对网页性能进行优化的方法。

对于不可见的浏览器部分视窗而言，一次性加载所有资源，是一种浪费。

其一是**你不确定用户是否会浏览完整个网页**，其二是如果网页上有大量图片，加载完会很浪费时间，从而**影响用户体验**。

## 2. 思路

在滚动屏幕之前，可视区域之外的图片不会被加载，当滚动屏幕，图片出现在可视区域的时候才加载。

使网页加载速度更快，服务器负载变小。

适用于图片较多，页面列表较长的场景中。

### 2.1. 监听浏览器滚动

判断图片是否出现在视口：需要 `scrollTop + clientHeight > offsetTop`即可。

+ `offsetTop`：图片到浏览器顶部的距离
+ `scrollTop`：滚动条滚动的距离
+ `clientHeight`：可视视口的高度

获取图片到浏览器顶部的距离，实则是 `img`标签 到 `body`标签的距离，而不是单纯的`offsetTop`

`offsetTop`指的是元素顶部到`offsetParent`顶部的距离，而`offsetParent`是距离元素最近的一个具有定位的祖宗元素。逐级往上到`body`为止。

```sh
document.body.offsetTop # 0
document.body.offsetParent # null

# 获取浏览器视图窗口的高度 宽度也是使用同一方法获取 	
1. window.innerHeight // 包括滚动条的高度。所以会比下面得到的值大
2. document.documentElement.clientHeight  # 不包括滚动条的高度和页边距
```

```js
const getTop = element => {
    let top = element.offsetTop
    while(element = element.offsetParent) { // 将上一级的祖宗元素进行赋值
        top += element.offsetTop
    }
    return top
}
```

为了避免重复加载。比如已经出现在视口的图片，滚动到下面后重新被加载的情况。给所有的`img`加上属性来表明是否已经加载过了。

```html
<!-- 使用data-loading进行区别 -->
<img src="" data-src="" data-loading="lazy" />
```

滚动过程中如果符合条件的话：就将`data-src`的链接赋值给`src`，并将`data-loading`的属性去除。

```js
let imgs = document.querySelectorAll('img')
const lazyLoad = () => {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  let winH = window.innerHeight
  for(let i = 0; i < imgs.length; i++) {
    // 获取到每个图片元素的距离，判断是否出现在视口
    const ele = imgs[i]
    if(scrollTop + winH > getTop(ele)) {
       // 排除 已经加载过的图片 和 不需要懒加载的图片
       // 加载 拥有data-loading属性和data-src属性的图片
       if(ele.getAttribute('data-loading') && ele.getAttribute('data-src')) {
          ele.src = ele.getAttribute('data-src')
          ele.removeAttribute('data-loading') // 移除loading属性代表已加载过
       }
  	}
  }
}
```

在页面一加载或者页面滚动时触发

```js
// 页面完全加载后触发一次
// 用户滚动窗口时触发
window.onload = window.onscroll = () => {
  lazyLoad()
}
```

```html
<!-- data-xxx 是一个自定义的属性 -->
<div>
  <img src="./img/loading.jpg" data-src="./img/1.png" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/1.png" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/2.jpg" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/3.jpg" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/4.jpg" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/5.jpg" data-loading="lazy">
  <img src="./img/loading.jpg" data-src="./img/6.jpg" data-loading="lazy">
</div>
```

可以给监听滚动加上防抖。

### 2.2. 异步API

参考链接：[IntersectionObserver API 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

**检测某个（些）元素是否出现在可视窗**

`IntersectionObserver`：监听对象创建前给定的一定比例的可见区域。可以监听多个目标元素是否进入该可见区域。**本质是检测目标元素与视口产生一个交叉区。**

参数：

1. `callback`：回调函数。
2. `options`：可选选项。

先写一个加载图片的方法：无需再加上`data-loading`自定义属性。

```js
const imageNeedLazy = document.querySelectorAll('img[data-src]')
const loadImage = img => {
  // 加载时将data-src上的属性值赋给src
  img.setAttribute('src', img.getAttribute('data-src'))
  // 当img已经被加载的时候，就将data-src属性移除
  img.addEventListener('load', () => {
    img.removeAttribute('data-src')
  })
}
```

使用`new`获取一个观察器实例。拥有：`observe` `unobserve` `disconnect`。参数是`dom`。

可以通过 `intersectionRatio ` 的范围为 0~1 进行判断 或者 `isItersecting` 是否出现在视口。

```js
const intersectionObserver = new ItersectionObserver((entries, observer) => {
  // entries: IntersectionObserverEntry 对象提供目标元素的信息。共8个属性
  // 遍历出所有属性
  entries.forEach(item => {
    if(item.isItersecting) { // isItersecting: Boolean 出现在视口为true
      loadImage(item.target) // target: 目标对象正监听的元素
      observer.unobserve(item.target)
    }
  })
})
```

 ![image-20231027163554069](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231027163554069.png)

 [大白话详解Intersection Observer API - 掘金 (juejin.cn)](https://juejin.cn/post/7146441070828584968?from=search-suggest)

然后对每个需要监听的元素进行绑定观察器。

```js
imgNeedLazy.forEach(item => {
  intersectionObserver.observe(item)
})
```

### 2.3. 原生API

[浏览器IMG图片原生懒加载loading=”lazy”实践指南 « 张鑫旭-鑫空间-鑫生活 (zhangxinxu.com)](https://www.zhangxinxu.com/wordpress/2019/09/native-img-loading-lazy/)



### 2.4.  [`DOMRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象

`getBoundingClientRect` ：提供了元素的大小及其相对于[视口](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport)的位置。

 ![image-20240220185647730](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202402201856908.png)

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202402202003729.png" alt="image-20240220200315635" style="zoom:67%;" />

```js
Element.getBoundingClientRect() // 返回的有以上属性
```

