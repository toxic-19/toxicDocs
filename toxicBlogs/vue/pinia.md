---
title: pinia 持久化存储
date: 2024-03-30
tags:
 - vue3
categories:
 - 前端
sidebar: 'auto'
---

##   解决刷新后消失的问题:question:

###  原因

vue store 是挂载在组件上的，当刷新时组件卸载，那么原有的数据也会同时消失。

### 持久化存储

> 在组件卸载时，将 store 写入到 localstorage。

**`pinia-plugin-persist`** : 持久化依赖。

下载依赖：

```sh
pnpm install pinia-plugin-persist --save
```

在 `main.ts` 中使用：

```typescript
import { createPinia } form ‘pinia’
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPersist)
```

在 `useKnowLedge.ts` 中使用

<u>组合式API</u>：

```typescript
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKnowledgeStore = defineStore(
  'knowledge', // id
  () => {
    ... // storeSetup
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage }],
    },
  },
)
```

> 将 `persist` 放在 `options`的位置。