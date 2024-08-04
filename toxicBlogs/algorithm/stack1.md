---
title: 栈与队列
date: 2022-03-10
tags:
 - 数据结构
categories:
 - 算法
sidebar: 'auto'
---

## [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

```js
var MyQueue = function() {
    // 需要使用两个栈来模拟
    // 输入栈
    this.stackIn = [];
    // 输出栈
    this.stackOut = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    // 要先看看输出栈还有没有！因为之前可能没有pop完。
    if(this.stackOut.length){
        return this.stackOut.pop();
    }
    // 如果输出栈没有值了，那就要去输入栈了。
    // 确保输入栈不是空的
    while(this.stackIn.length){
        // 输出栈有东西啦！此时循环结束；输入栈就是空的。
        this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    // 返回栈顶；直接找到pop出去的值。再push回去
    const peekEle = this.pop();
    this.stackOut.push(peekEle);
    return peekEle;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.stackOut.length && !this.stackIn.length;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue();
 * obj.push(x);
 * var param_2 = obj.pop();
 * var param_3 = obj.peek();
 * var param_4 = obj.empty();
 */
var queue = new MyQueue();
```

