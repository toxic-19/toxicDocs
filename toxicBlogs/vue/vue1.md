---
title: 01. vue2脚手架
date: 2022-02-20
tags:
 - vue
categories:
 - 前端
sidebar: 'auto'
---

## 1. 初始化

### 1.1 建立

```sh
npm install -g @vue/cli   #全局安装
vue create vue_project    #创建项目
npm run serve             #进入项目目录运行项目
npm config set registry https://registry.npm.taobao.org #配置淘宝镜像
```

### 1.2 结构

 ![image-20230220013935188](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230220013935188.png)

> `App.vue`：汇总所有组件
>
> `main.js`：入口文件
>
> 脚手架执行顺序：src/main.js  ==> App.vue ==> components ==> public。

### 1.3 `render`

在main.js中：

```js
// Vue CLI v4.xx
new Vue({
    el:'#app',
    render:h => h(App)
})
```

```js
// 我目前是Vue CLI v5.08
new Vue({
  render: h => h(App),
}).$mount('#app')
```

:ear: 指的是将App.vue组件放入到容器中【即public/index.html】的` #app`的标签中。

:eagle: 因为ES6引入的Vue并不是完整版的Vue，而是运行时vue，是不带有模板解析器的，所以无法执行template模板。使用完整版的Vue是可以的，路径在`node_modules/dist/vue.js`。

```js
// 就像我们不使用脚手架进行的Vue
new Vue({
    el:'#root',
    template:`<App></App>`,
    components:{
        App
    }
})
```

:eagle: 所以render函数就帮我们进行模板解析：实际上是：

```js
render(createElement){
    return createElement("h1","你好啊");
}
render:createElement=>creareElement("h1","你好啊")
render:h=>h("h1","你好啊")
```

Vue文件中的`<template>`编译使用的是`vue-template-compiler`依赖。

关于不同版本的`Vue`：

1. `vue.js`与`vue.runtime.xxx.js`的区别：
   1. `vue.js`是完整版的`Vue`，包含：核心功能+模板解析器.
   2. `vue.runtime.xxx.js`是运行版的`Vue`，只包含：核心功能；没有模板解析器.

2. 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用`template`配置项，需要使用 ` render`函数接收到的`createElement`函数去指定具体内容。

### 1.4 默认配置

```sh
vue inspect > output.js   # 生成output.js查看默认webpack配置。但更改无效。
```

