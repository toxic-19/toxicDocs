---
title: promise
date: 2022-12-8
tags:
 - ES6
categories:
 - 前端
sidebar: 'auto'
---


## 1.  基本使用

可参考我的公众号链接[vue3铺垫知识](https://mp.weixin.qq.com/s/t3iMEBZGHvjolIPDxbwljw)<br />参考尚硅谷笔记<br />[尚硅谷_Promise从入门到自定义.pdf](https://www.yuque.com/attachments/yuque/0/2022/pdf/32615238/1665800837971-0b87ec7b-a18c-493c-98a1-646e16860264.pdf)<br />参考 [Promise | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 1.1 概念

1. Promise 是一门新的技术(ES6 规范) 
2. Promise 是 JS 中进行异步编程的**新解决方案**

1. 从语法上来说: Promise 是一个构造函数 
4. 从功能上来说: promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值
   

### 1.2 理解

1.  异步编程包括：

+ `fs`文件操作：

```javascript
require('fs').readFile('./index.html',(err, data) => {})
```

+ 数据库操作

+ `AJAX`异步请求

```javascript
$.get('/server',(data) => {})
```

+ 定时器

```javascript
setTimeout(() => {},2000)
```
**无一例外都使用的是回调函数来进行异步编程**。

2. `promise`构造函数

​	`promise`是一个构造函数，在实例化时要接收一个参数（是一个函数，有两个形参）

​	该形参都是函数类型的数据。`new Promise((resolve, reject) => { ...code })`

3. `then`

​	由`promise`函数进行调用。传参两个函数：`.then((value, err) => { ...code } )`

​	第一个是成功时执行的回调函数,，可传`value`；相反第二个就是失败时执行的回调函数，可传`reason`。

#### 抽奖案例：

```javascript
const handleClick = () => {
  // Math.ceil向上取整  Math.random范围: [0,1)
  // Math.random: [0, 100)   +1 即为1-100包括100不包括101  [1, 100]
  
  let num = Math.ceil(Math.random() * 100) + 1;
  console.log(num);
  
  let p = new Promise((resolve, reject) => {
    // 书写逻辑
    if (num <= 30) {
      // 成功：执行resolve函数
      resolve(num); // 将promise对象的状态设置为 成功
    } else {
      // 失败：执行reject函数
      reject(num); // 将promise对象的状态设置为 失败
    }
  });
    
  // p是promise实例
  p.then(
    (value) => {
      // 成功时回调
      console.log("恭喜你,幸运数字为" + value);
    },
    (reason) => {
      //失败时回调
      console.log("再接再厉" + reason);
    }
  );
   
};
handleClick();
```


### 1.3 实践操作

#### 1.3.1 fs模块
```javascript
const fs = require('fs');

// 使用回调函数形式
fs.readFile('./content.txt',(err,data)=>{
    if(err) throw err;
    // 输出data 是 Buffer形式
    // <Buffer e5 b0 86 e8 bf 9b e9 85 92 0d 0a e5 94 90 e4 bb a3 ef bc 9a e6 9d 8e e7 99 bd 0d 0a e5 90 9b e4 b8 8d e8 a7 81 ef bc 8c e9 bb 84 e6 b2 b3 e4 b9 8b e6 ... 749
    // more bytes>
    console.log(data.toString())
})

//使用promise形式
new Promise((resolve, reject) => {
    // 在promise里面放置 异步操作
    fs.readFile('./content.txt',(err,data)=>{
        // 失败时
        if(err) reject(err);
        // 成功
        resolve(data.toString())
    })
}).then((value)=>{
    console.log(value);
},(reason)=>{
    console.log(reason)
})
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1665811800403-b3c8ac82-dff0-44e5-a85c-461857033938.png" alt="image.png" style="zoom: 80%;" />

#### 1.3.2 ajax请求

```javascript
// 使用回调函数
handleClick(){
    // 创建xhr对象
    const xhr = new XMLHttpRequest();
    // 初始化 定义请求类型和请求地址
    xhr.open("GET",'https://api.apiopen.top/api/sentences');
    // 发送请求
    xhr.send();
    // 处理响应结果
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <300){
                console.log(xhr.response)
                // {"code":200,"message":"成功!","result":{"name":"明年岂无年，心事恐蹉跎。","from":"苏轼《守岁》"}}
            }else{
                console.log(xhr.status);
            }
        }
    }
}
//  使用promise
handleClick() {
    new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET",'https://api.apiopen.top/api/sentences');
        xhr.send();
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4){
                if(xhr.status>=200 && xhr.status<300){
                    resolve(xhr.response)
                }else{
                    reject(xhr.status)
                }
            }
        }
    }).then((value)=>{
        console.log(value)
    },(reason)=>{
        console.log(reason)
    })
}
```
#### 1.3.3 封装promise读取文件操作
```javascript
// 封装一个函数 mineReadFile 读取文件内容
// 参数 path 
// 返回 promise对象
function mineReadFile(path) {
  return new Promise(((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if(err) reject(err);
         resolve(data.toString())
      })
  }))
}

