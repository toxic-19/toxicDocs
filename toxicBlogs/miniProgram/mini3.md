---
title: 4. 自定义组件
date: 2022-12-8
tags:
 - 原生
 - 小程序
categories:
 - 小程序
sidebar: 'auto'
---



#### 1.创建与引用
  + **创建**
    1. 创建 components -> test 文件夹
    2. 点击test文件夹 -> “新建 Component”
    3. 输入组件名称回车
  + **引用**
    1. 局部引用：某组件只在特定的页面中被用到
        ``"usingComponents": {"test":"/components/test/test"},``
        ``<test>使用组件</test>``
    2. 全局引用：某组件在多个页面中经常被用到

#### 2.样式
  + **组件隔离**
    1. app.wxss中全局样式对组件无效
    2. 只有class选择器会有样式隔离效果
    3. **注意：**在组件和引用组件的页面中建议使用class选择器
    4. 组件的样式隔离选项:防止组件内外样式互相干扰的问题
        ↓默认隔离
        ``Component({ options:{styleIsolation:'isolated'} })``
        ![样式隔离属性](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/stylesolation.png)

#### 3.数据、方法和属性
  + **data数据**:可读可写
  + **method方法**
  ```
    methods: {
    // 组件方法
    addCount(){
      this.setData({
        count:this.data.count+1
      })
      this._showCount()
    },
    // 自定义方法
    _showCount(){
      wx.showToast({
        title:'count的值为：'+ this.data.count,
        icon:'none'
      })
    }
  }
  ```
  + **properities属性**:可读可写
    + properties 是组件的对外属性，用来接收外界传递到组件中的数据
    ``properties: {max:{type:Number, value:10 }}``
  ```
    addCount(){
      if(this.data.count >= this.properties.max) return
      this.setData({
        count:this.data.count+1
      })
      this._showCount()
    },
  ```
  + **data 和 properties 的区别**
    + data 更倾向于存储组件的私有数据
    + properties 更倾向于存储外界传递到组件中的数据
    ```
    <button bindtap="showInfo">检验data和properties</button>
    showInfo(){
      console.log(this.data);
      console.log(this.properties);
      console.log(this.properties === this.data)
    }
    ```
    ``{count: 0, max: 10}{count: 0, max: 10}true``

  + **使用 setData 修改 properties 的值**
#### 4.数据监听器
  + 概念：用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。
  + 数据监听器用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。它的作用类似于 vue 中的 watch 侦听器。
  + 语法：
  ```js
    data:{
        //监听什么数据，就先定义该数据
        n1:0,
        n2:0,
        sum:0
    },
    method:{
        //添加使该数据发生变化的方法
        addN1(){
            this.setData({
                n1:this.data.n1+1
            })
        },
        addN2(){
            this.setData({
                n2:this.data.n2+1
            })
        }
    }
    observers:{
        //监听到触发变化的方法，就执行相应的操作
        'n1,n2':function(n1,n2){   //监听n1和n2数据的变化
            this.setData({
                sum:n1+n2          //通过监听器，自动计算sum的值
            })
        }
    }
  ```
#### 5.数据监听器-案例
  + 如果某个对象中需要被监听的属性太多，为了方便，可以使用通配符 ** 来监听对象中所有属性的变化
  + ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E6%A1%88%E4%BE%8B.png)
    ``'rgb.**:function(){}'``
  ```html
    <!-- 案例 -->
    <view style="background-color: rgb({{fullColor}});" class="colorBox">颜色值：{{fullColor}}</view>
    <button size="mini" bindtap="changeR">R</button>
    <button size="mini" bindtap="changeG" type="primary">G</button>
    <button size="mini" bindtap="changeB" type="warn">B</button>
  ```
  ```css
    .colorBox{
        line-height: 200rpx;
        height: 200rpx;
        color: white;
        font-size: 24rpx;
        text-align: center;
        box-shadow:0rpx 0rpx 15rpx black;
    }
  ```
  ```js
    /**
     * 组件的初始数据
     */
    data: {
        rgb:{
            r:0,
            g:0,
            b:0
        },
        fullColor:'0,0,0' //动态计算
    },
    methods:{
        changeR(){
            this.setData({
                'rgb.r':this.data.rgb.r+5 > 255 ? 255 : this.data.rgb.r+5
            })
        },
        changeG(){
            this.setData({
                'rgb.g':this.data.rgb.g+5 > 255 ? 255 : this.data.rgb.g+5
            })
        },
        changeB(){
            this.setData({
                'rgb.b':this.data.rgb.b+5 > 255 ? 255 : this.data.rgb.b+5
            })
        }        
    },
    /**
     * 数据监听器
     */
    observers:{
        'rgb.r,rgb.g,rgb.b':function(r,g,b){
            this.setData({
                fullColor:`${r},${g},${b}`
            })
        }
    }


  ```
