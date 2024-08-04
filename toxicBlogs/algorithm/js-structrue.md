---
title: 数据结构基础
date: 2022-02-16
tags:
 - 数据结构
categories:
 - 算法
sidebar: 'auto'
sticky: 1
---

##  1. 栈结构-`stack`

### 1.1. 封装栈结构

```js
class Stack{
    // ES13私有变量定义
    #items = []
    // 在栈顶添加元素
    push(data){
        this.#items.push(data)
    }
    // 在栈顶移除元素
    pop(){
        this.#items.pop()
    }
    // 返回栈顶元素
    peek(){
        // return this.#items[this.#items.length-1];
        return this.#items.at(-1);
    }
    // 判断是否为空
    isEmpty(){
        return this.#items.length === 0
    }
    // 清空栈
    clear(){
        this.#items = []
    }
    // 返回栈长度
    size(){
        return this.#items.length;
    }
    toString(){
        return this.#items.join("-")
    }
}
let stack = new Stack();
```

### 1.2. 应用栈结构

**辗转相除法——进制转化**

```js
function convert(decNumber, base) {
  let remStack = new Stack();
  let number = decNumber;
  let string = "";
  let baseString = "0123456789ABCDEFG"
  while (number > 0) {
    remStack.push(number % base);
    number = Math.floor(number / base);
  }
  while (!(remStack.isEmpty())) {
    // string += remStack.pop();
    string += baseString[remStack.pop()]
  }
  console.log(string)
  return string;
}
convert(500,16)
```

## 2. 队列结构-`queue`

:punch: 先进先出。`FIFO` 

:punch: 单线程JS的异步机制：宏任务和微任务

### 2.1. 封装

:eye: 其实同样的也是基于数组来实现。同上面栈的封装。是类似的。

```js
// 队列结构封装
class Queue {
  #queue = [];
  // 在队尾添加元素
  enQueue(data) {
    this.#queue.push(data);
  }
  // 在队头删除元素
  deQueue() {
    this.#queue.shift();
  }
  // 返回队头元素
  front() {
    return this.#queue.at(0);
  }
  // 以下内容就和栈结构一致了。
  // isEmpty() size() clear() toString()
}
let queue = new Queue();
```

:bulb: `shift()`：弹出数组最前面的一个元素，然后后面的元素依次向前移动。如果队列长度足够多，那就会导致性能不好。

:bulb: 如果使用 `delete ` 那么删除结束的数组会有 empty占位。采取对象在删除其中元素方面性能好的多。

:small_red_triangle: 所以采取对象的形式进行封装。

```js
// 队列结构封装
class Queue {
  // 定义队列为对象格式
  #queue = {};
  // 队列中的第一个索引
  #lowIndex = 0;
  // 队列中添加的元素数量
  #count = 0;
  // 在队尾添加元素
  enQueue(data) {
    this.#queue[this.#count] = data;
    this.#count++;
  }
  // 在队头删除元素
  deQueue() {
    if (this.isEmpty()) {
      return undefined;
    }
    let res = this.#queue[this.#lowIndex];
    delete this.#queue[this.#lowIndex];
    this.#lowIndex++;
    return res;
  }
  // 返回队头元素
  front() {
    return this.#queue[this.#lowIndex];
  }

  isEmpty() {
    return this.size() === 0;
  }
  // 清空栈
  clear() {
    this.#queue = {};
    this.#count = 0;
    this.#lowIndex = 0;
  }
  // 返回栈长度
  size() {
    return this.#count - this.#lowIndex;
  }
  toString() {
    let str = "";
    for (let i = this.#lowIndex; i < this.#count; i++) {
      str += this.#queue[i];
    }
    return str;
  }
}
let queue = new Queue();
```

### 2.2. 应用

**击鼓传花**