// 使用该封装函数
// then使用在 进行判断结果的时候
mineReadFile('./content.txt').then(value=>{
  console.log(value);
}, reason => {
  console.log(reason)
})
```


#### 1.3.4 `util`中的`promisify`

传入一个 函数 ：错误优先的回调风格的函数 `(err,data) => {}`  一般作为最后一个参数。并返回一个promise的对象

1. 比如之前提到的  `fs.readFile` 就是 错误优先的回调函数
2. 返回的对象可以调用`then`

```javascript
// 传参 错误优先的回调函数
// 返回 promise函数
const util = require('util')
const fs = require('fs')
// 返回一个新的 函数
let mineReadFile = util.promisify(fs.readFile)
// 传参调用之后 返回一个promise对象，可以调用then
mineReadFile('./content.txt').then(value=>{ // 出错的参数在第一位，错误优先。
  console.log(value.toString());
},reason => {
  console.log(reason)
})
```


#### 1.3.5 封装 Ajax请求

```javascript
// 封装 向ajax发送请求的sendAjax函数
// 参数 url
// 返回 promise对象
const sendAjax = (url) => {
    return new Promise((resolve, reject) => {
        // 书写 ajax请求
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // 请求成功
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                reject(xhr.status);
            }
        };
    });
}
```


### 1.4 `promise`对象

一个`promise`对象的状态只能改变一次：

1. 属性`PromiseState`：`pedding`（未定义的） `resolved` `rejected`
2. 属性`PromiseResult`：存储`promise`对象成功或者失败的结果。



## 2. Promise的API

### 2.1 工作流程
![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666154078290-c107ae4a-fd1e-464c-be26-f2ffd2709f66.png)

### 2.2 构造函数API

#### 1. `then`方法

传递两个参数，一个参数是成功的回调，一个是失败的回调。`then(res => {}, error => {})`。一般我们都省略失败的回调，改用`catch`。

#### 2. `catch`函数
`catch()` 只是 `then(null,failureCallback)` 的简化 

#### 3. `resolve`函数

1. 属于是 `Promise` 函数对象的方法，而不是 `Promise` 实例对象上的。
2. 传入参数：非 `Promise` 类型的对象，则返回结果为成功的 `promise` 对象
3. 传入参数：`Promise`对象，则参数的结果决定了`resolve`的结果。
4. 应用：
```javascript
// 传参非Promise对象
Promise.resolve(551)
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666182563682-03e157ba-ce59-43a3-bae4-385ab683e530.png)
```javascript
// 传参为Promise对象
Promise.resolve(
    new Promise((resolve, reject) => {
      // resolve函数返回的结果：要看Promise对象的执行结果
      reject("err")
    })
)
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666182809754-e709a594-e792-48f7-9e58-4cbb3e0a3bc6.png)
#### 4. `reject`函数

1. 返回一个失败的promise对象。
2. 失败的结果为传入的参数；无论传入什么参数，返回的都是失败的。
#### 5. `all`函数

1. 返回结果与传入参数有关。
2. 传入参数： 多个`promise`对象组成的数组
3. 只有数组中所有`promise`对象都返回成功的结果，`all` 函数才可以返回成功结果；返回结果是参数成功结果的数组。
4. 成功实例：
```javascript
let p1 = new Promise((resolve, reject) => {
    // 返回成功
    resolve('ok')
})
let p2 = Promise.resolve('Success')
let p3 = Promise.resolve('Oh')
Promise.all([p1, p2, p3])
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666184040466-3ec55f03-7b5d-4895-9235-1ec1d3135c7a.png)

