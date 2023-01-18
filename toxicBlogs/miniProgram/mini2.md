---
title: 3. 视图与逻辑
date: 2022-12-8
tags:
 - 原生小程序
categories:
 - 小程序
sidebar: 'auto'
---



#### 页面导航
  + 概念：
  + **声明式导航**：<navigator> 导航组件
    + 导航到tabBar页面
      + 指定url和open-type属性
      + ``open-type="switchTab"``
      ```
        <!-- 页面导航 -->
      <navigator open-type="switchTab" url="/pages/contact/contact">
          <button size="mini" type="primary">tabBar导航</button> 
      </navigator>
      ```
    + 导航到非tabBar页面
      + ``open-type="navigate"``可以省略
      ```
      <!-- 非tabBar -->
      <navigator url="/pages/index/index" open-type="navigate">
          <button size="mini" type="primary">非tabBar导航</button> 
      </navigator>
      ```
    + 后退导航
      + 指定open-type 属性和 delta 属性
      + ``open-type="navigateBack"`` ``delta="1"``
      + delta默认值是 1,后退到上一页，可以省略 delta 属性
      ```
        <!-- 后退导航 不能在tabBar里面使用-->
        <navigator open-type="navigateBack" delta="1">
        <button size="mini" type="primary">后退导航</button> 
        </navigator>
      ```
  + **编程式导航**：调用小程序的导航 API
    + 导航到tabBar页面
    ![wx.switchTab(Object obj)参数列表](md_img/switchTab.png)
    + 导航到非tabBar页面
      + 调用wx.navigateTo(Object object) 方法
    + 后退导航
      + 调用wx.navigateBack(Object object) 方法
    ```wxml
        <!-- 编程式导航 -->
        <!-- tabBar -->
        <button bindtap="gotoContact" size="mini">跳转到contact页面</button>
        <!-- 非tabBar -->
        <button bindtap="gotoIndex" size="mini">跳转到index页面</button>
        <!-- 后退 -->
        <button bindtap="gotoBack" size="mini">后退</button>
    ```
    ```js
        // 跳转到Contact页面
        gotoContact(){
            wx.switchTab({
            url: '/pages/contact/contact',
            })
        },
        // 跳转到index页面
        gotoIndex(){
            wx.navigateTo({
            url: '/pages/index/index',
            })
        },
        //回退
        gotoBack(){
            wx.navigateBack({
            delta: 1,
            })
        },
    ```

  + **导航传参**
    + 声明式导航传参
      ``<navigator url="/pages/index/index?name=ls&sex=男">跳转到index页面</navigator>``
      + 在页面设置下可以查到参数
    + 编程式导航传参
    ``<button size="mini" bindtap="gotoIndex2">跳转到list页面</button>``
    ```home.js
      gotoIndex2(){
        wx.navigateTo({
          url: '/pages/list/list?name=zs&age=20',
        })
      },
    ```
    ```list.js
      data: {
        query:[]
      },
      /* 生命周期函数--监听页面加载*/
      onLoad: function (options) {
        console.log(options)
        this.setData({
          query:options
        })
      },
    ```
      + 在跳转过去的那个页面设置options和data
    + 通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到