```js
// 击鼓传❀
function game(list, num) {
  // 把游戏参与者都放到队列中去
  let queue = new Queue();
  for (let i = 0; i < list.length; i++) {
    queue.enQueue(list[i]);
  }
  while(queue.size()>1){
    for(let i = 0;i<num;i++){
        // 从队头删除 追加到队尾上
        queue.enQueue(queue.deQueue())
    }
    // 当前的队头即为拿到❀的人。被淘汰。然后继续循环
    queue.deQueue()
  }
  console.log(queue.deQueue()+" winner") 
  return queue.deQueue()+" winner"
}
// 传参：游戏参与者以及击鼓次数
game(["kervin1", "mary", "tom", "tina", "hello"], 7);
```

> 这个游戏是绕一个圈进行的。这种形式的要使用队列喔

## 3. 双端队列结构

### 3.1. 封装

> 主要比起队列结构多了：
>
> 1. 在队头添加：如果lowIndex为0，需要把所有元素都向右移动一位。性能不好。
> 2. 在队尾删除

```js
// 双端队列封装
class Queue {
  // 定义队列为对象格式
  #queue = {};
  // 队列中的第一个索引
  #lowIndex = 0;
  // 队列中添加的元素数量
  #count = 0;

  // 在队尾添加元素
  addBack(data) {
    this.#queue[this.#count] = data;
    this.#count++;
  }
  // 在队头删除元素
  deleteFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    let res = this.#queue[this.#lowIndex];
    delete this.#queue[this.#lowIndex];
    this.#lowIndex++;
    return res;
  }

  // 在队尾删除元素
  deleteBack() {
    if (this.isEmpty()) {
      return;
    }
    this.#count--;
    let res = this.#queue[this.#count];
    delete this.#queue[this.#count];
    return res;
  }
  // 在队头添加元素
  addFront(data) {
    // 1. 该队列还是空的,加进去就是0索引
    if (this.isEmpty()) {
      this.#queue[0] = data;
      this.#count++;
    } else {
      // 2. 第一个索引不为0
      if (this.#lowIndex > 0) {
        this.#lowIndex--;
        this.#queue[this.#lowIndex] = data;
      }
      // 3. lowIndex为0，整体向后移动
      for (let i = this.#count - 1; i >= 0; i--) {
        this.#queue[i + 1] = this.#queue[i];
      }
      this.#queue[0] = data;
      this.#count++;
    }
  }

  // 返回队头元素
  front() {
    return this.#queue[this.#lowIndex];
  }
  // 返回队尾元素
  peekBack() {
    return this.#queue[this.#count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }
  // 清空栈
  clear() {
    this.#queue = {};
    this.#count = 0;
    this.#lowIndex = 0;
  }
  // 返回栈长度
  size() {
    return this.#count - this.#lowIndex;
  }
  toString() {
    let str = "";
    for (let i = this.#lowIndex; i < this.#count; i++) {
      str += this.#queue[i];
    }
    return str;
  }
}
let queue = new Queue();
```

### 3.2. 应用

**回文判断**

```js
// 回文
function isPalindrome(str) {
  // 去除空格
  let resStr = str.toLowerCase().split(" ").join("");
  let queue = new Queue();
  for (let i = 0; i < resStr.length; i++) {
    queue.addBack(resStr[i]);
  }
  console.log(queue)
  let isEquel = true;
  while (queue.size() > 1) {
    if (queue.deleteFront() !== queue.deleteBack()) {
      isEquel = false;
      break;
    }
  }
  return isEquel;
}
isPalindrome("Da     d");
```

> 1. `split(" ")` ：根据空格将字符串分割开。
> 2. `join("")`：再将分隔开的内容合并。满足去除空格。
> 3. 将元素都存进队列中，剔除队首和队尾的元素进行pk。



## 4. 单链表

不定长度不定数据的存储。

:punch:优缺点：

1. 插入和删除的效率高只需要改变指针的指向即可。`O(1)`
2. 随机访问某个元素的效率低，需要遍历整个链表。`O(n)`
3. 相对于数组，内存空间消耗更大，因为添加了结点指针域。

