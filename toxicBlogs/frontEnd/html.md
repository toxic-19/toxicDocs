---
title: 查漏补缺html
date: 2022-12-8
tags:
 - html
categories:
 - 前端
sidebar: 'auto'
---

## 查漏补缺 HTML

#### 1.锚链接

- ##### 解释：在要跳转的 a 标签里面设置 name 属性，在点击的那个 a 标签里面设置 href 为带星号的 name
  ```css
  <a name="top">top</a>
  <a href="#top">回到top</a>
  ```
- ##### 在其他页面打开该 index.html 页面的底部

  ```html
  <!-- 比如这里是demo.html,我们要跳转到index的底部 -->
  <a href="index.html#down">跳转到index的底部</a>
  
  <!-- 在index.html中设置： -->
  <a name="down">底部down</a>
  ```

#### 2.功能链接

- ##### 邮件：mailto
  ```html
  <a href="mailto:3468528598@qq.com"></a>
  ```
- ##### QQ：qq 推广

#### 3.列表

- ##### 有序列表`<ol><li></li></ol>`
- ##### 无序列表`<ul><li></li></ul>`
- ##### 定义列表`<dl><dt></dt><dd></dd></dl>`
  ```html
  <dl>
      <dt>学科</dt>
      <dd>JAVA</dd>
      <dd>PYTHON</dd>
      <dd>C/C++</dd>
  </dl>
  ```

#### 4.表格

- ##### 行`<tr></tr>` 列`<td></td>` 一般先定义行，再嵌套列
  `<table> <tr> <td></td> </tr> </table>`
- ##### 跨行`rowspan="?"`
  ```html
  <!-- 定义一个2行3列的表格 -->
      <table>
          <!-- 属于第一行 -->
          <tr>
              <!-- 跨行：即一个格子占了上下两行，第二行必须-->
              <!-- 删去 ?-1 个td，否则会被顶出去  -->
              <td rowspan="2"></td>
              <td></td>
              <td></td>
          </tr>
          <!-- 属于第二行 因此在第二行只剩两个td-->
          <tr>
              <td></td>
              <td></td>
          </tr>
      </table>
  ```
- ##### 跨列`colspan="?"`
  ```html
  <!-- 定义一个2行3列的表格 -->
      <table>
          <!-- 属于第一行 -->
          <tr>
              <!-- 跨列：即一个td占了左右两列 同一个行必须删去 ?-1 个td-->
              <td colspan="2"></td>
              <td></td>
              <td></td>
          </tr>
          <!-- 属于第二行 -->
          <tr>
              <td></td>
              <td></td>
              <td></td>
          </tr>
      </table>
  ```

#### 5.媒体

- ##### video:`<video src="" controls autoplay></video>`
  ##### 注意必须有 controls,不然看不到
- ##### audio:`<audio src="" controls autoplay></audio>`
  ##### 注意必须有 controls,不然看不到

#### 6.iframe 内联框架

- ##### `<iframe src="https://www.kuangstudy.com" name="狂神"></iframe>`

```html
<!-- 内联框架使用 通过a标签往里面加东西-->
<iframe src="" name="hello" frameborder="0" width="1000px" height="800px"></iframe>
<a href="https://blog.kuangstudy.com" target="hello"></a>
```

#### 7.表单

- ##### 格式：`<form action="要提交的地址" methods=""get/post></form>`

- ##### type 属性的不同

**text 文本**：

```html
    <p>名字: <input type="text" name="username"></p>
```

**password 密码**：

```html
    <p>密码: <input type="password"></p>
```

**radio 单选**:单选框，name 要一致

```html
    <p>性别：
        <input type="radio" name="sex">男
        <input type="radio" name="sex">女
    </p>
```

**CheckBox 多选**：多选框

```html
    <p>爱好：
        <input type="checkbox" name="hobby" id="">睡觉
        <input type="checkbox" name="hobby" id="">打码
        <input type="checkbox" name="hobby" id="">吃饭
    </p>
```

**email 邮箱**:

```html
    <p>邮箱
        <input type="email" name="email">
    </p>
```

**url 链接**:

```html
    <p>url
        <input type="url" name="url">
    </p>
```

**number 数字**:

```html
    <p>数字
        <input type="number" name="num" max="100" min="0" step="10">
    </p>
```

**range 滑块**:

```html
    <p>滑块用量：
        <input type="range" name="voice" min="0" max="100" step="2">
    </p>
```

**search 搜索**:

```html
    <p>搜索框
        <input type="search" name="search" id="">
    </p>
```

**reset 和 submit 重置和提交**:

```html
    <p>
        <input type="reset" value="重置">
        <input type="submit" value="提交">
    </p>
```

**file**