#### 6.纯数据字段
  + 概念：纯数据字段指的是那些不用于界面渲染的 data 字段。如：案例中data中的rgb是不在页面渲染的，就应该属于纯数据
  + 好处：纯数据字段有助于提升页面更新的性能。
  + 使用规则：
#### 7. 组件的生命周期
  + ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)
    + created：刚被创建
    + attached：完全初始化，进入页面节点数【使用最多】
    + detached：销毁，离开页面节点树
  + 定义生命周期函数
    + lifetimes节点
    ```js
      Component({
        lifetimes:{
          created:function(){
            console.log("created")
          },
          attached:function(){
            console.log("attached")
          }
        }
      })
    ```
  + **组件所在页面的生命周期**
  ```js
    // 检测我们整个组件在哪一个页面上
    pageLifetimes:{
      show:function(){
        console.log('show')
      },
      //切换页面到没有配置组件的页面，就会显示hide
      hide:function(){
        console.log('hide')
      },
      resize:function(){
        console.log('resize')
      }
    }
  ```
  + 生成随机rgb值
  ```js
    // 生成随机rgb颜色的方法，非事件处理函数建议以_开头
    // method里面
    _randomColor(){
      this.setData({
        rgb:{
          r:Math.floor(Math.random()*256),
          g:Math.floor(Math.random()*256),
          b:Math.floor(Math.random()*256)
        }
      })
    },
    //pageLifetimes里面
    show:function(){
      console.log('show')
      this._randomColor()
    }
  ```

#### 8.插槽
  + 在自定义组件的 wxml 结构中，可以提供一个 <slot> 节点（插槽），用于承载组件使用者提供的 wxml 结构。
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/slot.png)
  ```html
  <!-- 组件test2内部结构 -->
    <view>
      <view>这里是组件的内部结构</view>
      <!-- 插槽 这里作为封装者是不确定这个具体是什么，主要看使用者 在使用的时候可以具体去填充slot里面的内容-->
      <slot></slot>
    </view>
  ```
  ```html
    <!-- 在wxml中使用该组件，并填充slot -->
    <test2>
      <text>slot填充的text节点</text>
    </test2>
  ```

  + **启用多个插槽**
    + 在组件定义的时候启用多插槽slot支持
    + ``options:{multipleSlots:true}``
    ```html
      <!-- 定义多个插槽 要设置name属性，来区分不同slot的填充-->
      <view>
        <slot name="slot1"></slot>
        <view>这里是组件的内部结构</view>
        <slot name="slot2"></slot>
      </view>
    ```
    ```html
      <!-- 在wxml中使用该组件 -->
      <!-- test2组件 -->
      <test2>
        <view slot="slot1">第一个插槽</view>
        <view slot="slot2">第二个插槽</view>
      </test2>
    ```

