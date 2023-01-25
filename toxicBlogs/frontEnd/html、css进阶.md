---
title: html与css进阶
date: 2022-12-8
tags:
 - 前端
categories:
 - 前端
sidebar: 'auto'
---

### [【查漏补缺】HTML与CSS进阶](https://mp.weixin.qq.com/s/k1nQtg5GAeNKGKI2izlkWQ)

#### H5新增
  ##### 1. 两个概念
  > 1.是一个新版本的HTML语言，定义了新的标签、特性和属性
    2.拥有一个强大的技术集，这些技术集是指：HTML5、CSS3、JavaScript,这也是广义上的HTML5。
  ##### 2. 扩展内容
  > 语义化标签
    本地存储
    兼容特性
    2D、3D
    动画、过渡
    CSS3特性
    性能与集成

#### HTML5新增标签  
  + **语义化标签:便于SEO**
    + header
    + nav
    + article    ---- 内容标签
    + section    ---- 块级标签
    + aside      ---- 侧边栏标签
    + footer
    ![](/html_img/语义化标签.png)
  + **新增多媒体视频音频标签video audio**
    ![](/html_img/audio.png)
    
    ```html
        <!-- 
        controls:显示音频 
        autoplay:自动播放
        loop:循环播放
        《告白气球》
        -->
        <audio src="http://www.ihaoge.net/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_7149583&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3" controls autoplay loop></audio>
    ```
    ```html
    ```