---
title: html5
date: 2023-03-15
categories:
 - 面试
sidebar: 'auto'
---

## 1. H5的新特性有哪些?

参考：[html5新特性总结 - 斌果 - 博客园 (cnblogs.com)](https://www.cnblogs.com/binguo666/p/10928907.html)

[【HTML】H5新特性有哪些？看这篇文章就够了 - 掘金 (juejin.cn)](https://juejin.cn/post/6909698127689220109)

> 1. 语义化标签：提升页面的阅读型【结构性加强】，更有利于SEO
> 2. 增强型表单，新增表单控件
> 3. 新增媒体元素如`audio`,`video`:输出音频或视频流
> 4. `Canvas API` `地理API` `拖拽API`
> 5. 新增本地存储方式：`sessionStorage、localStorage`
> 6. 新技术：`webworker、websocket`



### 1.1 语义标签|增强型表单

|    标签     |          描述          |
| :---------: | :--------------------: |
| `<header>`  |   定义文档的头部区域   |
| `<footer>`  |  定义了文档的尾部区域  |
|   `<nav>`   |     定义文档的导航     |
| `<section>` |     定义文档中的节     |
| `<article>` |        定义文章        |
|  `<aside>`  |   定义页面以外的内容   |
| `<figure>`  | 定义自包含内容，如图表 |
|  `<time>`   |     定义日期/时间      |

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101144139426.png" alt="image-20230101144139426" style="zoom:67%;" />

:facepunch: html5新增了一些input输入特性，表单元素。改善更好地 输入控制和验证。

参考 [输入（表单输入）元素 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_types) 

[HTML5 的输入（input）类型 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/HTML5_input_types)

[其他表单控件 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Other_form_controls)

```html
<!-- 输入特性 -->
<input type="color" />  
<input type="date" />
<input type="datetime" /> 
<input type="datetime-local" /> 
<input type="month" /> 
<input type="week" />
<input type="time" /> 
<input type="email" /> 
<input type="number" />
<input type="url" />
<input type="tel" />
<input type="search" />
<input type="range"/>
<!--datalist:数据列表的使用，为input提供建议列表-->
<datalist id="urlsxx">
    <option>https://developer.mozilla.org</option>
    <option>https://caniuse.com/</option>
    <option>https://mozilla.com</option>
    <option>https://mdn.github.io</option>
</datalist>
<p>
    <label for="urlx"></label>
    <input type="url" list="urlsxx" id="urlx"/>
</p>
<!--progress:进度条 未指定value时， 显示进行中样式-->
<progress value="0.5"></progress>
<!--meter：刻度尺/度量衡，用红黄绿三色表示出一个数值所处的范围：不可接受/可以接受/最优范围-->
<meter min="最小可能值" max="最大的可能值" low="合理的下限" high="合理的上限" optimum="最优值" value="实际值"></meter>
<!--输出，用于描述表中的计算结果，语义标签同span-->
<output>xxx</output>
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101144836470.png" alt="image-20230101144836470" style="zoom:67%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101161644903.png" alt="image-20230101161644903" style="zoom:90%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101161408991.png" alt="image-20230101161408991" style="zoom:90%;" />



### 1.2 媒体元素

:facepunch: 参考链接： [<video>: 视频嵌入元素 - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/web/html/element/video)

[<audio> - HTML（超文本标记语言） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

:facepunch: `video`：用于支持文档中的视频播放；`audio`:用于在文档中嵌入音频内容。



### 1.3 API

#### 1.3.1 Canvas API

:facepunch: 主要聚焦于2D图形。

[Canvas - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

注意：`<canvas>`标签只是一个图形容器，必须使用脚本绘制图形。

脚本步骤：

1. 找到 `<canvas>`元素
2. 创建`context`对象，使用内置 `Html5` 对象
3. 绘制图形；使用`fillStyle`或者`fillRect`方法来定义

```js
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// 绘制长方形
context.fillStyle = "#000";
context.fillRect(0,0,200,100); // 定义矩形填充方式(x,y,width,height)

// 绘制路径
context.moveTo(0,0);      // 起点
context.lineTo(200,100);  // 终点
context.stroke();         // 连线

// 绘制圆形
context.beginPath();
context.arc(40,40,40,0,2*Math.PI);
context.stroke();

// 绘制文本
context.font = "20px Arial";
context.fillText("hello world",10,50) // left and top  实心字体
or context.strokeText("hello world",10,50) // 空心字体

// 渐变：线条渐变；径向渐变
let gradient = context.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"red");
gradient.addColorStop(1,"white");   // 创建渐变
context.fillStyle = gradient;
context.fillRect(10,10,150,80)      // 填充渐变
```

> 绘制圆形中：
>
> 1. `arc(x,y,r,start,stop)` 如果`x, y`都为0，那么就会在左上角出现四分之一圆。是指以`x,y`为圆心，以`r`为半径，从`startAngle`开始直到`stopAngle`结束。
>
>     ![image-20230315142412558](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230315142412558.png)
>
> 绘制文本中：
>
> 1. 实心与空心文本：
>
>    ![image-20230315143719659](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230315143719659.png)![image-20230315143738908](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230315143738908.png)

 

#### 1.3.2 地理API

#### 1.3.3 拖放API

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。

在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

步骤

1. 设置元素为可拖放 `draggable:true`
2. 设置拖动的元素 绑定`onDragstart`事件中设置 `setData()`

3. 设置放置的数据 绑定`onDragover` 事件中设置阻止对元素的默认处理方式。调用`event.preventDefault()`
4. 进行放置 绑定`ondrop` 阻止默认处理；获取到被拖动的数据；追加元素。

```js
function drag(event){
    event.dataTransfer.setData("Text",event.target.id);
}
function allowDrap(event){
    event.preventDefault();
}
function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
}
```

```html
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<img id="drag1" src="/images/logo.png" draggable="true" ondragstart="drag(event)" width="336" height="69">
```



### 1.4 本地存储方式

参考链接：[Window.localStorage - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)           

 [Window.sessionStorage - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)

:one: 只读的`localStorage` 属性允许你访问一个[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 源（origin）的对象 [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)；存储的数据将保存在浏览器会话中。

:two: `sessionStorage` 属性允许你访问一个，对应当前源的 session [`Storage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage) 对象。

