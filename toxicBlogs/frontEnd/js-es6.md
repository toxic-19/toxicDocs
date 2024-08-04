---
title: es6
date: 2022-02-17
categories:
 - JavaScript
sidebar: 'auto'
---

## 1.  `var|let|const`

**链接 [web前端面试——ES6](https://vue3js.cn/interview/es6/var_let_const.html#%E4%B8%80%E3%80%81var)**

### 1.1 var 

+ 在ES5中，顶层对象的数据和全局变量是等价的。var声明的就是全局变量。

```js
var a = 10; // 相当于：
window.a = 10;
```

+ 使用`var`声明变量存在变量提升的情况。

```js
console.log(a);     // undefined
var a = 10;
```

> 本来这种情况属于使用了一个没有定义的变量。应该是`报错ReferenceError`。但是却是undefined。
>
> 是因为变量提升变为：**使用-->声明-->赋值**   变为了   **声明-->使用-->赋值**

```js
// 编译阶段
var a;
console.log(a);   // 这里是声明但没有赋值
a = 10;               
```

+ var可以重复声明同一个变量。后者覆盖前者。
+ 函数内部使用`var`即为局部变量。如果没有使用`var`就是全局变量。

### 1.2 let

**ES6新增的命令；用来声明变量。只在let命令所在的代码块内有效**

+ 不存在变量提升；不允许在  <u>相同作用域</u>  中重复声明；

:question: 使用`let`声明变量前，该变量都不可用，也就是大家常说的“暂时性死区”

### 1.3 const

**`const` 声明一个只读的变量，一旦声明，常量的值就不能改变**

报错信息：`TypeError: Assignment to constant variable.`

+ `const` 一旦声明变了，就必须立即初始化，不能留到以后赋值。
+ `const ` 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

```js
// 如果声明的是常量。值就保存在变量指向的那个内存地址。
const a = 10;
a = 20;               // 就会报错。

// 如果声明的是复杂类型的数据。变量指向的不过是一个指针。指针再指向实际数据。
const obj = {};
obj.name = "mary";
obj.age = 18;        // 这种情况是可以成功的。指向的指针是不变的，不管里面存了什么。
obj = {};            // 如果将obj指向其他对象，那就会报错。

```

+ 其他情况与`let`相同

### 1.4 区别

`var`、`let`、`const`三者区别可以围绕下面五点展开：

1. 变量提升

2. 暂时性死区
3. 块级作用域
4. 重复声明
5. 修改声明的变量
6. 使用：能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`

|                       let                        |               const                |                           var                           |
| :----------------------------------------------: | :--------------------------------: | :-----------------------------------------------------: |
|  不存在变量提升，一定要在声明后使用，否则会报错  |              同`let`               | 存在 **变量提升** ，即可以在声明之前调用，值为undefined |
| 要等到声明变量的那一行代码出现，才可以获取和使用 |              同`let`               |                 不存在  **暂时性死区**                  |
|     存在，即只可以在相同作用域下获取和使用。     |              同`let`               |                 不存在  **块级作用域**                  |
|         在同一作用域下不允许重复声明变量         |              同`let`               |                    允许 **重复声明**                    |
|             允许 **修改声明的变量**              | 声明的是只读常量的话，就不能改变。 |                 允许 **修改声明的变量**                 |

## 2. 数组扩展

### 2.1 扩展运算符

`ES6`通过扩展元素符 `...`，好比 `rest` 参数的逆运算，将**一个数组**转为用逗号分隔的**参数序列**。

```js
console.log(...[1,2,3]) // 1 2 3
```

+ 可以直接用于函数调用；将某些数据结构转为数组；更简单地实现数组复制，数组的合并也更加简洁

```js
function add(x,y){
    return x+y;
}
add(...[2,2]);                      // 4
```

```js
const [...num] = [1,2];
console.log(num)                    // Array [ 1, 2 ]
```

```js
[...[1,2],...[3,4],...[5,6]]        // Array(6) [ 1, 2, 3, 4, 5, 6 ]
```

注意：通过扩展运算符实现的数组复制是浅拷贝。**修改了引用指向的值，会同步反映到新数组。**

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230217132847421.png" alt="image-20230217132847421" style="zoom:80%;" />

:small_red_triangle: 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

+ 当然也可以对字符串使用

```js
[..."hello"]    // Array(5) [ "h", "e", "l", "l", "o" ]
```

+ 定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。

### 2.2 构造函数新增方法

#### `Array.from()`

+ 将类数组对象和可遍历对象【包括Set和Map】转换为真正的数组。

```js
// 类数组对象
Array.from({
  0: 'a',
  1: 'b',
  length: 2
})                  // Array [ "a", "b" ]

// 还可以接受第二个参数,用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from({
  0: 'a',
  1: 'b',
  length: 2
},x => x + '0')     // Array [ "a0", "b0" ]
```

#### `Array.of()`  | `Array()`

+ 用于将一组值转换为数组。

```js
Array(1,2,3)        // Array(3) [ 1, 2, 3 ]
Array.of(1,2,3)     // Array(3) [ 1, 2, 3 ]
```

+ 参数：没有值就返回空数组。参数只有一个就是指定数组长度。

```js
Array();            // Array []
Array(3);           // Array(3) [ <3 empty slots> ]
Array(1,3,5);       // Array(3) [ 1, 3, 5 ]
```

### 2.3 实例对象新增方法

#### `copyWithin()`

+ 参数

|        target        |          start          |             end              |
| :------------------: | :---------------------: | :--------------------------: |
|         必需         |          可选           |             可选             |
| 从该位置开始替换数据 |  从该位置开始读取数据   |    到该位置前停止读取数据    |
|     负值表示倒数     | 默认是0，负值从末尾开始 | 默认数组长度，负值从末尾开始 |

```js
[1,2,3,4,5].copyWithin(0, 3)   // Array(5) [ 4, 5, 3, 4, 5 ]
// 从索引0开始替换数据。读取索引3到最后的数据[4,5]。替换到索引为0的位置，长度一致。

