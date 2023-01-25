---
title: 发布订阅者模式
date: 2022-12-8
tags:
 - ts
categories:
 - 前端
sidebar: 'auto'
---

## 1. 发布订阅与观察者模式

### 1.1 概念：
:punch: **观察者模式（Observer Pattern）：**
一种一对多的依赖关系，当一个对象发生改变，所有依赖这个对象的都将得到通知，并更新。观察者直接订阅主题，当主题发生变更，直接通知观察者。

:punch: **发布订阅模式（Publish/Subscribe Pattern）：**
起初发布订阅模式也叫观察者模式的别名，慢慢的独立成一个不同的设计模式。订阅者把想订阅的事件注册到中间代理，发布者发布事件到中间代理，由中间代理统一发送给订阅者。

:punch: 观察者模式的观察者相当于发布订阅模式的订阅者，**两者的最大区别就是发布订阅模式有了一个中间机制**。**观察者模式当对象状态发生改变，直接通知观察者，所以对象和观察者是松散的耦合在一起的，而且是同步实现。而发布订阅模式不需要有任何关联，是完全解耦的，都是通过中间机制进行通信，两者是完全分离的，所以也是异步实现。**



### 1.2 用代码理解概念：【Js】
#### 1.2.1 观察者模式
```javascript
function User(name) {
    this.name = name;
    this.list = [];
}
// 订阅  user订阅者  target：被订阅者
User.prototype.subscribe = function (target) {
  console.log(this.name + '订阅了:' + target.name);
  target.list.push({target: target.name,user: this.name});  // 被订阅者的list加入订阅者。
}
// 发布 一旦发布，target中的list.item都收到信息
User.prototype.publish = function () {
  console.log(this.name + '发布了一条消息');
  this.list.forEach((item) => {
    console.log('订阅了' + item.target + '的' + item.user + '收到了这条消息');
  });
}
var user1 = new User('用户1', 18);
var user2 = new User('用户2', 28);
var user3 = new User('用户3', 38);
user1.subscribe(user3, user1.name);
user2.subscribe(user3, user2.name);
user3.publish();
//用户1订阅了:用户3
//用户2订阅了:用户3
//用户3发布了一条消息
//订阅了用户3的用户1收到了这条消息
//订阅了用户3的用户2收到了这条消息
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671514041772-53cad042-351c-4c55-91eb-50cece71b19b.png#averageHue=%23fdf8f4&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=138&id=udd9a61b1&margin=%5Bobject%20Object%5D&name=image.png&originHeight=173&originWidth=408&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14639&status=done&style=none&taskId=u3a58d132-c2b5-449e-8d04-5b24471b62b&title=&width=326.4)         ![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671518307780-a224c57e-9894-4c79-87d2-8b563b39fc76.png#averageHue=%23fdfcfb&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=198&id=u807522b7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=385&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19768&status=done&style=none&taskId=u346f36af-d8ff-48f5-9669-a8485eb1b9f&title=&width=308)

:page_with_curl: **注意：观察者【user1，user2】关联了目标对象【user3】,一旦目标对象发布消息时，会通知给观察者。**



#### 1.2.2 发布订阅模式

```javascript
// 中间代理
let IntermediateProxy = {
    // 是对象，对象中存储数组；数组项为对象
    targetList : Object.create(null),
    // 订阅消息：user1订阅了user2的消息。然后存进userList中。
    subscribe:function(user,target){
        let name = target.name;
        if(!this.targetList[name]){  // 从未被人订阅过；生成一个数组
            this.targetList[name] = [];
        }
        // user：订阅者；target为被订阅者。要以被订阅者为主
        this.targetList[name].push({user:user.name});
    },
    // 发布消息：
    publish:function(target){
        for(let item of this.targetList[target.name]){
            console.log(item.user+"接收到了"+target.name+"发布的消息")
        }
    }
};
function User(name){
    this.name = name;
}
User.prototype.publish = function(){
    console.log(this.name+'发布了一条消息');
    IntermediateProxy.publish(this);
}
User.prototype.subscribe = function(target){
    console.log(this.name+'订阅了：'+target.name);
    IntermediateProxy.subscribe(this,target);
}

let user1 = new User("user1");let user2 = new User("user2");let user3 = new User("user3");