5. 失败实例：只返回那个失败的`promise`实例的结果。

```javascript
let p1 = new Promise((resolve, reject) => {
    // 返回成功
    resolve("ok")
})
let p2 = Promise.resolve('Success')
// 返回失败结果
let p3 = Promise.reject("Oh Error")
Promise.all([p1, p2, p3])
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666184107515-540e1580-7324-4ac6-92ff-8d97d416bfb5.png)
#### 6. `race`函数
```javascript
let p1 = new Promise((resolve, reject) => {
  // 一秒之后执行结果
  setTimeout(()=>{
    resolve('OK')
  },1000)
})
let p2 = Promise.resolve('Success')
let p3 = Promise.reject('Oh Error')
// 看数组中的 三个promise对象 谁的状态优先发生改变，就返回谁的状态和结果
// p1中1秒之后执行，那么就是p2的状态优先发生改变，所以结果就是 'Success' 状态为'fulfilled'
Promise.race([p1, p2, p3])
```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666184612178-b9cc99ee-15b7-4a29-9fb0-dae4607870e5.png)

## 3. 关键问题

### 3.1 如何改变`promise`的状态

1. 只能由 `pedding` 改为 `resolved` 或者 `rejected`。取决于函数执行的结果。
#### 有三种方式

1. 调用 `resolve`函数，状态变为 `fulfilled` (resolved)
2. 调用 `reject` 函数，状态变为 `rejected`
3. 通过抛出错误，状态变为 `rejected`
```javascript
const p = new Promise(resolve,reject => {
  throw '出现错误啦'
})
```


### 3.2 能否执行多个回调

> 意思是 promise 实例对象 能否多次调用 then 方法
> ： 
>
> 只要 promise 的状态发生了改变，即第一个问题中的三种情况。那么就返回了一个实例对象。
>
> 该实例对象就可以多次调用then方法，且都能执行。

```javascript
const p = new Promise(resolve,reject =>{
  resolve("ok")
})
p.then(value => {
  console.log(value)
})
p.then(value => {
  alert(value)
})
```


### 3.3 改变promise状态和指定回调函数（then, catch..） 谁先谁后？

意思是：

```javascript
let p = new Promise((resolve,reject)=>{
  resolve();  // 1. 这是改变promise状态的回调
})
p.then(value => {},reason => {})   // 1. 指定回调 then或者catch
// 两者谁先执行？
```

1. 异步任务时，是先指定 回调函数，再改变状态，再指定then函数中的函数体。
2. 同步任务时，就是按照顺序进行执行的。

### 3.4 then方法的状态由什么决定

1. **`then`执行返回一个 `promise` 对象。**
2. 结果由执行的回调函数的结果决定。即是 `PromiseResult`。
> 详细表达:  
>
> ① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常 <br />② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值 <br />③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果  

```javascript
let p = new Promise((resolve,reject) => {
    resolve('ok') // 该promise对象返回ok
})
let result = p.then(value => {                // 结果                       状态
    console.log(value)                        // 1. undefined               resolved
    throw '出现错误啦'                         // 2. throw的内容             rejected
    return 523;                               // 3. 该非promise类型的对象    resolved
    return new Promise((resolve,reject) => {
        resolve('success')                    // 4. 该promise对象返回的内容   resolved
    })
})
```


### 3.5 串联多个任务

```javascript
// p是一个promise对象
p.then(value => {
    // 结果由返回值 决定 ：返回一个promise的成功对象
    return new Promise((resolve, reject) => {
        resolve('success')
    })
}).then(value => {
    console.log(value)   // 是返回的success的promise对象的调用then 所以输出结果是success
}).then(value => {
    console.log(value)  // undefined 调用该then方法的并没有返回值
})
```


### 3.6 异常穿透

```javascript
let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('ok')  // 成功
    },1000)
})
// 异常穿透
 p.then(value=>{
     throw "出现错误啦"
 }).then(value=>{
     console.log(111)
 }).then(value => {
     console.log(222)
 }).catch(reason => {
     console.error(reason)
 })

