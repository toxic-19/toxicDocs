---
title: 【源码共读33】arrify转数组
date: 2023-8-2
categories:
 - 源码
sidebar: 'auto'
---

- **本文参加了由**[公众号@若川视野](https://link.juejin.cn?target=https%3A%2F%2Flxchuan12.gitee.io) **发起的每周源码共读活动，** [点击了解详情一起参与。](https://juejin.cn/post/7079706017579139102)
- **这是源码共读的第33期，链接：**【[arrify转数组](https://juejin.cn/post/7100218384918249503)】

## 1. 源码准备
 **源码：**[GitHub - sindresorhus/arrify: Convert a value to an array](https://github.com/sindresorhus/arrify)

1. 从github中clone下来的目录：执行`npm install` 下载所需的包

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1668843290401-19ce2263-e73d-479c-87c6-327d609bbbc6.png#averageHue=%23f4f3f0&clientId=ue431912e-a92a-4&from=paste&height=242&id=uefb6c9f8&originHeight=484&originWidth=436&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30947&status=done&style=none&taskId=u1d50b5c8-4ce9-4de5-bde3-b7073c40bb7&title=&width=217.8000030517578)![npm install](https://cdn.nlark.com/yuque/0/2022/png/32615238/1668843853508-e0583d24-ee92-406d-84a1-50e19cead6b3.png#averageHue=%23faf9f7&clientId=u013f2a4b-8282-4&from=paste&height=126&id=uc0fd2faf&originHeight=242&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=true&size=60035&status=done&style=none&taskId=u25cfeaba-a9bb-4bf0-bb69-9909a2fa0dd&title=npm%20install&width=514.4000244140625 "npm install")

---

2. 主文件 index.js :
```javascript
export default function arrify(value) {

  // 基本类型 null undefined String 
	if (value === null || value === undefined) {
		return [];
	}
  
  if (typeof value === 'string') {
		return [value];
	}
  // 对象类型
	if (Array.isArray(value)) {
		return value;
	}

	if (typeof value[Symbol.iterator] === 'function') {
		return [...value];
	}

	return [value];
}
```

- 对基本数据类型『值类型』：`null undefined string`都是直接转为数组，加上`[]`;
- 对对象类型『引用类型』：
   - `Array` 判断直接返回 
   - `**Function**`**使用迭代器判断是否是function？返回解构？**

---

3. 运行测试test
- 测试类 arrify.js 中要导入`arrify.js`包；所以对该文件夹进行初始化，以便可以进行node运行；
- 执行 `npm init`，再次`npm install`下载该包就会出现 node_modules文件夹啦

![npm init](https://cdn.nlark.com/yuque/0/2022/png/32615238/1668844125976-35a63a54-8395-4806-8026-23925b70eaea.png#averageHue=%23022658&clientId=u013f2a4b-8282-4&from=paste&height=280&id=u6839c1b7&originHeight=857&originWidth=1211&originalType=binary&ratio=1&rotation=0&showTitle=true&size=110293&status=done&style=none&taskId=ueef46712-72bb-4cfd-99d1-da0df675907&title=npm%20init&width=395.4000244140625 "npm init")

- 运行 arrify.js 测试时，出现错误：
```shell
(node:12920) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
D:\WebstormProjects\sourceCode\test\arrify.js:1                                          
import arrify from "arrify";                                                             
^^^^^^ 
```

- 根据报错：在`package.json`中 添加：`"type": "module"`
- 原因：为了加载ES模块，需要设置type或者使用.mjs扩展
## 2. Symbol.iterator：函数类型的属性
### 2.1 学习iterator迭代器

1. ES6引进的一种新的遍历方式；
2. 迭代器是一个统一的接口，作用是使各种数据结构可被便携访问；通过`Symbol.iterator`方法实现
3. **内置可迭代对象：Array  String  Map  Set  argument   Typed Array   Generators**『生成器』，意味着这些可迭代对象拥有这个属性
```shell
Symbol(Symbol.iterator): ƒ values()
length: 0
name: "values"
arguments: [异常:TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:3:28)]
caller: [异常:TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:3:28)]
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[0]
```
 ![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1669533262101-f5559575-657a-41c3-9813-f8cf44039c91.png#averageHue=%23f9f8f8&clientId=uf23bab03-752b-4&from=paste&height=617&id=u7fd16899&originHeight=771&originWidth=454&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59661&status=done&style=none&taskId=uc10d9991-a321-4aaa-9b01-60472844256&title=&width=363.2)

4. **操作迭代器：数组解构操作符 **`**for...of**`** **`**Array.from**`** **`**spread**``**Map.set**`** **`**Promise.all**`** **`**Promise.race**`** **`**yield**`
```javascript
let range = {
    from: 1,
    to: 5
}

// 1. 将range对象变为iterator迭代器：给对象加上一个属性【Symbol.iterator方法】;
range[Symbol.iterator] = function () {
    // 2. 返回迭代器对象
    return {
        nowValue: this.from,
        last: this.to, 

      // 3. next() 方法返回的结果的格式必须是 {done: Boolean, value: any}，
      // 当 done=true 时，表示循环结束，否则 value 是下一个值。
        next() {
            if (this.nowValue <= this.last) {
                return {done: false, value: this.nowValue++};
            } else {
                return {done: true}; // 循环遍历结束
            }
        }
    }
}
// 4. for of 不能对一个对象直接使用运行：出错原因：range is not iterator
for (const rangeElement of range) {
    console.log(rangeElement)
}
console.log(range)  // { from: 1, to: 5, [Symbol(Symbol.iterator)]: [Function (anonymous)] }

```


5. 当` for...of `循环希望取得下一个数值，它就调用这个对象的`next()`方法。  
#### Array

1. **array** 数组通过 `array[Symbol.iterator]()`创建迭代器；是内置迭代对象；
2. 迭代器有属性 `Symbol.iterator` 该属性是函数类型的；调用该属性 返回一个对象；对象中有`next()`函数；调用该`next()`函数输出各项

![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1669534456664-62abeb34-f59a-4f33-bac9-2d7dd5961951.png#averageHue=%23f9f9f9&clientId=uf23bab03-752b-4&from=paste&height=158&id=ub8aae76f&originHeight=197&originWidth=440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17244&status=done&style=none&taskId=u48924ced-0415-4408-a0fb-134e2c4e3f7&title=&width=352)

3. 通过`next()`方法向下迭代指向下一个位置
```javascript
const items = ["zero","one","two"]
const it = items[Symbol.iterator]();   //返回 Object [Array Iterator] {}
for (let i = 0; i <= items.length; i++) {
    console.log(it.next())
    // { value: 'zero', done: false }
    // { value: 'one', done: false }
    // { value: 'two', done: false }
    // { value: undefined, done: true }
}
// 可迭代对象可以直接使用for..of操作符
for (const item of items) {
    console.log(item)  // zero one two
}
```

3. 发现 **Object **对象是不允许通过这种方式创建一个迭代器的。因为Object是不可迭代对象。
#### String
```javascript
let str = "stringTest"
const it1 = str[Symbol.iterator]();  //返回 Object [String Iterator] {}
for (const strElement of str) {
    console.log(strElement)  // s t r i n g T e s t
}
// 也可以使用 it1.next() 会输出：{ value: 's', done: false }形式的对象
```
#### Map
```javascript
const map = new Map();
map.set(0,"1");
map.set(1,"2");
// map: Map(2) { 0 => '1', 1 => '2' }
// 取值：map.get(key)
// 直接使用操作符
for (const mapElement of map) {
    console.log(mapElement)
    // [ 0, '1' ]
    // [ 1, '2' ]
}
// 使用迭代器
const it = map[Symbol.iterator]()
console.log(it.next()) // { value: [ 0, '1' ], done: false }
```
#### Set
```javascript
const set = new Set();
set.add("red")
set.add("green")
set.add("blue")
for (const setElement of set) {
    console.log(setElement)  // red green blue
}
const it = set[Symbol.iterator]();
console.log(it.next())  // { value: 'red', done: false }
```
#### argument
参考 

1. `argument` 是一个对应于 传递给函数的参数的 **类数组对象：有长度有索引从0开始；没有Array的内置方法；**
```javascript
// argument:是一个对应于 传递给函数的参数的 类数组对象
function arguText(a,b,c){
  console.log(arguments)
}
arguText(1,2,3)
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1669535099839-b6c7a9bb-11c9-41b0-8309-055465feecfd.png#averageHue=%23fbfbfb&clientId=uf23bab03-752b-4&from=paste&height=110&id=uaaede75c&originHeight=137&originWidth=615&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13755&status=done&style=none&taskId=ub06f1e02-6504-43ba-9072-706031ab988&title=&width=492)
```javascript
let array;
function arguText(a,b,c){
  console.log(arguments)  // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  // 对arguments的操作只在此函数内
  array = arguments;
}
arguText(1,2,3)
console.log(array[0])
```

2. `arguments` 属性只在非箭头 函数内部被使用的局部变量；除非赋值给全局变量就可以在函数外部被使用
3. 可以转换为一个真正的`Array`：（1）`**Array.from()**`** **（2）扩展运算符`**...**`
```javascript
function test(a){
  let args = Array.from(arguments);
  let args = [...arguments];   // 扩展运算符将arguments类数组中的所有项都解构出来
  // 再使用[]转化为数组
}
test(1)
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1669536992914-81549fa2-8027-4e2a-8007-a9b350165a15.png#averageHue=%23fcfcfc&clientId=uf23bab03-752b-4&from=paste&height=74&id=u497461c1&originHeight=93&originWidth=262&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3464&status=done&style=none&taskId=udd12981f-e2e0-4550-b3b1-4a198def423&title=&width=209.6)![image.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1669537154176-a9fd87e9-78d5-4f77-8d78-d633258925c9.png#averageHue=%23fbfbfb&clientId=uf23bab03-752b-4&from=paste&height=78&id=u3fc903c7&originHeight=97&originWidth=224&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3529&status=done&style=none&taskId=uc8e8fe86-0948-4e8a-9a3f-c50d1980013&title=&width=179.2)

4. 示例：
```javascript
// 遍历参数求和
function add(){
    // 参数类数组的长度
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    console.log(sum)
}
// add();
add(1,2,3)
```
```javascript
// 定义连接字符串的函数
function myConcat(separator){
  let args = Array.prototype.slice.call(arguments,1);
  console.log(args.join(separator));
}
myConcat(",","r","e","d")
```
#### 不详细展示：
其余的可迭代对象
### 2.2 展开运算符『...』

1. ES6语法糖展开运算符 `...`也是服务于可迭代对象；只可以展开`Array String Map Set`以及自定义可迭代对象。** 展开运算符**`**...**`**可以便捷地将可迭代对象转换为数组。**
```javascript
// string
console.log(..."hello")  // h e l l o
// Array
console.log(...[1,2,3])  // 1 2 3

// map
console.log(...new Map().set(0,"1").set(1,"2"))  
// Map(2) { 0 => '1', 1 => '2' }  =====>>>>>>   [ 0, '1' ] [ 1, '2' ]

// set
console.log(...new Set().add("1").add("2").add("3"))  
// Set(3) { '1', '2', '3' } ====>>>> 1 2 3
```