#### 9.父子组件之间的通信
  + **三种方式**：
  - 属性绑定
    + 用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据
    + 步骤：
      + 父组件声明date并渲染``  data: {count:0}  ``,子组件传参
    ```html
      <!-- 父子组件的通信  我们这里把message页面作为父组件 test3组件作为子组件-->
      <view>父组件中count的值：{{count}}</view>
      <!-- 子组件 中把count作为外部属性传给properties 即可在子组件中渲染-->
      <test3 count="{{count}}"></test3>
    ```
      + 在子组件的属性列表中设置``  properties: {count:Number}  ``
  - 事件绑定
    + 用于子组件向父组件传递数据，可以传递任意数据
    + 步骤：
      1. 在父组件中设置一个自定义方法
      ``syncCount():function(){}``
      2. 使用子组件时，将自定义的引用传递给子组件
          2.1 点击加1是触发sync事件的 在子组件中，通过触发sync事件，调用了父组件的syncCount方法，从而打印出来，在子组件的addCount()方法里：
          ``this.triggerEvent('sync')``
          2.2 那么也可以通过sync方法传递一个参数e，通过syncCount打印出来
          ``this.triggerEvent('sync',{value:this.properties.count})``
          ``<test3 count="{{count}}" bind:sync="syncCount"></test3>``
      3. 然后就是把传回来的value值赋值给count在父组件中
      ``syncCount(e):function(){this.setData({count:e.detail.value})}``
  - 获取组件实例
    + 父组件还可以通过 this.selectComponent() 获取子组件实例对象
    + 这样就可以直接访问子组件的任意数据和方法
    ```js
      getChild(){
        const child = this.selectComponent('.customA');
        console.log(child)
        // 如果要修改该实例对象里面的数据或者调用方法
        child.setData({
          count:child.properties.count+1
        })
        child.addCount()
      }
    ```
#### 10.behaviors:实现代码共享
  + behaviors 是小程序中，**用于实现组件间代码共享的特性**，类似于 Vue.js 中的 **“mixins”**
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/behaviors.png)
  + 定义：在文件夹behaviors里面定义js文件，**注意：Behavior函数**
  ```js
  //共享出去
    module.exports = Behavior({
      data:{
        name:'behave'
      },
      properties:{},
      methods:{}
    })
  ```
  + 导入：require 声明节点behaviors
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/behavior%E8%8A%82%E7%82%B9.png)


## 使用npm包
#### 1.限制/不支持
+ Node.js
+ 浏览器内置对象
+ C++插件
#### 2.Vantage WeAPP
+ **概念：小程序 UI 组件库**  **[官方文档](https://youzan.github.io/vant-weapp)**

+ **体验组件库** 
![二维码](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg)

+ **安装 Vant 组件库步骤**   **[教程](https://youzan.github.io/vant-weapp/#/quickstart)**  
  + **初始化**：npm init -y 生成package.json
  ```
  {
    "name": "mp-2",
    "version": "1.0.0",
    "description": "",
    "main": ".eslintrc.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  ```
  + **通过 npm 安装**（建议指定版本为@1.3.3）
  ```python
    # 通过 npm 安装
    npm i @vant/weapp@1.3.3 -S --production
  ```
  + **构建 npm 包**: 
    + 点击 工具 -> 构建 npm 构建完成后，即可引入组件
  + **修改 app.json全局配置**
    + 在app.json去除``"style": "v2"`` ，小程序的新版基础组件强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱。
    ![成功安装vant组件库](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/vant.png)
  + **使用组件**
    + 可以在 app.json 的 usingComponents 节点中引入需要的组件，即可在 wxml 中直接使用组件
  ```js
    //在app.json或index.json中引入组件，详细介绍见快速上手。
    "usingComponents": {
      "van-button": "@vant/weapp/button/index"
    }
  ```
  + **使用CSS自定义属性（变量）**
    + 有时候也被称作CSS变量或者级联变量
    + 声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的CSS值。
  ```css
    /* 在HTML根节点定义css变量 表示该变量全局生效*/
      html {
          --main-color: #C00000;
      }
    /* 表示该变量在container1里面生效 */
      .container1 {
          --c1-border: 2px dotted green;
      }
  
    /*使用*/
      .container1 {
              border: var(--c1-border);
      }
      .box1,
      .box2 {
          background-color: var(--main-color);
      }
  ```
    + **在小程序中：**根节点就是page，在wxss中定义自定义变量；
      [自定义css变量的命名](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)
    ```css
      page{
        --button-primary-background-color: #dd3467;
        --button-primary-border-color: rgb(37, 211, 37);
      }
    ```

#### 3.API Promise化
  + **小程序官方提供的异步 API 都是基于回调函数实现的**
  + 什么是promise化：
    + 指的是**通过额外的配置**
    + 将官方提供的、基于回调函数的异步 API，**升级改造为基于 Promise 的异步 API**
    + 从而提高代码的可读性、维护性，避免回调地狱的问题
  + 实现api 的 promise化
    + 依赖于 miniprogram-api-promise 这个第三方的 npm 包
    + ``npm install --save miniprogram-api-promise@1.0.4``
    + 每安装完一个新包，都要重新构建npm
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/minipro-api-p.png)
  + 如何实现promise化
    + 在app.js中导入``import{promisifyAll} from 'miniprogram-api-promise'``
    + 调用第三方npm包的promisefyAll方法进行promise化
    ```js
      //app.js
      // wxp与wx上的自定义属性p指向同一个空对象
      const wxp = wx.p = {}
      // 将微信上的异步函数全部进行promise化，再挂载到wxp上，就可以通过wx.p访问到
      promisifyAll(wx,wxp)
    ```
    ```js
    //实现异步api的promise化
      async getInfo(){
        const {data:res} = await wx.p.request({
          method:'GET',
          url: 'https://www.escook.cn/api/get',
          data:{
            name:'zs',
            age:20
          }
        })
        console.log(res)
      }
      //输出{message: "get ok", data: {…}}
    ```



## 全局数据共享
#### 1.概念：又叫做：状态管理，是为了解决组件之间数据共享的问题
  ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E5%85%A8%E5%B1%80%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%AB.png)
  > 将要共享的数据挂载到store里面，再共享给其他组件，这样子就不需要一个一个父组件的传递