```
 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666327014587-c96238c5-5442-4077-9f52-b3190bf73bd0.png)

### 3.7 中断Promise链

> 在一堆返回成功的then回调中，有且只有 `pedding` 状态的 `promise` 对象才能中断
>
> **因为状态没有改变，所以接下来的then方法都不能执行。**

```javascript
let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('ok')  // 成功
    },1000)
})
// 异常穿透
p.then(value=>{
    console.log(11)
    return new Promise(() => {})
}).then(value=>{
    console.log(111)
}).then(value => {
    console.log(222)
}).catch(reason => {
    console.error(reason)
})
```

 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666327292356-390c27dc-0bcc-4c49-85c7-973b8894ea8e.png)

## 4. 自定义封装

### 4.1 初步封装
> 思路：
> 1. promise初始结构搭建：promise实例化+调用then函数
> 2. 声明promise函数 和 promise原型then 【注意传参类型】
> 3. 定义resolve和reject函数：传参赋值给promiseResult【要定义】；
> 4. 注意：判断promiseState状态【pedding】，状态不能多次改变，只能修改一次。
> 5. throw抛出异常也属于rejected
> 6. then回调：判断状态，执行相对应的回调函数；

1. promise 应用：
```javascript
// 1.1 初始 : 两个函数
let p = new Promise((resolve,reject) => {     // 3.0 传递参数是两个函数，需要在promise中定义
  resolve('ok');  
  reject('err');
  throw '出现错误啦'
})
// 1.2
// 6.0 执行then回调，也有两个函数，随状态的不同执行不同的函数
p.then(value=>{
  console.log(value);
},reason=>{
  console.warn(reason);
})
```

2. promise 声明：
```javascript
// 2.1 promise 函数
function Promise(executor){  // 执行器函数
  // 3.2 声明
  this.promiseState = 'pedding'
  this.promiseResult = null
  // 3.1 定义两个函数，传参
  // 一旦执行这两个函数，首先状态还没改变，其次更改状态，赋值data
  // 所以该对状态和数值进行声明给实例对象
  const resolve = (data)=>{
    if(this.promiseState !== 'pedding') return;
    this.promiseState = 'fulfilled'
    this.promiseResult = data
  }
  const reject = (data)=>{
    if(this.promiseState !== 'pedding') return;
    this.promiseState = 'rejected'
    this.promiseResult = data
  }
  // 5.0 对throw抛出异常进行处理:
  // 一旦在执行器函数中有抛出错误 ，捕获并抛出
  try{
    // 2.3 执行 执行器函数 有参数2
    executor(resolve,reject)
  }catch(e){
    // 输出e,发现是抛出的错误内容
    // 5.1 throw 也属于是 返回失败的内容，所以执行reject
    reject(e)
  }
}
// 2.2 then安装内置promise那样放在 原型下
Promise.prototype.then = function(onResolved,onRejected){ // 传递两个参数 都是函数
  // 6.1 判断不同的状态执行不同的回调函数
  if(this.promiseState === 'fulfilled'){
    onResolved(this.promiseResult)
  }
  if(this.promiseState === 'fulfilled'){
    onRejected(this.promiseResult)
  }
}
```


### 4.2 再度封装

> 思路：接上条
> 1. 如果执行器函数中有 异步任务，**该如何在执行异步任务之后 执行then中的相对应函数**
> 2. 为同一个promise对象指定多个回调，只要状态发生改变就都要执行
> 3. then方法返回值由 指定回调（onResolved,onRejected）的返回值（return）决定的。
> 4. then返回的是一个promise对象

```javascript
let p = new Promise((resolve,reject)=>{    
	// 1.0 声明异步任务，一秒之后才执行该执行器函数，此时状态还是pedding，但then函数已经执行
  // 1.1 所以要把then中的函数存起来，待到执行完resolve之后再执行相对应的函数。
  // 1.2 执行resolve或者reject之后意味着 state会发生改变。
  setTimeout(()=>{
    resolve('ok')
  },1000)
})