- ##### 不同的标签
  **下拉列表**

```html
    <p>国家
        <select name="列表名称" id="">
            <option value="china">中国</option>
            <option value="us">美国</option>
            <option value="en">英国</option>
            <option value="yindu">印度</option>
        </select>
    </p>
```

**文本域**

```html
    <p>反馈
        <textarea name="textarea" cols="30" rows="10"></textarea>
    </p>
```

- ##### 一些属性
  - readonly 只读
  - disabled 禁读
  ```html
      <p>性别：
          <input type="radio" name="sex" disabled>男
          <input type="radio" name="sex">女
      </p>
  ```
  - hidden 隐藏【可以设置 value 然后隐藏，虽然看不见，但是可以提交】
- ##### 初等验证
  - placeholder：提示话语
  - required:必填项
  ```html
      <p>密码: <input type="password" required></p>
  ```
  - pattern：正则表达式
  ```html
      <p>邮箱
          <input type="email" name="email" pattern="\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*">
      </p>
  ```
- ##### label

## 查漏补缺 CSS

#### 1.引入 css 的四种方式

- **注意：行内样式的优先级要大于内部样式大于外部样式**
- 1. 行内样式

```html
  <h1 style="color:red">一级标题</h1>
```

- 2. 内部样式

```html
  <head>
      <title></title>
      <style>
          /*内部样式*/
          h1{
              color:red;
          }
      </style>
  </head>
  <body>
      <h1>一级标题</h1>
  </body>
```

- 3. 外部样式

```css
  h1{
     color:red;
  }
```

```html
  <head>
      <title></title>
      <link rel='stylesheet' href="css/index.css">
  </head>
  <body>
      <h1>一级标题</h1>
  </body>

```

- 4. 导入式外部样式【css2】

```html
  <head>
      <title></title>
      <style>
         @import url('css/index.css')
      </style>
  </head>
  <body>
      <h1>一级标题</h1>
  </body>
```

#### 2.标签选择器

- 优先级：id>class>标签

#### 3.层次选择器

- **后代选择器** :选中 body 下的所有 p 标签 `body p{color:red}`
- **子选择器>号**：只选择一代

```css
  /*只选择body后面的第一代元素*/
  body>p{
      color:red;
  }
```

- **相邻兄弟选择器+号**:同辈 向下 一个

```css
  /*只选择相邻向下的一个兄弟元素，*/
  .active + p{
      color:red;
  }
```

- **通用选择器~号**

```css
  /*当前选中元素的向下的所有兄弟元素*/
  .active~p{
      color:red;
  }
```

#### 4.结构伪类选择器

- 避免使用 class 和 id 选择器
- html 结构：

```html
  <body>
      <p>p1</p>
      <p>p2</p>
      <p>p3</p>
      <ul>
          <li>li1</li>
          <li>li2</li>
          <li>li3</li>
      </ul>
  </body>
```

- **:first-child** :ul 下的第一个 li 标签

```css
  /*选中ul下的第一个子元素li1*/
  ul li:first-child{
      color:red;
  }
```

- **:last-child** :ul 下的最后一个 li 标签

```css
  /*选择ul的最后一个li元素li2*/
  ul li:last-child{
      color:red;
  }
```

- **:nth-child(n)** :定位到 p 的父元素，选择当前的第 n 个元素,，而且选择的必须是当前元素才生效

```css
  /*选择p1标签 如：p的父元素body下的第一个元素如果是p的话，就选中，否则不行*/
  p:nth-child(1){
      color:red;
  }
  /*但是呢在p1前面加上一个其他标签如<h1></h1>的话，nth-child(1)是无法找到的
  但是nth-child(2)可以选中*/
```

- **nth-of-type**:弥补 nth-child(n)的缺陷

```css
  /*选中的是p标签的父元素的第一个p标签*/
  p:nth-of-type(1){
      color:red;
  }
```

#### 5.属性选择器

```html
<!-- 原始html材料 -->
    <p class="demo">
        <a href="https://www.baidu.com" class="links first">1</a>
        <a href="https://scau.edu.cn" class="links">2</a>
        <a href="#" class="links">3</a>
        <a href="#" class="links">4</a>
        <a href="#" class="links">5</a>
    </p>
```

```css
/*原始css材料*/
    .demo a {
        float: left;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: wheat;
        color: black;
        text-decoration: none;
        margin-right: 10px;
        border-radius: 10px;
    }
```

- **id 属性选择器**

```css
  a[id= first ]{
      background:'#63ff23';
  }
```

- **class 属性选择器**
  - **注意:**
    - \*= 是包含
    - = 是绝对相等
    - ^= 是以什么开头
    - \$= 是以什么结尾
  - **代码要一一演示**

