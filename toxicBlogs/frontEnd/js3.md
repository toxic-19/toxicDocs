**（1）本笔记阅读目录：**
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667454409726-da7cefe1-5f96-470c-881a-909997af6b20.png#averageHue=%23fefefd&clientId=u8bce0882-d79a-4&from=paste&height=121&id=u8031b5e7&name=%E5%9B%BE%E7%89%87.png&originHeight=151&originWidth=1081&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21468&status=done&style=none&taskId=uae9eb26e-b8cf-4d93-931a-ca483139554&title=&width=864.8)**（2）参考链接：**
## 1.  第一列：
### 1.1 对象

1. 对象则用来存储键值对和更复杂的实体  

2. 创建对象
两种方式
1. 属性 字面量的方式
```javascript
let object = {}
// 使用花括号的形式 一个属性就是一个键值对  {key:"value"}
// 例子
let user = {     // 一个对象
  name: "John",  // 键 "name"，值 "John"
  age: 30        // 键 "age"，值 30
};
// 可以使用点符号访问属性值：
console.log(user.name)
```

2. 构造函数的方式

`let object = new Object();``// 创建一个空的对象 再往 里面填充`

3.  可以随时添加、删除和读取文件  
```javascript
//  添加
user.sex = 'female';
//  删除
delete user.name;
//  读取
console.log(user.age)
```

4.  可以用多字词语来作为属性名，但必须给它们加上引号：  『自定义指令多单词』
```javascript
let user = {
  name:'lyx',
  age:30,
	"alike dogs":true,  // 多单词属性
}
// 列表中的最后一个属性应以逗号结尾 这叫做尾随（trailing）或悬挂（hanging）逗号
```