user1.subscribe(user3);user1.subscribe(user2);user2.subscribe(user3);
console.log(IntermediateProxy.targetList);
user3.publish();
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671520963622-f23f4b01-e984-46a8-8cf8-047d73cb863c.png#averageHue=%23f8f7f7&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=166&id=u46b2d7c7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=208&originWidth=429&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10219&status=done&style=none&taskId=u8b0dfc7e-272c-4587-a47a-03ca0c1ed6b&title=&width=343.2)![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671521024009-32d6b61d-1d3d-4da6-8f7e-aa940ec35e74.png#averageHue=%23fdf6f2&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=169&id=ue6e61e2f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=211&originWidth=596&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33013&status=done&style=none&taskId=u4ad4f634-3a72-4d9b-a622-a5ef0f8d955&title=&width=476.8)

:page_with_curl: **注意：有一个中间代理机制，用户之间只存在发布和订阅，而消息是传到中间代理，由中间代理进行传递消息。**

:arrow_right: **参考链接    [发布订阅模式与观察者模式 - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1619497)**



### 1.3 图解：

#### 1.3.1 观察者
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671522398020-52964be4-92f2-48ec-a1e3-a3e98fd06473.png#averageHue=%23f7f7f7&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=303&id=ub1300e45&margin=%5Bobject%20Object%5D&name=image.png&originHeight=379&originWidth=938&originalType=binary&ratio=1&rotation=0&showTitle=false&size=70921&status=done&style=none&taskId=u619aa2f5-6a90-4793-a490-08ca33bb72b&title=&width=750.4)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671522415691-8cc316aa-3d92-49e0-9fea-526a767b1f14.png#averageHue=%23f6f6f6&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=379&id=ub4e7bced&margin=%5Bobject%20Object%5D&name=image.png&originHeight=474&originWidth=647&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67357&status=done&style=none&taskId=uc07fb2b9-b336-4acf-ab86-0dd95530d68&title=&width=517.6)



#### 1.3.2 发布订阅