:three: 区别：存储在 `localStorage` 的数据可以长期保留，没有过期时间设置；而当页面会话结束——也就是说，当页面被关闭时，存储在 `sessionStorage` 的数据会被清除。应注意，无论数据存储在 `localStorage` 还是 `sessionStorage` ，**它们都特定于页面的协议。**

> 应该注意，存储在 sessionStorage 或 localStorage 中的数据**特定于页面的协议**。也就 是说 `http://example.com` 与 `https://example.com` 的 sessionStorage 相互隔离。

:four: `webstorage`拥有5M的存储容量，但`cookie`只有4k。

#### 1.4.1 localStorage

```js
// 添加
localStorage.setItem("myCat","Tom");
// 读取
let cat = localStorage.getItem('myCat');
// 移除
localStorage.removeItem('myCat');
// 移除所有
localStorage.clear();
```

![image-20230101175145698](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101175145698.png)



#### 1.4.2 sessionStorage

```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();

```

:punch: 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。

:punch: 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

```js
// 获取文本输入框
let field = document.getElementById("field");

// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (sessionStorage.getItem("autosave")) {
    // 恢复文本输入框的内容
    field.value = sessionStorage.getItem("autosave");
}

// 监听文本输入框的 change 事件
field.addEventListener("change", function () {
    // 保存结果到 sessionStorage 对象中
    sessionStorage.setItem("autosave", field.value);
});
```

![image-20230101193735748](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101193735748.png)



