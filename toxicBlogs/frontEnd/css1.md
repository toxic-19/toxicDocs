---
title: CSS预处理器
date: 2023-08-10
tags:
 - HTML和CSS
categories:
 - 前端
sidebar: 'auto'
---

> 用来增强和扩展CSS的功能。允许使用变量，嵌套和混入等等高级特性以更简洁和更可维护的方式来编写样式。

## 1. `Sass`和`Less`的区别

1. 参考链接：https://cloud.tencent.com/developer/article/2123846

2. 语法：Sass有两种语法格式，新版以`.scss`结尾；

   ​          Less类似CSS，使用大括号和分号，以`.less`结尾。

3. 变量：Sass使用 **`$`** 符号定义变量，Less使用 **`@`** 符号。

4. 插值：Sass使用 `#{}`；Less使用`@{}`将定义的值放在括号里。

5. 嵌套：都支持选择器和伪类嵌套；Sass还支持属性嵌套。

6. 作用域：Less采取就近原则，优先使用大括号里面的变量。            
                           Sass是从外层作用域到内层，除非在内层定义覆盖，否则就使用外层作用域的变量值。

7. 混合：都支持混合，将一组CSS规则封装为可重用的模块。        
                     Less支持类选择器和ID选择器；如果不想编译出来就加括号。         
                     Sass使用`@mixin`和`@include`进行使用。

8. 继承：Sass使用`@extend .className` 。
   
    ​           Less使用`&:extend(.className)`。编译后都会保留该样式。         
   ​           Sass在要被继承的样式前加`%`，编译后不会保留。
   
9. 支持自定义运算：Sass不允许不同单位，会报错。Less可以，以第一个为准。

10. 条件语句：Sass是使用`@if @else`。               
                      Less条件判断都是使用`when`。

11. 循环语句：`@for @while @each`

12. 导入：都是使用`@import`

## 2. `Sass`

[Sass 教程 - Sass入门学习 - 码农教程](http://www.manongjc.com/sass/sass_tutorial.html)

### 2.1. 变量和嵌套

1. 有两种语法格式：`Sass`和`Scss`。

​     `Sass`：缩进型旧版本格式，不使用分号和大括号，而是使用严格的缩进格式来书写，类似Ruby。

​     `Scss`：使用的是类似CSS的编写格式，使用分号和大括号，不用严格缩进。

2. 使用`$`声明变量。`$primary-color: red;`

​       变量的使用有一般值和默认值。一般值是如上进行使用即可。

​       默认值是先在变量值后加上 `!default`。在使用时进行覆盖。

​       有全局变量和局部变量。看定义在选择器的内部还是外部位置。

3. 嵌套：选择器、属性和伪类三种嵌套方式。

4. 建议使用 `/**/`进行注释，编译后可以被保留下来。

```SCSS
/* 缩进型 Sass 格式 */
.container
  width: 800px
  margin: 0 auto
  
  h1
    font-size: 24px
    text-align: center
```
```SCSS
/* 需要使用 Sass 编译器将 Sass格式的代码转为 CSS */
/* 变量声明的是默认值 */
$primary-color: red !default; /* 加上!default表示是默认值 */

h1 {
  color: $primary-color;
}

h2 {
  $primary-color: yellow; /* 使用同名变量的值进行覆盖掉 */
  color: $primary-color; /* 调用前一定要重新定义 */
}
```
```SCSS
/* 选择器嵌套：最好小于三层，否则编译为CSS的时候导致层级过深，代码冗余。不易维护 */
.container {
  h1 {
    font-size: 15px;
  }
}

/* 属性嵌套： 属性中有相同的前缀，将其提出进行嵌套 */
div {
  width: 100px;
  height: 100px; 
  font: { /* 注意一定要在font后加上冒号，否则会编译为选择器嵌套的格式 */
    size: 14px;
    weight: bold;
  }
}

/* 伪元素和伪类的嵌套：需要借助 & */
h1 {
  color: red;
  &:hover {
    color: yellow;
  }
}
.clearfix {
  *zoom: 1;
  &:after {
    clear: both;
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
  }
}
```

### 2.2. ✌️插值

> 语法：`#{i}`

```SCSS
/* 定义index.scss */
@each $i in left, center, right {
  .text-#{$i} {
    text-align: $i;
  }
}

@each $i in 0, 5, 10, 15, 20, 25, 30, 35, 40 {
  .m#{$i} {
    margin: $i * 1px;
  }
  .p#{$i} {
    padding: $i * 1px;
  }
}

/* 拼接URL地址 */
$wujie-images-path: '../../assets/imgs/wujie/';
.delete-icon {
  background-image: url('#{$wujie-images-path}delete.png');
}
```

### 2.3. 运算

> 一般我们在CSS中只能使用 `calc()`进行数字运算。

**加减法：注意需要同单位，否则报错。**

```SCSS
div {
  width: (100px - 20px); /* 使用括号 */
  height: (100px + 20px);
}
```

**乘除：只需要一方带单位即可。**

```SCSS
$height: 100px;
div {
  width: (100px * 2);
  height: $height / 2 /* 如果是变量可以不用加括号 */
} 
```

**使用`+`进行字符串拼接**

> 结果是否有引号取决于左侧的字符串是否有引号。

### 2.4 ✌️代码复用

**继承** `@extend`

> 将一个选择器的样式继承到另一个选择器上。编译完：多出一个同名类来声明继承的样式。

```SCSS
/* 定义基础按钮样式 */
.btn {
  width: 56px;
  font-size: 14px;
}
.success {
  @extend .btn;
  background: green;
}
.error {
  @extend .btn;
  background: red;
}
/* 编译后 */
.btn, .success, .error {
  width: 56px;
  font-size: 14px;
}
.success {
  background: green;
}
.error {
  background: red;
}    
```



**占位符** `%ploceholder`

> 优化`@extend`继承。如果 `.btn` 这个类名没有人使用，那么就会浪费。
>
> 如果不保留`.btn`基类的话，就使用占位符。

```SCSS
/* 定义基础按钮样式 使用 % 百分号开头*/
%btn {
  width: 56px;
  font-size: 14px;
}
.success {
  @extend .btn;
  background: green;
}
.error {
  @extend .btn;
  background: red;
} 

/* 编译后 因为是使用占位符%的 所以不保留基类.btn */
.success, .error {
  width: 56px;
  font-size: 14px;
}
.success {
  background: green;
}
.error {
  background: red;
} 
```



**混合宏 `@mixin`**

> 宏：可复用的代码块。
>
> 使用`@mixin`定义被多个地方使用的相同的CSS块。
>
> 使用`@include`来调用混合宏。
>
> 编译后会造成代码冗余，但是可以传递参数。

```SCSS
/* 不带参数的混合宏 */
@mixin scrollBar {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fafafa;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.45);
  }
}
body {
  @include scrollBar;
}

/* 携带参数或默认参数 */
@mixin ellipsis($lines: 2) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
}
.content {
  @include ellipsis; 
  /* 默认两行省略号 */
}

.content {
  @include ellipsis(3); 
  /* 三行省略号 */
}
```

场景：文本溢出

```SCSS
/**
 * 文本溢出
 * @param 容器宽度
*/
@mixin truncate($width: 100%) {
  width: $width;
  display: block;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### 2.5. 流程控制

**`@if`语句**

```SCSS
/* 根据不同的设备类型，使用不同的样式 */
$device: mobile;
@if $device == mobile {
  body {
    font-size: 12px;
  }
} @else {
  body {
    font-size: 14px;
  }
}
```

**`@for`循环**

> 语法：`start`和`end`都是正整数。
>
> 1. `for $i from start to end`：左闭右开，不包括end。
> 2. `for $i from start through end`：包括end。左闭右闭

```SCSS
@for $i from 1 through 3 {
  .item-#{$i} { /* slide-1动画应用到item-1 */
    animation: slide-#{$i} 1s ease infinite;
  }

  @keyframes slide-#{$i} {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }
}
```

**`@while`循环**

> 既是条件判断也是循环

**`@each`循环**

```SCSS
/* 将根据指定的断点生成对应的媒体查询样式类： */
$breakpoints: (
  "small": 480px,
  "medium": 768px,
  "large": 1024px
);