[1,2,3,4,5].copyWithin(0, 3, 4)   // Array(5) [ 4, 2, 3, 4, 5 ]
// 从3读取到4，不包括4 即[4]
```

#### `find()` | `findIndex()`

+ `find()`：用于找出**第一个符合条件**的数组成员。返回的是value值。
+ `findIndex()`：返回**第一个符合条件**的数据成员的位置。返回的是index值。

```js
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
})                                                   // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
})                                                   // 2 
```

可以接受第二个参数，用来绑定回调函数的`this`对象。

#### `fill()`

+ 使用给定值【即第一个参数】来填充一个数组【无论是不是空的】

```js
Array(3).fill(0)          // Array(3) [ 0, 0, 0 ]
["1","a",3].fill(9)       // Array(3) [ 9, 9, 9 ]
```

+ 参数：第二个和第三个：用于指定填充的起始位置和结束位置

```js
["1","a",3].fill(9,1,2)   // Array(3) [ "1", 9, 3 ]
```

同样是结束位置前。就是不包括结束位置的元素。

#### `entries()` | `keys()` | `values()`

分别是对键值对的遍历，对键名的遍历，对键值的遍历。函数返回值都是一个迭代器对象`Array Iterator {  }`。

```js
for(let elem of ["a",1].keys()){
  console.log(elem)                   // 0 1
}
for(let elem of ["a",1].values()){
  console.log(elem)                   // "a" 1
}
for(let elem of ["a",1].entries()){
  console.log(elem)                   // Array [ 0, "a" ]      Array [ 1, 1 ]
}
```

#### `includes`

用于判断数组是否包含给定的值，返回true or false.

+ 第二个参数可以表示搜索的起始位置，默认是0

```js
[1,2].includes(1,1)  // fasle
[1,2].includes(1)    // true
```

#### `flat()` | `flatMap()`

将数组扁平化处理，返回一个新数组，对原数组没有影响。

比如一些多层嵌套的数组：`[1,2,[3,4]]` 这就有两层。

+ `flat() `默认拉平一层。有参数表示拉平的层数，默认是1

```js
[1,2,[3,4]].flat()             // Array(4) [ 1, 2, 3, 4 ]
[1,2,[3,["q","p"],4]].flat()   // Array(5) [ 1, 2, 3, (2) […], 4 ]
                               // 3: Array [ "q", "p" ]
[1,2,[3,["q","p"],4]].flat(2)  // Array(6) [ 1, 2, 3, "q", "p", 4 ]
```

+ `flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组.