#### 2.全局数据共享方案
  + 可使用 **mobx-miniprogram** 配合 **mobx-miniprogram-bindings** 实现全局数据共享
  + ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E5%85%B1%E4%BA%AB%E6%96%B9%E6%A1%88.png)
#### 2.Mobx
  + **安装相关包**
    ``npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1``

  + **重新构建npm包**
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/mobx.png)

  + **创建store实例**
  ```js
    // 在这个 JS 文件中，专门来创建 Store 的实例对象
    import { observable, action } from 'mobx-miniprogram'
    // 导出对象store
    export const store = observable({
      // 数据字段
      numA: 1,
      numB: 2,

      // 计算属性，加上get:表示只是可读
      get sum() {
        return this.numA + this.numB
      },

      // actions 函数，专门来修改 store 中数据的值
      updateNum1: action(function (step) {
        this.numA += step
      })

    })
  ```

  + **将 Store 中的成员绑定到页面中**
    <!--mp-2 在home.js -->
    + 导入store.js里面的数据和方法什么的映射到当前页面
  ```js
    //createStoreBindings这个函数：将store里面的数据和方法绑定到当前这个页面中实现
    import { createStoreBindings } from 'mobx-miniprogram-bindings'
    import { store } from '../../store/store'
    pages:({
      /**
        * 生命周期函数--监听页面加载
        */
        onLoad: function (options) {
          this.storeBindings = createStoreBindings(this, {
            //this表示当前这个页面的实例，把store里面的数据绑定到this上
            //返回值挂载到storeBindings
            store,//数据源
            fields: ['numA', 'numB', 'sum'],//字段
            actions: ['updateNum1']//方法
          })
        },
      /**
        * 生命周期函数--监听页面卸载
        */
        onUnload: function () {
          //返回值可以做清理的工作
          this.storeBindings.detroyStoreBindings()
        },
    })

  ```
  + **在页面上使用 Store 中的成员**
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/e.target.png)
    ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/data-step.png)
  ```html
  <!-- 可以顺利导入store里面的数据并使用 -->
    <view>{{numA}}+{{numB}}={{sum}}</view>
    <van-button bindtap="btnHandler1" data-step='{{1}}'>numA+1</van-button>
    <van-button bindtap="btnHandler1" data-step="{{-1}}">numA-1</van-button>
  ```
  ```js
  //当前使用的js页面
    btnHandler1(e) {
      console.log(e)
      this.updateNum1(e.target.dataset.step)
    }
  ```
  ```js
  //创建实例store对象的js页面
    import { observable, action } from 'mobx-miniprogram'

    export const store = observable({
      // 数据字段
      numA: 1,
      numB: 2,
      activeTabBarIndex: 0,
      // 计算属性，加上get:表示只是可读
      get sum() {
        return this.numA + this.numB
      },
      // actions 函数，专门来修改 store 中数据的值
      updateNum1: action(function (step) {
        this.numA += step
      }),
      updateNum2: action(function (step) {
        this.numB += step
      }),
      updateActiveTabBarIndex: action(function(index) {
        this.activeTabBarIndex = index
      })
    })
  ```
