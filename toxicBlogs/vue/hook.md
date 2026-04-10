---
title: hooks
date: 2024-04-09
tags:
 - vue3
categories:
 - 前端
sidebar: 'auto'
---

> 函数的一种写法。用于共享状态逻辑和副作用，从而实现代码的可复用性。
>
> 将文件的一些单独功能的代码抽离出来进行封装使用。

**注意**：相对于`mixins`，`hooks`更清楚复用功能代码的来源，更清晰易懂。`mixins`会涉及到覆盖的问题。

### 规范

1. 具有可复用功能，才需要抽离为hooks独立文件
2. 函数名和文件名以 `use`开头
3. 引用显示解构暴露类似 `pinia`

### 举例

#### 1. `useCount`

```typescript
import { ref } from 'vue'

export const useCount = () => {
  const counter = ref(0)
  const increment = () => {
    counter.value++
  }
  const decrement = () => {
    counter.value--
  }
  return { // 需要导出
    counter,
    increment,
    decrement,
  }
}
```

使用：

```vue
<script setup lang="ts">
import { useCount } from '@/hooks/useCount.ts'
const { counter, increment, decrement } = useCount()
</script>

<template>
  <div>
    <a-button @click="increment">+</a-button>
    {{ counter }}
    <a-button @click="decrement">-</a-button>
  </div>
</template>
```



### 使用hook库

VueUse是一款基于[组合式API](https://v3.vuejs.org/guide/composition-api-introduction.html)的函数集合。

```sh
npm i @vueuse/core
```

```vue
<template>
  <div id="app">
    <h3>Mouse: {{x}} x {{y}}</h3>
    <h3>
      Counter: {{count}}
      <a @click='inc()' style='margin-right:10px'>+</a>
      <a @click='dec()'>-</a>
    </h3>
  </div>
</template>

<script setup lang="ts">
import { useMouse, useCounter } from '@vueuse/core'

const { x, y } = useMouse()
const { count, inc, dec } = useCounter()
</script>
```

如上官方例子：大部分VueUse的函数都返回一个**refs对象**。

`useMouse()` 本身是函数需要调用返回对象。需要进行解构。

在组件卸载时会自动卸载（消除副作用）。类似Vue中的watch或computed。



### 参考

1. [VueUse Collection of Vue Composition Utilities](https://vueuse.org/guide/)