5. 方括号：可用于任何字符串
   1. 主要用在多词属性上 `JavaScript`识别不了 `user.like dogs`
   2. `key` 是有效的变量标识符。

                 意思：不包含空格，不以数字开头，也不包含特殊字符( `$` 和 `_`可以）

   3. 读取属性
```javascript
//  添加
user["like"] = 'sports';
//  删除 在括号里也要加上 引号
delete user.["like dogs"];
//  读取
console.log(user["like dogs"])
```

   4.  通过任意表达式来获取属性名 将**多单词key**直接赋值给`key`，再通过`[]`操作
      1.  点符号不能以类似的方式使用，不能改为 `user.key`
```javascript
let key = 'like dogs'
user[key] = 'alike dogs'
```

6. 计算属性
 通常，我们用花括号来创建对象。这种方式我们叫做 **字面量**。  
1.  对象字面量中使用方括号  叫计算属性
```javascript
let fruit = 'apple'  // 由 string 类型变为 不加引号
let user = {
  [fruit]:'red'  // 这个[fruit]是未知的，要根据fruit的值来定
  // 相同效果于: apple:'red'
}
// 这个fruit就是计算属性 
// [fruit] 含义是属性名应该从 fruit 变量中获取。
```

2. 还可以使用更复杂的形式
```javascript
let fruit = 'apple'  
let user = {
  [fruit+'Computers']:'red'  
  // 相同效果于: appleComputers:'red'
}
```

7.  属性值缩写
   1. 属性名跟变量名一样的情况下，可以直接缩写
   2. 比如 `name:name;` 缩写为`name`

8. 属性存在性测试 `in`
   1. JavaScript的对象被访问到不存在的属性也不会报错 只会输出`undefined`
   2. `in` 操作符 可以检查 属性是否存在与对象中 语法 ：`"key" in object`
      1. 请注意，`in` 的左边必须是 **属性名**。**通常是一个带引号的字符串**。  
      2. 输出结果为 `true` 或者 `false`
      3. 通常情况下不应该给对象赋值 `undefined`。我们通常会用 `null` 来表示未知的或者空的值。  
```javascript
let user = { name: "John", age: 30 };

alert( "age" in user ); // true，user.age 存在
alert( "blabla" in user ); // false，user.blabla 不存在。
```

9. `for...in` 循环
   1. 语法：`for (key in object) { // 对此对象属性中的每个键执行的代码 }`
```javascript
let user = {
    name: "John",
    age: 30,
    isAdmin: true
};
for (let key in user) {
    // key
    console.log(key)  // name age isAdmin
    // value
    console.log(user[key])  // john 30 true
    // key:value
    console.log(key,user[key])
    // name John
    // age 30
    // isAdmin true
}
```

#### 总结
总结
1. 对象是具有一些特殊特性的关联数组。
2. 它们存储属性（键值对），其中：
- 属性的键必须是字符串或者 symbol（通常是字符串）。
- 值可以是任何类型。
3. 我们可以用下面的方法访问属性：
- 点符号: obj.property。
- 方括号 obj["property"]，方括号允许从变量中获取键，例如 obj[varWithKey]。
4. 其他操作：
- 删除属性：delete obj.prop。
- 检查是否存在给定键的属性："key" in obj。
- 遍历对象：for(let key in obj) 循环。
5. JavaScript 中还有很多其他类型的对象：
- Array 用于存储有序数据集合，
- Date 用于存储时间日期，
- Error 用于存储错误信息。
### 1.2 对象引用和复制

1.  对象与原始类型的根本区别之一是，**对象是“通过引用”存储和复制的** ， 而原始类型：字符串、数字、布尔值等 —— 总是“作为一个整体”复制。  

2. 对象属性与对象变量名之间的关系
```javascript
let family = {
  son:'林江',
  daughter:'林竹'
}
// 如果你要找daughter，就得把你存的门牌号找出来
// 那么family.daughter JavaScript引擎就会根据你存的地址去查找
// 找到了daughter的位置 也找到了值
```
 ![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667528881284-090c3ec9-8176-413c-a7d3-e609b5b88c25.png#averageHue=%23fbfafa&clientId=u5bd68437-8de8-4&from=paste&height=284&id=ubc671a62&name=%E5%9B%BE%E7%89%87.png&originHeight=557&originWidth=836&originalType=binary&ratio=1&rotation=0&showTitle=true&size=63394&status=done&style=none&taskId=ub1df9ede-142d-4d58-8e5e-3161f98c35d&title=%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8%E7%9A%84%E6%98%AF%20%E2%80%9C%E5%9C%A8%E5%86%85%E5%AD%98%E4%B8%AD%E7%9A%84%E5%9C%B0%E5%9D%80%E2%80%9D&width=426.79998779296875 "对象存储的是 “在内存中的地址”")
> **赋值了对象的变量存储的不是对象本身 ** 『在family中没有存储关于family的东西』
> **而是该对象“在内存中的地址”              **『而是存储了son和daughter的地址』
> **—— 换句话说就是对该对象的“引用”。**


3. 对象的复制
> 有一个变量 `student1` 存储对象 `{name:'john'}`
> 又有一个变量 `student2` 觉得`student1` 的名字很好听，想要复制过来搞个同名

```javascript
let student1 = {
  name: 'john'
}
let student2 = {}
student2 = student1
// 那么 同一个引用 被两个对象使用
```
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667530067014-430dfbce-c3fa-423b-8393-45b36634d026.png#averageHue=%23f5f4f3&clientId=u5bd68437-8de8-4&from=paste&height=310&id=uc56dd7f7&name=%E5%9B%BE%E7%89%87.png&originHeight=541&originWidth=968&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71545&status=done&style=none&taskId=u178ef693-c2f4-4c44-a6d2-68db67eb232&title=&width=555.4000244140625)

   1. 复制后的更改
> `name` 中存放的是` 'john'`
> 有一天 `student2` 觉得这个名字又不好听了，决定改掉
> `student2.name =  'mary'`
> 那么 `student1.name` 也会等于 `mary` 


#### 1.  对象比较

   4. 对象之间比较时，只有引用的是同一个对象时才相等
```javascript
let a = {name:'mary'}
let b = a  // 同指向
// 所以 a == b
```

   2.  两个独立的对象则并不相等，即使它们看起来很像  
```javascript
let a = {name:'mary'}
let b = {name:'mary'}
console.log(a == b) // false
```

#### 2. `Object.assign`克隆与合并
复制一个对象
1. 拷贝一个对象变量会创建一个对相同对象的引用
2. 复制一个对象 从基础数据类型层面，把每一对键值对都赋值过来
   1. 重点语句  `clone[key] = user[key]`
```javascript
let user = {
  name: "John",
  age: 30
};

let clone = {}; // 新的空对象

// 将 user 中所有的属性拷贝到其中
for (let key in user) {
  clone[key] = user[key];
  // 在赋值的时候 并不需要定义一个key
  // 语法 object[key] = ''
  // 或者 object.key = '' 
}
// clone完成的clone对象是一个完全独立的对象，对clone的修改不会改变user
```
assign
1. 语法`Object.assign(dest, [src1, src2, src3...])`
   1. `dest` 是目标对象 如上的`clone`
   2. `[]`中的对象 是 源对象 即从`src1``src2``src3``src4`等中复制过来给的`dest`对象
2. 一个参数
```javascript
let user = {
    name: "John",
    age: 30
};
let clone = {}; // 新的空对象
Object.assign(clone,user);
console.log(clone) 
// 结果：{ name: 'John', age: 30 }
```

3. 在一个参数的外面加上了`[]`, 结果返回为` { '0': { name: 'John', age: 30 } }`

       `**key**`**为0 **`**value**`**为对象   **

4.  合并多个对象  
```javascript
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2);

// 现在 user = { name: "John", canView: true, canEdit: true }
```

5. 可以给空对象

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667552034170-8429e227-35f3-4550-b0a3-63fb5eec0c54.png#averageHue=%23fbfaf8&clientId=u5bd68437-8de8-4&from=paste&height=250&id=u22da46f7&name=%E5%9B%BE%E7%89%87.png&originHeight=312&originWidth=750&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22689&status=done&style=none&taskId=ub83180d2-7cd1-4f67-b161-f2140cd7c6c&title=&width=600)
>  它将 user 中的所有属性拷贝到了一个空对象中，并返回这个新的对象。  


#### 3. 深层克隆
使用 for in 复制
1. 结论：复制过来的对象属性 **并没有**和原来的`user`指向同一个引用
```javascript
let user = {
  name: "John",
  age: 30,
  // 如果属性中有 对象
  sizes: {
    height: 182,
    width: 50
  }
};
let clone = {}
for (let userKey in user) {
  clone[userKey] = user[userKey]
  // 对象属性时 应该是 clone["sizes"] = user["sizes"]
}
console.log(clone)  // { name: 'John', age: 30, sizes: { height: 182, width: 50 } }

//检测 clone的sizes属性 与 user的sizes属性是否指向同一个对象
clone.sizes = {height: 100,width: 20}

console.log(clone.sizes) // clone的sizes属性 被更改  { height: 100, width: 20 }

// 观察 user的sizes是否也被更改
console.log(user.sizes) // { height: 182, width: 50 } 没有被更改
```
assign 拷贝的是引用 “浅拷贝”
1.  因为 `user.sizes` 是个对象，它会以引用形式被拷贝。因此 `clone` 和 `user` 会共用一个 `sizes`：  那么一旦其中之一发生变化 就会导致另一个对象也发生变化
```javascript
let user = {
    name: "John",
    age: 30,
    // 如果属性中有 对象
    sizes: {
        height: 182,
        width: 50
    }
};
let clone = Object.assign({},user);
console.log(clone)   //  { name: 'John', age: 30, sizes: { height: 182, width: 50 } } 成功克隆

// 更改clone上的sizes的值
clone.sizes.width = 100
console.log(clone.sizes)  // { height: 182, width: 100 }
// 修改了clone 导致 user也发生变化
console.log(user.sizes)   // { height: 182, width: 100 }
```

2.  为了解决这个问题，并让 user 和 clone 成为两个真正独立的对象

        我们应该使用一个**拷贝循环来检查 user[key] 的每个值**，如果它是一个对象，那么也复制它的结构。这就是所谓的“深拷贝”。  
#### 4. 避免重复造轮子     
        javascript原生库lodash文档 
        [—— 常见方法](https://www.jianshu.com/p/d46abfa4ddc9)
        语法 ：`let newObject = _cloneDeep(object)`
```javascript
let _ =  require('lodash')
let user = {
    name: "John",
    age: 30,
    // 如果属性中有 对象
    sizes: {
        height: 182,
        width: 50
    }
};

let deep = _.cloneDeep(user);
console.log(deep)  // { name: 'John', age: 30, sizes: { height: 182, width: 50 } }
console.log(deep["sizes"] === user["sizes"]);
// => false
```
### 1.3 垃圾回收
#### 1. 什么样的 “值”会被垃圾回收
不可达的“值”
1. 什么是可达的值
:::info
 “可达”值是那些以某种方式可访问或可用的值。  

- **当前执行的函数，它的局部变量和参数。**
- **当前嵌套调用链上的其他函数、它们的局部变量和参数。**
- **全局变量。**
- （还有一些内部的）
- 以上值 被称作 “根”
:::
:::tips
 如果一个值可以通过引用链从根访问任何其他值  ,那么这个值也是可达的。
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667558883336-5f6fb3ba-0dd4-4044-b58a-1eee03e6c844.png#averageHue=%23ebe5df&clientId=uc17b1cda-5fd5-4&from=paste&height=139&id=u5275e711&name=%E5%9B%BE%E7%89%87.png&originHeight=174&originWidth=537&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21700&status=done&style=none&taskId=u7928d765-42d1-48be-8fbc-4b3b510ce5e&title=&width=429.6)
**在全局变量 **`**user**`** 指向 的**`**Object**`** 即为可达的；可以通过**`**user.name**`** 来访问它**
:::

2. JavaScript引擎里有 垃圾回收器 对**不可达的值**进行回收

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667559065616-d5f49b62-25fb-4532-8d1a-bd528cdafa2b.png#averageHue=%23ebe6e2&clientId=uc17b1cda-5fd5-4&from=paste&height=206&id=u2a8243b2&name=%E5%9B%BE%E7%89%87.png&originHeight=257&originWidth=521&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27071&status=done&style=none&taskId=u2f4cb84f-e8de-4f11-9983-d9d3cd41c8d&title=&width=416.8)
如果将 全局变量 `user` 赋值为 `null`，那么原执行的 `object` 就成为一个不可达的值。
无法访问，即会被 垃圾回收器 回收掉。
#### 2. 相互关联的对象
只有 向内引入才算可达
1. 内存结构为：

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667559680551-9452a803-5bda-4bd7-8681-4c0aa5c8a332.png#averageHue=%23faf3ee&clientId=uc17b1cda-5fd5-4&from=paste&height=204&id=ub3dac733&name=%E5%9B%BE%E7%89%87.png&originHeight=255&originWidth=417&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13093&status=done&style=none&taskId=ud667b22a-41af-4df8-8e56-2e31b442794&title=&width=333.6)

2. 去掉 `family.father` 和 `mother.husband` 引用：只剩下 `father.wife` 一个引用

但是是没用的 因为 无法通过 `root` 根 使得 `father` 成为可达的值
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667559738920-87293082-6f44-4d1b-b28c-dc502b2b5b8d.png#averageHue=%23f9f3ef&clientId=uc17b1cda-5fd5-4&from=paste&height=204&id=uf13ad2ec&name=%E5%9B%BE%E7%89%87.png&originHeight=255&originWidth=421&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14654&status=done&style=none&taskId=ue4b4fa84-e504-4c08-bd80-7706298e274&title=&width=336.8)

3.  所以`father` 成为一个不可达的值 会被回收掉，不再与 root 相连 就成为了一座‘数据孤岛’
#### 3. 总结：
:::tips

- 垃圾回收是自动完成的，我们不能强制执行或是阻止执行。
- 当对象是可达状态时，它一定是存在于内存中的。
- 被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达，正如我们在上面的例子中看到的那样。
:::
## 2. 第二列
### 2.1 对象方法 `this`

1. `**this**`** 的值是在代码运行时计算出来的，它取决于代码上下文。  **
```javascript
let user = {
  name: "John",
  age: 30,
  // sayHi:function (){
  //   console.log(this)
  // }
  // 同
  sayHi(){
    console.log(this)
  }
};
"use strict";
user.sayHi()  // { name: 'John', age: 30, sayHi: [Function: sayHi] } 指的是user这个对象
```

2. `this`的值
是否使用 "use strict";```javascript
"use strict";

function sayHi() {
    console.log(this)
}
sayHi()  // undefined
```

1. 严格模式下的 `this` 值为 `undefined`
2.  在非严格模式的情况下，`this` 将会是 **全局对象**

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667574436135-a69a127d-a691-4e57-9bf3-e7fc3c1fce75.png#averageHue=%23fbfaf9&clientId=uc17b1cda-5fd5-4&from=paste&height=141&id=u5fcfea46&name=%E5%9B%BE%E7%89%87.png&originHeight=176&originWidth=818&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21798&status=done&style=none&taskId=uec8f91fd-624c-4eed-94b2-221f37a0022&title=&width=654.4)
####  箭头函数没有自己的 `this`。  
#### 总结
存储在对象属性中的函数被称为“方法”。
- 方法允许对象进行像 object.doSomething() 这样的“操作”。
- 方法可以将对象引用为 this。

this 的值是在程序运行时得到的。

- 一个函数在声明时，可能就使用了 this，但是这个 this 只有在函数被调用时才会有值。
- 可以在对象之间复制函数。
- 以“方法”的语法调用函数时：object.method()，调用过程中的 this 值是 object。

请注意箭头函数有些特别：它们没有 this。在箭头函数内部访问到的 this 都是从外部获取的。
### 2.2 构造器 `new`
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1667576215285-51572059-6581-4260-bbf8-c26e7c978206.png#averageHue=%23fdfdfc&clientId=uc17b1cda-5fd5-4&from=paste&height=259&id=ud7f4ce5e&name=%E5%9B%BE%E7%89%87.png&originHeight=453&originWidth=1083&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66224&status=done&style=none&taskId=u3e942eaf-22ee-442e-8495-eb6e15a2e94&title=&width=619) 
> 函数体执行。通常它会修改 this，为其添加新的属性。  

**目的：可以调用**`**new User("")**`**创建更多的用户，使用可重用的对象创建代码**
**注意：除了箭头函数 任何函数可以作为构造器函数**
#### return
return
1. 首先在`new`构造函数中 `return`的是`this`『即一个对象』，【隐式存在】
2. 如果要自己加上`return`
   1.  如果 return 返回的是一个对象，则返回这个对象，而不是 this。  
   2.  如果 return 返回的是一个原始类型，则忽略。  
3.  通常构造器没有 return 语句。这里我们主要为了完整性而提及返回对象的特殊行为。  
### 🏘️2.3 可选链 `?.`
#### 不存在的属性问题
我们希望不报错 返回undefined
1. 使用`if`或者`? :`三元运算符
```javascript
let user = {};

alert(user.address ? user.address.street : undefined);
```

2. 使用 `&&` 返回第一个假值
```javascript
let user = {}; // user 没有 address 属性

alert( user.address && user.address.street && user.address.street.name ); 
// undefined（不报错）
```
#### 使用`?.`
语法
1.  如果可选链 ?. 前面的值为 undefined 或者 null，它会停止运算并返回 undefined。  
2. 比如：`user?.address`
   1. 如果`user`存在，那么就返回`user.address`;` user.address` 不存在就返回`undefined`
   2. 如果`user`不存在，那么就直接返回`undefined` 
3. 比如：`user?.address?.street`
   1. 如果`user.address`存在 就返回 `user.address.street`
   2. 其他情况都返回`undefined`
   3.  **我们应该只将 **`?.` 使用在一些东西可以不存在的地方。  像user对象是必须存在的，所以最好写为：**`user.address?.street`**是符合常理的。
4. `?.`前的变量必须已声明

#### 短路效应

1. 如果 `?.`左边部分不存在，就会立即停止运算（“短路效应”）。
2. 如果在 `?.`的右侧有任何进一步的函数调用或操作，它们均不会执行。
#### 其他变体
>  可选链` ?. `**不是一个运算符**，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。  
>  变为 `?.()  ?.[]`

1. `?.()`用来调用一个可能不存在的函数
```javascript
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin     如果该变量存在 就返回变量名() 即调用该函数

userGuest.admin?.(); // 不输出任何东西 包括undefined
```

2. `?.[]`从一个可能不存在的对象上安全地读取属性。  
## 3. 第三列
### 3.1 symbol类型
#### 1. symbol
     **symbol 是带有可选描述的“原始唯一值”**

1. 对象属性键：String类型和Symbol类型
2. 创建一个Symbol类型的值，注意是**大写首字母**
```javascript
let id = Symbol();  // 此处的id是symbol类型的
//就像：
let str = "你好";  // str是string类型的

// 可以为symbol添加描述
let id1 = Symbol("id")  // id1是描述为id的symbol
```

3. symbol是唯一的，但symbol的描述不是唯一的。相同描述的symbol是不同的
```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2) // false
```

4. 注意：
symbol不会被自动转换为string类型
1. 在`alert()`函数中，输出的值都为string类型
2. `symbol`和`string` 是两种不同的类型 为了防止语言混乱，不应该意外地转换为相同的。
3. 转换：`toString()` 和 调用`description`属性
```javascript
let id = Symbol("id");

console.log(id.toString()) // Symbol(id)
console.log(id.description)  // id
```

5. `key`相同即为同名

#### 2. 隐藏属性
 **symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。  **

1. 使用symbol创建属性并访问：

> 只有使用 `user[id] = 1 `赋值时才是以symbol形式进行赋值 直接赋值就不是symbol了
```javascript
// 向外部代码中 一个对象 添加属性
let user = {
    name:"jack"
}
let id = Symbol("id")
user[id] = 1      // { name: 'jack', [Symbol(id)]: 1 }
user.id = 1       // { name: 'jack', id: 1 }
console.log(user)
```

2. 使用`symbol`作为对象属性值 比`string`类型多了什么好处？
> 1. 属性不会被意外访问到
> 2. 不同的标识符之间不会有冲突， 因为 symbol 总是不同的，即使它们有相同的名字。  
> 3. 但是相同的字符串就会产生错误


3. 对象字面量中的symbol属性
[Symbol("id")]
1. 如果我们要在对象字面量 {...} 中使用 symbol，则需要使用方括号把它括起来。  

> **记得在使用前要进行定义**

```javascript
let id = Symbol("id")
let user = {
    name:'jack',
    [id]:1
}
console.log(user)  // { name: 'jack', [Symbol(id)]: 1 }
```

2. 字符串形式则是：
```javascript
let user = {
    name:'jack',
    id:1
}
console.log(user)  // { name: 'jack', id: 1 }
```

4. symbol属性不参与 for in 循环
```javascript
let id = Symbol("id")
let user = {
    name:'jack',
    [id]:1,
    age:10
}
// 1. 隐藏属性不能被意外访问到：
for (const userKey in user) {
    console.log(userKey)   // 输出name age 没有symbol类的id属性
}
console.log(Object.keys(user))  // 输出 [ 'name', 'age' ]

// 2. 但在克隆和复制的时候可以：
// 当我们克隆或者合并一个 object 时，通常希望 所有 属性被复制
let clone = Object.assign({},user);
console.log(clone)  // { name: 'jack', age: 10, [Symbol(id)]: 1 }

// 3. 可以直接被访问到：
console.log(user[id])  // 1
```

#### 3. 全局symbol

1. 有一个`**全局symbol注册表**`：使用 `Symbol.for("id")`进行注册；读取也是同理

       按照`key`返回一个`symbol`
```javascript
// 将key为id的Symbol类型全局注册
let id  = Symbol.for("id");
// 读取
let idAgain = Symbol.for("id")
console.log(idAgain === id)  // true
```

2. `**Symbol.keyFor**`**：**通过全局symbol返回key

       是通过全局注册表 查找Symbol的键。
```javascript
let idAgain = Symbol.for("id")
console.log(Symbol.keyFor(idAgain))  // id
```
#### 4. 系统symbol
链接 [https://tc39.es/ecma262/#sec-ecmascript-language-types-symbol-type](https://tc39.es/ecma262/#sec-ecmascript-language-types-symbol-type)
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/32615238/1668317450445-7e470f1f-139c-45f8-a9ee-5548018d01cb.png#averageHue=%23f1efee&clientId=u90df2f56-7dae-4&from=paste&height=460&id=u45e4c6c1&name=%E5%9B%BE%E7%89%87.png&originHeight=575&originWidth=1455&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176310&status=done&style=none&taskId=uccd568cd-289a-4315-a2f4-29d13663121&title=&width=1164)

1.  作为 `Symbol.*` 访问  
2.  使用 `Symbol.iterator` 来进行 [迭代](https://zh.javascript.info/iterable) 操作，使用 `Symbol.toPrimitive` 来设置 [对象原始值的转换](https://zh.javascript.info/object-toprimitive) 等等。  
3.  从技术上说，symbol 不是 100% 隐藏的。有一个内建方法 [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 允许我们获取所有的 symbol。还有一个名为 [Reflect.ownKeys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 的方法可以返回一个对象的 **所有** 键，包括 symbol。但大多数库、内建方法和语法结构都没有使用这些方法。  
### 3.2 对象转换为原始类型

1.  JavaScript 不允许自定义运算符对对象的处理方式。  
2.  所有对象在布尔上下文中均为true
3.  `Date`类型可以相加减，`alert(obj)`可以转换为字符串

**↓↓↓↓↓ 接下来看  **『**对象是如何转换为原始值的，以及如何对其进行自定义**』。
疑惑：对象的原始值是什么？
查了一下：`valueOf()`可以获取对象的原始值；感觉对象的原始值是存储在 JavaScript的值：比如`new Date()`的值是我们看到的可以读取的时间和`new Date().valueOf()`呈现的是时间戳。
```javascript
// Array 对象
let array = new Array(1,2,3);
console.log(array.valueOf()); // 返回数组值
// Boolean 对象
console.log(true.valueOf()) // 返回boolean值

let date = new Date();
console.log(date)  // Mon Nov 28 2022 21:29:57 GMT+0800 (中国标准时间)
console.log(date.valueOf())   // 1669642231901

let num = 1;
console.log(num.valueOf())   // 1  number值

let str = 'hello';
console.log(str.valueOf())   // hello  字符串值
```
#### hint：类型转化下的三种变体

1. Object ==> String
2. Object ==> number
3. Object ==> default
#### Symbol.toPrimitive
详细链接：<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/favicon-48x48.cbbd161b.png" alt="img" style="zoom: 33%;" />[Symbol.prototype[@@toPrimitive\] - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/@@toPrimitive)

<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/favicon-48x48.cbbd161b.png" alt="img" style="zoom: 33%;" />[Symbol.toPrimitive - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)