```js
[2, 3, 4].flatMap((x) => [x, x * 2])         // 相当于对每一项都做了映射 加上一个 X*2
// Array(6) [ 2, 4, 3, 6, 4, 8 ]
```

+ `flatMap()`还可以有第二个参数，用来绑定遍历函数的`this`。

### 2.4 数组的空位

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为`undefined`，包括`Array.from`、扩展运算符、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

### 2.5 排序稳定性

将`sort()`默认设置为稳定的排序算法。



## 3. 对象扩展

### 3.1 属性

#### 1. 简写

+ 当对象键名与值相等时，可以进行简写。

```js
components:{
    Header: Header
}
// 等同：
components:{
    Header
}
```

+ 方法名也是

```js
getUserInfo: function(){
    
}
// 等同于
getUserInfo(){
    
}
```

:no_bell: 简写的对象方法不能用作构造函数。会导致报错。

#### 2. 属性名表达式

+ 允许字面量定义对象时，将表达式放在括号内

```js
const a = {
  'name': 'jack',
  [1 + 1]: 'age'
}
a[2]  // age
```

+ 定义方法名

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

> 如果属性名表达式是一个对象。默认会自动将对象转换为字符串 `[object Object]`

#### 3. 属性遍历

1. `for...in` 遍历对象自身和继承的可枚举属性。
2. `Object.keys(obj)`：返回一个包括键名的数组。
3. `Object.getOwnPropertyNames(obj)`：同上。
4. `Object.getOwnPropertySymbols(obj)`：有包括Symbol属性的键名。
5. `Reflect.ownKeys(obj)`：全部返回。不管是否可枚举，不管Symbol等等。

```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// 有包括Symbol
// Array(5) [ "2", "10", "b", "a", Symbol() ]
// 1. 遍历之后按照数值升序排列
// 2. 之后是字符串键，按照加入时间升序排列
// 3. 之后是Symbol键，按照加入时间升序排列
```



### 3.2 `super`关键字

:bulb:前情：`this` 关键字总是指向函数所在的当前对象。

:punch:ES6又新增关键字 `super`：指向当前对象的原型对象。

![image-20230228203513658](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230228203513658.png)

### 3.3 扩展运算符

在解构赋值中：未被读取的可遍历的属性，分配到指定的对象上面

```js
let {x,y,...z} = {x:1,y:2,a:1,b:2,c:3}
console.log(z)  // Object { a: 1, b: 2, c: 3 }
```

:punch: 解构赋值是浅拷贝。会更改原对象的属性值。

```js
obj = {
  a:{
    b:1
  }
};
let {...params} = obj;   // 此时params是浅拷贝了obj,对params的值进行更改也会导致obj发生更改。
```

> 对象的扩展运算符等同于使用`Object.assign()`



### 3.4 对象新增方法

1. `Object.is()`：严格判断两个值是否相等。同 `===`  

   例外：` +0 ≠ -0`  `NaN等于本身`

   ```js
   +0 === -0          // true
   NaN === NaN        // false
   Object.is(+0,-0)   // false
   Object.is(NaN,NaN) // true
   ```

   

2. `Object.assign(target,source1...sourceN)`：将源对象的所有可枚举属性复制到`target`

   只有第一个参数是目标对象，后面的参数都是源对象。

   :punch: 是浅拷贝。遇到同名属性会进行替换。

   ```js
   let target = {a:1};
   Object.assign(target,{a:1,b:1},{b:1,c:1})
   console.log(target)
   // Object { a: 1, b: 1, c: 1 }
   // 1. b属性被替换。
   ```

   

3. `Object.getOwnPropertyDescriptors(obj)`：返回指定对象所有自身属性的描述对象。

![image-20230228210728908](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230228210728908.png)



4. `Object.setPrototypeOf(obj,proto)`：用来设置一个对象的原型对象

5. `Object.getPrototypeOf()` ：用来读取一个对象的原型对象。

6. `Object.keys()`  `Object.values()` `Object.entries()`

7. `Object.fromEntries()`：用于将一个键值对数组转为对象

   ```js
   Object.fromEntries([
     ['foo', 'bar'],
     ['baz', 42]
   ])
   // { foo: "bar", baz: 42 }
   ```

   

## 4. 函数扩展

### 4.1 参数

+ 允许为函数的参数设置  ”默认值“ 。形参是默认声明的。