@each $name, $size in $breakpoints {
  @media (min-width: $size) {
    .container-#{$name} {
      max-width: $size;
    }
  }
}
/* 操作CSS Sprite*/
$properties:(margin, padding);
@mixin setValue($side , $value)
{
    @each $prop in $properties
    {
        #{$prop}-#{$side}:$value;
    }
}
.login-box{
    @include setValue(top , 14px);
}
.login-box{
    margin-top: 14px;
    padding-top: 14px;
}
```

## 3. Less

参考链接：[blog.csdn.net](https://blog.csdn.net/LeeDuoZuiShuai/article/details/131473607)

> 1. 嵌套
>
> 2. 加减乘除运算：不同单位出现冲突时，优先使用第一个运算数的单位。 
>
>    `width: 10px + 10% ` ==>  `width: 20px` 
>
>    `height: 3px * 2rem` ==>  `height: 6px`
>
> 3. `@import`导入`less`文件，被导入的选择器和变量都可以使用。

### 3.1. 变量

**使用`@`声明变量。允许先使用后定义。**

```CSS
@primaryColor: blue;
@bg: background-color;
@imagesPath: '../images';

.container {
  @{bg}: yellow; /* 在属性名或者选择器名上使用变量 格式为 @{name} */
  
  h1 {
    color: @primaryColor; /* 属性值位置使用变量 */
  }
  
  div {
    background-image: url("@{imagePath}/bg.png"); /* 在字符串中使用也是格式 @{name} */
  }
}
```

**通过`$`引用属性值。不需要定义。**

```CSS
.container {
  color: #428748;
  background-color: $color; /* 引用color的属性值 */
}
```

### 3.2. 混合

**支持类选择器和id选择器。**

```CSS
#box { /* 在选择器后加上() 编译后就不会重复出现#box */
  width:200px;
  height: 100px;
}
.text {
  color: blue;
  text-align: center;
  line-height: 24px;
}
.container {
  #box(); /* 调用了一个括号选择器，如果其中含有变量和其他选择器，都可以直接在container中调用 */
  .text();
}
```

### 3.3. 命名空间

> 命名空间 —— 括号选择器定义了其他的选择器。

```CSS
#color(@color) { /* 使用 @ 声明命名空间的参数 */
 /* 定义其他选择器 */
 .bg {
   background: @color;
 }
 .textColor {
   color: @color;
 }
 .borderColor: {
   border: 1px solid @color;
 }
}
.margins(@top, @right, @btm, @left){
  marigin: @arguments; /* @arguments 获取命名空间的全部参数 */
}
.container {
  /* 使用时要带上命名空间 */
  #color(red).bg();
  .margins(10px, 10px, 10px, 10px);
}
```

**递归调用**

```CSS
.create(@count) when (@count > 0) {
  .container-@{count} {
    width: @count * 100px;
  }
  .create((@count - 1));
}

.create(5);
```