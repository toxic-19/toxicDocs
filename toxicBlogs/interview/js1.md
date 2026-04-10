---
title: 原型和继承
date: 2023-08-12
tags:
 - JavaScript
categories:
 - 面试
sidebar: 'auto'
---

## 1. 概念

[现代JavaScript教程-原型-继承](https://zh.javascript.info/prototype-inheritance)

### 1.1. 原型


 ![对原型的理解](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/Screenshot_2023-08-13-09-54-07-196_com.quark.browser%5B1%5D.png)

> 1. 在JavaScript中是使⽤构造函数来新建⼀个对象的，每⼀个构造函数的内部都有⼀个 prototype 属性，它的属性值是⼀个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和⽅法。
> 2. 当使⽤构造函数新建⼀个对象后，在这个对象的内部将包含⼀个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。

### 1.2. 原型链

> 当访问⼀个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象⾥找这个属性，这个原型对象⼜会有⾃⼰的原型，于是就这样⼀直找下去，也就是原型链的概念。

### 1.3 特点

> JavaScript 对象是通过引⽤来传递的，创建的每个新对象实体中并没有⼀份属于⾃⼰的原型副本。**当修改原型时，与之相关的对象也会继承这⼀改变。**

## 2. 代码

### 2.1. 构造函数创建对象

```js
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
let p = new Person("jack", 18);
console.log(p); // Person { name: 'jack', age: 18 }
```

### 2.2. 指向同一个对象

```js
console.log(Object.getPrototypeOf(p)); // {} 此时原型对象还是空的
console.log(p.__proto__ === Person.prototype); // true
```

### 2.3 修改原型

```js
// 给原型添加方法; 属性
Person.prototype.getName = () => {
  return "原型对象上的方法";
};
Person.prototype.game = "刺激战场";
console.log(Object.getPrototypeOf(p)); // { getName: [Function (anonymous)], game: '刺激战场' }
console.log(p.__proto__ === Person.prototype); // true
console.log(p.getName()) // 原型对象上的方法
```

### 2.4 重写原型

```js
// 重写原型
Person.prototype = {
  getName: () => {
    return "原型对象上的属性";
  },
  game: "刺激战场",
};
console.log(Person.prototype, p.__proto__); // { getName: [Function: getName], game: '刺激战场' } {}
console.log(p.__proto__ === Person.prototype); // false

// 重新指向
p.__proto__ = p.constructor.prototype;
console.log(p.__proto__ === Person.prototype); // true
```

### 2.5 `for...in`循环key

```js
for (const key in p) {
  // for...in会一起打印出原型上的属性与方法
  console.log(key); // name age getName game
  if (p.hasOwnProperty(key)) {
    console.log("本身的属性和方法", key); // name age
  }
}
```

> 通过 `hasOwnProperty` 方法s可以判断是不是属于自己的属性，而不是原型上的
