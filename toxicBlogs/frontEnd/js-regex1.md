---
title: 正则表达式
date: 2022-2-4
tags:
 - 正则表达式
categories:
 - 前端
sidebar: 'auto'
---

## 1. 体验魅力

:question: 实现案例：找出该字符串内的所有数字，并返回其组成的字符串。比如说："houdunren2200hdcms9988"，返回 "*22009988*"

:ear: 做法1：

```js
let str = "houdunren2200hdcms9988";
let nums = [...str].filter(item=>{
    // 逻辑：
    // 不符合条件的被过滤掉 return true
    // => 判断它为数字。
    return !isNaN(parseInt(item)).join("")  // 因为...解构之后都变为字符。需要通过parseInt转换为数字类型。
    // 当item不是数字时，isNaN返回true；是数字时，返回false
    // 所以我们希望返回数字，就让它为true。加上'!''
})

// 如下↓理解：filter
[...str].filter(item=>{
    if(isNaN(parseInt(item))){  // true isNaN [is not a number] 不是数字
        return false;
    }
    return true;
    // 返回:
    //[
    //   '2', '2', '0',
    //   '0', '9', '9',
    //   '8', '8'
	//]
})
```

:ear: 做法2：

```js
let str = "houdunren2200hdcms9988";
console.log(str.match(/\d/g).join(""));
// match:字符串匹配正则表达式。返回符合条件的。
// test:测试是否在字符串中存在该字符。返回boolean
consoloe.log(/h/,test(str)) // 检查在toxic这个字符串中有无h字符
```

## 2. 

### 2.1 创建正则表达式

:punch: **字面量形式**： 以 `//` 为标志。缺点：无法识别变量。

```js
let hd = "345aunck.com";
console.log(/u/.test(hd)); // true
let try1 = "u";
console.log(/try1/.test(hd)); // false.这样子意思是在hd中查找try1而不是u
```

:ear: 1.  **` eval()`**：是将字符串变为正则表达式。

```js
console.log(eval(`${try1}`));// 相当于将"u"转换为"/u/"
console.log(eval(`${try1}`).test(hd)) // true;相当于/u/.test(hd)
```

**:punch: 对象形式**：通过`new RegExp("匹配字符","作用域")`创建正则表达式。

```js
let hd = "345aunck.com";
let reg = new RegExp("u","g");
console.log(reg.test(hd))  // true
```

:ear: 2. **`replace("被代替","代替者")`** 

```js
// 示例：
console.log("qbx".replace("b","2"))  // 将2代替b q2x
// 使用正则表达式
console.log(
	"abc%".replace(/\w/g,(search)=>{
        // search就是根据正则表达式找到的内容
        console.log(search); // abc
        // return内容是代替的内容,将符合的内容全部替代为return的内容
        return "@";          // @@@%
    })
)
// 总结：
// 1. \w 是word的意思。包括单词字符，数字，大小写字母以及下划线。即 0-9 a-z A-Z
// 2. search就是根据正则表达式找到的内容
// 3. return内容是代替的内容,将符合的内容全部替代为return的内容
```

