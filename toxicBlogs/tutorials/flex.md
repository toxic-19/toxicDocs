---
title: CSS —— Flex布局
date: 2023-12-10
categories:
 - 前端
sidebar: 'auto'
---

## 1. 基础汇集

```html
<div class="flex-container">
  <span class="flex-item">1</span>
  <span class="flex-item">2</span>
  <span class="flex-item">3</span>
  <span class="flex-item">4</span>
  <span class="flex-item">5</span>
  <span class="flex-item">6</span>
</div>
```
```scss
.flex {
  &-container {
    width: 340px;
    height: 300px;
    padding: 10px;
    background: #1f2d3d;
    
    /* flex布局：container为容器 */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around; /* 主轴上的对齐方式： around 代表项目两侧的间隙是相等的。 between 代表项目两端对齐。默认 flex-start 左对齐 */
    
    align-items: center; /* 交叉轴上的对齐方式：baseline 项目的第一行文字的基线对齐【适用于项目高度不一致的情况】 默认stretch伸展占据交叉轴 */
    
    align-content: stretch; /* 多根轴线的对齐方式：一排项目为一根轴线，就目前算是两根，属性同align-items */
    
    /* 作为flex容器上的复合属性只有 flex-flow: flex-direction flex-wrap */
    flex-flow: row wrap;
  }
  &-item {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000000;
    font-size: 30px;
    background: #eeeeee;
    margin: 10px;
    /* flex布局：item为项目 */
    flex-grow: 0; /* flex-grow：即为放大比例，默认为0，即便有剩余空间也不放大 */
    flex-shrink: 1; /* 前提在于空间不足的情况下 进行比例的缩小 */
    flex-basis: auto; /* flex-basis：即为项目占据的主轴空间大小 默认auto即为容器本身大小 浏览器根据这个属性来判断容器是否有多余空间 */
    
    /* 建议使用其复合属性 flex: grow shrink basis */
    
    &:nth-child(3) {
      order: -1; /* order: 定义项目的排列顺序 数值越小越靠前 默认为0 */
    }
    
    &:nth-child(5) {
      align-self: flex-end; /* 允许该项目与其他项目有在交叉轴上不同的对齐方式，对标容器上的align-items属性 */
    }
  }
}
```

> :field_hockey: 要记住：
>
> 1. 我最常用的就是对项目使用 `flex` 复合属性。是由 `grow shrink basis` 构成的。
> 2. 在容器中最易遗忘的为 `align-content` 定义多条轴线的对齐方式。与`flex-wrap`息息相关。
> 3. 比较好用的是`align-self`允许特别项目与其他项目的不同对齐方式，增加灵活性。

 ![image-20231213213051785](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231213213051785.png)

## 2. 骰子

```html

```

