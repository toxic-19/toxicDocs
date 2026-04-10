---
title: JavaScript深入系列
date: 2022-2-8
tags:
 - JavaScript
categories:
 - 前端
sidebar: 'auto'
---

## 1. 原型到原型链

### 1.1 注意点：

1. 函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例**的原型。

2. 原型没有属性指向实例，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

3. ```js
   // 顺便学习一个ES5的方法,可以获得对象的原型
   console.log(Object.getPrototypeOf(person) === Person.prototype) // true
   ```

4. `__proto__` 的值可以是对象，也可以是 `null`。而其他的类型都会被忽略。`__proto__` 是 `[[Prototype]]` 的因历史原因而留下来的 `getter/setter` 。现代编程语言建议我们应该使用函数 **`Object.getPrototypeOf/Object.setPrototypeOf`** 来取代 `__proto__` 去 get/set 原型。

5. `this` 根本不受原型的影响。

   **无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，`this` 始终是点符号 `.` 前面的对象。**

6. `for..in` 循环也会迭代继承的属性。排除继承的属性：内建方法 [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)：如果 `obj` 具有自己的（非继承的）名为 `key` 的属性，则返回 `true`。

   ```js
   for(let prop in obj) {
     let isOwn = rabbit.hasOwnProperty(prop);
   
     if (isOwn) {
       alert(`Our: ${prop}`); // Our: jumps
     } else {
       alert(`Inherited: ${prop}`); // Inherited: eats
     }
   }
   ```

    `for..in` 只会列出可枚举的属性。

### 1.2 原型图

![image-20230208230809499](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230208230809499.png)

Object.prototype就指向null了。红色线的就是原型链。函数的prototype属性指向原型，原型链通过__proto__链接起来。

所以 Object.prototype.__proto__ 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。所以查找属性的时候查到 Object.prototype 就可以停止查找了。

**每个对象上都有一个属性叫`__proto__`** **这个属性的值是一个对象**

## 2. 作用域

:bulb: 核心就是: **函数的作用域在函数定义的时候就决定了**

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
```

我认为的答案是2，但实际上是1。因为JavaScript采用的是静态作用域。

分析：执行 `bar` 函数里的 `foo` 函数，是输出value值，那么我们从foo函数内部的变量查找是否有value值，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。这就是静态作用域。

:bulb: 而引用《JavaScript权威指南》的回答就是：JavaScript 函数的执行用到了**作用域链**，**这个作用域链是在函数定义的时候创建的**。

## 3. 执行上下文

```js
// 定义函数方式
let foo = function(){
    // 变量提升
}

functuon foo(){
    // 函数提升
}
// JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。
```

:bulb: 遇到函数执行的时候，就会创建一个执行上下文。

:bulb:  JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文，程序结束之前ECStack 最底部永远有个 globalContext。

:bulb: **对于每个执行上下文，都有三个重要属性：**

- **变量对象(Variable object，VO)**
- **作用域链(Scope chain)**
- **this**

### 3.1. 变量对象

1. 可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。

 ![image-20230209121441130](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230209121441130.png)

2. 全局上下文中的变量对象就是全局对象

### 3.2 作用域链