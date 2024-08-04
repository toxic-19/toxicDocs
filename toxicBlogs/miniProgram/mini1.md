---
title: 2. 小程序-模板与配置[tabBar页面]
date: 2022-12-8
tags:
 - 原生
 - 小程序
categories:
 - 小程序
sidebar: 'auto'
---

# 小程序-模板与配置[tabBar页面]



## 1. `wxml`模板语法

### 1.1 数据绑定

1. 基本原则
在  `data`  中定义数据：在页面对应的js文件中定义到data里面。
在  `wxml`  中使用数据：Mustache语法 `{{变量名}}` 渲染

1. 应用场景
绑定内容，属性和三元运算符

1. 动态绑定内容和属性『可在AppData调试器查看』
```html
    <view> {{info}} </view>
    <image src="{{imgSrc}}"></image>
    <view>{{randomNum > 5 ? '随机数大于?5':'随机数小于?5'}}</view>
    <view>{{randomNum1}}</view>
```
```js
    data: {
        info:'hello world',
        imgSrc:'/images/1.jpg',
        randomNum: Math.random() * 10 ,//生成10以内的随机数
        randomNum1:Math.random().toFixed(2)//生成有两位小数的随机数?
    }
```



### 1.2 事件绑定

**事件是渲染层到逻辑层的通讯方式**
![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E4%BA%8B%E4%BB%B6.png)



#### 1.2.1 常见事件


  **tap：类似click**
> html中使用 onclick；小程序使用 bindtap 或者 bind:tap

```js
    // 声明方法
    btnTap:function(){
        console.log('tap');
    },
    //两种方法都能绑定
    btnTap(e){
        console.log('tap-e');
    },
```

  **input：输入事件**
> 使用 `bindinput` 或者 `bind:input`  进行绑定

```html
    <!-- 使用插值语法绑定data中的msg 绑定事件时无参无需加上括号-->
    <input type="text" value="{{msg}}" bindinput="iptBind"/>
```
```js
    iptBind(e){
        // 改变data中msg的值
        this.setData({
            msg:e.detail.value
        })
        console.log(e.detail)
    },
```
```css
    input{
        border: 1px solid green;
        border-radius: 7px;
        width: 150px;
        margin: 5px;
        padding: 5px;
    }
```

   **change：状态改变时被触发**
> 使用 `bindchange` 或者 `bind:change` 进行绑定



#### 1.2.2 事件属性

![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E4%BA%8B%E4%BB%B6%E5%B1%9E%E6%80%A7.png)

**`target` 与 `currentTarget` 的区分**
+ target 是触发该事件的源头组件
+ currentTarget 则是当前事件所绑定的组件
  

**为data赋值**
```js
    data:{
        imgSrc:'/img/2.jpg'
    },
    btnTap(e){
        this.setDate({
            imgSrc:'/img/3.jpg'
        })
    }
```



#### 1.2.3 事件传参

1. 不能在绑定事件的同时，为事件处理函数传递参数
2. 可以为组件提供 `data-*` 自定义属性传参 其中 `*` 是参数的名字
3. 通过 `e.target.dataset.参数名` 可以获取到具体参数信息
4. `data-info='2'` 传递的是字符串 `"2"`
5. `data-info={{2}}` 传递的是数字 `2`
```js
    // 一点击图片改变；count与 组件传递的参数 相加
    btnTap(e){
        this.setData({
            imgSrc:'/images/3.jpg',
            count:this.data.count+e.target.dataset.info
        })
        console.log(e.target.dataset.info)
        console.log(this.data.count)
    },
```
6. 要实现文本框和data之间数据相同
> 定义数据
> 渲染结构
> 美化样式
> 绑定input事件处理函数



### 1.3 条件渲染
1. 三种形式：`wx:if`    `wx:elif`   `wx:else`
> 只会出现符合条件的view标签
```html
    <!-- 条件渲染 -->
    <view wx:if="{{type===1}}">type为1</view>
    <view wx:elif="{{type===2}}">type为2</view>
    <view wx:else>保密</view>
```
```js
    data:{
        type:1
    }
```

2. `block`标签使用：一次性控制多个组件的展示和隐藏
> 在 `block` 标签中结合 `wx:if` 的使用来控制
> `wx:if={{false}}` ：控制隐藏该`block`标签内所有内容
> `wx:if={{true}}` ：控制展示该`block`标签内所有内容
```html
    <!--展示block块中所有内容  -->
    <block wx:if="{{true}}">
        <view>view1</view>
        <view>view2</view>
    </block>
```

