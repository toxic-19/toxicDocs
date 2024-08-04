---
title: 链表1
date: 2022-01-08
tags:
 - 数据结构
categories:
 - 算法
sidebar: 'auto'
---



## [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

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

:bulb: 创建一个节点并指向head节点：`const dummyHead = new ListNode(0,head)`

:bulb: 令当前指针`current`为虚拟头指针`hummyNode`，并不是指向。是在同一个位置。`current = hummyNode` 和 `current = current.next` 就是让当前指针移动到下一个位置上。

![image-20230307171221425](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230307171221425.png)

![image-20230307183012505](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230307183012505.png)



## [707. 设计链表](https://leetcode.cn/problems/design-linked-list/)

```js
// 定义一个结点：数据及下一个结点的地址
class Node {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}
var MyLinkedList = function () {
    // 初始化单链表；只有头结点
    this._size = 0;
    this._header = null;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    // 首先index的范围必须在0-size-1之间
    if (index >= 0 && index < this._size) {
        return this.getNode(index).val;
    }
    return -1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    const node = new Node(val);
    // 判断是否是空链表
    if (this._header === null) {
        this._header = node;
    } else {
        node.next = this._header;
        this._header = node;
    }
    this._size++;
    return true;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    const node = new Node(val, null);
    // 目前是空链表
    if (this._header === null) {
        this._header = node;
    } else {
        // 需要找到最后一个结点
        let current = this.getNode(this._size - 1);
        // 循环结束之后current就是最后一个结点
        current.next = node;
    }
    this._size++;
    return true;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    const node = new Node(val);
    // 判断index的合法性和链表的长度
    if (this._header === null) {
        if (index === 0) {
            this._header = node;
            this._size++;
        } else {
            return false;
        }
    } else {
        if (index > 0 && index < this._size) {
            // 获取到index-1索引的node
            const prev = this.getNode(index - 1);
            node.next = prev.next;
            prev.next = node;
            this._size++;
        } else {
            if (index === 0) {
                this.addAtHead(val);
            }
            if (index === this._size) {
                this.addAtTail(val);
            }
        }
        
    }
    return false;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index === 0) {
        this._header = this._header.next;
    }
    else if (index > 0 && index < this._size) {
        let prev = this.getNode(index - 1);
        let current = prev.next;
        prev.next = current.next;
    } else {
        return false;
    }
    this._size--;
    return true;
};

// 自建getNode函数：获取到index索引下的node节点，与get相似
MyLinkedList.prototype.getNode = function (index) {
    // 首先index的范围必须在0-size-1之间
    if (index >= 0 && index < this._size) {
        let current = this._header;
        // 遍历index次，找到当前节点
        for (let i = 0; i < index; i++) {
            // current 从0开始，移动index次
            current = current.next;
        }
        return current;
    }
    return undefined;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * 
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * 
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```

在 [JS数据结构与基础](./js-structure.md)中有封装单双链表等。算是比较得心应手，如果对链表基础不太行的，可以检验一下。



## [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```js
var reverseList = function (head) {
    // 当前结点
    let current = head;
    // 前一个结点
    let pre = null;
    // 存储current的下一个结点
    let temp;
    while (current) {
        temp = current.next;
        current.next = pre;
        pre = current;
        current = temp;
    }
    return pre;
};
```

这次依然使用常用的双指针法。



## [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // 创建一个虚拟头结点,指向链表
    let dummyNode = new ListNode(0,head);
    // 创建一个打手进行遍历
    let temp = dummyNode;

    while(temp.next && temp.next.next){
        // 第一个节点
        let pre = temp.next;
        // 第二个节点
        let current = temp.next.next;

        // 开始交换
        pre.next = current.next;
        current.next = pre;
        temp.next = current;

        // current位置向前
        temp = pre;
    }
    return dummyNode.next;
};
```

注意交换的顺序：![image-20230309000516610](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230309000516610.png)

![image-20230307230838867](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230307230838867.png)



## [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

1. 要求一次遍历：只好使用快慢指针。
2. 推理：如果链表长度为5，n为2；那么`slow`则指向2，`fast`此时要指向`null`

 ![image-20230309002132023](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230309002132023.png)

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 定义虚拟头结点
    let dummyNode = new ListNode(0,head);
    // 定义快慢指针
    let fast = dummyNode;
    let slow = dummyNode;
    while(n+1){
        // fast指针向后移动n+1次
        fast = fast.next;
        n--;
    }
    while(fast){
        // fast与slow同时移动直到fast指向null
        fast = fast.next;
        slow = slow.next;
    }
    // 此时slow指向要删除的前一个结点
    slow.next = slow.next.next;
    return dummyNode.next;
};
```



