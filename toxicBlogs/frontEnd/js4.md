---
title: 数据类型
date: 2022-12-8
tags:
 - JavaScript
categories:
 - 前端
sidebar: 'auto'
---
:punch: 目录：
![image-20230107145137429](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230107145137429.png)
:punch: 参考链接：从这里看起： [数据类型](https://zh.javascript.info/data-types) 

## 1. [原始类型的方法](https://zh.javascript.info/primitives-methods)

关于对象的最好的事儿之一是，我们可以**把一个函数作为对象的属性存储到对象**中。

### 1.1 “对象包装器”

:punch: **前提：**
1. 原始类型必须尽可能的简单轻量。
2. 使用方法来访问原始类型执行想进行的操作。

:punch: **定义：**

1. 原始类型只有值，为了能对原始类型进行操作；JavaScript为其封装了允许访问字符串，数字，布尔值和symbol的方法和属性。需要一个对象来调用。
2. “对象包装器”对于每种原始类型都是不同的，它们被称为 `String`、`Number`、`Boolean`、`Symbol` 和 `BigInt`。因此，它们提供了不同的方法。

:punch: **使用过程：**
1. 原始类型在访问其属性时，会创建一个包含字符串字面值的特殊对象，并且具有可用的方法。
2. 该方法运行返回操作结束的值。
3. 特殊对象被销毁，只留下原始值。

:raised_hand_with_fingers_splayed: 特殊原始类型：`null` `undefined` 没有任何方法。
:raised_hand_with_fingers_splayed: 原始类型不是对象；不能存储额外的数据。

> 从形式上讲，这些方法通过临时对象工作，但 **JavaScript 引擎可以很好地调整，以在内部对其进行优化，**因此调用它们并不需要太高的成本。



## 2. [数字类型](https://zh.javascript.info/number)

:raised_hand_with_fingers_splayed: 我们这里讨论`number`类型；不讨论`bigint`类型。常规整数不能安全地超过 `(253-1)` 或小于 `-(253-1)`。

### 2.1 编写数字

1. 使用下划线`_` 作为分隔符。扮演了语法糖的角色使得数字具有更强的可读性。

2. 通过在数字后面附加字母 `e` 并指定零的个数来缩短数字。

   ```js
   let billion = 1e9; // 1000000000
   // 可以表示为1*【1后加9个0】
   let mcs = 1e-6; //
   // 可以表示为1/【1后加6个0】
   // 小数点向左移动6位
   ```



### 2.2 进制

1. 十六进制：`0x+数字`
2. 八进制：`0o+数字`
3. 二进制：`0b+数字`



### 2.3 `toString(base)`

1. 方法 `num.toString(base)` 返回在给定 `base` 进制数字系统中 `num` 的字符串表示形式。

2. `base`的范围可以从2到36.默认是10
3. toString()方法用于字符串；在数字上使用会报错。

```js
// 想直接在数字上调用一个方法。如toString
// 我们需要在它后面放置两个..
2..toString(2)  // 输出 10
```



### 2.4 舍入

:open_book: 常用内置函数：

1. `Math.floor`：向下舍入【比实际变小】
2. `Math.ceil`：向上舍入【比实际变大】
3. `Math.round`：向最近的整数舍入【四舍五入】
4. `Math.trunc`：移除小数点后内容。【IE不支持】

```js
Math.floor(3.1)  // 3
Math.flooe(-1.1) // -2
Math.ceil(3.1)   // 4
Math.ceil(-1.1)  // -1
// round() : 3 -1 4 -2
Math.round(3.1)
Math.round(-1.1)
Math.round(3.5)
Math.round(-1.6)
// trunc() : 3 -1
Math.trunc(3.1)
Math.trunc(-1.1)
```

:open_book: 将数字舍入到小数点后n位：

1. 乘除法：要留下的数字变为整数。再舍入剩下的小数。最后在`÷`变回原来的大小。

```js
let num = 1.23455;
Math.round( num * 100 ) / 100; // 1.23
```

2. 内置函数：`toFixed(n)`，返回**字符串**内容；会向下或向上舍入到最接近的值。

   如果小数部分比所需要的短，则在结尾添加0。



### 2.5 不精确的计算

1. 数字：64位格式；54位用于存储这些数字；11位用于存储小数点的位置，而1位用于符号。

2. `Infinity`：特殊数值，溢出64位存储，很大的数字。`-Infinity`：比任何数都小。

:open_book: `isNaN(value):`   将参数转换为数字，测试是否为`NaN`。但是`NaN`不等于任何东西，包括本身。

:open_book:  `isFinite(value):`  将参数转换为数字，如果常规数字不是 `NaN Infinity -Infinity`，则可以返回`true`。


3. 精度损失：

:punch: 小数在二进制形式中是无限循环小数。所以二进制系统无法精确存储0.1或0.2。

:open_book: 所以在对两个数字进行求和时，它们各自的精度损失会叠加起来。`0.1+0.2 ≠ 0.3`

:black_flag: 借助 `toFixed(n)` 进行舍入。

4. 注意在所有数字函数中，包括`isFinite`，空字符串和仅有空格的字符串均被设为`0`
5. `Object.is`: 内部算法需要比较两个值是否完全新相同。

:open_book: 它适用于 `NaN`：`Object.is(NaN, NaN) === true`，这是件好事。

:notebook: 值 `0` 和 `-0` 是不同的：`Object.is(0, -0) === false`，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。

:japanese_goblin: 在所有其他情况下，`Object.is(a, b)` 与 `a === b` 相同。



### 2.6 parseInt 和 parseFloat

:page_with_curl:前提： 我们知道将字符串转换为数字可以使用 `+ Number()`；但是局限在 如果参数不是完全的数字，就会失败；转换为`NaN`

:punch: 使用`parseInt `和 `parseFloat`可以从字符串中读取数字，直到无法读取为止，如果发生错误，则返回收集到的数字。

```js
parseInt("100px");
parseFloat("1.23em"); // 100 1.23
// 发生错误时
parseInt("1a2.34");
parseFloat("12.a2"); // 1 12
parseInt("a123.12")  // NaN,第一个符号就停止了读取。
```

:page_with_curl: `parseInt`的第二个参数：`radix`【指定数字系统的基数】。解析其他进制数字的字符串。

```js
parseInt('ff', 16); // 255
```

:punch: 其他内置函数：

1. `Math.random()`：返回从0到1的随机数【不包括1】
2. `Math.max(a,b,c);Math.min(a,b,c)`：返回参数中的最大值和最小值
3. `Math.pow(n,pow)`  返回n的给定power次幂。

```js
console.log(Math.random());  // 0.9684970253393581
console.log(Math.pow(2,3));  // 8
```



## 3. [字符串](https://zh.javascript.info/string)

### :punch: 3.1 查漏补缺：

1. 反引号允许通过 `${}` 将表达式嵌入字符串中。

```js
console.log(`1+1=${1+1}`);   // 1+1=2
// 还允许字符串跨行：
let nums = `*111
*222
*333`;
console.log(nums);
// 输出：
// *111
// *222
// *333
```

2. 有换行符`\n`可以在单引号和双引号中实现换行。`\`在JavaScript中用于正确读取字符串，然后消失，内存中的字符串是没有`\`
3. `length`**属性**表示字符串长度。不是方法

```js
console.log("My\n".length) // 3
// 转义字符\n作为一个字符
```

4. **访问字符**：使用`[i]` 或调用 `str.charAt(i)`;`i`表示位置索引；由0开始。

```js
// []和charAt唯一的区别：
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // ''（空字符串）
```

5. `for...of`遍历字符：

```js
for (const iterator of "object") {
    console.log(iterator);
}
// o
// b
// j
// e
// c
// t
```

6. 不可变的字符串：在JavaScript中，字符串不可更改`str[i] = "i"`。通常是创建一个新的字符串来进行操作。

### :punch: 3.2 内置函数：

1. **改变大小写**：`toLowerCase() toUpperCase()`
2. **查找子字符串**：**`str.indexOf(substr,pos)`**：给定位置`pos`，查找子字符串`substr`，没有找到就返回`-1`，否则返回匹配成功的位置。

```js
console.log("Hello".indexOf("ll",1));  // 2
// 循环查找；
let str = "As sly as a fox, as strong as an ox";
let target = "as"; // 这是我们要查找的目标
let pos = -1;
// 7 从第9 开始寻找。
// 持续寻找，只要foundId不要为-1，就可以一直循环下去。
while (true) {
  let foundId = str.indexOf(target, pos);
  if (foundId === -1) break;
  console.log(`Found at ${foundId}`)
  pos = foundId + target.length;
}
```

3.  按位（bitwise) Not `~` 运算符：将数字转换为 32-bit 整数，存在小数部分即删除；对二进制的所有位均取反。即：`~n = -(n+1)`
4. **`str.includes(substr,pos)`**：根据`str`中是否包含`substr`来返回 `true、false`。适用需要匹配，不需要具体位置。
5.  **获取子字符串**  **`slice(start,[,end])`** `substring(start,[,end])` `substr(start,length)`

<img src="C:/Users/%E7%9F%A5%E8%91%97/AppData/Roaming/Typora/typora-user-images/image-20230108195801962.png" alt="image-20230108195758438" style="zoom:100%;" />

```js
// 获取子字符串
let str1 = "Helao";
str1.slice(1,2);str1.slice(2,1);str1.slice(-2,-1);  // e "" a
str1.substring(1,2);str1.substring(2,1);str1.substring(-2,-1);  // e e 不支持负参数

```

6. **比较字符串**：`str.localeCompare(str2)`。`str`在`str2`前面，就返回负数；在`str2`后面，就返回正数，在相同位置就返回`0`
7. 字符串方法 `trim() repeat(n)`
   + `str.trim()` —— 删除字符串前后的空格 
   + `str.repeat(n)` —— 重复字符串 `n` 次。



## 4. [数组](https://zh.javascript.info/array)Array

### :punch: 4.1 查漏补缺

1. **数组存储有序集合**【任何类型的元素都可以存储】；对象不能提供管理元素顺序的方法。
2. **声明**： `let arr = new Array(); let arr = [初始元素或空]`
3. 向数组添加元素时，索引对应的值是没有的。否则就变成了替换元素。
4. 数组可以以逗号结尾。
4. **数组里的元素越多，移动它们就要花越多的时间，也就意味着越多的内存操作。** 
4. **`pop` 方法不需要移动任何东西，因为其它元素都保留了各自的索引。这就是为什么 `pop` 会特别快。**
4. 数组执行 toString 进行转换：`[] ==》 ""`，`[1]==》"1"`
4. 使用` == `两侧是 对象和原始类型时，那么该对象会被转换为原始类型。



### :punch: 4.2 新鲜知识

1. 使用“at”获取最后一个元素。我们一般使用`arr[arr.length-1]`来获取。

```js
// 换句话说，arr.at(i)：
//    如果 i >= 0，则与 arr[i] 完全相同。
//    对于 i 为负数的情况，它则从数组的尾部向前数。
let fruits = ["Apple", "Orange", "Plum"];
console.log( fruits.at(-1),fruits.at(-2) ); // Plum Orange
```

2. `for...of`循环不能获取当前索引，只是获取元素值。`for...in`获取到所有索引，就可以看到数组元素和数字索引。但是速度很慢，最好不要使用`for...in`来遍历数组
3. 清空数组最简单的方法就是` arr.length = 0`
4. 多维数组：数组中的项也是数组。



### :punch: 4.3 内置函数

1. 队列【queue】是最常见的使用数组的方法之一。

   + ` push(...items)`【在**末端**添加一个元素】
   + `shift`【取出队列**首端**一个元素】
   + `unshift(...items)`【从首端添加`items`项】

```js
// 作用于数组首端的方法：shift
// 返回被移除的数组元素；改变原数组
let fruits = ["Apple", "Orange", "Pear"];

alert( fruits.shift() ); // 移除 Apple 然后 alert 显示出来

alert( fruits ); // Orange, Pear

// 在数组首端添加元素 unshift
// push和unshift都可以一次添加多个元素。
```

2. 栈：`push`【在**末端**添加一个元素】

   ​        `pop `【从**末端**取出一个元素】返回删除的数组元素，会改变原数组。

   在JavaScript中，数组既可以用作队列，也可以用作栈。

 <img src="C:/Users/%E7%9F%A5%E8%91%97/AppData/Roaming/Typora/typora-user-images/image-20230108192953936.png" alt="image-20230108192953936" style="zoom:67%;" /><img src="C:/Users/%E7%9F%A5%E8%91%97/AppData/Roaming/Typora/typora-user-images/image-20230108201142419.png" alt="image-20230108201142419" style="zoom:67%;" />

```js
let fruits = ["Apple", "Orange", "Plum"];
fruits.pop();
console.log(fruits);  // [ 'Apple', 'Orange' ]
console.log(fruits.at(-1)===fruits.pop()); // true 都返回最后一个元素 ['Apple']
fruits.push("Orange");  // [ 'Apple', 'Orange' ]
```



## 5. [数组方法](https://zh.javascript.info/array-methods)

### :punch: 数组方法备忘单：

- 添加/删除元素：

  - `push(...items)` —— 向尾端添加元素，

  - `pop()` —— 从尾端提取一个元素，

  - `shift()` —— 从首端提取一个元素，

  - `unshift(...items)` —— 向首端添加元素，

  - `splice(pos, deleteCount, ...items)` —— 从 `pos` 开始删除 `deleteCount` 个元素，并插入 `items`【也是基于pos位置开始插入元素】。

  - `slice(start, end)` —— 创建一个新数组，将从索引 `start` 到索引 `end`（但不包括 `end`）的元素复制进去。

  - `concat(...items)` —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 `items`。如果 `items` 中的任意一项是一个数组，那么就取其元素。

    ```js
    // 数组删除元素：我们希望剩下的元素能够移动并占据被释放的位置。
    // splice可以做所有事情：添加，删除，插入元素【允许负向索引】
    let arr = ["I", "study", "JavaScript"];
    arr.splice(1, 1, "love");   // 从索引 1 开始删除 1 个元素，返回被删除的元素数组,从索引1开始插入1个元素
    console.log( arr );         // ["I", "love","JavaScript"],会改变原来数组
    arr.splice(-1,1,"you");     // 从索引-1就是尾部位置
    console.log(arr);           // [ 'I', 'love', 'you' ]
    
    // slice : 截取 相当于获取该数组的 子数组【字符串也有该方法】
    let arr = ["I", "study", "JavaScript"];
    let newArr= arr.slice(1,2);      // 返回一个新的数组，并不改变原数组
    console.log(newArr);             // [ 'study' ]截取出的子数组 应是包含 start索引，不包含 end索引
    
    // concat : 拼接参数内容，返回新的拼接数组
    let arr = ["I", "study", "JavaScript"];
    let newArr = arr.concat("1","2");
    console.log(newArr,arr);     // [ 'I', 'study', 'JavaScript', '1', '2' ]返回复制好的新数组  
    							 // [ 'I', 'study', 'JavaScript' ] 不改变原数组
    console.log(arr.concat("{  0: 'something',1: 'else',length:2}")); 
    // [ 'I', 'study', 'JavaScript', "{  0: 'something',1: 'else',length:2}" ] 对象被当做一个整体进行添加
    // 对类数组 有[Symbol.isConcatSpreadable]属性
    let arrayLike = {
      0: "something",
      1: "else",
      [Symbol.isConcatSpreadable]: true,
      length: 2,
    };
    console.log(arr.concat(arrayLike)); 
    // [ 'I', 'study', 'JavaScript', 'something', 'else' ] 类数组有该属性也可以复制其的每一项
    ```

    

- 搜索元素：

  - `indexOf/lastIndexOf(item, pos)` ——  从索引 `pos` 开始搜索 `item`，搜索到则返回该项的索引，否则返回 `-1`。

  - `includes(value)` —— 如果数组有 `value`，则返回 `true`，否则返回 `false`。

  - `find/filter(func)` —— 通过 `func` 过滤元素，返回使 `func` 返回 `true` 的第一个值/所有值。

  - `findIndex` 和 `find` 类似，但返回索引而不是值。

    ```js
    // 字符串也有这些方法。
    
    ```

    

- 遍历元素：

  - `forEach(func)` —— 对每个元素都调用 `func`，不返回任何内容。

    ```js
    let arr = ["I", "study", "JavaScript"];
    arr.forEach((item,index,arr)=>{               // 可以有元素项,索引,和该数组等参数
        console.log(`${item}的索引位置是${index}`);
    })
    // I的索引位置是0
    // study的索引位置是1
    // JavaScript的索引位置是2
    ```

    

- 转换数组：

  - `map(func)` —— 根据对每个元素调用 `func` 的结果创建一个新数组。
  - `sort(func)` —— 对数组进行原位（in-place）排序，然后返回它。
  - `reverse()` —— 原位（in-place）反转数组，然后返回它。
  - `split/join` —— 将字符串转换为数组并返回。
  - `reduce/reduceRight(func, initial)` —— 通过对每个元素调用 `func` 计算数组上的单个值，并在调用之间传递中间结果。

- 其他：

  - `Array.isArray(value)` 检查 `value` 是否是一个数组，如果是则返回 `true`，否则返回 `false`。

请注意，`sort`，`reverse` 和 `splice` 方法修改的是数组本身。

这些是最常用的方法，它们覆盖 99％ 的用例。





## 6. [Iterable object（可迭代对象）](https://zh.javascript.info/iterable)

1. 可迭代对象是数组的泛化。`for...of`循环用于可迭代对象。

2. 数组和字符串是使用最广泛的内建可迭代对象。

   字符串：使用`for...of`遍历它的每个字符。

3. Iterable【可迭代】 是实现了 Symbol.iterator方法的对象。

   Array-like【类数组】是有索引和length属性的对象。

4. **Array.form()** 可以接受 Iterator和Array-like，从中获取到新数组。

   :bulb:  过程：检查是否是可迭代或类数组，然后创建一个新的数组，将该对象上的所有元素复制到这个新数组。

   ![image-20230209144848344](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230209144848344.png)

   :bulb: 完整语法：`Array.form(obj[, mapFn, thisArg])`

   ```js
   let range = {
   	0:1,
       1:2,
       2:3,
       length:3
   }
   // 可选的映射函数 mapFn
   let arr = Array.form(range,num=>num*num)
   console.log(arr)  // 1 4 9
   ```

   :bulb: 接收字符串，将它转换为单个字符的数组。

   ```js
   let str = "xiaolian";
   let chars = Array.from(str);
   console.log(chars);
   // Array(8) [ "x", "i", "a", "o", "l", "i", "a", "n" ]
   ```

   

## 7. [Map and Set（映射和集合）](https://zh.javascript.info/map-set)

### 7.1 Map

+ 形式：

```js
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键
console.log(map)  // Map(3) { 1 → "str1", 1 → "num1", true → "bool1" }
```

+ 方法和属性：

  - `new Map()` —— 创建 map。

  - `map.set(key, value)` —— 根据键存储值。

  - `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。

  - `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。

  - `map.delete(key)` —— 删除指定键的值。

  - `map.clear()` —— 清空 map。

  - `map.size` —— 返回当前元素个数。

+ 注意：`map[key]`不是使用`map`的正确形式。

+ 链式调用：每次调用都会返回map本身。

  ```js
  map.set('1', 'str1')
     .set(1, 'num1')
     .set(true, 'bool1');
  ```

+ **Map迭代** ：在map中使用循环。

  + `map.keys()` —— 遍历并返回一个<u>包含所有键</u>的可迭代对象，
  + `map.values()` —— 遍历并返回一个<u>包含所有值</u>的可迭代对象，
  + `map.entries()` —— 遍历并返回一个<u>包含所有实体 `[key, value]` 的可迭代对象</u>，`for..of` 在默认情况下使用的就是这个。

  ![image-20230209154939617](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230209154939617.png)

  ```js
  // 遍历所有的键（vegetables）
  for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
  }
  
  // 遍历所有的值（amounts）
  for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
  }
  
  // 遍历所有的实体 [key, value]
  for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
    console.log(entry); // cucumber,500 (and so on)
  }
  ```

+ [Object.entries(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)：将普通对象转换为Map.返回键值对数组：``[ ["name","John"], ["age", 30] ]``

  [Object.fromEntries：从 Map 创建对象](https://zh.javascript.info/map-set#objectfromentries-cong-map-chuang-jian-dui-xiang)：给定具有`[key,value]`键值对的数组，会创建一个对象。

### 7.2 Set

1. `Set` 是一个特殊的类型集合 —— “值的集合”（没有键），**它的每一个值只能出现一次。**
   - `new Set(iterable)` —— 创建一个 `set`，如果提供了一个 `iterable` 对象（通常是数组），将会从数组里面复制值到 `set` 中。
   - `set.add(value)` —— 添加一个值，返回 set 本身
   - `set.delete(value)` —— 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
   - `set.has(value)` —— 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
   - `set.clear()` —— 清空 set。
   - `set.size` —— 返回元素个数。

```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits，一些访客来访好几次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);
console.log(set)
```

![image-20230209183448208](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230209183448208.png)

2. Set迭代：使用`for...of  forEach`进行遍历

   Map中用于迭代的方法在Set中同样支持。

   + `set.keys()`
   + `set.values()`
   + `set.entries()`

## 8. [WeakMap and WeakSet（弱映射和弱集合）](https://zh.javascript.info/weakmap-weakset)

### 8.1 WeakMap

:bulb: 如果使用对象作为常规Map的键，那么当Map存在时，该对象也存在。占用内存并不会被回收。

1. `WeakMap` 在这方面有着根本上的不同。它不会阻止垃圾回收机制对作为键的对象（key object）的回收。
2. WeakMap的键必须是对象不能是原始值。

## 9. [Object.keys，values，entries](https://zh.javascript.info/keys-values-entries)

## 10. [解构赋值](https://zh.javascript.info/destructuring-assignment)

## 11. [日期和时间](https://zh.javascript.info/date)

## 12. [JSON 方法，toJSON](https://zh.javascript.info/json)