// 2.0 为p指定多个回调，指的是多次执行then函数 如下：
// 2.1 如上：把回调函数都存在数据中 循环调用即可
// 3.0 要查看then函数的返回结果：let result = ... 并注释掉第二次回调
// 3.1 此刻res是一个promise对象，state状态由执行结果决定
let res = p.then(value => {
  console.log("第一次回调",value);
},reason => {
  console.warn(reason);
})
console.log(res)
// p.then(value=>{
//   console.log("第二次回调",value);
// },reason=>{
//   console.warn(reason);
// })
```
```javascript
function Promise(executor){  
  this.promiseState = 'pedding'
  this.promiseResult = null
  // 1.3 定义对象存储 回调函数
  // this.callback = {}
  // 2.2 注释之前的对象存储，改为数组
  this.callbacks = []
  
  const resolve = (data)=>{
    if(this.promiseState !== 'pedding') return;
    this.promiseState = 'fulfilled'
    this.promiseResult = data
    // 1.5 此时调用了resolve函数，state变为了fulfilled。那么就应该调用onResolve回调
    // 2.4 数组中调用回调
    // this.callback.onResolved()
    this.callbacks.forEach(item=>{
      item.onResolved()
    })
  }
  const reject = (data)=>{
    if(this.promiseState !== 'pedding') return;
    this.promiseState = 'rejected'
    this.promiseResult = data
    // 1.6 此时调用了reject函数，state变为了rejected。那么就应该调用onRejected回调
    // 2.5 如2.4：
    // this.callback.onRejected()
    this.callbacks.forEach(item=>{
      item.onRejected()
    })
  }
  
  try{
    executor(resolve,reject)
  }catch(e){
    reject(e)
  }
}

