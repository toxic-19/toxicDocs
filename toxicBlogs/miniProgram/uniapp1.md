---
title: uniapp示例项目-青年帮新闻
date: 2023-1-12
tags:
 - uniapp
 - 小程序
categories:
 - 小程序
sidebar: 'auto'
---

## 1. 项目准备

### 1.1 配置tabBar

:small_red_triangle: 再强调：在`tabBar`中小程序是不可以使用`iconfont`的。

使用方法是：在官网 :punch:[iconfont](https://www.iconfont.cn/) 下载后，将以  **`.ttf`**  结尾的文件复制到  <u>static/font</u>  中。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230131171026453.png" alt="image-20230131171026453" style="zoom:67%;" />

### 1.2 rich-text

:punch:[uniapp支持v-html,uniapp rich-text、uparse、v-html区别](https://blog.csdn.net/weixin_35968240/article/details/117890232)

小程序中不支持对富文本内容的改变吗？

### 1.3 /deep/

​        我们都知道**Scoped CSS规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范**。这样在打包的时候会生成一个独一无二hash值，这样父组件的样式就不会影响到子组件了。

​        然后你要想修改子组件的样式，一般是提取一个公共文件，在公共文件里面修改样式，但是这样也存在着一个问题，比如你使用了别人的组件或者自己开发一个组件，有时候你修改一处就可能影响到别的地方，这个时候要么你不用别人的组件，自己重新封装一个，但很多时候是不太现实的，**所以就需要有一个方法或者方式，既不影响到别的地方，又能修改子组件在当前的样式**。

例如我在一个商城的项目使用了mint-ui的radio组件，此时mint-ui已经有默认的样式了，我可以通过提取公共文件的方式来修改，以达到自己想要的，但是同时其他地方也会受到影响
————————————————
版权声明：本文为CSDN博主「Lucky@Dong」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zzddada/article/details/118525985

### 1.4 时间戳转换



### 1.5 uniapp中v-show

​      **v-show在微信小程序中有问题； H5表现正常， 微信小程序v-show失效；**
据说在封装组件中使用v-show，会导致不生效。但是我在 youngGang小程序中是在基础组件上使用的，同样不生效。**原因未知**。修改为`v-if` 即可。

:punch: [uni-app v-show不生效，是不是有什么特别的用法？还是说不能用到自定义组件上？ - DCloud问答](https://ask.dcloud.net.cn/question/75176)

其他方案：不知道能不能行，仅做记录

```html
<view :style="show?'':'display:none;'"></view>
<view :style="!show?'':'display:none;'"></view>
/*那使用:class也可以试一下*/
```

