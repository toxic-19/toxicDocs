## 1. 数组扁平化

1. `Infinity` 无穷 ；`flat()` 默认展开一层
2. 字符串通过正则：`replace(/\[]\]/g)` 全局格式 `\\g`
3. 递归 将每个元素 `push` 到新的数组中
4. `reduce(pre, cur, initValue)`  配合递归

```js
let newArr = []
function alip(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) alip(item)
    else newArr.push(item)
  }
}

alip([1, 2, [3, 4, [5, 6], 10], 11])
```

```js
const arr = [1, 2, [3, 4, [5, 6], 10], 11]
function clip(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? clip(cur) : cur)
  }, [])
}
clip(arr)
```

## 2. 拷贝

1. 浅拷贝基本数据类型是复制值；引用数据类型时是拷贝引用地址。
2. 栈存放基本数据类型以及引用数据类型的指针。堆存放引用数据类型的真实数据。
3. bigint - ES11新增

### 浅拷贝

```js
// 浅拷贝
const obj = {
  name: "张三",
  age: 8,
  pal: ["王五", "王六", "王七"], // 赋值引用类型的指针
}
function shallowCopy(object) {
  const shallowObj = {}
  for (const key in object) {
    shallowObj[key] = object[key]
  }
  return shallowObj
}
const shallow = shallowCopy(obj)
shallow.pal.push("19")
console.log(obj) // { name: '张三', age: 8, pal: [ '王五', '王六', '王七', '19' ] }
```

### 深拷贝

使用不同的方式配合递归将引用数据类型进行深刻复制

```js
const obj = {
  // 原数据，包含字符串、对象、函数、数组等不同的类型
  name: "test",
  main: { a: 1, b: 2 },
  fn: function () {},
  friends: [1, 2, 3, [22, 33]]
}
function deepCopy(target) {
  if (typeof target === "object") { // 判断数组还是对象
    const newTarget = Array.isArray(target) ? [] : Object.create(null)
    for (const key in target) { // 遍历
      newTarget[key] = deepCopy(target[key]) // 递归
    }
    return newTarget
  } else {
    return target
  }
}
```

## 3. 防抖节流

### 防抖

> 短时间内大量触发同一事件；
>
> 只在最后一次事件触发后延迟执行一次函数。

采取方式：在事件触发后设置定时器，再次触发则重置定时器。

```js
/**
 * 防抖
 * @param {*} fn 定时器到时的回调函数
 * @param {*} delay 延时的秒数
 */
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer) // 清除定时器
    timer = setTimeout(() => {
      timer = null // 重置定时器
      fn.apply(this, args)
    }, (delay + "") | 0 || 1000 / 60)
  }
}
function fn() {
  console.log("执行函数")
}
const debounce1 = debounce(fn, 100)

debounce1(1)
debounce1(1)
debounce1(1)
```





### 节流



## 4. 布局

### 两栏布局

一般是左侧固定，右侧自适应

1. 浮动

左侧固定宽度，使用浮动  `float: left` ；右侧使用  `margin-left` 撑出内容块做展示。

2. `flex`

父容器采取 `flex` 布局；左侧固定宽度，右侧使用 `flex: 1` 自适应

### 三栏布局

一般是左右两侧固定，中间自适应

1. 浮动 + `margin`

```html
<div class = "left"></div>
<div class = "right"></div>
<div class = "middle"></div>
```

左侧使用 `float: left`  右侧使用 `float: right ` 需要把 `middle` 放在最后，不然 `right` 就第二层了。

```css
.left {
  float: left;
  width: 200px;
  background-color: red;
}
.right {
  float: right;
  width: 200px;
  background-color: yellow;
}
.middle {
  margin-left: 200px;
  margin-right: 200px;
}
```

2. 绝对定位

使用绝对定位将左右两边固定，中间占满使用 `margin`

3. 浮动 + 负`margin`  更加复杂

需要给中间使用双层标签，左右两边都使用负 `margin` 向上偏移

4. `flex`  或者  `grid`

## 5. 省略号

1. 使用伪元素

```css
.text {
  position: relative;
}
.text::after {
  content: "..."; /* 省略号是放在文本最后面的 */
  width: 1em;    /* 设置伪元素的宽度为1em，是为了遮盖的时候正好遮盖中原来的一个字的大小*/
  position: absolute;
  right: 0;
  bottom: 0;
}
```

2. 使用旧版弹性盒子

```css
.text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

3. 单行文字省略

```css
.text {
  overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
```

## 6. 函数柯里化

> 将多个参数的函数 转换为 接收单个参数的函数链式调用 的技术。

```js
// 先看实现的效果
const add = (a, b, c) => a + b + c
const newFn = curry(fn)
newFn(1, 2, 3) // 调用的都是curried函数
newFn(1, 2)(3)
```

``` js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // length 是JS函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
      // 形参的数量不包括剩余参数个数，仅包括 “第一个具有默认值之前的参数个数”
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]) // 同args.concat(args2)
      }
    }
  }
}
```

作用：函数复用 和 延迟执行。

## 7. 手写 `new`

1. 构造函数作为参数第一项
2. 构造函数的 `prototype` 原型对象指向实例对象。
3. 更改 构造函数执行时的 `this` 指向，并获取执行结果。

```js
function _new(...args) {
  const Constructor = args[0]
  const obj = Object.create(Constructor.prototype)
  const result = Constructor.apply(obj, args.slice(1))
  return result instanceOf object ? result : obj
}
function Person(name, age) {
  this.name = name
  this.age = age
  return () => {}
}