**封装**

1. 定义一个结点包括数据与指针即`data and next`

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkedList {
  // 链表长度
  #count = 0;
  // 链表的头结点
  #header = null;
}

let list = new LinkedList();

```

2. 定义一个链表，包括多个操作方法：

### `push(data)`

+ `push(data)`：在链尾插入data，用户输入数据即可，其余的由push方法内部处理。

```js
// 在链尾插入
  push(data) {
    let node = new Node(data);
    // 1. 还是一个空的链表
    if (this.#header === null) {
      this.#header = node;
    } else {
      // 2. 需要找到链尾，再让链尾指向新节点
      let current = this.#header;
      while (current.next !== null) {
        current = current.next;
      }
      // 此时current就是链尾的位置
      current.next = node;
    }
    this.#count++;
  }
```

> 理解`current = current.next` ：current节点 指向 current的下一个节点   <u>即  `header`  的下一个  `node1`</u>。
>
> 直到找到链尾即  `current.next`  为  `null`  了就不再找。

 ![image-20230228130041494](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230228130041494.png)

 ![image-20230228130300753](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230228130300753.png)



### `removeAt(index)`

+ 删除指定位置上【索引】的元素。返回被删除的元素data.

```js
// 指定索引删除元素
    removeAt(index) {
        if (index >= 0 && index < this.#count) {
            // 存放要删除的元素
            let current = this.#header;
            // 1. 删除第一个元素
            if(index===0){
                this.#header = this.#header.next;
            }else{
                // 删除中间索引的元素
                let previous;
                for(let i = 0;i<index;i++){
                    previous = current;
                    current = current.next;
                }
                // 此时current的值就是当前要删除的值。
                // previous的值就是前一个
                previous.next = current.next;
            }
            this.#count--;
            return current.element;
        }
        return;
    }
```

 ![image-20230228144309000](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230228144309000.png)

> ①. 初始化：`current = this.#header`  让  `current`  节点同 `header` 一样指向第一个节点。
>
> ②. 进去循环：`previous = current`  此时  `current`  和 `previous` 指向同一个节点。
>
> ③.  ` current = current.next` ：current 结点移动到下一位。直到  current.next  是  index 为止。
>
> 所以循环中   ` i<index`  i是移动的次数。是index-1次移动。 可以使用具体值进行验证。



**抽离业务**：获取到该索引对应的node节点。

```js
getNodeAt(index) {
    if (index >= 0 && index < this.#count) {
        let node = this.#header;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }
    return;
}
```

> 令node指向第一个节点。再依次遍历。

.

**封装**

### **`removeAt(index)`**

```js
 // 指定索引删除元素
removeAt(index) {
    if (index >= 0 && index < this.#count) {
        // 存放要删除的元素
        let current = this.#header;
        // 1. 删除第一个元素
        if (index === 0) {
            this.#header = this.#header.next;
        } else {
            // 分别获取到previous节点和current节点
            let previous = this.getNodeAt(index-1);
            current = previous.next;
            previous.next = current.next;
        }
        this.#count--;
        return current.element;
    }
    return;
}
```

### `remove(element)`

```js
// 指定element删除node节点
    remove(element) {
        // 找到element所在的index
        let index = this.indexOf(element);
        // 调用removeAt(index)
        this.removeAt(index);
    }

    indexOf(element) {
        let current = this.#header;
        // 遍历整个链表
        for (let i = 0; i < this.#count; i++) {
            // 这个相等只是基本数据类型的相等
            if (element === current.element) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
```

