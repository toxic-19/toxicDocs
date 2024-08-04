---
title: 03. vue2生命周期
date: 2022-12-8
tags:
 - vue
categories:
 - 前端
sidebar: 'auto'
---


## 1. 引出

### 1.1 mounted
> **vue 完成模板的解析并把初始的真实DOM 元素放入页面后（ 挂载完毕）就调用mounted**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>引出生命周期</title>
  </head>
  <body>
    <!--使该h2样式从打开开始：就慢慢模糊知道消失再变为1：透明度下降-->
    <div id="app">
      <h2 :style="{opacity}">引出生命周期</h2>
    </div>

    <script src="../vue.js"></script>
    <script>
      let vm = new Vue({
        el:'#app',
        data:{
          opacity:0.5
        },
        //生命周期函数；挂载完毕之后Vue调用的函数
        mounted(){
          console.log('mounted')
          setInterval(()=>{
            // 每16毫秒就执行一次该箭头函数
            this.opacity -= 0.06
            if(this.opacity<=0) {this.opacity = 1}
          },16)
        }
      });
    </script>
  </body>
</html>
```
关键代码：
```html
<h2 :style="{opacity}">引出生命周期</h2>
```
```javascript
mounted(){
  console.log('mounted')
  setInterval(()=>{
    //    每16毫秒就执行一次该箭头函数
    this.opacity -= 0.06
    if(this.opacity<=0) {this.opacity = 1}
  },16)
}
```


### 1.2 生命周期

> 又名： 生命周期回调函数、生命周期函数、生命周期钩子。

1.  是 vue 在关键时刻帮我们调用的一些特殊名称的函数。
2.  生命周期函数的名字不可更改， 但函数的具体内容是程序员根据需求编写的。
3.  生命周期函数中的this 指向是vm 或组件实例对象。



### 1.3 图例

 <img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1665549497017-357aca75-a001-47c0-8643-b1f82cbbcb99.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0" alt="生命周期.png" style="zoom:100%;" />

## 2. 图解

### 2.1 beforeCreate

![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665552929706-e1885c97-1fbd-4c74-9cb6-fcf7896b7b34.png)
```javascript
beforeCreate(){
    console.log('beforeCreate')
    console.log(vm.data)  // 初始化之前无法访问到vm中data
  // 如果要输出 this vue实例的话 应该要在下面添加 debugger 否则会继续向下执行；
  // 无法观察到 在该生命周期函数的 内容
  // 记得在观察是否输出 this的时候 要把上一句输出关掉 否则不会往下执行。也无法输出了
    console.log(this);
    debugger;
}
```
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665553197114-8e7a5690-c8d8-4fa4-b674-064250c729a8.png" alt="image.png" style="zoom:50%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665553708067-b64fc735-2895-4cd8-9d9d-36b61fc26ade.png" alt="image.png" style="zoom:80%;" />

> **还没有完成数据监测 数据代理 vue也还没有开始解析模板**
> **指的是 数据监测，数据代理创建之前**



### 2.2 created

```javascript
created(){
      console.log("created")
      console.log(this)
      debugger;
  }
```
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665553901816-812361c1-595b-40e9-b5f8-d88871e0e56c.png" alt="image.png" style="zoom:67%;" />

>     <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665554145491-edadb6db-b2ab-40de-bbf5-6bd666832ede.png" alt="image.png" style="zoom:50%;" />
>
>  **在created生命周期函数中 模板也没有开始编译，但已经完成数据监测与数据代理**



### 2.3 beforeMount

```javascript
beforeMount(){
    console.log('beforeMount');
    document.querySelector('h2').innerText="在beforeMount上更改"
    debugger;
}
```
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665555368297-631ce657-1ff2-4d5e-bd62-c198f29b9227.png" alt="image.png" style="zoom:80%;" />![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665555385454-177c48ef-c591-4c77-99da-4effd3d0a81f.png)  

> **这个阶段：**
> 1. **页面上还是未经编译的dom结构**
> 2. **对dom作出的修改是无法保存的**
> 3. **vue中已经生成了虚拟dom存在内存之中，但还没有渲染到页面上**



### 2.4 mounted

```javascript
mounted(){
    console.log('mounted')
    debugger;
}
```
 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112133644016.png" alt="image-20230112133644016" style="zoom:80%;" />

> 此阶段中：
> 1. 页面中呈现的已经是经过vue编译的dom
> 2. 可以在这里进行一系列初始化操作：定时器，axios请求。。。。



### 2.5 其他

> 1. **没有template：编译outerHtml**
> 
      **有把外面的div一起进行编译的。**

 ![image-20230112133735526](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112133735526.png)

---

> 2. **如果有template：编译的是innerHtml**
> 
       **原本页面上的div没有被编译**

 ![image-20230112133811702](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112133811702.png)
```javascript
const vm = new Vue({
    el: '#app',
  // 只能有一个根节点 不然会报错
    template:`<div><h2>生命周期挂载</h2><p>{{this.demo}}</p></div>`,
    data: {
        demo: '1111'
    }
});
```
![image-20230112133840035](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112133840035.png)



## 3. 更新流程

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665556620104-5051d7f2-7eb9-43cb-8278-2c795063e64f.png" alt="image.png" style="zoom:80%;" />



### 3.1 beforeUpdate

> **一旦data中的数据被更改就会触发该生命周期函数。**
> **在这个状态中：页面与数据未保持一致。**

 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665557872028-5c45da75-a442-4567-80c5-6fb48c1dd76e.png)
```javascript
beforeUpdate(){
    console.log('beforeUpdate')
    debugger;
}
```



### 3.2 updated

> **一旦数据改变就触发beforeUpdate，此时没有debugger，继续往下执行。**
> **执行updated函数：完成页面更新。**
> **所以此阶段内 数据与页面保持一致**

```javascript
updated(){
    console.log('updated')
    debugger;
}
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665558108650-9d0ca845-fa18-4810-a460-262a5263d9b7.png)



