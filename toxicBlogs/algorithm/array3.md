---
title: 数组第三天
date: 2022-12-8
tags:
 - 数组
categories:
 - 算法
sidebar: 'auto'
---


## 数组

### 1. 滑动窗口思想

:punch: [代码随想录链接](https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html)

:punch: [力扣题目链接【209.长度最小的子数组】](https://leetcode.cn/problems/minimum-size-subarray-sum/)

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