Promise.prototype.then = function(onResolved,onRejected){ 
  // 4.0 then返回的是一个promise对象 所以return一个实例出来
  return new Promise((resolve,reject)=>{

    
    	// 1.4 一旦在state为pedding的情况下调用then函数，就将回调函数存起来
      // 待到state发生变化时再进行相对应的调用
      if(this.promiseState === 'pedding'){
        // 2.3 将回调函数存储起来，注释原来的对象存储
        // this.callback = {onResolved,onRejected}
        // 执行一次then函数，就将回调存起来一次
        this.callbacks.push({
          onResolved, onRejected
        })
      }
      // 3.2 要把回调函数执行的结果传递给res 作为promiseResult
      if(this.promiseState === 'fulfilled'){
         try{
            // 3.3 声明执行结果
            // 结果1. 异常 结果2. 非promise对象 结果3. promise对象
            let result = onResolved(this.promiseResult)
            // 3.4 判断结果3    可以见图解
            if(result instanceof Promise){    
              result.then(v=>{     
                resolve(v)
              }，r=>{reject(r)})
            }else{
              //3.5 判断结果2
              resolve(result)    // 把result值赋值给该promise对象的promiseResult
            }
         }catch(e){
           // 3.6 在执行onResolved回调过程中出现异常
           reject(e)
         }
      }

    
      if(this.promiseState === 'rejected'){
        // onRejected(this.promiseResult)
        // 3.7 同在状态为fulfilled中操作一致
        try{
            let result =  onRejected(this.promiseResult)
            if(result instanceof Promise){    
              result.then(v=>{     
                resolve(v)
              }，r=>{reject(r)})
            }else{
              resolve(result)    
            }
         }catch(e){
           reject(e)
         }
      }
  })
}
```
![img](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666692453046-e533866a-bf8b-4e89-9379-bb3d89cfe5b9.png)



### 4.3 结束基础封装

> 异步修改状态then方法结果返回



✌️[Promise | bilibili](https://www.bilibili.com/video/BV1GA411x7z1?p=34&vd_source=fd483034c51a8aa4f43cf44d83bc54a0)

## 5. async和await
—— 异步编程的终极解决方案

### 5.1 async 函数

> 模板：
> 1. 函数的 **返回值为 `promise` 对象。**
> 2. `promise` 对象的结果由 `async` 函数执行的返回值决定。

```javascript
async function main(){
  // async 函数返回的是一个promise对象
  // 状态和结果由函数体决定。
  // 情况1 
  return 521;    // 521 fulfilled
  // 情况2 
  return new Promise(resolve,reject){
    // 情况2.1
    resolve('ok')       // ok fulfilled
    // 情况2.2 
    reject('err')       // err rejected
  }
  // 情况3
  throw '出现问题啦'  // 出现问题啦 rejected
}
console.log(main())     // 执行结果是一个promise
```


### 5.2 await 表达式

> 1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
> 2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
> 3. 如果表达式是其它值, 直接将此值作为 await 的返回值
>
> **注意：**
>
> 1. await 必须写在 async 函数中, 但 async 函数中可以没有 await
> 2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

**不在async函数中使用会报错：**

 ![image.png](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/1666693950243-66ee8527-8467-425c-a677-fd5e1dba488d.png)

```javascript
// 基本使用
async function main(){
    let p = new Promise((resolve,reject)=>{
      // reject('Error')
        resolve('OK')
    })
    // 需要赋值给res 否则是不会直接输出结果的。
    // 如果p返回的是错误的回调，那么需要在await外使用 try...catch捕获错误 
    // catch 中的 e 就是返回的结果，可输出
    let res = await p;
    console.log(res)
}
// 函数需要执行
main();
```
> 读取文件

```javascript
// 回调函数读取文件
let fs = require('fs')
fs.readFile('./resource/data1',(err, data1) => {
    if(err) {
        throw "出现err";
    }
    fs.readFile('./resource/data2',(err, data2) => {
        if(err) {
            throw "出现err";
        }
        fs.readFile('./resource/data3',(err, data3) => {
            if(err) {
                throw "出现err";
            }
            console.log(data1+data2+data3)
        })
    })
})

// 使用async和await读取文件
let util = require('util')
let mineReadFile = util.promisify(fs.readFile);
const ReadFile = async () => {
    // 如果其中返回有错误的话 需要使用try catch
    try{
        // await后面接 promise对象  用util中的promisify封装fs的readFile方法
        let res1 = await mineReadFile('./resource/data1');
        let res2 = await mineReadFile('./resource/data3');
        let res3 = await mineReadFile('./resource/data2');
        console.log(res3+res1+res2)
    }catch (e) {
        console.log(e)
    }
};
ReadFile()
```


### 5.3 实践

参考 [在JS文件调用另一个JS文件中的方法 | CSDN](https://blog.csdn.net/a949368227/article/details/121506613)
```javascript
// sendAjax.js
/**
 * @param url
 * @returns {Promise<unknown>}
 */
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function sendAjax(url) {
    return new Promise((resolve, reject) =>{
        // 书写 ajax请求
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if(4 === xhr.readyState){
                // 请求成功
                if(xhr.status < 300 && 200 <= xhr.status){
                    resolve(xhr)
                }
                reject(xhr.status)
            }
        }
    })
}
// sendAjax('https://api.apiopen.top/api/sentences').then(result => {
//     console.log(result)
// })

exports.sendAjax = sendAjax;   // 导出
```
```javascript
// ajax.js
// 使用await和async
const res = require('../实践练习/sendAjax')
// res是一个集合 { sendAjax: [Function: sendAjax] }

async function sendImage(){
 // 注意该方法需要在res下找到
    let images = await res.sendAjax('https://api.apiopen.top/api/getImages?page=0&size=10');
    console.log(images.responseText)
}
sendImage()
```

## 6. 使用场景

[使用场景 | web前端](https://vue3js.cn/interview/es6/promise.html#%E4%B8%89%E3%80%81%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
