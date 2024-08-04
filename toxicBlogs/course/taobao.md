---
title: 淘宝静态主页【纯HTML+CSS】
date: 2023-07-02
tags:
 - 开发总结
categories:
 - 项目
sidebar: 'auto'
---

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/11.jpg" style="zoom:67%;" />

## 1. 样式重置与模块化

```sh
CSS的样式重置是一种将浏览器默认样式归零的技术，以便更好地控制网页的外观。
CSS模块化则是将CSS代码分解为可重用、可维护的模块，以便更好地管理和组织CSS代码。
```

```css
/* 样式重置和模块化 */
body,p,h1,h2,h3,h4{
    margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
img{
    border: none;
    vertical-align: middle;
    /* 和文字垂直对齐，不然底部会有空白 */
}
a{
    text-decoration: none;
    color: #3c3c3c;
}
i{
    font-style: normal;
}
input{
    margin: 0;
    padding: 0;
}
table{
    border-collapse: collapse;
    /* 边框模式：合并模式 两个单元格之间只显示一个边框*/
}
th,td{
    padding: 0;
}
button{
    outline: none;
}
body{
    /* 1.5行高 (有四种值) 微软雅黑1.32 宋体1.41*/
    /* line-height: 50px;(绝对值) 字体默认16px
    line-height: 1.5;即24px
    line-height: 200%;即32px
    line-height: 5em; 即80px*/
    font: 12px/1.5 tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
    /* font-family: SimSun;
    font-family: Miscrosoft YaHei; */
    /*
    body{
        font-size:14px;
        line-height:1.5;
        如果子元素有类似p{font-size:20px;}那么最终p元素的行高是20*1.5=30px
    }
    */
    /*
    body{
        font-size:14px;
        line-height:150%;
        这里算出来行高是14*1.5=21px;那么所有的子元素就会继承这个行高都为21px;
    }
    */
    color: #3c3c3c;
    background-color: #f4f4f4;
}



/* 预定义class */
.clearfix::after{ /*消除浮动*/
    content: '';
    display: block;
    clear: both;
}
.fl{
    float: left;
}
.fr{
    float: right;
}

.layer{
    width: 1190px;
    margin: 0 auto;
}
.c4{
    color: #f40;
}
.mt10{
    margin-top: 10px;
}
```

## `line-height` 的不同值区别

1. 绝对值。`px`单位；固定长度。

   ```css
   line-height: 50px; /*不与字体大小font-size有关。你写多少就是多少*/
   ```

2. 数字。不加单位；与字体大小的倍数关系。

   ```css
   font-size: 20px;
   line-height: 1.5; /*是font-size的1.5倍，即20*1.5=30px*/
   ```

3. 百分比。不加单位；也是倍数的关系。

   ```css
   font-size: 20px;
   line-height: 200%; /*是font-size的200%，即40px*/
   ```

4. `rem`单位：本身就是倍数关系。表示相对于根元素`html`元素的字体大小的倍数。

   使用 `rem` 单位的好处是，可以方便地实现响应式布局。如果在不同的屏幕尺寸下，根元素的字体大小发生变化，那么使用 `rem` 单位设置的元素大小也会自动适应。

   ```css
   font-size: 20px;
   line-height: 5rem; /*100px*/
   ```

## @规则

[At 规则 - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)

用于定义一些特殊的样式和引入外部资源。

1. 引入外部样式。

   ```css
   @import url('style.css'); /*表示引入style.css文件中的样式*/
   ```

2. `@media`：根据媒体类型或条件来定义不同的样式。