### 总体封装

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkedList {
  // 链表长度
  #count = 0;
  // 链表的头结点
  #header = null;

  // 在链尾插入
  push(data) {
    let node = new Node(data);
    // 1. 还是一个空的链表
    if (this.#header === null) {
      this.#header = node;
    } else {
      // 2. 需要找到链尾，再让链尾指向新节点
      let current = this.#header;
      while (current.next !== null) {
        current = current.next;
      }
      // 此时current就是链尾的位置
      current.next = node;
    }
    this.#count++;
  }

  // 指定索引删除元素
  removeAt(index) {
    if (index >= 0 && index < this.#count) {
      // 存放要删除的元素
      let current = this.#header;
      // 1. 删除第一个元素
      if (index === 0) {
        this.#header = this.#header.next;
      } else {
        // 删除中间索引的元素
        let previous = this.getNodeAt(index - 1);
        current = previous.next;
        // 此时current的值就是当前要删除的值。
        // previous的值就是前一个
        previous.next = current.next;
      }
      this.#count--;
      return current.element;
    }
    return;
  }
  getNodeAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#header;
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
      return node;
    }
    return;
  }

  // 指定element删除node节点
  remove(element) {
    // 找到element所在的index
    let index = this.indexOf(element);
    // 调用removeAt(index)
    this.removeAt(index);
  }

  indexOf(element) {
    let current = this.#header;
    // 遍历整个链表
    for (let i = 0; i < this.#count; i++) {
      // 这个相等只是基本数据类型的相等
      if (element === current.element) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // 在固定索引下 插入元素
  insert(element, index) {
    let node = new Node(element);
    if (index >= 0 && index <= this.#count) {
      if (index === 0) {
        node.next = this.#header;
        this.#header = node;
      } else {
        let previous = this.getNodeAt(index - 1);
        if (previous.next !== null) {
          node.next = previous.next;
        }
        previous.next = node;
      }
      this.#count++;
      return true;
    }
    return false;
  }

  isEmpty() {
    return this.size()===0;
  }
  size() {
    return this.#count;
  }
  getHeader(){
    return this.#header;
  }
  toString(){
    let str=""
    for(let i = 0;i<this.#count;i++){
        str+=this.getNodeAt(i).element+" ";
    }
    return str;
  }
}

let list = new LinkedList();

```

## 5. 双向链表

> 可以对单链表的封装进行继承复用。

```js
// 双向链表继承单链表
class DoublyNode extends Node {
  constructor(element) {
    super(element); // 初始化了element和next
    this.pre = null;
  }
}
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = null;
  }
}
let doubleList = new DoublyLinkedList();
```

### `push(data)`

> 在链尾加入node节点。

```js
// 在链尾插入
push(data) {
    let node = new Node(data);
    if (this.header === null) {
        this.header = node;
        this.tail = node;
    } else {
        this.tail.next = node;
        node.pre = this.tail;
        this.tail = node;
    }
    this.count++;
}
```

两种情况：

1. 链表为空。需要让  `header`  和  `tail`  都指向该节点。node的pre和next都是指向null的。
2. 链表不为空。

> 1. 原最后一个节点即 `this.tail ` 不指向null ，来指向新的node节点。即：`this.tail.next = node`
> 2. 新节点的上一个节点应为原最后一个节点。即 `node.pre = this.tail`
> 3. 链尾  `tail`  应该指向现在的最后一个节点node。即 `this.tail = node;`

 ![image-20230301115219637](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230301115219637.png)



### `insert(data,index)`

> 在指定索引位置插入节点。

```js
// 在指定索引插入
  insert(data, index) {
    if (index >= 0 && index <= this.count) {
      let node = new Node(data);
      // 1. 在链头插入
      if (index === 0) {
        // 还是空链
        if (this.header === null) {
          this.header = node;
          this.tail = node;
        }else{
          node.next = this.header;
          this.header.pre = node;
          this.header = node;
        }
      }
      // 2. 在链尾插入
      else if(index === this.count){
        node.pre = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
      // 3. 在中间插入
      else{
        let previous = this.getNodeAt(index-1);
        let current = previous.next;

        node.next = current;
        node.pre = previous;
        current.pre = node;
        previous.next = node;
      }

      this.count++;
      return true;
    }
    return false;
  }
```

情况比较多：

1. 链头插入：`index === 0`

+ 空链：`this.header = node; this.tail = node;`
+ 不为空：`node.next = this.header; this.header.pre = node; this.header = node;`

![image-20230301142313213](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230301142313213.png)

2. 链尾插入

   同上的push方法。

3. 链中插入

 ![image-20230301145025361](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230301145025361.png)

### `removeAt(index)`

> 在指定位置删除元素

```JS
// 在指定索引删除
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.header;
      if (index === 0) {
        this.header = current.next;
        if(this.count===1){
          this.tail = null;
        }else{
          this.header.pre = null;
        }
        
      }else if(index === this.count-1){
        current = this.tail;
        this.tail = current.pre;
        this.tail.next = null;
      } 
      else {
        let previous = this.getNodeAt(index - 1);
        current = previous.next;

        current.next.pre = previous;
        previous.next = current.next;

      }
      this.count--;
    }
  }