#### 页面事件
  + 下拉刷新
    + 概念：移动端的专有名词，下拉滑动操作==>从而重新加载页面数据
    + 开启下拉刷新.在.json里面
    ``"enablePullDownRefresh": true``
    + 设置下拉刷新窗口的样式
    ``"backgroundColor": "#efefef"`` 只支持16进制
    ``"backgroundTextStyle": "dark"`` 只支持dark和light
    + 监听下拉刷新事件
    + 通过 onPullDownRefresh() 函数
    ```html
      <view>count的值是：{{count}}</view>
      <button size="mini" bindtap="addCount">count+1</button>
    ```
    ```js
      data: {
        count:0
      },
      addCount(){
        this.setData({
          count:this.data.count+1
        })
      },
      /* 页面相关事件处理函数--监听用户下拉动作*/
      onPullDownRefresh: function () {
        console.log('下拉刷新')
        this.setData({
          count:0
        }),
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log('停止刷新')
          },
        })
      },
    ```
    + **刷新没有效果，就终止模拟器再打开**
  + 上拉触底
    + 移动端的专有名词，上拉滑动操作==>加载更多数据的行为
    + 监听 onReachBottom() 函数
    + 配置上拉触底距离 ``"onReachBottomDistance": 50``
  + 上拉触底案例 
    + 定义获取随机颜色的方法
    + 在页面加载时获取初始数据
    + 渲染UI结构并美化页面效果
    + 在上拉触底时调用获取随机颜色的方法
    + 添加loading提示效果
    + 对上拉触底进行节流处理
    ```html
      <view wx:for="{{colorList}}" wx:key="index" style="background-color: rgba({{item}});" class="colorItem">{{item}}</view>
    ```
    ```css
      .colorItem{
      border: 1px solid #eeffee;
      border-radius: 8rpx;
      line-height: 200rpx;
      margin: 15px;
      text-align: center;
      text-shadow: 0rpx 0rpx 5rpx #fff;
      box-shadow: 1rpx 1rpx 6rpx #aaaaaa;
      }
    ```
    ```js
      data: {
      colorList:[],
      isloading:false
      // 可以发起数据请求
    },
    getColor(){
      this.setData({
        isloading:true
        // 正在发起数据请求
      }),
      wx.showLoading({
        title: '数据加载中',
      })
      wx.request({
        url: 'https://www.escook.cn/api/color',
        method:'GET',
        success:({data:res})=>{
          console.log(res);
          this.setData({
            colorList:[...this.data.colorList,...res.data]
          })
        },
        complete:()=>{
          wx.hideLoading()
          this.setData({
            isloading:false
          })
        }
      })
    },
    /**
     * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {
      if(this.data.isloading) return
      this.getColor()
    },
    ```
  + 自定义编译模式
    + 每次编译都会重新进入首页
    + 普通编译 ==> 添加编译模式  
#### 生命周期
  + 概念：生命周期（Life Cycle）是指一个对象从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。
  + 应用生命周期
    + 特指小程序从启动 -> 运行 -> 销毁的过程
    + 应用的生命周期函数（依次调用）
    + ``App({onlaunch:function(options){},onShow:function(options){},obHide:function(options){},})``
  + 页面生命周期
    + 特指小程序中，每个页面的加载 -> 渲染 -> 销毁的过程
    + 页面的生命周期函数（依次调用）
    ```
    Page({
      onload:function(options){},
      onShow:function(options){},
      onReady:function(options){},
      onHide:function(options){},
      onUnload:function(options){},
    })
    ```


#### WXS 脚本
  + 概念
    + 是小程序独有的一套脚本语言，结合 WXML，可以构建出页面的结构
    + 与JavaScript的区别
      1. wxs 有自己的数据类型
      2. wxs 不支持类似于 ES6 及以上的语法形式
      3. wxs 遵循 CommonJS 规范
  + 内嵌wxs
    + wxs 代码可以编写在 wxml 文件中的 <wxs> 标签内，类似Javascript 代码可以编写在 html 文件中的 <script> 标签内一样
    + 每个 <wxs></wxs> 标签，必须提供 module 属性，用来指定当前 wxs 的模块名称，便于访问
    ```html
      <view>{{m1.toUpper(username)}}</view>
      <wxs module="m1">
        module.exports.toUpper = function(str){
          return str.toUpperCase()
        }
      </wxs>
    ```
  + 外部wxs
    + wxs 代码还可以编写在以 .wxs 为后缀名的文件内
    + 在 wxml 中引入外联的 wxs 脚本时，必须为 <wxs> 标签添加 module 和 src 属性，其中：
      + module 用来指定模块的名称
      + src 用来指定要引入的脚本的路径，且必须是相对路径
    ```html
      <view>{{m2.toLower(country)}}</view>
      <wxs src="../../utils/tools.wxs" module="m2"></wxs>
    ```
    ```wxs
      function toLower(str){
        return str.toLowerCase()
      }
      module.exports={
        toLower:toLower
      }
    ```
#### 案例 - 本地生活（列表页面）
  + 