3. `hidden`属性：控制元素的显示与隐藏
> 不可以结合`block`标签进行控制
> 使用 `hidden="{{condition}}"` 控制
```html
    <!--这种用法是不可取的  -->
    <block hidden="{{true}}">
        <view>view1</view>
    </block>
```
> 正确展示`hidden`的语法
```html
    <!-- 使用在block标签里面 -->
    <block>
        <view hidden="{{flag}}">view1</view>
    </block>
```
```js
    data:{
        flag:true
    }
```

4. `wx:if` 与 `hidden` 之间的区别

**运行方式不同**

> `wx:if` 以动态创建与移除元素的方式，控制元素的展示与隐藏
> `hidden` 以切换样式的方式『`display:none/block`』, 来控制元素的显示与隐藏

**使用建议**

> 频繁切换时，最好不要频繁操作dom 建议使用 `hidden`
> 控制条件复杂时，建议使用 `wx:if` 搭配 `wx:elif`、`wx:else` 来进行切换



### 1.4 列表渲染

1. `wx:for` 可以根据指定的数组，循环渲染重复的组件结构
```html
<view wx:for="{{array1}}">
    索引是{{index}},当前项是{{item}}
</view>
```
```js
data:{
    array1:["a","b"]
}
```
**输出结果：**
> 索引是0,当前项是a
> 索引是1,当前项是b

2. 使用`wx:for-index` 可以指定当前循环项的所有的变量名
3. 使用`wx:for-item` 可以指定当前循环项的变量名

```html
<view wx:for="{{array1}}" wx:for-index="idx" wx:for-item="newItem">
    索引是{{idx}},当前项是{{newItem}}
</view>
```

4. `wx:key`：类似 `vue` 列表渲染中的 `:key`

> 为渲染出来的列表项指定唯一的`key`值，从而提高渲染的效率
```html
    <!-- 渲染对象是 一个集合 -->
    <!-- 那么每一项就是一个数组 -->
    <view wx:for="{{userList}}" wx:key="id">
        索引是{{index}},当前项是{{item.name}}
    </view>
```



## 2. `wxss`模板样式

**`wxss` 比 `css` 扩展的属性**
1. `rpx` 尺寸单位 : 用来解决**屏适配**的尺寸单位
> **原因：**
> 在宽度上等分为750份 『即当前屏幕的总宽度是`750rpx`』
> 在较大的设备上，`1rpx`所代表的宽度较大
> 在较小的设备上，`1rpx`所代表的宽度较小

2. 导入样式：`@import`
```css
@import 'common.wxss'
```

3. 全局样式：定义在app.wxss
4. 局部样式：写在页面上的wxss，只作用与当前页面
   

**注意：**
1. 权重比：局部样式 > 全局样式 『局部样式会覆盖全局样式』
2. 权重较小就无法覆盖



## 3. 全局配置
**`app.json` 就是小程序的全局配置文件**
#### 3.1 window属性配置
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/window%E9%85%8D%E7%BD%AE.png" style="zoom:50%;" />

1. 只允许十六进制： navigationBarBackgroundColor『导航栏背景颜色』
2. 配置**全局下拉刷新**,**上拉触底**功能
> **1.概念：** 下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为
>
> **2.概念：** 上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为

  **在app.json中配置：**
+ 设置下拉刷新时窗口的背景颜色:
+ 设置下拉刷新时 `loading` 的样式：只能设置为 `dark` 或者 `light`
+ 设置上拉触底的距离：不需要写单位 默认是`px`

```json
"enablePullDownRefresh":true,
"backgroundColor": "#efefef",
"backgroundTextStyle":"dark",
"onReachBottomDistance": 50
```



## 4. `tabBar`
### 4.1 概念
tabBar 是移动端应用常见的页面效果，用于实现多页面的快速切换。
![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/tabBar-top.png)![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/tooBar-btm.png)

### 4.2 组成部分
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/tabBar-com.png" style="zoom:80%;" />



+ `backgroundColor`：`tabBar` 的背景色
+ `selectedIconPath`：选中时的图片路径
+ `borderStyle`：`tabBar` 上边框的颜色
+ `iconPath`：未选中时的图片路径
+ `selectedColor`：`tab` 上的文字选中时的颜色
+ `color`：`tab `上文字的默认（未选中）颜色

### 4.3 配置
1. 必填项：`list`『是`Array`类型』
```json
    "tabBar": {
      "list": [{
          "pagePath": "pages/index/index",
          "text": "index"
        },
        {
          "pagePath": "pages/list1/list1",
          "text": "list"
        }
      ]
    }
```