如果需要更改，新建`vue.config.js`进行打包时覆盖默认配置。[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#vue-config-js)

```js
// vue.config.js
module.exports = {
  // 对页面的配置：
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html'
    }
  },
  // 关闭开发时语法检查
  lintOnSave:false
}
```

## 2. `ref `  与  `props`

### 2.1 `ref`

1. 被用来该元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上的获取真实dom元素，应用在组件标签上是组件实例对象【vc】。
3. 使用方式

```vue
<template>
	<div>
        <h1 id="h1">欢迎学习Vue!</h1>
        <button @click="showDom">点击获取</button>
    </div>
</template>
<script>
    export default({
        name:'App',
        methods:{
            showDom(){
                console.log(document.getElementById("h1"));
            }
        }
    })
</script>
```

> 但是在vue中最好不使用原生dom操作。使用ref属性进行代替。

```vue
<template>
	<div>
        <h1 ref="h1">欢迎学习Vue!</h1>
        <button ref="btn" @click="showDom">点击获取</button>
        <School ref="sch"/>
    </div>
</template>
<script>
    export default({
        name:'App',
        components:{
            School
        }
        methods:{
            showDom(){
        		// this指的是当前组件实例对象
                console.log(this.$ref.h1);           // 获取到的是真实DOM元素
                console.log(this.$ref.btn);          // 同上
                console.log(this.$ref.sch);	         // 获取到的是school组件实例对象
            }
        }
    })
</script>
```



### 2.2 `props` 配置

第一种：只接收数据。这样子传过去的age不是number类型，而是string类型。

```html
<Students name="tom" age="18" sex="男" />
```

```js
props:["name","sex","age"]
```

> 在age前加 `:` 可以传过去number类型的age，即`v-bind:age="18"`是把引号里的值 18 传过去，而不是字符串`"18"`。方便对age进行加减。
>
> ```html
> <Students name="tom" :age="18" sex="男" />
> ```



第二种：手动进行类型限制。使用对象声明props

```js
props:{
    age:Number,
    name:String,
    sex:String
}
```

> 在传递时同样是string类型，但是因为做了类型限制，所以会在终端有提示报错，age前应该加上 `:` ，传递number类型。



第三种：类型限制+默认值+必需属性

```js
props:{
    name: {type: String, required: true, default:xxx}
    // age sex 不详细
}
```

> 一般`require`和`default`不同时出现。毕竟必传的值也不需要默认值。

:ear: props是只读的，vue底层会监测你对props的修改否则会发出警告。不能对外部传入的props属性进行修改。可以定义data属性指向props的属性，再对其进行修改。

:ear: props的属性优先级大于data的数据的优先级。

## 3. `mixin`  混入

### 3.1 理解

:raised_hand_with_fingers_splayed: 参考链接 [彻底搞懂Vue中的Mixin混入（保姆级教程） - 掘金 (juejin.cn)](https://juejin.cn/post/7076340796361801759)

> 将组件的   **公共逻辑或者配置**   提取出来，哪个组件需要用到时，直接将提取的这部分混入到组件内部即可。<u>这样既可以减少代码冗余度，也可以让后期维护起来更加容易。</u>

:punch:即：mixin是组件中的组件，Vue组件化提高代码复用性。组件与组件之间还有重复部分，使用mixin再抽离一遍。

功能：可以把多个组件共用的配置提取成一个混入对象。分发 Vue 组件中的可复用功能。

使用方式：

1. 定义混合在单独的js文件里面：对象

```js
// src/mixin/index.js
export const mixins = {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
```

2. 局部混入

```js
import {mixins} from './mixin/index';
export default {
    name:'App',
    mixins:[mixins]    // 直接使用
}
```

> `mixin`中的生命周期函数会和组件的生命周期函数一起使用执行。
>
> `mixin`中的data数据在组件中也可以使用。
>
> `mixin`中的method在组件内部也可以使用。
>
> 执行顺序：`mixin `==> 组件
>
> **不同组件中的mixin是相互独立的！**

3. 全局混入

```js
// main.js中
import {mixins} from './mixin/index';
Vue,mixin(mixins);
```

> 即可以在所有组件中进行使用。

4. 发生冲突

+ 当mixin中的data数据与组件中的data数据冲突时，组件中的data数据会覆盖mixin中数据。
+ 同理在method方法一致时也是调用组件的方法。

### 3.2 与vuex区别 

- Vuex公共状态管理，如果在一个组件中更改了Vuex中的某个数据，那么其它所有引用了Vuex中该数据的组件也会跟着变化。
- Mixin中的数据和方法都是独立的，组件之间使用后是互相不影响的。

查看依赖的版本号：

```sh
npm view less-loader versions
```



## 4. todoList案例

## 5. webStorage 

+ **浏览器本地存储**
+ 存储内容大小一般在 5MB 左右。cookie是4KB

### 5.1 localStorage

1. 存在`window`身上。访问时是`window.localStorage`

2. 方法：

   1. `setItem(key,value)`：如果存储的不是字符串，那么就会主动强制转换为字符串。调用`toString`

      如果是对象，就会被转为 `[object Object]`，无法知道里面具体的内容。所以我们在存储对象的值时，需要手动进行字符串转换，调用`Json.stringify`

   2. `getItem(key)`：当然读取到对象的时候还是字符串就需要使用 `Json.parse`进行解析。读不到的就是`null`
   3. `removeItem(key)`：把键名从存储中删除。
   4. `clear()`：清空存储中的所有数据。

3. 把浏览器关闭，`localStorage`的记录也不会消失。需要用户手动清空。

### 5.2 sessionStorage

1. 同`localStorage`的所有`API`
2. 浏览器窗口关闭，记录也会随之消失。
3. `Json.parse(null) == null`