### 1.5 `websocket`

#### 1.5.1 概念

> - WebSocket是HTML5下一种新的协议（websocket协议本质上是一个基于tcp的协议）
> - 它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的
> - Websocket是一个**持久化**的协议

#### 1.5.2 原理

> 1. websocket约定了一个通信的规范，通过一个握手的机制，客户端和服务器之间能建立一个类似tcp的连接，从而方便它们之间的通信
> 2. 在websocket出现之前，web交互一般是基于http协议的短连接或者长连接
> 3. websocket是一种全新的协议，不属于http无状态协议，协议名为"ws"

#### 1.5.3 与http的关系：

:facepunch: 相同点：

1. 都是基于tcp，都是可靠性传输协议
2. 都是应用层协议

:punch: 不同点：

1. `websocket`是双向通信协议，模拟`socket`协议，可以双向发送或接受消息。`http`是单向的。
2. `websocket`是需要浏览器和服务器握手进行建立连接的。而`http`是浏览器发起向服务器的连接，服务器预先不知道这个连接。

:punch: 联系：

`websocket`在建立握手时，数据是通过`http`传输的。但是建立之后，在真正传输的时候是不需要`HTTP`协议的。

:punch: 总结：

1. 首先，客户端发起`http`请求，经过3次握手后，建立起`TCP`连接；http请求里存放`WebSocket`支持的版本号等信息，如：`Upgrade`、`Connection`、`WebSocket-Version`等；
2. 然后，服务器收到客户端的握手请求后，同样采用`HTTP`协议回馈数据；
3. 最后，客户端收到连接成功的消息后，开始借助于`TCP`传输信道进行全双工通信。
   

### 1.6 `webworker`



## 2. 

### 2.1 实现`label`使用

:punch: 作用：label标签来定义表单控制间的关系，浏览器会自动将焦点转到与标签相关的表单控件上。

```html
<!-- for之后是要控制的表单控件的id属性 -->
<label for="Name">Name:</label>
<input type="text" id="Name"> 
<!-- 或者直接将表单控件使用label套起来-->
<label>Name:<input type="text"></label>
```



### 2.2

### 2.3



## 3. H5应该有：

1. `Api`

   ```
   1. Canvas api
   2. Geolocation api
   3. Drag and Drop api
   4. audio api
   5, video api
   ```

2. 语义标签

   ```html
   <header></header>
   <nav></nav>
   <footer></footer>
   <aside></aside>
   <article></article>
   <section></section>
   ```

3. 存储

   ```
   1. localStorage
   2. sessionStorage
   ```

4. 新增表单控件

   ```
   calendar date time email url search
   input标签新增属性：placeholder、autocomplete、autofocus、required
   ```

5. 新技术

   ```
   1. webworker
   2. websocket
   3. GeoLocation
   ```


6. history API：go、forward、back、pushstate

## 4. H5新鲜知识点

1. `DocType` 新的文档类型声明；`<meta charset="UTF-8">` 记得中文要加上声明编码，不然会乱码。
2. `html`本地存储：优于`cookies`；本地存储更加安全，并且可在不影响网站性能的前提下将大量数据存储于本地。存储限制要大的多，至少5MB，并且信息不回被传输到服务器。
3. `html`本地存储：`LocalStorage`和`sessionStorage`；都是存在`window`下的`api`。
4. 区别：`localStorage `对象存储的是没有截止日期的数据。当浏览器被关闭时数据不会被删除，在下一天、周或年中，都是可用的。但是`sessionStorage `在用户关闭具体的浏览器标签页时，数据也会被删除。
5. 应用程序缓存：对web应用进行缓存，可以在无网络链接时进行访问。启动应用缓存，需在`<html>`标签中包含`mainfest`属性。
6. `svg`指可伸缩矢量图形，使用`XML`格式，放大或改变尺寸的情况下图形质量不会有损失。`svg`是www联盟的标准。