![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671523212364-5abbbe6a-9b25-49f5-9a50-b49d266f2618.png#averageHue=%23f9f9f9&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=498&id=ufef60015&margin=%5Bobject%20Object%5D&name=image.png&originHeight=622&originWidth=928&originalType=binary&ratio=1&rotation=0&showTitle=false&size=117265&status=done&style=none&taskId=ud1c1b09c-ce9f-41ac-a248-6e288a1eff1&title=&width=742.4)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1671524212113-fb35c9f0-3fb9-4c42-b1fa-9505c9a9d1ad.png#averageHue=%23f8f8f8&clientId=uc3e17c7f-ea58-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=523&id=u883d2a07&margin=%5Bobject%20Object%5D&name=image.png&originHeight=654&originWidth=1063&originalType=binary&ratio=1&rotation=0&showTitle=false&size=188298&status=done&style=none&taskId=u53a1cbe4-b1d8-49bc-ada9-a1b714f074c&title=&width=850.4)



## 2.  UML

### 2.1 示例代码【TS】
> 学了两天TS，我又回来了。

由之前 **“js理解概念”** 这部分可以抽象为 三个接口 ：

**发布者接口（Publisher），订阅者接口（Subscriber），中间代理接口（IntermediateProxy）**

```ts
// 接口文件；包括 Publisher接口 Subscriber接口和 IntermediateProxy接口
interface IPublisher {
    // 发布者姓名
    name: string;
    // 发布内容
    data:string;
}

interface ISubscriber {
    // 订阅者姓名
    name: string;
}
interface IIntermediateProxy {
    /**
     * 发布订阅者消息
     * @param publisher 发布者对象
     */
    publish(publisher:Publisher):void;

    /**
     * 订阅者订阅消息
     * @param subscriber 订阅者对象
     * @param publisher 发布者对象
     */
    subscribe(subscriber:Subscriber,publisher:Publisher):void;
}
```

**实现类**

```ts
// 实现类
class IntermediateProxy implements IIntermediateProxy{
    // 数组存储订阅者与发布者的关联关系
    // 显示应为： {publisher1:[{},{}],publish2:[{}]}
    // private targetList = Object.create(null);
    private targetList :{[key:string]:Array<any>} = {};

    // 订阅： subscriber 订阅了 publisher
    subscribe(subscriber:Subscriber,publisher:Publisher): void {
        if(!this.targetList[publisher.name]){
            this.targetList[publisher.name] = [];
        }
        console.log(subscriber.name+"订阅了"+publisher.name+"的消息");
        this.targetList[publisher.name].push({subscriber:subscriber.name});
        console.log(this.targetList);
    }
    // 发布
    publish(publisher: Publisher): void {
        console.log(publisher.name+"发布了消息"+publisher.data);
        const nowList = this.targetList[publisher.name];
        if(nowList){
            for (const item of nowList) {
                console.log(item.subscriber+"接收到了"+publisher.name+"发布的："+publisher.data);
            }
        }
    }
}
// 实现具体发布者类
class Publisher implements IPublisher{
    private _name: string;
    private _data :string;
    constructor(name:string,data:string) {
        this._name = name;
        this._data = data;
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


    get data(): string {
        return this._data;
    }

    set data(value: string) {
        this._data = value;
    }
}
// 实现具体订阅者类
class Subscriber implements ISubscriber{
    private _name: string;
    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
```

```ts
// 实现过程：
let publisher1 = new Publisher("天河发布","某某某地方解封——2022.12.01");
let subscriber1 = new Subscriber("微信用户12138");
let subscriber2 = new Subscriber("手机用户12138");
let proxy = new IntermediateProxy();

proxy.subscribe(subscriber1,publisher1);
proxy.subscribe(subscriber2,publisher1);
proxy.publish(publisher1);
```

 ![image-20221224172105723](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221224172105723.png)

:punch: 在编程风格上，发布订阅模式让两个对象在松耦合的情况下建立联系，不再需要显式的将接口调用硬编码耦合进另一个对象，发布者和订阅者发生各自代码的变更都不会影响到对方。



### 2.2 类图

![image-20221224174453518](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221224174453518.png)



### 2.3 顺序图

 ![image-20221224181013995](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221224181013995.png)



## 3. 应用场景

:punch: 项目中很少使用订阅者，或者与子系统交互较小，则不适合 发布-订阅模式

:punch: 以下场景适合 发布-订阅模式的 应用场景

1. 需要向大量消费者广播信息；如微信订阅号。
2. 应用程序需要与一个或者多个独立开发的应用程序或者服务进行通信。
3. 应用程序可以向消费者发送信息，不需要消费者实时响应。

:punch: 在前端开发最常见的发布订阅模式应用：**DOM 事件和自定义事件**。



## 4. 优缺点

:punch: **优点**

​	**1. 解耦合**

​	:page_with_curl: **发布-订阅模式**可以将众多需要通信的子系统(Subsystem)解耦，每个子系统独立管理。而且即使部分子系统取消订阅，也不会影响**事件总线**的整体管理。**发布-订阅模式**中每个应用程序都可以专注于其核心功能，而**事件总线**负责将消息路由到每个**订阅者**手里。

​	**2. 高伸缩性**

​	:page_with_curl: **发布-订阅模式**增加了系统的可伸缩性，提高了发布者的响应能力。原因是**发布者**(Publisher)可以快速地向输入通道发送一条消息，然后返回到其核心处理职责，而不必等待子系统处理完成。然后**事件总线**负责确保把消息传递到每个**订阅者**(Subscriber)手里。



:punch:  **缺点**

1. 在创建订阅者本身会消耗内存，但当订阅消息后，没有进行发布，而订阅者会一直保存在内存中，占用内存；
2. 创建订阅者需要消耗一定的时间和内存。如果过度使用的话，反而使代码不好理解及代码不好维护。



## 5. Vue框架举例

学 `Vue` 的时候，印象最深刻的就是 **`MVVM双向数据绑定`** 。仔细一想：`data`中声明的数据就相当于 **发布者** ，页面上使用该数据的就相当于 **订阅者**，一旦数据发生改变，页面渲染的也会发生改变。这不就是明显的 **发布-订阅模式** 吗？

查询资料发现：**Vue数据双向绑定原理**是通过**数据劫持结合发布者-订阅者模式**的方式来实现的，首先是对数据进行监听，然后当监听的属性发生变化时则告诉订阅者是否要更新，若更新就会执行对应的更新函数从而更新视图。

```ts
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data
 
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)  // 对数组调用observeArray()函数
    } else {
      this.walk(value)  // 对对象调用walk()函数
    }
  }
}
```

```ts
// 对数组中的每个元素调用observe方法。
observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i])
    }
}
// 遍历所有实例属性，将之调用defineReactive方法。
walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i])
    }
}
```
