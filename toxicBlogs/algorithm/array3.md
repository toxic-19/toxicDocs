---
title: 数组3——滑动窗口
date: 2022-12-8
tags:
 - 数组
categories:
 - 算法
sidebar: 'auto'
---



## 滑动窗口思想

### 【209】. 长度最小的子数组

是可以算是双指针法的一种

:punch: [代码随想录链接](https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html)

:punch: [力扣题目链接【209.长度最小的子数组】](https://leetcode.cn/problems/minimum-size-subarray-sum/)

主要在本题中实现滑动窗口，主要确定如下三点：

- 窗口内是什么？                              窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。
- 如何移动窗口的起始位置？           如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。
- 如何移动窗口的结束位置？           窗口的结束位置就是遍历数组的指针，也就是for循环里的索引。

```js
// 给定一个含有 n 个正整数的数组和一个正整数 target 。
// 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    // 起始索引
    let i = 0;
    // 返回其长度 result
    let result = nums.length + 1;
    // 子数组的和
    let sum = 0;
    // 终止索引
    for (let j = 0; j < nums.length; j++) {
        sum += nums[j];
        // sum>=target时，起始索引可以向前移动
        // 否则只能终止索引向前移动
        while(sum>=target){
            // 把此时最短长度记录下来 此时长度为j-i+1
            result = Math.min(result,j-i+1);
            // 起始索引向前移动：说明sum也发生变化
            sum -= nums[i];
            // 最后执行向前移动的++操作。
            i++;
        }
    }
    console.log(result===nums.length+1 ? 0 : result)
    // 如果sum的值一直小于target，就不会进入到while循环。此时result的值应为原始值即nums.length+1;
    // 如果值为nums.length+1，就为0 否则就是result的值
    return result===nums.length+1 ? 0 : result;
};

minSubArrayLen(11,[1,1,1,1,1,1,1,1])

```

:ear: 在判断sum与target的大小的时候，是使用的while而不是if。

​     **因为while表示的是一个持续符合条件的过程。但是if是指判断一次与条件是否相符。** 

:bulb: 暴力解法采用两个for循环，几乎是将该数组的所有子数组都枚举出来。而滑动窗口可以减少一定不符合target要求的子数组。

​     滑动窗口类似双指针。使用快指针进行遍历，慢指针根据条件再进行自增。                                             

​	 while判断通过进行slow更改，  判断不通过进行fast继续向前。                                                                                                                         

:small_red_triangle: 忘记的时候可以看看代码随想录的动图：

![](https://code-thinking.cdn.bcebos.com/gifs/209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.gif)

## 相关题型

### [【76】. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)

:bulb: 其实在理解完滑动窗口之后，**我主要不懂的时候，怎么在当前窗口判断是否包含了t中的所有字母。**

:ear: 思路：`left,right`两个指针表示当前的滑动窗口。初始时：`left=0,right=0`。不断移动right，直到当前窗口包含了t的所有字母。

​	然后进行移动left，尽可能缩小当前窗口。直到它不满足条件。right再进行向右直到到达边界。

参考链接：[<img src="https://assets.leetcode.cn/aliyun-lc-upload/users/xiao_ben_zhu/avatar_1614507814.png?x-oss-process=image%2Fresize%2Ch_38%2Cw_38%2Fformat%2Cwebp" alt="img" style="zoom:50%;" />](https://leetcode.cn/u/xiao_ben_zhu/) [一步步解释滑动窗口 | 76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/solution/yi-bu-bu-xing-cheng-hua-dong-chuang-kou-si-lu-shen/)

```js
// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
//     对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
//     如果 s 中存在这样的子串，我们保证它是唯一的答案。
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (s.length < t.length) {
    return "";
  }
  // 将t字符串都存在map里面，并定义需要找齐的种类数。
  const tmap = new Map();
  let missType = 0;
  for (const item of t) {
    if (!tmap.has(item)) {
      missType++;
      tmap.set(item, 1);
    } else {
      let value = tmap.get(item) + 1;
      tmap.set(item, value);
    }
  }
  console.log(tmap);

  // 对s字符串进行滑动窗口
  let minL = s.length + 1;
  let left = 0;
  let start = s.length;
  for (let right = 0; right < s.length; right++) {
    // 对窗口内每一个字符进行在 Map 中比对。
    let rightStr = s[right];
    if (tmap.has(rightStr))
      tmap.set(rightStr, tmap.get(rightStr) - 1);
    if (tmap.get(rightStr) === 0) missType--;
    while (missType === 0) {
      // 这里会出现一个新的长度
      //   minL = Math.min(right - left + 1, minL);
      //   start = left;
      if (right - left + 1 < minL) {
        minL = right - left + 1;
        start = left;
      }
      // 优化滑动窗口，缩短距离
      let leftStr = s[left];
      if (tmap.has(leftStr))
        tmap.set(leftStr, tmap.get(leftStr) + 1);
      if (tmap.get(leftStr) > 0) missType++;
      left++;
    }
  }
  console.log(start, minL, left);
  console.log(minL === s.length + 1 ? "" : s.substring(start, start + minL));
  return minL === s.length + 1 ? "" : s.substring(start, start + minL);
};
minWindow("ewcwaef", "cae");
```

一直出错原因：在`while`下对`minL`的赋值。我想着是找到最小的窗口长度嘛。但是忘记了只有新的【窗口长度：`right-left+1`】更小的时候，才更新这个`start`。:bulb: 有想过把start去掉，直接通过left来定义左边界。但是你其实是不知道**上次left++之后，missType还为0时的left值，此时就是start**。所以这是不可行的。

知识点：

:ear: 1. 第一个肯定就是这个Map。对Map和Set其实有一些一知半解的感觉。现在了解了，觉得Map是一个相对更加自由的数据类型。

[Map](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Map) 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键（key）。

它的方法和属性如下：

- `new Map()` —— 创建 map。
- `map.set(key, value)` —— 根据键存储值。
- `map.get(key)` —— 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` —— 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` —— 删除指定键的值。
- `map.clear()` —— 清空 map。
- `map.size` —— 返回当前元素个数。

在题目中是要设置key的值嘛，如果之前就有值，这个value值只能通过map.get(key)来实现。本来也想通过map[key]这个属性就方便很多。但是既然有限制，那就减少用法。但在本题中是可以的。因为支持string。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230206171010613.png" alt="image-20230206171010613" style="zoom:80%;" />

```js
const tmap = new Map();
  let missType = 0;
  for (const item of t) {
    if (!tmap.has(item)) {
      missType++;
      tmap.set(item, 1);
    } else {
      let value = tmap.get(item) + 1;
      tmap.set(item, value);
    }
  }
```

返回类似格式的 `Map(3) { 'c' => 1, 'a' => 1, 'e' => 1 }`

:ear: 2. 滑动窗口left一旦右移，就要舍弃当前的值 `s[left]`

:ear: 3. 特别设计：**missType和start** 



## 循环不变量原则

:punch: [代码随想录链接：59.螺旋矩阵II](https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC)

### 【59】. 螺旋矩阵II

:punch: [leetcode题目链接：59.螺旋矩阵II](https://leetcode.cn/problems/spiral-matrix-ii/solution/)

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  // 二维数组初始化
  const nums = new Array();
  for (let index = 0; index < n; index++) {
    nums[index] = [];
  }
  let startX = 0;
  let startY = 0;
  let loop = Math.floor(n / 2); // 旋转圈数
  let offset = 1;
  let count = 1;
  while (loop) {
    for (j = startY; j < n - offset; j++) {
      nums[startX][j] = count++;
    }
    for (i = startX; i < n - offset; i++) {
      nums[i][j] = count++;
    }
    for (j = n - offset; j >= offset; j--) {
      nums[i][j] = count++;
    }
    
    for (i = n - offset; i >= offset; i--) {
      nums[i][j] = count++;
    }
    // 更新起始位置
    startX++;
    startY++;
    offset+=1;
    loop--; 
  }
  if (n % 2 === 1) {
    let mid = Math.floor(n / 2);
    nums[mid][mid] = count;
  }
  console.log(nums)
  return nums;
};
generateMatrix(5);
// console.log(Math.floor(3/2)) // 1 向下取整

```

:ear: 当然还是听了卡尔老师的b站讲解，理解之后做出来的题目。首先困住我的是二维数组的初始化哈哈。

:bulb: 1. 创建一个Array类型，然后是已知行和列。使每一行的元素都是一维数组`[]`即可。

:bulb: 2. 思路大概是：参考别人的图：我注释：

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230206211159409.png" alt="image-20230206211159409" style="zoom:80%;" />

:question: 在判断n为奇数时，用`nums[loop][loop]`赋值是不行的。尽管初始值是一致的，但是loop是一直在变化的。循环结束时loop已经变为0了。

:bulb: 另一种：定义四个边界，一圈一圈进行遍历，直到`left>right`

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    let matrix = new Array(n)
    for(let index = 0; index < n; index++) {
        matrix[index] = []
    }
    // 定义上左下右边界
    let t = 0
    let l = 0
    let b = n - 1
    let r = n - 1
    count = 1
    while(true) {
        // 从左到右
        for(let i = l; i <= r; i++) {matrix[t][i] = count++}
        if(++t > b) break // 第一层遍历完了上边界应自增1后与下边界比较若大于下边界则说明遍历完毕
        // 从上到下
        for(let i = t; i <= b; i++) {matrix[i][r] = count++}
        if(--r < l) break // 最后一列遍历完了右边界应自减1后与左边界比较若小于左边界则说明遍历完毕
        // 从右到左
        for(let i = r; i >= l; i--) {matrix[b][i] = count++}
        if(--b < t) break // 最后一层遍历完了下边界应自减1后与上边界比较若小于上边界则说明遍历完毕
        // 从下到上
        for(let i = b; i >= t; i--) {matrix[i][l] = count++}
        if(++l > r) break // 第一行遍历完了左边界应自增1后与右边界比较若大于右边界则说明遍历完毕
    }
    console.log(matrix)
    return matrix
}
generateMatrix(5);
```



### [【54】. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

:question: 因为这道题和上道题不同的在于，上道题是 `n*n`，所以只需要考虑奇数的特殊情况，但是这道题是可以有不同的行列的。

所以使用四个边界来判断更好。对了，while循环的条件还可以是 `list.lenght < m*n`

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let m = matrix.length; // 行
  let n = matrix[0].length; // 列
  let top = 0;
  let bottom = m - 1;
  let left = 0;
  let right = n - 1;
  let list = [];
  while (left < right && top < bottom) {
    for (let i = left; i < right; i++) {
      list.push(matrix[top][i]);
    }
    for (let i = top; i < bottom; i++) {
      list.push(matrix[i][right]);
    }
    for (let i = right; i > left; i--) {
      list.push(matrix[bottom][i]);
    }
    for (let i = bottom; i > top; i--) {
      list.push(matrix[i][left]);
    }
    top++;
    right--;
    bottom--;
    left++;
  }
  // while遍历环之后，剩下的一行一列或一个就没被遍历到。
  // 剩下一行：left<right&&top=bottom
  // 剩下一列：top<bottom&&left===right
  // 剩下一个：top===bottom&&left===right
  if (top === bottom) {
    for (let i = left; i <= right; i++) {
      list.push(matrix[top][i]);
    }
  } else if (left === right) {
    for (let i = top; i <= bottom; i++) {
      list.push(matrix[i][right]);
    }
  }
  return list;
};
console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
);

```



## 总结：

![数组总结](https://code-thinking-1253855093.file.myqcloud.com/pics/数组总结.png)

1. **数组在初始化后长度不可变**

2. **数组中插入或删除元素效率低下**。 时间复杂度高 O(N)，可能造成元素丢失或内存浪费。

   数组插入时将元素依次向后移动一位，删除时相反，向前移动覆盖掉要删除的元素。

3. 常见操作：遍历`for...of`，查找`find(nums,target)`
