---
title: 数组第一天
date: 2022-12-8
tags:
 - 数组
categories:
 - 算法
sidebar: 'auto'
---


## 数组

### 1. 二分查找

[1.《代码随想录二分查找链接》](https://programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html)  [2. leetcode题目链接：704二分查找](https://leetcode.cn/problems/binary-search/)

#### 前提

:expressionless:：数组为有序数组；数组中无重复元素。

#### 数组万物for循环:nerd_face:

还没看二分法的第一个想法：

```js
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    for(let i=0;i<nums.length;i++){
        if(target === nums[i]){
            return i;
        }
    }
    return -1;
};
// 直接使用for循环进行比较
// 执行用时：68 ms, 在所有 JavaScript 提交中击败了41.91% 的用户
// 内存消耗：43.7 MB, 在所有 JavaScript 提交中击败了95.55% 的用户
```

#### 二分法

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // 左闭右闭
  let left = 0;
  let middle;
  let right = nums.length - 1;
  while (left <= right) {
    middle = left + ((right - left) >> 1); // 首尾相加 ÷ 2   // 1.注解 2.注解 3.注解
    if (target > nums[middle]) {
      // 往右边找：
      left = middle + 1;
    } else if (target < nums[middle]) {
      right = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
};

console.log(search([-1,0,3,5,9,12], 2));   // -1
// console.log(8 >> 2); // 1000 == 0010 向右移动
// console.log(7 >> 2); // 0111 == 0001 可以避免出现小数的情况

// 执行用时：48 ms, 在所有 JavaScript 提交中击败了99.58% 的用户
// 内存消耗：43.8 MB, 在所有 JavaScript 提交中击败了90.00% 的用户

```

1. 注解：什么是溢出 : 如果两个值接近int类型的最大值，两个值相加就溢出超出int最大值。
2. 注解：取中间值使用left+(right-left)/2 虽然结果一致；但是计算结果不会产生溢出；如果两个值都很大，结果就不会超出；因为在right-left就变小了。
3. 注解：目前使用的是 `((right - left) >> 1)` 来代替除法。因为 `middle` 的值是确定需要整数索引的，使用移位运算比较方便。

4. 图解：【其实debugger也可以直接看到各个值之间的变化】

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221217001046913.png" alt="image-20221217001046913" style="zoom:80%;" />



### 2. 相关题型

#### 【35】. 搜索插入位置 

[1. leetcode题目链接：35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/)   ： 在二分查找索引的基础上多了一个按顺序插入的步骤。

##### 还得是for循环

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    for(let i = 0;i<nums.length;i++){
        if(nums[i]>=target){
            return i;
        }
    }
    // 数组中所有元素都比target小。
    // 在数组所有元素之后：
    return nums.length;
};

// 执行用时：56 ms, 在所有 JavaScript 提交中击败了85.42% 的用户
// 内存消耗：41.1 MB, 在所有 JavaScript 提交中击败了63.96% 的用户
```

##### 二分查找的基础上

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const middle = left + ((right - left) >> 1);
    if(target > nums[middle]){
        left = middle + 1;
    }else if(target<nums[middle]){
        right = middle -1;
    }else{
        return middle;
    }
  }
  // 以上部分都和原先的二分法一模一样。
  return right+1;  // 重点在于找到要插入的位置的索引。 注解1
};

console.log(searchInsert([-1,0, 3, 5, 9,12], 10));
// 执行用时：52 ms, 在所有 JavaScript 提交中击败了94.93% 的用户
// 内存消耗：41.1 MB, 在所有 JavaScript 提交中击败了51.76% 的用户
```

注解1：在跳出循环之后，说明 `left > right` 。在之前的一次比较中：`left = right =middle ; target > right ; 执行了 right = middle -1 ;` 才会出现 `left>right` 的情况。

图解：标记错了，下一个③为④。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221217130331527.png" alt="image-20221217130331527" style="zoom: 50%;" /><img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221217130425435.png" alt="image-20221217130425435" style="zoom: 50%;" />

#### 【34】. 查找索引范围

[1. leetcode题目链接：34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221217150519323.png" alt="image-20221217150519323" style="zoom:80%;" />



#### [【69】. x 的平方根 ](https://leetcode.cn/problems/sqrtx/)

