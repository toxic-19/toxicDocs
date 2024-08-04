---
title: 02. vue2组件
date: 2022-12-8
tags:
 - vue
categories:
 - 前端
sidebar: 'auto'
---

## 1.  理解

### 1.1 组件

对组件的理解
1. 传统方式编写应用

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1667299224876-097171d2-7edc-426b-acba-4babe95aff14.png" alt="image.png" style="zoom: 50%;" />

2. 组件应用：代码复用

 <img src="https://cdn.nlark.com/yuque/0/2022/png/32615238/1667299387771-bbfc3c61-0b86-48e0-866c-2b10aaa944ba.png#averageHue=%23d6de33&clientId=u7c4abb31-8a1b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=640&id=RA5df&margin=[object Object]&name=image.png&originHeight=800&originWidth=1317&originalType=binary&ratio=1&rotation=0&showTitle=false&size=225986&status=done&style=none&taskId=ufa75da99-f836-4ad9-a92f-cd27d2bd945&title=&width=1053.6" alt="image.png" style="zoom:60%;" />

3. 定义：实现应用中**局部功能代码和资源**的集合
名词
1. 模块
   1. 理解: 向外提供特定功能的 js 程序, 一般就是一个 js 文件
   2. 为什么:  js 文件很多很复杂
   3. 作用:  复用 js, 简化 js 的编写，提高js运行效率
2. 组件
   1. 理解: 用来实现局部(特定)功能效果的代码集合(html/css/js/image…..)
   2. 为什么: 一个界面的功能很复杂
   3. 作用: 复用编码, 简化项目编码, 提高运行效率
3. 模块化： 当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用  
4. 组件化： 当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用,  
### 1.2
### 1.3
## 2. 
### 2.1
### 2.2
### 2.3
## 3. 自定义事件

