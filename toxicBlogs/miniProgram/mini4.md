---
title: 5. 小程序分包
date: 2022-12-8
tags:
 - 原生
 - 小程序
categories:
 - 小程序
sidebar: 'auto'
---



#### 1.基础概念

+ 分包指的是把一个完整的小程序项目，按照需求划分为**不同的子包**，在构建时打包成不同的分包，用户在使用时**按需进行加载**。
+ ##### 分包的好处：
    + 可以优化小程序首次启动的下载时间
    + 在多团队共同开发时可以更好地解耦协作
+ ##### 构成
    + 分包前：![img.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E5%88%86%E5%8C%85%E5%89%8D.png)
    + 分包后：1个主包+多个分包

> 主包包括 项目的启动页面或者tabBar页面  
> 分包只包括 和分包有关的页面和私有资源
> ![img.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E5%88%86%E5%8C%85%E5%90%8E.png)  
> **注意：主包里面的公共资源可以被所有分包访问到**  
> **分包的私有资源只有自己当前分包才可以访问**

+ ##### 分包的加载规则

> 在小程序启动时，默认会下载主包并启动主包内页面   
> **tabBar 页面需要放到主包中**   
> 当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示   
> 非 tabBar 页面可以按照功能的不同，划分为不同的分包之后，进行**按需下载**

+ ##### 体积限制
    + 整个小程序所有分包大小不超过 16M（主包 + 所有分包）
    + 单个分包/主包大小不能超过 2M

#### 2.使用分包

+ ##### 配置方法
    + 添加一个分包
  > 在app.json里面添加**subpackages**，在里面配置的都是分包
  > ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E9%85%8D%E7%BD%AE%E5%88%86%E5%8C%85.png)

```json
  {
  "subpackages": [
    {
      "root": "packageA",
      "name": "pack1",
      "pages": [
        "pages/cat/cat",
        "pages/dog/dog"
      ]
    },
    {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple/apple",
        "pages/banana/banana"
      ]
    }
  ]
}
```

+ ##### 打包原则
    + 小程序会按 **subpackages 的配置进行分包**，subpackages 之外的目录将被打包到主包中
    + tabBar 页面必须在主包内
    + 分包之间不能互相嵌套

+ ##### 引用原则
    + 主包无法引用分包内的私有资源
    + 分包之间不能相互引用私有资源
    + **分包可以引用主包内的公共资源**

#### 3.独立分包

+ ##### 概念
    + 独立分包本质上也是分包，只不过它比较特殊，可以独立于主包和其他分包而单独运行。
      ![img_1.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E7%8B%AC%E7%AB%8B%E5%88%86%E5%8C%85.png)
+ ##### 区别：是否依赖主包才能运行
+ ##### 应用场景：独立运行，提升分包页面的启动速度
+ ##### 配置方法 ``"independent": true``
    + 只要加上这个属性，就能从普通分包变成独立分包
+ ##### 引用原则：互不引用，做到真正独立

#### 4.分包预下载

+ ##### 概念
    + 在进入小程序的某个页面时，**由框架自动预下载可能需要的分包**，从而提升进入后续分包页面时的启动速度。
+ ##### 配置:``"preloadRule":{}``
    + **预下载分包的行为，会在进入指定的页面时触发**

> json注释：network 默认是WiFi packages后面可以是name也可以是root

```json
{
  "preloadRule": {
    "pages/home/home": {
      "packages": [
        "pack2"
      ],
      "network": "all"
    }
  }
}
```

+ ##### 限制

## 案例-自定义tabBar

[详细步骤](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

+ 1.配置信息
  + 在 `app.json` 中的 `tabBar` 项指定 `custom` 字段，同时其余 tabBar 相关配置也补充完整。
  + 所有 tab 页的 json 里需声明 `usingComponents` 项，也可以在 app.json 全局开启。

```json
{
  "tabBar": {
    "custom": true,
    "list": [
      {
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
    ],
    "usingComponents": {}
  }
}
```

+ 2.添加 tabBar 代码文件

```
在代码根目录下添加入口文件:
custom-tab-bar/index.js
custom-tab-bar/index.json
custom-tab-bar/index.wxml
custom-tab-bar/index.wxss
```

 ![img.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/custom-tab-bar.png)

  + custom为true后，首页的tabBar位置被编译为custom-tab-bar/index/wxml
  +  <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E7%9B%AE%E5%89%8D%E6%95%88%E6%9E%9CtabBar.png" alt="img.png" style="zoom:50%;" />
+ 3.编写 tabBar 代码
  + [tabBar 定制主题](https://youzan.github.io/vant-weapp/#/tabbar)
  + 注意：在index.js设置data和methods的时候，方法是直接平行于data的，没有写methods


+ 4.编写自定义tabBar代码

 ![img.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar.png)

+ 设置tabBar要在app.json里面增加 `  "tabBar":{   "list":[]  }`
**注意：list是不能少的,尽管下面被复制**  
接下来在custom-tab-bar里面设置:  

 ```js
    page({
    data: {
        active: 0,
        //这里list要加引号
        "list": [
            {
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
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
        console.log(this.data.active)
    }
})
 ```
```html
<!--active是设置高亮 info是右上角的消息提示-->
<van-tabbar active="{{ active }}" bind:change="onChange">
  <van-tabbar-item info="3" wx:for="{{list}}" wx:key="index">
<!--    src上面要加引号   -->
    <image slot="icon" src="{{item.iconPath}}" mode="aspectFit" style="width: 30px; height: 18px;" />
    <image slot="icon-active" src="{{item.selectedIconPath}}" mode="aspectFit" style="width: 30px; height: 18px;" />
    {{item.text}}
  </van-tabbar-item>
</van-tabbar> 
```

1. 自定义组件
2. Vant 组件库
3. MobX 数据共享
4. 组件样式隔离
5. 组件数据监听器
6. 组件的 behaviors
7. Vant 样式覆盖