## 4. 销毁流程

 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665558884466-58ddbf20-1183-4bbc-9286-57eddfb88809.png)



### 4.1 分析流程

> 1. 网页一刷新就执行四个生命周期函数：
> 2. 点击修改data中的数据，就触发点击事件输出add和update的两个生命周期函数
> 3. 点击销毁，触发点击事件输出 destroy

![image-20230112134142310](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230112134142310.png)

注意：

1. 点击销毁之后 触发this.$destroy()函数：完全销毁一个实例，清理与其他实例的连接，解绑全部指令和自定义事件监听器。
2. 所以在点击销毁之后 ：监测工具VueTool监测不到data了。点击事件add也无法更改页面上的值了。

      ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665559820439-36f41d99-ae34-4c8e-8999-f6eba68149c5.png)

3. 但是：触发点击事件add仍在执行：销毁之后还留有原生事件回调函数。

       ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665559941421-61ba2873-0264-4e37-87bd-37ee8e4b7955.png)
```javascript
methods:{
    add(){
        console.log('add')  // 销毁之后 该语句仍在执行。
        this.n++;
    },
    destroy(){
        console.log('destroy');
        this.$destroy()
    }
},
```



### 4.2 beforeDestroy

```javascript
beforeDestroy() {
    console.log('beforeDestroy')
    debugger;
}
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665560451806-ae71e9d0-8f4e-4b32-be6a-f2d59ef272a4.png)
> 此阶段 data和methods仍处于可用状态。可访问到，但对于数据的更改是不能的。
> 在此阶段：收尾工作：关闭定时器，取消订阅消息，解绑自定义事件等

关于销毁vue实例

1. 销毁后借助vue开发者工具看不到任何消息
2. 销毁后自定义事件会失效，但原生dom事件依然有效。
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程。



## 5.  整个流程

![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665714291572-072addaa-4fd2-483a-80e3-c04905466c7f.png)



### 5.1 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>生命周期总结</title>
</head>
<body>
<!--使该h2样式从打开开始：就慢慢模糊知道消失再变为1：透明度下降-->
<div id="app">
    <h2 :style="{opacity}">引出生命周期</h2>
    <button @click="stop()">点击停止</button>
</div>

<script src="../vue.js"></script>
<script>
    let vm = new Vue({
        el:'#app',
        data:{
            opacity:0.5
        },
        //生命周期函数；挂载完毕之后Vue调用的函数
        mounted(){
            console.log('mounted')
            this.timer = setInterval(()=>{
                console.log("setInterval")
            //    每16毫秒就执行一次该箭头函数
                this.opacity -= 0.06
                if(this.opacity<=0) {this.opacity = 1}
            },16)

        },
        methods:{
            stop(){
                this.$destroy()
            }
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    });
</script>
</body>
</html>
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665722673456-5c39337e-103b-4cf1-bbe8-5d641ace826e.png)
> 常用的生命周期钩子：
> 1. mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
> 2. beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
> 
> 关于销毁Vue实例
> 1. 销毁后借助Vue开发者工具看不到任何信息。
> 2. 销毁后自定义事件会失效，但原生DOM事件依然有效。
> 3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

