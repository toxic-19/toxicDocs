---
title: 链表第一天
date: 2022-12-8
tags:
 - 链表
categories:
 - 算法
sidebar: 'auto'
---



## [【203】. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

1. 感觉每次看都会被 `cur = cur.next` 给疑惑到。但是可以理解 `cur.next = cur.next.next` 
2. 我一直理解的是  `cur.next ` 指的就是**箭头指向的元素**。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230208182933003.png" alt="image-20230208182933003" style="zoom:80%;" />

 ![image-20230208184939136](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230208184939136.png)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    // 创建一个虚拟头结点,指向头结点
    const dummyNode = new ListNode(0);
    dummyNode.next = head;
    // 要遍历的当前指针为current,指向虚拟头指针
    let current = dummyNode;
    // 我们要删除某一个节点时，current要指向这个节点之前的节点。
    // 头节点时，指向虚拟节点
    // 非头结点时，指向该节点的前一个节点。
    // 持续删除的过程，所以使用while
    while (current) {  // current.next里面存在要被删除的节点。要确保它是有值的
        if (current.next.val === val) {
            current.next = current.next.next;
        }else{
            // 类似于指针后移
            current = current.next;
        }

    }
    console.log(dummyNode.next)
    return dummyNode.next;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

removeElements([1, 2, 6, 3, 4, 5, 6], 6)

```

:bulb: 创建一个节点并指向head节点：`const dummyHead = new ListNode(0,head)`

:bulb: 令当前指针`current`为虚拟头指针`hummyNode`，并不是指向。是在同一个位置。`current = hummyNode` 和 `current = current.next` 就是让当前指针移动到下一个位置上。