```js
// 默认值
function fn(x, y = 'hello'){ console.log(x,y) }
// 如果在使用fn函数时，没有给y赋值，那就是默认值。如果赋值就是覆盖默认值。
```

+ 不需要为形参再次声明。

+ ？？参数默认值可以与解构赋值的默认值结合起来使用。

  ![image-20230302133709391](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230302133709391.png)

### 4.2 属性

#### length

> 属于函数的length属性。返回没有指定默认值的参数个数。
>
> 用法：`(function(a){}).length       // 1`
>
> `(function(a = 5){}).length       // 0`  

注意：

1. rest参数不会计入length属性。`...args`

2. 如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

   `(function (a = 0, b, c) {}).length // 0`

#### name

> 返回该函数的函数名

### 4.3 作用域

[2. 作用域](./js-mqyqingfeng.md)

### 4.4 严格模式

:small_red_triangle: 严格模式不支持 函数参数使用默认值，解构赋值，扩展运算符。

### 4.5 箭头函数

> 使用 `=>` 定义函数
>
> 等同于 `function(){}`

注意：

1. 不需要参数或需要多个，就使用`()`，只有一个参数就可以省略`()`

   ```js
   let fn = () => {};     // 不需要参数
   fn = (num1,num2) => num1 + num2;  // 相当于return
   ```

2. 如果箭头函数的代码块多于一条语句，就要使用大括号。并使用return。

   如果只有一条，可以直接返回不使用return。

3. 如果返回对象，需要加`()`

   ```js
   let getTempItem = id => ({ id: id, name: "Temp" });
   ```

:small_red_triangle: 重点：

箭头函数中的this指向：就是定义时所在的对象，而不是使用时所在的随心。


> 1. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
>
> 2. 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
>
> 3. 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数



## 5. `Set|Map`

:punch: `Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

:punch: 概念：

1. 集合  是由一堆**无序**的、**相关联**的，且**不重复**的内存结构【数学中称为元素】组成的组合。
2. 字典
    是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同。【key，value】

:punch: 区别：

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

### 5.1 Set

ES6新增数据结构。类似数组，没有重复值。称为集合。

`const set = new Set();`

**基本方法：**

+ `add()` : 不会处理重复的元素
+ `delete()`：返回`boolean`值
+ `has()`：判断是否为`set`的成员
+ `clear()`：清空全部，没有返回值。

**遍历方法：**

+ `keys()`
+ `values()`
+ `entries()`：返回键值对
+ `forEach()`

> 除了`forEach()` 其余返回的都是迭代器。可以使用`for ... of ` 

**扩展运算符的使用**

1. 给字符串或数组去重

```js
// 数组
[...new Set([3,3,4,4,5,2])] // Array(4) [ 3, 4, 5, 2 ]
// 字符串
new Set("352255")  // Set(3) [ "3", "5", "2" ];要将set转为字符串
[...new Set("352255")] // Array(3) [ "3", "5", "2" ]
[...new Set("352255")].join("")        // '352'
```

2. 实现集合运算

   **[JS数据结构基础](../algorithm/js-structure.md)**：在学到Set的时候有提到。

### 5.2 Map

`Map`类型是键值对的有序列表。

`const map = new Map();`

**基本方法：**

+ `size`属性：返回结构的成员总数。

+ `set()`：设置key，value；`map.set('name','kerwin')`

  注意：Map的键可以是字符串，数组，undefined等等。

  另外还支持链式操作。因为`set()`返回当前的`Map`对象。

  `map.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作。`

+ `get()`：读取`key`对应的`value`值。

+ `has()`：表示某个键是否在当前Map对象中。

+ `delete()`：删除某个键。

+ `clear()`：清空所有成员。

**遍历：**

+ 同`Set`的遍历方法。

### 5.3 `WeakSet WeakMap`

1.  在`API`中`WeakSet`与`Set`有两个区别：

   - 没有遍历操作的`API`
   - 没有`size`属性
   - **成员只能是引用类型，而不能是其他类型的值。**


:x: `let weakSet = new WeakSet([2,3])`

:heavy_check_mark: `let arr = [2,3]; let weakset = new WeakSet(arr)`

2. 在`API`中`WeakMap`与`Map`有两个区别：
   - 没有遍历操作的`API`
   - 没有`clear`清空方法
   - **只接受对象作为键名，不接受其他类型，null也不行。Map的键是什么都可以。**



## 6. `promise`