---
title: 事件代理 ×
date: 2023-03-16
tags:
 - JavaScript
categories:
 - 面试
sidebar: 'auto'
---

## 1. 事件代理

**DOM事件三大阶段：捕获-目标-冒泡**。

### 1.1 事件委托

利用 [JS 事件冒泡](http://c.biancheng.net/view/9379.html)动态为元素绑定事件的方法称为**事件委托**（Event Delegation，也称为“事件代理”），是 JavaScript 中最热门的技术之一。

要使用事件委托，需要保证事件能够发生冒泡，适合使用事件委托的事件有  `click`、`mousedown`、`mouseup`、`keydown`、`keyup`、keypress 等。

需要注意的是，虽然 `mouseover `和  `mouseout `事件也会发生事件冒泡，但处理起来非常麻烦，所以**不推荐**在 `mouseover `和 `mouseout `事件中使用事件委托。

 另外，对于不会发生事件冒泡的事件（例如 load、unload、abort、focus、blur 等），则无法使用事件委托。

### 1.2 事件冒泡

 ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/09441W5b-0.gif)

1. 在事件捕获阶段，事件会从 DOM 树的最外层开始，依次经过目标节点的各个父节点，并触发父节点上的事件，直至到达事件的目标节点。
2. 事件冒泡正好与事件捕获相反，事件冒泡是从目标节点开始，沿父节点依次向上，并触发父节点上的事件，直至文档根节点。

#### 1.2.1 阻止事件捕获和冒泡

```js
event.stopPropagation(); // 会阻止事件捕获和事件冒泡，但是无法阻止标签的默认行为，如链接。
```

```js
event.preventDefault(); // 阻止一些默认行为。如链接和提交按钮。
```

## 2. 事件循环

### 2.1 大前提：

首先，`JavaScript`是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，**而实现单线程非阻塞的方法就是事件循环**。

### 2.2 分类

在`JavaScript`中，所有的任务都可以分为

- 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行
- 异步任务：异步执行的任务，比如`ajax`网络请求，`setTimeout`定时函数等。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd88994142347~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

导图要表达的内容用文字来表述的话：

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

[事件循环参考掘金博客](https://juejin.cn/post/6844903512845860872)

![img](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/15fdcea13361a1ec~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

- **``javascript``是一门单线程语言**
- **Event Loop是`javascript`的执行机制**

## 3. 垃圾回收机制

### 3.1 前提

因为**内存泄漏**了，所以引擎才会去回收这些没有用的变量，这一过程就叫垃圾回收。

程序的运行需要占用内存，**当这些程序没有用到时，还不释放内存，就会引起内存泄漏。**不再用到的内存，没有及时释放，就被称为内存泄漏。内存泄漏，会让系统占用极高的内存，让系统变卡甚至奔溃。

导致这问题的原因是 JavaScript 的引擎 V8 只能使用一部分内存，具体来说，在 64 位系统下，V8 最多只能分配 1.4G；在 32 位系统中，最多只能分配 0.7G。

因为使用内存大小上限，所以当有用不到的变量时，引擎会帮我们清理掉。

### 3.2 回收

**回收内存。清理变量，释放内存空间**  

参考链接：[深入理解垃圾回收机制](https://zhuanlan.zhihu.com/p/576722965)

### 3.3 机制

基本类型存在栈内存，引用类型存在堆内存。

**引擎需要栈来维护程序执行时的上下文状态**，如果所有数据都存放在栈内存中，会影响到上下文切换的效率，从而影响整个程序的执行效率。所以内容大的被存放到堆内存中。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230317164756336.png" alt="image-20230317164756336" style="zoom:80%;" />

 <img src="https://pic2.zhimg.com/v2-ba1ae480cc0a1382e0b607ba92cabe75_r.jpg" style="zoom:67%;" />

![img](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/v2-33f352d7ded14073b6fbf83a8b90dad5_r.jpg)

- Scavenge 算法：将空间分为两半，一半是 from 空间，一半是 to 空间。新加入的对象会放在 from 空间，当空间快满时，执行垃圾清理；再角色调换，再当调换完后的 from 空间快蛮时，再执行垃圾清理，如此反复

- 标记-清理-整理：此为两个算法，「标记-清理」算法和 「标记-整理」算法 

- - 标记-清理：标记用不到的变量，清理掉
  - 标记-整理：清理完内存后，会产生不连续的内存空间，为节省空间，整理算法会将内存排序到一处空间，空间就变大了

### 3.4 引用计数

引擎会有张”引用表“，保存了内存里面的资源的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，因此可以将这块内存释放。将`arr`置为`null`即可

出现问题：数组`[1,2,3,4]`是一个值，会占用内存。但被`arr`引用了。因此引用次数为1，但接下来的代码却没有用到`arr`，因此还是会持续占用内存。

```js
const arr = [1, 2, 3, 4];
console.log('hello world');
```

只要外部的引用消失，`WeakMap `内部的引用，就会自动被垃圾回收清除。



### 3.5 哪些操作

**几种造成内存泄漏的情况：**

1. 意外声明全局变量。不使用`var`声明的变量，相当于挂载到`window`上。这样子只要window对象没有被清理，那么它的属性就一直存在，造成内存泄漏。

   **解决方法：**加上声明关键字；使用`this`关键字；严格模式；赋值为`null`

2. 定时器导致的泄露。`setInterval(()=>{},100)`

3. 闭包：只要返回的函数存在就不能清理 `name`

   ```js
   let fn = functuon(){
       let name = "mary";
       return function(){
           return name;
       }
   }
   ```

4. 没有清理的`DOM`元素引用



## 4. 性能优化

## 5. 手写代码

### 5.1 实现new方法

#### 5.1.1 new操作符实现了什么？

1. 创建一个空的简单`JavaScript`对象（即`{}`）；
2. 为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象 ；即：`obj.__proto__ === Person.prototype`
3. **将步骤1新创建的对象作为this的上下文** ；这样子`Person`的`this`就指向`obj`。也就是说将`Person`上的属性添加到新的`obj`对象上。
4. 如果该函数没有返回对象，则返回this。



### 5.2 实现一个防抖函数

原理：**闭包+定时器**

本质：优化高频率执行代码的一种手段

防抖：`n`秒后执行该事件，若在`n`秒内被重复触发，则重新计时

好处：能够保证用户在频繁触发某些事件时，不会频繁的执行回调，只会被执行一次。

```js
function debounce(fn,t){
    let timer;
    return function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn();
        },t)
    }
}
```

防抖的应用场景很多：

- 输入框中频繁的输入内容，搜索或者提交信息；
- 频繁的点击按钮，触发某个事件；
- 监听浏览器滚动事件，完成某些特 定操作；
- 用户缩放浏览器的resize事件。

```js
// 未封装版
// 发送请求
function handleSearch(){
    console.log("发送请求");
}
// 实现防抖
let timer;

```