console.log(_new(Person, "jack", 18))  // [Function (anonymous)]
console.log(new Person("mary", 20))    // [Function (anonymous)]
```

## 8. 手写 `call`

前提：

1. `call` 是由函数来调用的：`Fn.call(obj, a, b)` 。
2. 调用 `call` 需要**立即执行** `Fn(a, b)` 然后将 `this` 指向到 `obj` 。

```js
Function.prototype.myCall = function (context, ...argsArray) {
  context = context || window // 上下文如果是undefined的话就默认全局执行上下文
  context.fn = this // 定义fn属性 值为函数add
  const res = context.fn(...argsArray) // 调用add函数。因为是context调用的，所以this指向context
  delete context.fn
  return res // 需要立即执行函数并返回执行值
}
function add (a, b) {
  console.log(this) // { name: 'lucky', fn: [Function: add] }
  return a + b
}
const obj = { name: 'lucky' }
add.myCall(obj, 1, 2)
```

**重点：**

1. **传递的是参数列表**
2. **立即执行函数**
2. **只是临时改变this指向**

只需要让对象执行该函数，就可以改变this值给这个对象了。



### 手写apply

调用方式：Fn.apply( obj, [1, 2, 3] )

**同样需要立即执行函数和临时改变指向** 与 call 只是传递参数的不同

```js
Function.prorotype.myApply = (context, argsArray) => {
  context = context || window
  let fn = Symbol() // 唯一的值
  context[fn] = this
  const res = context[fn](...argsArray) // 传递参数当然是一个一个的
  delete context[fn]
  return res
}
```

:red_circle: 只是临时改变this指向一次。第二次调用该函数的时候，this就指向全局了。



### 手写bind

:japanese_ogre: 比较**特别**

1. 传递参数列表和 call 一样
2. **改变this指向后不会立刻执行函数**
3. **返回一个永久改变this指向的函数。**

**配合柯里化， 分别传入参数**

```js
Function.prototype.myBind = function (context, ...argsArray) {
  // 可能argsArray只是部分参数
  const fn = this
  return function Fn() {
    // 可能会传递剩余参数
    const allArgs = [...arguments, ...argsArray]
    return fn.apply(context, allArgs)
  }
}

function add(a, b) {
  console.log(this, a + b)
  return a + b
}
const obj = { name: "callLucky" }
const bound = add.myBind(obj, 4)
bound(2)
```



## 9. 实现`AJAX`请求

```js
const ajaxRequest = (url, method = "GET", data = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHTTPRequest()
    xhr.open(method, url)
    // 监听readyState的改变
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status === 200) resolve(xhr.responseText)
      else reject(new Error(xhr.statusText))
    }
    xhr.onerror = () => {
      reject(new Error(xhr.statusText))
    }
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(data)
  })
}
```

:question: 注意：在node环境中是没有 XMLHTTPRequest 构造函数的。直接使用会导致 `XMLHTTPRequest is not defined` 错误。

:heavy_exclamation_mark: 需要下载依赖 `xmlhttprequest`

```js
// 声明后才可以使用
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
```



## 10. 迭代器

前提：对象无法使用 for...of 来进行迭代。原因是 for...of 只适用有迭代器的 数组 类数组 Map Set 等可迭代对象的。

原理：JS引擎是通过对象是否拥有属性 Symbol.iterator 来判断的。

```js
[][Symbol.iterator] // [Function: values]
{}[Symbol.iterator] // Undefined 对象中没有该属性
```

迭代器是返回`next()`方法的对象。每次调用next方法都会返回一个类似 `{ value: xx, done: false }`的对象。

```js
let person = {
  name: "jack",
  technology: ["css", "js", "html", "vue"]
}
// 直接使用for...of会报错：person is not iterable
// 给person对象新增一个属性[Symbol.iterator]
person[Symbol.iterator] = () => {
  const keys = Object.keys(person) // [name, technology]
  let i = 0 // 存放调用next的次数变量 0 1
  const length = keys.length // i为2的时候就没有值了 2
  return i < length ? {
    value: person[keys[i++]],
    done: false
  } : { value: undefined, done: true }
}
```



**可以使用生成器**：yield用来控制每次调用时返回的值。

yield语句在生成一个值后会暂停函数的执行状态，以便在下一次请求值时继续执行。

```js
person[Symbol.iterator] = function* () {
  let arr = Object.entries(person)
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
```

**原理：**这个生成器对象具有一个特殊的 `__next__()` 方法，用于请求生成器的下一个值。直到遇到 `yield` 暂停。



## 11. 数组去重
