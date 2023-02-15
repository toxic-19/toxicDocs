---
title: 数组2——双指针法
date: 2022-12-8
tags:
 - 数组
categories:
 - 算法
sidebar: 'auto'
---



## 1. 移除元素

:punch: [代码随想录移除元素链接](https://programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html#_27-%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0)

:punch: [力扣题目链接【27.移除元素】](https://leetcode.cn/problems/remove-element/)

#### 前提：

:expressionless: 不要使用额外的数组空间；原地修改数组。

#### 暴力算法来一波

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let size = nums.length;
    for(let i = 0;i<size;i++){
        if(nums[i]===val){
            // 如果找到了这个索引，就将后面的元素依次向前覆盖
            for(let j=i+1;j<size;j++){
                nums[j-1] = nums[j];
            }
            i--;
            size--;
        }
    }
    return size;
};
```

1. 数组移除元素只能通过覆盖的方式，找到相同的数值，再在这后面一个一个地往前移动。
2. 索引为`i`的数组元素被覆盖，所以这个新的索引为`i`的数组元素也要比较一下，所以覆盖结束之后，`i--，size--`



#### 双指针法【快慢指针法】

:punch: 使用一层for循环做了暴力解法的两层for循环做的事。

:notebook: 快指针指向新数组所需要的元素；慢指针指向需要更新的元素下标；**快指针获取到的值赋给慢指针**。

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // 定义快慢指针
    let slow = 0;
    for(let fast=0;fast<nums.length;fast++){
        // nums[fast]!==val时，是我们新数组所需要的元素
        if(nums[fast]!==val){
            nums[slow] = nums[fast];
            slow++;
        }
    }
    // 因为赋值完之后执行slow++;刚好是新数组长度：索引+1
    return slow;
};

// 执行用时：52 ms, 在所有 JavaScript 提交中击败了95.79% 的用户
// 内存消耗：41.2 MB, 在所有 JavaScript 提交中击败了14.79% 的用户
```

> ​      nums= [2,3,4,2,3]  val=3
>
> 1. fast=0; slow=0; nums[0]!==3 ==> nums[0] =nums [0]    **slow++**
>
> 2. fast=1; slow=1; nums[1]==3  ==> 不作为
>
> 3. fast=2; slow=1; nums[2]!==2 ==> nums[2] = nums[1]

## 其他题目

### [【26.】删除排序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length === 0) return 0;
    if(nums.length === 1) return 1;
    let slow = 1;
    for(let fast = 1;fast<nums.length;fast++){
        if(nums[fast] !== nums[fast-1]){
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
};
// 执行用时：64 ms, 在所有 JavaScript 提交中击败了90.36% 的用户
// 内存消耗：44 MB, 在所有 JavaScript 提交中击败了27.99% 的用户
```

:punch: slow为1，fast为1 。

:punch: 比较索引`1`和索引`0`，如果相等就不赋值。

:punch:  不相等就令索引为 `fast` 的值赋值给索引为 `slow` 的，同时 `slow` 加一。

:red_circle: 比较对象是`fast`和`fast`之前的数值。一旦不同，说明重复结束。就可以赋值啦

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (!nums.length) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if(nums[fast]!==nums[slow]){
            slow++;
            nums[slow]=nums[fast];
        }
    }
    return slow+1;
}
// 执行用时：76 ms, 在所有 JavaScript 提交中击败了49.23% 的用户
// 内存消耗：43.9 MB, 在所有 JavaScript 提交中击败了40.52% 的用户
```

:punch: 将当前快指针与慢指针对应的元素相比较。相等就不赋值，不等就令慢指针加一，再赋值。

:punch: 因为`slow`指的是索引，所以最后新数组的长度应为`slow+1`；



### [【283.】移动零](https://leetcode.cn/problems/move-zeroes/)

:nerd_face: 不是0的就往前移动。剩下的补0。据说这个方法是法外之地。

```js
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 第一思路：把0的覆盖掉，后面再补上0
    let slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    for (let i = slow; i < nums.length; i++) {
        nums[i] = 0;
    }
    console.log(nums);
};

moveZeroes([0, 1, 0, 3, 12]);

// 执行用时：76 ms, 在所有 JavaScript 提交中击败了94.36% 的用户
// 内存消耗：46 MB, 在所有 JavaScript 提交中击败了13.03% 的用户
```



### [【844.】比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)

:punch: 双指针分别指向两个字符串的最后一个字符

1. 如果最后一个字符不相等，就可以直接返回`false`。
2. `s`遇到`#`后，指针向前；存在`#`，指针再向前。`t`字符串也是一样。
3. 将`s[i]`与`t[j]`进行比较。

```js
// 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true。
// # 代表退格字符。
// 注意：如果对空文本输入退格字符，文本继续为空。
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    let i = s.length - 1;
    let j = t.length - 1;
    let skipS = 0;
    let skipT = 0;
    while (i >= 0 || j >= 0) {  // 1.
        // s字符串循环
        while (i >= 0) {
            if (s[i] === '#') {
                skipS++;
                i--;
            } else if (skipS > 0) {
                skipS--;
                i--;
            } else break;
        }
        // t字符串循环
        while (j >= 0) {
            if (t[j] === '#') {
                skipT++;
                j--;
            } else if (skipT > 0) {
                skipT--;
                j--
            } else break;
        }
        // 进行比较  // 2. 
        if (s[i] !== t[j]) return false;
        // 比较过一次，i和j都要--
        i--;
        j--;
    }
    return true;
};
console.log(backspaceCompare("bbbextm","bbb#extm"));
// 执行用时：76 ms, 在所有 JavaScript 提交中击败了12.18% 的用户
// 内存消耗：41.3 MB, 在所有 JavaScript 提交中击败了73.22% 的用户
```

注解：1. 相互比较的两个字符串不一定是相同长度的，所以相同次数的循环会导致有一方还是大于0，另一个还是小于0，这种情况还是要继续比较。所以选择 或`||`

2. 其实是将选择好的【去掉#和被#退格的字符】i与选择好的j进行比较



### [【977.】有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

```js
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    // 最前面定义一个指针
    let i = 0;
    // 最后面定义一个指针
    let j = nums.length-1;
    let k = nums.length-1;
    let arr = new Array(nums.length).fill(0);
    while(i<=j){    // 1. 
        let right= nums[j]*nums[j];
        let left = nums[i]*nums[i];
        if(left<right){
            arr[k--] = right;  // 2. 
            j--;
        }else{
            arr[k--] = left;
            i++;
        }
    }
    return arr;
};
sortedSquares([-7,-3,2,3,11]);
```

注解：1. 此处 `i=j` 时循环继续：指向同一个索引的数组元素时也要比较。否则就落下一个元素了。

2. `arr[k--] = right` 是将`right`值赋值给  `arr[k] ` 再执行  `k--`

