---
title: 1.小程序简介
date: 2022-12-8
tags:
 - 原生小程序
categories:
 - 小程序
sidebar: 'auto'
---





## 1.与普通网页的区别

  + **运行环境不同**，小程序：微信环境
  + **API不同**，无法使用DOM和BOM的api，使用微信环境提供的各种api
  + **开发模式**：
    + 1.申请账号
    + 2.安装小程序开发者工具
    + 3.创建和配置小程序项目



## 2.注册开发

  + **获取小程序APPID**
    + 开发管理 ==> 开发设置 ==> 开发者id
    + wx53d7952627b1bc9c
  + **新建项目**：不使用云开发，JavaScript
  + 点击‘**编译**’，就可以将小程序展示出来
  + **常用**
    + 帮助 ==> 开发者文档
    + 工具 ==> 构建npm



## 3.小程序项目的基本组成结构

  + 1.**pages**:存放页面
  + 2.**utils**：存放工具性质的模块 
  + 3.**app.js**：入口文件
  + 4.**app.json**:全局配置文件
  + 5.**app.wxss**:全局样式文件
  + 6.**project.config.json**:配置文件
  + 7.**sitemap.json**:是否被微信索引



## 4.页面组成部分

  + **每个页面由4个基本文件组成**
    + .js
    + .json ：数据格式
    + .wxml : 当前页面的模板结构文件
    + .wsss
  + **json配置文件**
    + app.json：全局配置
      + 1.pages：记录当前所有页面的路径
      + 2.window：全局定义页面背景色等
      + 3.style：使用的样式版本
      + 4.sitemapLocation：指明sitemap.json的位置
    + project.config.json
      + 1.setting
      + 2.appid
      + 3.projectname
      + "checkSiteMap":false,
    + sitemap.json
      + 已开放小程序内搜索，类似pc中的SEO
      + 配置小程序页面是否允许微信索引
    + 每个页面都有的json文件
      + 页面json会覆盖app.json中相同的配置项  



## 5.新建小程序页面  

  + 只需要在app.json中pages中**新增页面的存放路径**，会自动创建
  + **修改首页**：小程序把排在pages第一位的页面当做首页渲染（模拟器）



## 6.WXML模板

  + 小程序框架设计的一套标签语言，**用来构建小程序页面的结构**，类似HTML
  + 区别：
    + 标签名称
      + div-view
      + span-text
      + img-image
      + a-navigator
    + 属性节点
      + `<a href="#"></a>`
      + `<navigator url="pages/home/home"></navigator>`
    + 提供了类似Vue中的模板语法
      + 数据绑定
      + 列表渲染
      + 条件渲染



## 7.WXSS样式

  + 样式语言，**描述WXML的组件样式**，类似css
  + 区别：
    + 新增了rpx尺寸单位：自动单位换算
    + 提供了全局样式app.wxss和局部样式index.wxss
    + 仅支持部分css选择器:.class #id element ::after ::before 并类选择器和后代选择器



## 8.JS逻辑交互 

  + 作用：**处理用户操作**
  + app.js：小程序入口文件，通过App()来启动整个小程序
  + index.js：页面入口文件，调用Page()来创建并运行页面
  + 普通js文件：普通功能模块文件，封装



## 9.小程序的宿主环境  

+ **程序运行所必须的依赖环境** 

+ 手机维信是小程序的宿主环境，借助微信提供的能力

+ 宿主环境包含的内容

    **通信模型**

    + 通信主体：渲染层（WXML和WXSS）和逻辑层（JS）
      
      ![通信主体](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E9%80%9A%E4%BF%A1.png)
      <!-- <img :src="$withBase('/md_img/通信.png')" alt="通信主体"> -->
      
    + 通信模型：（由微信客户端进行转发）
    
      1.渲染层和逻辑层之间的通信
    
      2.逻辑层和第三方服务器之间的通信

      ![模型](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E9%80%9A%E4%BF%A1%E6%A8%A1%E5%9E%8B.png) 
    
    + **运行机制**
      + 启动过程：

        1.代码包下载到本地
    
        2.app.json解析
      
        3.执行app.js 调用App()创建小程序实例
      
        4.渲染小程序首页
      
        5.启动
    
      + 渲染过程：
      
        1.解析页面的.json
      
        2.加载.wxml和.wxss
    
        3.执行.js文件，调用Page()创建页面实例
      
        4.页面渲染完成
      
    



## 10.部分组件

### 10.1 **组件**

> 小程序中的组件也是由宿主环境提供的

1. 视图容器 **view** 布局效果

