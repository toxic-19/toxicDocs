---
title: 字符串1 —— 滑动窗口
date: 2022-03-01
tags:
 - 数据结构
categories:
 - 算法
sidebar: 'auto'
---

## [344.反转字符串](https://leetcode.cn/problems/reverse-string/submissions/)

:eagle: 这个方法是使用 `temp `临时变量来进行交换

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
	  let length = s.length;
      let temp;
      for (let i = 0, j = length - 1; i < length / 2; i++, j--) {
        temp = s[i];
        s[i] = s[j];
        s[j] = temp;
      }
      return s;
};
```

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let left = 0;
    let right = s.length-1;
    while(left < right){
        [s[left],s[right]] = [s[right],s[left]];
        left++;
        right--;
    }
    return s;
};
```

:eagle: 而这种是使用了数组的赋值直接进行交换。因为此题输入的本就是数组，所以不必对字符串进行转换。

 ![image-20230309125602706](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230309125602706.png)

## [541. 反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/)

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    let length = s.length;
    let restr = s.split("");
    // 遍历出2k个2k个的最左侧索引
    for(let i = 0;i<length;i+=2*k){
        let left = i;
        let right = i+k-1;
        
        while(left<right){
            [restr[left],restr[right]] = [restr[right],restr[left]];
            left++;
            right--;
        }
    }
    return restr.join("")
};
```

> 注意：因为参数之一是字符串。所以如果使用数组的赋值进行反转的话，需要转换为数组，再进行操作。否则是不起效果的。

思路：

1. 使用循环：遍历出每`2k`的最左侧索引即` i `的值，赋值给 `left` 因为进行反转时，`left`会改变，所以不能直接使用`i`进行。
2. 找到`left`和`right`；`right` 是索引，所以是` i+k-1`；已知二者即可反转，如上一题一般。

## [剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

:eagle: 请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

> 其实是把一个空格的位置腾给三个字符的位置 `%` `2` `0` ；所以并不是单纯地对一个索引的赋值。

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    // 计算空格的数量
    let count = 0;
    for(let i = 0;i<s.length;i++){
        if(s[i]===" "){
            count++;
        }
    }
    // 实现一个新数组
    let newArr = new Array(s.length+count*2);
    // 定义快慢指针
    let right = s.length+count*2 -1;
    let left = s.length-1;

    while(left>=0){
        if(s[left]!==" "){
            newArr[right] = s[left];
            right--;
        }else{
            newArr[right] = '0';
            newArr[right-1] = '2';
            newArr[right-2] = '%';
            right-=3;
        }
        left--;
    }
    return newArr.join("");
};
```

## [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let array = s.trim().split(/\s+/);  // 输出数组：[ 'the', 'sky', 'is', 'blue' ]
    // 使用快慢指针
    let left= 0;
    let right = array.length-1;
    // 现在就是直接对数组进行反转
    while(left<right){
        [array[left],array[right]] = [array[right],array[left]];
        left++;
        right--;
    }
    return array.join(" ")
};
```

> 1. `trim()`：**用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。**同`str.replace(/^\s+|\s+$/gm,'');`
>
>    **注意：**`trim() `方法不会改变原始字符串。`trim() `方法不适用于 `null`, `undefined`, `Number `类型。
>
> 2. `split()`：**用于把一个字符串分割成字符串数组。**
>
>    **提示：** 如果把空字符串 (`""`) 用作 `separator`，那么 `stringObject` 中的每个字符之间都会被分割。
>
>    **注意：**` split() `方法不改变原始字符串。 `*string*.split(*separator*,*limit*)`
>
> 3. `join()`：**用于把数组中的所有元素转换一个字符串。**
>
>    `*array*.join(*separator*)`：可以添加 `separator`增添字符串之间的连接。



## [剑指 Offer 58 - II. 左旋转字符串](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    let i = 0;
    while (i < n) {
        s += s[i];
        i++;
    }
    return s.slice(n, s.length);
};
```

1. 把需要反转的字符一个一个加到字符串后边。
2. 把剪切出来。

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    const length = s.length
    let i = 0;
    while (i < length-n) {
        s = s[length-1] + s;
        i++;
    }
    return s.slice(0, length);
};
```

### 方法二：

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    function reverseWords(strArr,left,right){
        let temp;
        while(left<right){
            temp = strArr[left];
            strArr[left] = strArr[right];
            strArr[right] = temp;
            left++;
            right--;
        }
    }
    let strArr = Array.from(s);
    const len = strArr.length;
    reverseWords(strArr,0,n-1);
    reverseWords(strArr,n,len-1);
    reverseWords(strArr,0,len-1);
    return strArr.join("")
};
```

思路：

1. 反转索引为`n`**前**的部分字符
2. 反转索引为`n`**后**的部分字符
3. 反转全部字符即可得到。

**注意：字符串为不可变对象**



## [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

**在一个串中查找是否出现过另一个串，这是KMP的看家本领。** 本题是KMP 经典题目。

参考链接：[代码随想录：28. 实现 strStr()](https://programmercarl.com/0028.%E5%AE%9E%E7%8E%B0strStr.html#_28-%E5%AE%9E%E7%8E%B0-strstr) 目前不想看KMP算法。