```

:bulb: 删除元素比插入要简单一点。只要获取到当前要被删除的元素的前一个节点和后一个节点。令后一个结点指向前一个，前一个指向后一个即可。

## 6. 循环链表

### 总体封装：

```js
// 循环链表继承单链表
class CircularLinkedList extends LinkedList {
  constructor() {
    super();
  }
  push(data) {
    const node = new Node(data);
    let current;
    if (this.header === null) {
      this.header = node;
    } else {
      current = this.getNodeAt(this.size() - 1);
      current.next = node;
    }
    node.next = this.header;
    this.count++;
  }
  insert(data, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(data);
      // 链表最后一个结点
      let tail = this.getNodeAt(this.count - 1);

      if (index === 0) {
        if (this.header === null) {
          this.header = node;
          node.next = this.header;
        } else {
          node.next = this.header;
          this.header = node;
          tail.next = node;
        }
      } else {
        if (index === this.count) {
          tail.next = node;
          node.next = this.header;
        } else {
          let previous = this.getNodeAt(index - 1);
          node.next = previous.next;
          previous.next = node;
        }
      }

      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.header;
      let tail = this.getNodeAt(this.size()-1);
      if(index===0){
        if(this.size()===1){
          this.header = null;
        }else{
          this.header = current.next;
          tail.next = this.header;
        }
      }else{
        let previous = this.getNodeAt(index-1);
        current = previous.next;
        if(index===this.count-1){
          previous.next = this.header;
        }else{
           previous.next = current.next;
        }
      }

      this.count--;
      return current.element;
    }
    return false;
  }
}
let circularList = new CircularLinkedList();
```



## 7. 集合-`set`

:bulb: 集合是由一组无序且唯一（即不能重复）的项组成.  

### 封装

```js
// 集合set的封装
class Set {
    #item = {};
    // 集合中是否存在该元素
    has(element){
        return element in this.#item;
    }
    // 往集合中添加该元素
    add(element){
        if(!this.has(element)){
            this.#item[element] = element;
            return true;
        }
        return false;
    }
    // 往集合中删除该元素
    delete(element){
        if(this.has(element)){
            delete this.#item[element];
            return true;
        }
        return false;
    }
    // 集合长度
    size(){
        return Object.keys(this.#item).length;
    }
    // 清空集合
    clear(){
        this.#item = {}
    }
    // 集合值
    values(){
        return Object.values(this.#item)
    }

}
let set = new Set();
```

注意：集合可以解决数组去重的问题。

```js
// 数组去重
let arr = [1,2,3,3,4,5,6,6,6,7,6]
arr.forEach(item=>{
    set.add(item);
})
console.log(set.values())
```

集合的运算：

```js
// ES6的set结构
let set1 = new Set([1, 2, 3]);
let set2 = new Set([4, 2, 3]);
// 取并集
console.log(new Set([...set1, ...set2]))       // Set(4) {1, 2, 3, 4}
// 取交集
console.log(new Set(
    [...set1].filter(item => {
        console.log(item)
        return set2.has(item)
    })
))            // Set(2) {2, 3}
// 取差集
console.log(new Set(
    [...set1].filter(item => !set2.has(item))
))            // Set(1) {1}
```



**ES6的`set`结构区别。**



## 8.字典-`Map`

:bulb: 集合以**[值，值]**的形式存储元素。字典则是以**[键，值]**的形式来存储元素。字典也称作为映射，符号表或关联数组。

### 8.1. 封装

注意：1. 如果将对象作为字典的key值，那么只会显示`[object Object]` 这种形式。会很容易造成同是对象的项被覆盖。

所以我们需要将key值都转化为string类型。

```sh
dic.toStrKey({a:1})   # '{"a":1}'
```

```js
// 封装字典结构map
class Dictionary {
    #table = {};
    // 将key值转换为字符串，字符串是单引号
    toStrKey(key) {
        if (key === null) {
            return 'NULL'
        } else if (key === undefined) {
            return 'UNDERFINED'
        } else if (typeof key === 'string' || key instanceof String) {
            return key;
        }
        return JSON.stringify(key);
    }
    hasKey(key) {
        return this.#table[this.toStrKey(key)] != null
    }
    get(key) {
        const valuePair = this.#table[this.toStrKey(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrKey(key);
            this.#table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.#table[this.toStrKey(key)];
            return true;
        }
        return false;
    }
    keys() {
        return this.keyValue.map(item => item.key)
    }
    values() {
        return this.keyValue.map(item => item.value)
    }
    keyValue() {
        return Object.values(this.#table);
    }

}
let dic = new Dictionary();

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
```



## 9. 散列表-`HashMap`

`HashMap`类，它是`Dictionary`类的一种散列实现方式。散列算法的作用是尽可能地在数据结构中找到一个值。

> 如果存放在 `Map`中的数据太多，键值中的`key`可以是任何类型，那么在寻找时就会比较困难。



## 10. 二叉树-`BFT`

### 1. 初始化

```js
class Node{
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
class BFT{
    constructor(node){
        this.root = node;
    }
}

let node = new Node(100);
let bft = new BFT(node);
```

```sh
BFT {root: Node}
root: Node {key: 100, left: null, right: null}
[[Prototype]]: Object
```

### 2. 插入

```js
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    equal: 0,
};
class BFT {
    constructor() {
        this.root = null;
    }
    insert(key) {
        // 目前有根节点
        if (this.root !== null) {
            this.insertNode(this.root, key);
        } else {
            // 没有根节点的情况：
            this.root = new Node(key);
        }
        return true;
    }

    // 递归方法的调用
    insertNode(node, key) {
        // node是要比较的值；key是要插入的节点
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key); 
            } else {
                this.insertNode(node.left, key); 
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key); 
            }
        }
    }

    compareFn(node, key) {
        if (node.key === key) {
            return Compare.equal;
        } else {
            return node.key > key ? Compare.BIGGER_THAN : Compare.LESS_THAN;
        }
    }
}
```

> 1. 插入操作是否为特殊情况：
>
>    根节点：直接创建并将`Node`节点赋值为`root`属性
>
> 2. 将节点添加到其他位置：即该段代码中的递归函数。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230310181859886.png" alt="image-20230310181859886" style="zoom:67%;" />

参考这个图：进行剖析：前提：要插入` new Node(6)`

1. 执行 `insert(6)`，判断根节点不为 `null` ，则跳出执行 `insertNode(11:Node,6:key)`
2. 那么在递归函数中进行比较；
   1. `node.left`为`null`：直接复制给 `node.left`
   2. 如果`node.left` 不为 `null`：重新调用递归函数，此时参数为当前比较的`node`即`node.left`：`this.root.left`



### 3. 遍历

访问树的所有节点有三种方式：中序、先序和后序。

#### 中序

中序遍历是一种**以上行顺序访问**BST所有节点的遍历方式，也就是以**从最小到最大的顺序**访问所有节点。

中序遍历的一种应用就是对树进行排序操作。

#### 先序

#### 后序