```css
/*就是只能有links的class属性，不能有别的class属性并列*/
  a[class ='links'] {
      background-color: lightgreen;
  }
```

```css
/*但是*=是包含的意思，不管是否是有其他class属性并列*/
  a[class *= "links"]{
      background-color: lightblue;
  }
```

```css
  a[href ^= https] {
      background-color: lightsalmon;
  }
```

#### 6.文本样式

- **text-indent**

```css
  p{
      /*段落首行缩进两个字符*/
      text-indent:2em;
  }
```

- **vertical-align**

```css
  img {
      width: 500px;
  }
  /*要选中水平居中的双方，同时设置vertical-align为middle*/
  img,
  span {
      vertical-align: middle;
  }
```

```html
  <img src="../md_img/mode.png" alt="">
  <span>和图片水平居中</span>
```

#### 7.文本阴影和超链接伪类

- :hover :active :link :visited
- text-shadow

```css
  p{
    /*阴影颜色，水平偏移，垂直偏移，阴影半径*/
    text-shadow:red 10px -10px 2px;
  }
```

- background 的复合写法

```css
  div{
    /*270px 10px 图片位置*/
    background:red url() 270px 10px no-repeat;
  }

```

#### 8.盒子模型

- **盒子阴影** box-shadow
- **margin：0 auto;的用法**
  - 实际上在 demo 里面设置 margin 和 text-align 就可以实现盒子和内容一起在整个页面中居中了，但是每个文本或者图片这样子的话就都要包裹一个 div
  - 如果单单设置图片和文本，只需要设置 display 和 margin 即可

```css
    html,
    body {
        margin: 0;
        padding: 0;
    }

    .demo {
        width: 500px;
        height: 200px;
        line-height: 50px;
        background-color: wheat;
        color: black;
        border-radius: 10px;
        margin: 0 auto;
        /*使得div盒子demo在body父元素里面居中*/
        /* text-align: center; */
        /* 使得demo里面的内容在demo里面居中 无论是文本还是图片 */
    }

    img {
        /* 如果我不设置demo里面的text-align为center，那么只设置
        img的margin是无法成功的，只有加上display才可以 */
        display: block;
        margin: 0 auto;
    }
```

```html
  <body>
    <div class="demo">
        <img src="../html_img/R-C.jpg" alt="">
    </div>
    <img src="../html_img/R-B.jpg" alt="">
  </body>
```

![](html_img/实现效果.png)

#### 9.浮动 float

- **重点块级元素：h1~h6 p div table+ form+**

```html
 块级元素列表：
<address>定义地址

<caption>定义表格标题

<dd>定义列表中定义条目

<div>定义文档中的分区或节

<dl>定义列表

<dt>定义列表中的项目

<fieldset>定义一个框架集

<form>创建 HTML 表单

<h1>定义最大的标题

<h2>定义副标题

<h3>定义标题

<h4>定义标题

<h5>定义标题

<h6>定义最小的标题

<hr>创建一条水平线

<legend>元素为

<fieldset>元素定义标题

<li>标签定义列表项目

<noframes>为那些不支持框架的浏览器显示文本，于 frameset 元素内部

<noscript>定义在脚本未被执行时的替代内容

<ol>定义有序列表

<ul>定义无序列表

<p>标签定义段落

<pre>定义预格式化的文本

<table>标签定义 HTML 表格

<tbody>标签表格主体（正文）

<td>表格中的标准单元格

<tfoot>定义表格的页脚（脚注或表注）

<th>定义表头单元格

<thead>标签定义表格的表头

<tr>定义表格中的行
```

- **重点行内元素：a img span strong i em**

```html
行内元素
<a> - 锚点；

<abbr> - 缩写；

<acronym> - 首字；

<b> - 粗体(不推荐)；

<bdo> - bidi override；

<big> - 大字体；

<br> - 换行；

<cite> - 引用；

<code> - 计算机代码(在引用源码的时候需要)；

<dfn> - 定义字段；

<em> - 强调；

<font> - 字体设定(不推荐)；

<i> - 斜体；

<img> - 图片；

<input> - 输入框；

<kbd> - 定义键盘文本；

<label></label> - 表格标签；

<q> - 短引用；

<s> - 中划线(不推荐)；

<samp> - 定义范例计算机代码；

<select> - 项目选择；

<small> - 小字体文本；

<span> - 常用内联容器，定义文本内区块；

<strike> - 中划线；

<strong> - 粗体强调；

<sub> - 下标；

<sup> - 上标；

<textarea> - 多行文本输入框；

<tt> - 电传文本；

<u> - 下划线；
```

#### 10.display:inline-block: 保持块元素的特性，又能写在一行