### 4.4 注意：
1. `tabBar`只能配置最少2个，最多5个`tab`页签。
2. 渲染顶部`tabBar`时，不显示`icon`，只显示文本
3. `tabBar`页面都要放在`pages`最前面
4. 案例：
```json
  "list": [{
      "pagePath": "pages/home/home",
      "text": "首页",
      "iconPath": "/images/tabs/home.png",
      "selectedIconPath": "/images/tabs/home-active.png"
    },
    {
      "pagePath": "pages/message/message",
      "text": "消息",
      "iconPath": "/images/tabs/message.png",
      "selectedIconPath": "/images/tabs/message-active.png"
    },
    {
      "pagePath": "pages/contact/contact",
      "text": "联系我们",
      "iconPath": "/images/tabs/contact.png",
      "selectedIconPath": "/images/tabs/contact-active.png"
    }
  ]
```



## 5. 页面配置
小程序中，每个页面都有自己的 `.json` 配置文件，用来对当前页面的窗口外观、页面效果等进行配置。

**注意：**

1. 页面配置与全局配置相冲突时，根据就近原则，最终效果以页面配置为主



## 6. 网络数据请求
### 6.1 限制
1. 只能请求 `HTTPS` 类型的接口
2. 必须将接口的域名添加到信任列表中
3. 步骤：详情 ==> 项目配置 ==> 合法域名
   



### 6.2 配置合法域名

1. 配置步骤：

- 登录微信小程序管理后台 ==> 开发 ==> 开发设置 ==> 服务器域名 ==> 修改`request`合法域名
  

2. 注意：

- 域名只支持 `https` 协议
- 域名不能使用`ip`地址 包括`localhost`
- 域名必须经过`ICP`备案
- 服务器域名一个月内最多可以申请5次修改

3. 跳过`request`合法域名校验

    **步骤：**  微信开发者工具中，临时开启「开发环境不校验请求域名」选项，跳过`request` 合法域名的校验
    **注意：**  该选项仅限在开发与调试阶段使用



### 6.3 发起请求
1. GET请求：使用`wx.request()`
```js
    // 发起GET请求
    getInfo(){
        wx.request({
            // 接口地址:必须基于https协议
            url: 'https://www.escook.cn/api/get',
            method:'GET',
            // 发送到服务器的数据
            data:{
                name:'zs',
                age:20
            },
            // 请求成功后的回调函数
            success:(res)=>{
                console.log(res.data)
            }
        })
    },
```

2. POST请求：使用`wx.request()`
```js
    postInfo(){
        wx.request({
            url: 'https://www.escook.cn/api/post',
            method:'POST',
            data:{
                name:'zs',
                age:'20'
            },
            success:(res)=>{
                console.log(res.data)
            }
        })
    },
```

3. 在页面加载时就请求数据
```js
    onLoad: function (options) {
        this.getInfo(),
        this.postInfo()
    }
```

4. 关于跨域ajax
- 小程序的宿主环境不是浏览器，而是微信客户端
- 不存在跨域
- 不能叫 "发起ajax请求",而是"发起网络数据请求"


## 7. 案例 - 本地生活『首页』
1. 新建项目并梳理项目结构‘
2. 配置导航栏效果
```json
   // app.json 全局配置文件
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#2b4b6b",
    "navigationBarTitleText": "本地生活",
    "navigationBarTextStyle":"white",
    "onReachBottomDistance": 50,
    "enablePullDownRefresh": true,
    "backgroundColor": "#efefef"
  }
```
3. 配置`tabBar`效果
4. 实现轮播图效果
```js
  // home.js
  data: {
    // 存放轮播图的数组
    swiperList: [],
    // 存放九宫格的数组
    gridList:[]
  },

  getSwiperList(){
    wx.request({
      url: 'https://www.escook.cn/slides',
      method:'GET',
      success:(res)=>{
        console.log(res.data);
        this.setData({
          swiperList:res.data
        })
      },
    })
  },
```
5. 实现九宫格效果
从接口获取所有图片信息
```js
  onLoad: function (options) {
    this.getSwiperList(),
    this.getGridList()
  },
  getGridList(){
    wx.request({
      url: 'https://www.escook.cn/categories',
      method:'GET',
      success:(res)=>{
        console.log(res.data);
        this.setData({
          gridList:res.data
        })
      }
    })
  },
```
对图片的布局
```css
    /* home.wxss */
    /* 图片区域 */
    .img-box {
    height: 100px;
    display: flex;
    justify-content: space-around;
    }

    .img-box image {
    height: 100px;
    }
```
```html
    <!-- home.wxml -->
    <!-- 图片区域 -->
    <view class="img-box">
        <image src="/images/link-01.png" mode="heightFix"></image>
        <image src="/images/link-02.png" mode="heightFix"></image>
    </view>
```