```html
  <view class="container1">
    <view>A</view>
    <view>B</view>
    <view>C</view>
  </view>
```
  ```css
  .container1 view{
    width: 100px;
    height: 100px;
    line-height: 100px;/*垂直居中*/
    text-align: center;/*水平居中*/
  }
  .container1 view:nth-child(1){
    background-color: lightblue;
  }
  .container1 view:nth-child(2){
    background-color: lightcoral;
  }
  .container1 view:nth-child(3){
    background-color: lightgrey;
  }
  .container1{
    display: flex;
    justify-content: space-around;/*将整个页面填充*/
  }
  ```
  ```json
   "pages":[
      "pages/list/list",
      "pages/index/index",
      "pages/logs/logs"
    ],
  ```



2. **scroll-view：滚动列表效果**

 ![滚动条效果](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/scroll-view.png)

  ```html
  /*设置属性scroll-y,竖向滚动*/
  <scroll-view class="container1" scroll-y>
    <view>A</view>
    <view>B</view>
    <view>C</view>
  </scroll-view>
  ```
  ```css
  /* 一定要设置高度 */
  .container1{
    /* 设置border，更加明显 */
    border: 1px solid #000000;
    height: 200px;
    width: 100px;
    /* 弹性布局取消 */
  }
  ```


3. **swiper和swiper-item**：轮播图容器组件 和 轮播图 item 组件

  ```html
  <swiper class="swiper-container">
    <swiper-item>
      <view>A</view>
    </swiper-item>
    <swiper-item>
      <view>B</view>
    </swiper-item>
    <swiper-item>
      <view>C</view>
    </swiper-item>
  </swiper>
  ```
  ```css
  .swiper-container{
    height: 150px;
    text-align: center;
    line-height: 150px;
  }
  swiper-item:nth-child(1) view{
    background-color: lightgrey;
  }
  swiper-item:nth-child(2) view{
    background-color: lightsalmon;
  }
  swiper-item:nth-child(3) view{
    background-color: lightskyblue;
  }
  ```



4. **文本 text 和 rich-text**

   > 1. text：类似span
   > 属性：selectable『实现长按选中文本内容的效果』
   > **加上即可，不用给值**
   >
   > 2. rich-text：支持把 HTML 字符串渲染为 WXML 结构
   >  nodes属性：把 HTML 字符串渲染为对应的 UI 结构
   >     **注意**：文本要放在HTML标签里面

   ```html
   <view>
     <rich-text nodes="<h3 style='color:green'>长按复制手机号</h3>"></rich-text> 
     <text selectable>17876635249</text>
   </view>
   ```
   **err：按需注入**

   ```json
   "lazyCodeLoading": "requiredComponents"
   ```



5. 按钮组件**button**

+ open-type属性：可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）
![button](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/button.png)
```html
<view>
  <button>a button</button>
  <button type="primary">primary button</button>
  <button type="warn">warn button</button>
</view>
```
+ size="mini" 

+ plian：镂空按钮 无背景颜色 加上即可

  

6. 图片组件**image**：

>  默认宽度约 300px、高度约 240px
>
> mode 属性用来指定图片的裁剪和缩放模式

![mode属性](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/mode.png)

+ scaleToFill:铺满

+ aspectFit：会发生留白

+ aspectFill：铺满，长边可能有裁剪，短边完全显示

+ widthFix：宽度不变，高度自适应

+ heightFix：高度不变，宽度自适应

  

1. 导航组件**navigator**

+ API     
  
  事件监听API ：on开头
  
  同步API：Sync结尾
  
  异步API：$.ajax(options)


### 10.2 组件属性

   ![swiper属性](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/swiper%E5%B1%9E%E6%80%A7.png)

**1. indicator-dots**

  ```html
  <swiper class="swiper-container" indicator-dots>
  ```
   ![dots在中间出现](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/err0.png)



**err-solve**

  > 在list.wxss中，不应该设置container为text-align：center，应该设置swiper-item才对。

修改过的wxss

  ```css
  .swiper-container{
    height: 150px;
  /*indicator-dots是属于容器的属性*/
  }
  swiper-item{
    height: 100%;
    text-align: center;
    line-height: 150px;
  }
  ```


**2. indicator-color**

> 未被选择的小圆点的颜色 

```html
<swiper class="swiper-container" indicator-dots indicator-color="white" indicator-active-color="red">
```



**3. indicator-active-color**

> 被选中的小圆点的颜色

 ![dotsColor](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/dots.png)

**4. 其他**

```
1. autoplay 默认false 加上即可
2. interval 默认5s：设置：interval:"3000"
3. circular 默认false 加上即可：衔接滑动
```

  ```html
  <swiper class="swiper-container" indicator-dots indicator-color="white" indicator-active-color="red" autoplay interval="2000" circular>
  ```



## 11.协同工作

  + 权限管理
  + 组织结构：产品 设计 开发 测试
  + 开发流程
    ![开发流程](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B.png)