参考链接：[ch07 Vuex状态管理 (yuque.com)](https://www.yuque.com/yuqueyonghumo4pmr/isbp522/ch07)：有关于父子组件组件传递的内容。![image-20230308123816771](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230308123816771.png)

### 3.1 通过props

> 在父组件中：通过`:getSchoolName="getSchoolName"` 将该方法传递给子组件
>
> 在子组件中：通过`props`接收到传递的方法 `getSchoolName`；定义事件来调用该方法，传递参数`schoolname`。

```vue
// 父组件-App.vue
<template>
	<School :getSchoolName="getSchoolName"></School>
</template>
<script>
    import School from './components/school'
    export default{
    	components:{
            School
        },
        methods:{
            getSchoolName(name){
                console.log("app收到了schoolName",name)
            }
        }
    }
</script>
```

```vue
// 子组件-School.vue
<template>
	<button @click="sendSchoolName">
        Send-SchoolName-ToApp
    </button>
</template>
<script>
    export default{
        data:{
            return{
            	schoolname:'天秤教育'
        	}
        },
        props:["getSchoolName"]
        methods:{
            sendSchoolName(){
                this.getSchoolName(this.schoolname);
            }
        }
    }
</script>
```

:eagle: 总之：是通过**子组件调用父组件的方法**来实现父子通信的。

### 3.2 绑定自定义事件

> 在父组件中：给子组件`Student`定义了一个 自定义事件：很明显地不同于`js`自带的如 ``click keyup``这些事件。
>
> ​					  **那么就得思考：如何去触发 这个自定义事件呢？** 明显`v-on`是定义在 `Student`组件上的，那么这个自定义事件就应该在组件实例上。
>
> 在子组件中：在`this`中是可以找到这个自定义事件的。之后通过 `$emit` 可以来触发 `this`下的 `atoxic `事件。
>
> ​					  `this.$emit("atoxic",this.studentName);`再将参数传递给它。

```vue
// 父组件
<template>
	<Student @atoxic="getStudentName"></Student>
</template>
<script>
    import Student from './components/student'
    export default{
    	components:{
            Student	
        },
        methods:{
            getStudentName(name){
                console.log("app收到了StudentName",name)
            }
        }
    }
</script>
```

```vue
// 子组件-Student
<template>
	<button @click="sendStudentName">
        Send-StudentName-ToApp
    </button>
</template>
<script>
    export default{
        data:{
            return{
            	studentname:'天秤小子'
        	}
        },
        methods:{
            sendStudentName(){
                this.$emit("atoxic",this.studentName);
            }
        }
    }
</script>
```

当然还有另一种方式：

`<Student ref="student"></Student>     // 可以通过ref获取到组件实例 `

`this.$refs.student.$on('atoxic', this.getStudentName)  // 在组件实例上绑定自定义方法` 

### 3.3 解绑

1. `this.$off()`：解绑全部自定义事件
2. `this.$off("atoxic")`：解绑一个自定义事件
3. `this.$off(['atoxic','atoxic2])`：解绑多个自定义事件需要使用数组。
4. 销毁当前组件实例，销毁后所有该实例的自定义事件全都不奏效。

:eagle: 箭头函数在哪定义，`this`永远指向父级函数`this`，且`this`指向不可改变，即使作为属性添加到另一个对象上也是如此。

:eagle: 在组件上面定义原生事件，必须加上`.native`

:eagle: 目前自定义事件还是不适合两个兄弟组件的通信的。

## 4. 全局事件总线

全局事件总线：一种用于组件间通信的方式，适用于任意组件间通信。

主要就是呢：找一个中间商来负责。

![image-20230308211640775](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230308211640775.png)

### 4.1 安装

```js
// 在项目的main.js中
new Vue({
    ......
    beforeCreate(){
    	// 创建了实例vm了，但是App还没有挂载
    	Vue.prototype.$bus = this;
    	// this就是当前应用的vm
	}
})
```

在`Vue`实例上创建这个 `$bus `可以确保所有的组件都能访问。

### 4.2 使用

:punch: 举例：A组件想接收数据，则在A组件中给`$bus`绑定自定义事件，事件的回调还在本地。

```js
// A.vue
mounted(){
	this.$bus.$on("xxx",(data)=>{
		console.log("A接收到了数据",data)
	})
}
// 记得要及时清除绑定
```

```js
// B.vue 数据的提供者
this.$bus.$emit("xxx",888);
```

:eagle: 最好在`beforeDestory()`钩子中：用`$off`去解绑当前组件所用到的事件。



## 5. 消息订阅与发布

:eagle: 前提：

```sh
npm install pubsub-js
```

:eagle: 导入

```js
import pubsub from 'pubsub-js';
```

### 5.1 使用

:eagle: 订阅：

```js
mounted(){
    pubsub.subscribe("hello",(name,data)=>{
        console.log(name,"发布了新消息:",data)
    })
}
```

:eagle: 发布：

```js
pubsub.publish("hello","新天河发布内容")
```



### 5.2 取消订阅

```js
beforeDestory(){
    // 在销毁前取消
    pubsub.unsubscribe(subId);
    // 需要通过subId来取消订阅
}
```

:eagle: 在订阅时`pubsub.subscribe()`就会返回一个`subId`，取消订阅要使用到这个`subId`



## 6. `$nextTick`

**`$nextTick`所指定的回调会在下一次`dom`更新完结点之后执行。**感觉相当于一个定时器。

:eagle: **什么时候使用**：

**当改变数据后，要基于更新后的新`DOM`进行某些操作时，要在`nextTick`所指定的回调函数中执行。**



## 7. 配置代理

[起步 | Axios 中文文档 | Axios 中文网 (axios-http.cn)](https://www.axios-http.cn/docs/intro)

跨域问题是浏览器的同源策略造成的。为了安全，浏览器不允许JavaScript和跨域的内容交互，跨域不止存在前后端。

**所以说前后端跨域是浏览器不接受跨域内容，后端之间可没有同源策略的限制。**服务器之间的交流使用的是HTTP协议，同源策略管不到。

![image-20230310221559965](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230310221559965.png)

### 配置代理服务器

[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#devserver-proxy)

 ![image-20230310213810880](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230310213810880.png)

```js
// vue.config.js
module.exports = {
   devServer: {
   	   proxy: 'http://localhost:5000'
   }
}
```

注意：添加完开发服务器的代理之后要记得：重启项目，重新运行。

并且：这种简单的配置方式有两个不完美之处：

1. 不能配置多个代理
2. 如果本端口下有的资源，不会去向服务器发送。比如下面的请求，如果`public`下有`student`这个文件，就会得到该文件的信息，而不会向服务器发送。

```js
// 在组件中粗略使用：
getStuInfo() {
    axios.get('http://localhost:8081/students').then(res => {
        console.log("收到信息：", res.data);
    }, err => {
        console.log("发现错误：", err.message);
    })
}
```

:eagle: 官方版：

1. 优点：配置简单，请求资源时直接发给前端`8081`
2. 缺点：不能配置多个代理，不能灵活控制请求是否走代理
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器【优先匹配前端资源】

### 完整代理

```js
// 使用
getStuInfo() {
    axios.get('http://localhost:8081/api/students').then(res => {
        console.log("收到信息：", res.data);
    }, err => {
        console.log("发现错误：", err.message);
    })
}
```

```js
// vue.config.js 配置
devServer: {
    proxy: {
        '/api':{ // 匹配所有以/api开头的请求路径
            target:'http://localhost:5000', // 代理目标的基础路径
            pathRewrite:{'^/api':''}，      // 重写路径，删除api,以致在后端能正确请求。
            ws:true,        // 用于支持websocket
        	changeOrange:true  // 跟请求的服务器说自己来自哪个端口。true就会说来自同个端口，默认false【说真话】
            // 用于控制请求头中的host值
        },
        // 配置第二个代理
        '/car':{
            target:'http://localhost:5001',
            pathRewrite:{'^/car':''},
            ws:true,
            changeOrange:true
        }
    }
}
```

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置稍微繁琐，请求资源时必须加前缀。

​                                                                                                             
