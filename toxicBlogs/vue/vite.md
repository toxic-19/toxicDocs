---
title: 01. vite
date: 2023-12-8
tags:
 - vue
categories:
 - 前端
sidebar: 'auto'
sticky: 1
---

## 1. `vue3 `基本概念

:punch: [语雀：vue3视频快记](https://www.yuque.com/toxic-19/vue522/gdizhg63ym2iec01)

:punch: [Vue3官网](https://cn.vuejs.org/guide/quick-start.html)

:punch: [视频资料](https://blog.csdn.net/qq1195566313/category_11618172.html)

### 1.1 安装项目

```sh
npm init vite@latest # 直接安装vite+vue3项目
yarn create vite     # 使用yarn安装
npm init vue@latest # 通过vue-cli脚手架安装 配置更全
# 使用npm create创建失败了。
```

目录结构：

```sh
public # 不会被编译 可以存放静态资源
src
 ├─assets # 存放可以编辑的静态资源
 ├─components
 ├─App.vue # 全局组件
 └─main.ts # 全局ts
index.html # 入口文件
vite.config.ts # vite的配置文件
```

`npm run dev` 详解

会在`node_modules/.bin`下创建可执行文件，执行`npm run dev`时，就可以在`package.lock.json`中查找到脚本链接

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230821234619971.png" alt="image-20230821234619971" style="zoom:67%;" />

```json
"node_modules/vite": {
    "version": "4.4.9",
    "resolved": "https://registry.npmmirror.com/vite/-/vite-4.4.9.tgz",
    "integrity": "sha512-2mbUn2LlUmNASWwSCNSJ/EG2HuSRTnVNaydp6vMCm5VIqJsjMfbIWtbH2kDuwUVW5mMUKKZvGPX/rqeqVvv1XA==",
    "dev": true,
    "dependencies": {
        "esbuild": "^0.18.10",
        "postcss": "^8.4.27",
        "rollup": "^3.27.1"
    },
    "bin": {
        "vite": "bin/vite.js" # 找到该js文件，然后执行该脚本
    }
}
```

```sh
#!/bin/sh 脚本文件vite
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  "$basedir/../vite/bin/vite.js" "$@"
else 
  exec node  "$basedir/../vite/bin/vite.js" "$@"
fi

```

然后就去执行依赖里面的`vite/bin/vite.js`

### 1.2  优化

1. 重写双向绑定

   `Vue2`：基于`Object.defineProperty()`。

   `Vue3`：基于`Proxy`。

   > 优势：
   >
   > 1. 省略`for...in `循环；丢掉麻烦的备份数据
   > 2. 可以监听数组的变化；动态新增的属性和删除属性。、
   > 3. 可以监听数组的索引和`length`属性

2. `Vue3`优化`Vdom`：在Vue2中每次更新`diff`都是全量对比，`Vue3`则只对比带有标记的虚拟 dom ，大大减少了非动态内容的对比消耗。

   > 新增了 patch flag 标记
   >
   > 在[Vue Template explorer](https://template-explorer.vuejs.org/#eyJzcmMiOiI8IS0tIDEuIOWKqOaAgeaWh+acrOiKgueCuSDmoIforrA6IDEgLS0+XHJcbjxzcGFuPnt7bXNnfX08L3NwYW4+XHJcbjwhLS0gMi4g5Yqo5oCBY2xhc3Mg5qCH6K6wOiAyIC0tPlxyXG48c3BhbiA6Y2xhc3M9XCJib3JkZXJcIj48L3NwYW4+XHJcblxyXG48c3BhbiA6c3R5bGU9XCJ7IGNvbG9yOiByZWQgfVwiPkhlbGxvIHdvcmxkITwvc3Bhbj5cclxuPHNwYW4+SGVsbG8gd29ybGQhPC9zcGFuPlxyXG48c3Bhbj5IZWxsbyB3b3JsZCE8L3NwYW4+XHJcbjxzcGFuPkhlbGxvIHdvcmxkITwvc3Bhbj5cclxuPHNwYW4+SGVsbG8gd29ybGQhIDwvc3Bhbj4iLCJvcHRpb25zIjp7fX0=) 查看虚拟dom的静态标记

    ```sh
    1. TEXT = 1       // 动态文本节点
    2. CLASS = 1 << 1 // 动态class 
    4. STYLE = 1 << 2 //动态style
    8. PROPS = 1 << 3 //动态属性，但不包含类名和样式
    16. FULLPR0PS = 1 << 4 //具有动态key属性，当key改变时，需要进行完整的diff比较。
    32. HYDRATE_ EVENTS = 1 << 5 //带有监听事件的节点
    64. STABLE FRAGMENT = 1 << 6 //一个不会改变子节点顺序的fragment
    128.KEYED_ FRAGMENT = 1 << 7 //带有key属性的fragment 或部分子字节有key
    256. UNKEYED FRAGMENT = 1<< 8 //子节点没有key 的fragment
    512. NEED PATCH = 1 << 9 //一个节点只会进行非props比较
    1024. DYNAMIC_SLOTS = 1 << 10 // 动态slot
    -1. HOISTED = -1 // 静态节点
    -2. BALL = -2
    ```

       忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效。让 Vue3 的 Vdom 性能得到了很大的提升。

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230814234836013.png" alt="image-20230814234836013" style="zoom:80%;" />

3. 支持多个根节点；支持 `render JSX`写法。
4. `Tree shaking`：保持代码运行结果不变的前提下，去除无用的代码。
   最明显的体现是：`import { computed, watch } from 'vue'` 需要用到才导入才打包。
5. 组合式`API`

### 1.3 指令

1. 阻止表单提交 `.prevent` 阻止默认时间  `.stop`阻止事件冒泡

```html
<button @click.prevent="submit" type="submit"> submit </button>
```

2. 绑定`class`

```html
<div :class="[flag ? 'active' : 'other', 'h']">
    <!-- class属性h是一直存在的。只有active和other是根据条件判断 -->
</div>
```



## 2. 虚拟 `dom  `和 `diff `算法

### 2.1 概念

1. 虚拟`dom`就是通过`JS`来生成一个`AST`节点树，即：抽象语法树【Abstract Syntax Tree】，用来表示程序源代码结构的树形结构。每个节点都代表着程序代码中的一个语法结构，节点之间的层次关系表示了代码的嵌套关系和语法规则。每个节点包含了与之相关的信息，比如节点的类型，属性，子节点等等。

   AST节点只关注语法结构和逻辑关系。

2. 为什么要有虚拟dom？

   一个`dom`上的属性是非常多的，可以用`for...in`来遍历一下。所以直接操作`dom`是非常浪费性能的。需要尽可能的少操作`dom`。

### 2.2 `diff`算法

源代码：https://github.com/vuejs/core

​              [vue3: vue3的vuejs/core GitHub 仓库镜像 (gitee.com)](https://gitee.com/fe-mirror/vue3)

目录：`packages/runtime-core/src/vnode.ts`

#### 1.  无`key` — `patch`替换

举例：由`[a, b, c, d]` 在中间新增一个元素变为`[a, b, 111, c, d]`

```tsx
  // 没有key值的子节点列表进行diff和patch操作
  // 根据新旧节点的差异来更新容器中的子节点
  // 并根据节点的个数来决定是卸载旧的子节点还是挂载新的子节点
  const patchUnkeyedChildren = (
    c1: VNode[], // 旧的子节点数组  [ a, b, c, d ]
    c2: VNodeArrayChildren, // 新的子节点数组 [ a, b, 111, c, d]
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    c1 = c1 || EMPTY_ARR // 如果c1或c2为空，则赋值为空数组
    c2 = c2 || EMPTY_ARR 
    const oldLength = c1.length
    const newLength = c2.length
    const commonLength = Math.min(oldLength, newLength) // 拿到最短长度作为commonLength 此刻是4
    let i
    for (i = 0; i < commonLength; i++) {
      const nextChild = (c2[i] = optimized // 根据optimized的值将c2[i]克隆或标准化
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      ) // 对c1[i]和nextChild进行diff和重新渲染操作
    }
    if (oldLength > newLength) {
      // remove old 移除掉旧节点列表中多余的节点
      unmountChildren( // method: 卸载旧的多余的子节点
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      )
    } else {
      // mount new 有一些新的子节点需要被挂载
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      )
    }
  }
```



### 2.3 有 `key` 

#### 1. 判断两个节点是否相等

```ts
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  if (
    __DEV__ && // __DEV__ 是开发环境下的全局变量
    n2.shapeFlag & ShapeFlags.COMPONENT && // & 判断n2的shapeFlag属性是否包含COMPONENT标志，表示组件类型
    hmrDirtyComponents.has(n2.type as ConcreteComponent) 
    // hmrDirtyComponents是全局Set集合，存储需要热更新的组件。将n2的类型强制转换为ConcreteComponent
  ) {
    // 此时处于开发模式, n2是需要热更新的组件，则节点类型不同
    // HMR only: if the component has been hot-updated, force a reload.
    return false
  }
  // 如果类型（div && div）和key值（:key="key"）相同，则是同一个节点类型
  return n1.type === n2.type && n1.key === n2.key
}
```



#### 2. patch更新算法



#### 3. 前序算法

```js
    // 1. sync from start c1和c2的首首比较。直到不同就break
    // (a b) c
    // (a b) d e
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      if (isSameVNodeType(n1, n2)) { // 同一个节点
        // patch函数：用于处理虚拟dom的更新和渲染。在Vue3中用于对比新旧节点并更新实际的dom元素
        patch( 
          n1, // 旧的虚拟节点
          n2, // 新的虚拟节点
          container, // 要渲染的实际DOM元素的容器
          null, // anchor: 锚点在更新虚拟DOM树时，确定需要插入或替换元素的位置
          parentComponent, 
          parentSuspense,
          isSVG,
          slotScopeIds, // 插槽作用域ID
          optimized // 是否优化模式
        )
      } else {
        // c <-×-> d  此时i为2
        break
      }
      i++ 
    }
```



#### 4. 后序算法

```js
    // 2. sync from end
    // a (b c)
    // d e (b c)
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = (c2[e2] = optimized
        ? cloneIfMounted(c2[e2] as VNode)
        : normalizeVNode(c2[e2]))
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else {
        break
      }
      e1--
      e2--
    }
```



#### 5. 新节点多，挂载

```js
    // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
	if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
        while (i <= e2) {
          patch(
            null, // c1设置为null,不需要代替旧节点。直接新增c2即可
            (c2[i] = optimized
              ? cloneIfMounted(c2[i] as VNode)
              : normalizeVNode(c2[i])),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
          i++
        }
      }
    }
```



#### 6. 旧节点多，卸载

```js
    // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true) // 将c1卸载掉
        i++
      }
    }
```



## 3. BEM架构

参考：[在Vue中，如何利用BEM命名法，并结合SASS/LESS书写CSS](https://zhuanlan.zhihu.com/p/524640605)

> BEM：Block 块     Element 元素        Modifier 修饰符
>
> `.block__element--modifier {}`

**编写：**

1. 使用`SCSS `  安装`SASS`

```sh
npm install sass -D
```

2. 案例：

```html
<div class="toxic-content">
  <div class="toxic-content__items" v-for="item in 100" :key="item">
    {{ item }}
  </div>
</div>
```

```scss
@include block(content) {
  flex: 1;
  overflow: auto;
  @include ele(items) {
    padding: 10px;
    margin: 10px;
    border: 1px solid #cccccc;
    border-radius:4px
  }
}
```

希望在 html 中使用 BEM 架构进行类名的书写，在定义 scss 时可以减少对重复内容的书写。

3. bem.scss 定义

```scss
$namespace: 'toxic' !default;
$block-sel: '-' !default;
$element-sel: '__' !default;
$mod-sel: '--' !default;
/* BEM .block__element--modifier */

// block
@mixin block($block) {
  $BlockName: #{$namespace + $block-sel + $block};
  .#{$BlockName} {
    @content;
  }
}
// element
@mixin ele($element) {
  /* 需要获取到父级的类名 */
  $selector: &;
  $ElementName: #{$selector + $element-sel + $element};
  /* 在使用BEM规则的情况没有必要再进行SCSS的嵌套 */
  @at-root { /* at-root可以跳出SCSS的嵌套 */
    #{$ElementName} { /* 不需要再加. 因为$selector已经包含了 */
      @content;
    }
  }
}
// modified
@mixin modify($modifier) {
  $selector: &;
  $ModifierName: #{$selector + $mod-sel + $modifier};
  @at-root {
    #{$ModifierName} {
      @content;
    }
  }
}
```



## 4. 父子组件传值

### 4.1 `defineProps`

1. JS版本，与 Vue2 并没有太大差别。

   使用 `defineProps` 去接收。

```js
// 接收父组件传递的值 需要使用到props中的值的话需要去接收函数传递
const props = defineProps({ // 这样就可以通过props.name去访问到接收到的name值
  name: {
    type: string,
    default: 'no Name' // 这种形式可以直接书写默认值
  },
  list : {
    type: array,
    default: () => []
  }
})
```

2. TS版本

```tsx
type Props = {
  name?: string,
  list?: number[]
}

// 对TS版本的props指定默认值需要使用 withDefaults。webstorm会对其报错是idea的问题。不是使用问题。
const defaultProps = widthDefaults(
	defineProps<Props>(),
  {
    name: 'No Name',
    list: () => []
  }
)
// 接收两个参数。其一为：props 其二为默认值对象
```

### 4.2 `defineEmit`

1. JS版本，自定义派发事件。同上与Vue2版本并没有太大区别。

```js
const emit = defineEmits(['on-click', 'back']) // 派发事件名称用[]
```

2. TS版本

```tsx
const emit = defineEmits<{ (event: 'back', name: string) : void }>()
// 定义事件back，该自定义事件传递参数name。无返回void
```

3. 使用。同Vue2

```js
const sendToParent = item => {
  emit('on-click', item)
}
```

### 4.3 `defineExpose`

$Vue2$ 可以直接在子组件上定义 $ref $ 然后父组件通过 $ref$ 可以获取到子组件的方法和属性。同样也可以去控制和调用。

**原因**:  因为在 $Vue3$ 中我们使用使用了`<script setup>`语法糖，默认组件是关闭的。我们无法通过 $ref$ 或  $parent$ 去访问到该组件实例。

​		   那么为了能在语法糖组件中明确要暴露出去的属性，使用`defineExpose`进行暴露。

------

```html
<!-- 父组件中定义子组件 -->
<WaterFall ref="refWaterfall" :name="name" :list="list" @on-click="getItem" ></WaterFall>
<button @click="changeVisible">更改子组件expose的值</button>
```

```tsx
// 在子组件中：去暴露出需要使用到的方法和属性
const visible = ref(true)
defineExpose({
  title: 'expose from child',
  visible
})
```

```tsx
// 父组件中去获取子组件的实例 WaterFall是导入时的命名
const refWaterfall = ref<InstanceType<typeof WaterFall>>()

// 可以在这里直接更改子组件数据
const changeVisible = () => {
  refWaterfall.value.visible = !refWaterfall.value.visible
}
```

如果在定义完 $refWaterfall$ 之后就要获取是只能拿到 `undefined`。原因是子组件还没被渲染到页面上。

除非使用 `nextTick`：  

```js
nextTick(() => {
	console.log(refWaterfall.value.visible + ' ==== ')
})
```

## 5. 瀑布流

> 需要将布局内的元素自动进行流动和平衡，尽可能保证每列的高度趋于相同。
>
> 目前有两种形式，一是等高型，二是等宽型。
>
> 1. 等宽型：设置列宽度，然后计算第一行能够展示的列数，之后依据最短的一列向每一项去添加项目。**找短补位**
>    劣势：每渲染一次都会计算一次 $top$，$left $ 值。而且图片的顺序是打乱的。

### 5.1 等宽手动计算

```html
<div class="toxic-waterfall">
  <div class="toxic-waterfall__items"
       :style="{ height:waterfallItem.height + 'px', background:waterfallItem.background,
                 left: waterfallItem.left + 'px', top:waterfallItem.top + 'px' }"
       v-for="(waterfallItem, index) in waterList"
       :key="index">
  </div>
</div>
```

重新根据`props.list` 进行设置 `top` 和 `left`。得到`waterList`进行循环。

```tsx
const props = defineProps<{list: any[]}>()
const waterList = reactive<any[]>([])
// 瀑布流需要保持高度趋于相同，所以我们需要对高度数组进行维护
const heightList: number[] = [] // 不需要进行响应式转换
// 因为是绝对定义，需要对每一项都设置left和top
const init = () => {
  const width = 130
  const top = 20
  // 一行几列
  const column = Math.floor(document.body.clientWidth / width) // 向下取整
  // 1. 先对list中的前column个即第一行设置left和top
  for (let i = 0; i < props.list.length; i++) {
    if (i < column) {
      props.list[i].top = top
      props.list[i].left = i * width
      waterList.push(props.list[i])
      heightList.push(props.list[i].height + top) // 记录每一项的高度
    } else {
      // 找到目前最小的高度和索引
      let minHeight = heightList[0]
      let minIndex = 0
      heightList.forEach((height, index) => {
        if (minHeight > height) {
          minHeight = height
          minIndex = index
        }
      })
      props.list[i].top = minHeight + top
      props.list[i].left = minIndex * width
      waterList.push(props.list[i])
      heightList[minIndex] += props.list[i].height + 20
    }
  }
}
onMounted(() => {
  init()
  window.onresize = () => init()
})
```

1. 在上述代码中是通过`for`循环找到最低列高和索引的。
2. 也可以通过`Math.min`和`findIndex`：

```js
let minHeight = Math.min(...heightList) // 使用对象：列表
let minIndex = heightList.findIndex(item => item === minHeight)
```



### 5.2

### 5.3



## 6. 组件

### 6.1 局部组件

[Vue3 —— 插槽 v-slot](https://zhuanlan.zhihu.com/p/529152853?utm_id=0&wd=&eqid=9a693c0d00025f6000000002647850d6)



### 6.2 递归组件

1. 简单封装一个树形组件 `Tree.vue`
2. 数据定义与模拟：

```typescript
interface Tree {
  name: string
  checked: boolean
  children?: Tree[]
}
const tree = reactive<Tree[]>([
    { name: "1", checked: false, children: [{name: "1-1", checked: false }]},
    { name: "2", checked: false,
      children: [{name: "2-1", checked: false}, {name: "2-2", checked: false }]},
    { name: "3", checked: false,
      children: [
       { name: "3-1", checked: false, children: [
           { name: "3-1-1", checked: false },
           { name: "3-1-2", checked: false }
         ]
       }]
    },
    { name: "4", checked: false }
])
```

3. 父组件中使用 `:tree-data`，子组件接收`defineProps<{treeData?: Tree[]}>()`
4. 进行递归：需要做结束判断，否则会发生栈溢出的错误。`v-if="item?.children?.length"`

```html
<div class="tree-item" v-for="item in treeData" @click.stop="handleItem(item)">
    <input v-model="item.checked" type="checkbox"> <span>{{item.name}}</span>
    <Tree v-if="item?.children?.length" :tree-data="item?.children"></Tree>
</div>
```

### 6.3 插槽

> 实现了一套内容分发的 API，将 slot 元素作为承载分发内容的出口。使用插槽使 Vue 组件的设计更加灵活。

1. 具名插槽：以便后续代码的扩展的增强代码的可读性。使用 name 属性来命名插槽

```html
<!-- 在子组件中：使用name属性 -->
<header>
	<slot name="header"></slot>
</header>
```

```html
<!-- 在父组件中：Vue3需要在template中使用 格式：v-slot:slotName -->
<template v-slot:header>
	<!-- 有简写形式即：#header 没有名字的即为默认插槽 #default -->
</template>
```

2. 动态插槽：可以将父组件的内容动态渲染到子组件插槽中。

```vue
<!-- 父组件中 -->
<template v-slot:[dynamicSlotName]>
  我是动态插槽
</template>

<script setup>
const dynamicSlotName = ref("header")
</script>
```

3. 插槽传值。一般情况下父子组件插槽只能访问父组件的属性。如上动态插槽。

   当插槽想要访问子组件的属性的时候，可以通过 $slot$ 进行传递。

```vue
<!-- 由子组件传递 -->
<slot name="tree" :content="content"></slot>

const content = ref<string>('從子組件的插槽传递的變量')
```

```html
<!-- 父组件接收 slotProps 并使用，slotProps 可以读取到名字为 tree 插槽上所有的属性 -->
<Tree :tree-data="tree">
  <template v-slot:tree="slotProps"> <!-- 也可以使用简写形式 #tree="slotProps" -->
    {{ slotProps.content }}
  </template>
</Tree>
```

```html
<section class="card-section">
  <div class="card-section__content">
    <slot name="content"></slot>
    <!-- 具名插槽 使用在template下 v-slot:content 简写形式 #content -->
    <!-- 动态插槽名，在父组件中使用：v-slot:[slotName] 同 #[slotName] -->
  </div>
</section>
```

### 6.4 异步组件

> 1. 在大型项目中，我们可能需要拆分应用为更小的块，以减少主包的面积。并仅在需要时再从服务器加载相关组件。
> 1. public 文件夹下是不会被编译，还可以直接访问到。

 ![image-20231223233552113](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231223233552113.png)

**实现异步组件（内容与骨架屏交换）**

效果：

1. 骨架屏：

 ![image-20231224152150342](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/skeleton.png)

2. 异步请求的内容：

 ![image-20231224152341461](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20231224152341461.png)

思路：

1. 模拟 ajax 请求 public 文件夹下的 data.json。

```json
{
  "data": {
    "nickName": "Toxic19",
    "status": "实习中",
    "url": "../assets/avatar.jpg",
    "content": "Vue 实现了一套内容分发的 API，将 <slot> 元素作为承载分发内容的出口，使用插槽使得vue组件的设计更加灵活。2在vue版本更迭中，尽管插槽的使用语法有部分变化，插槽的核心用法并未改变，鉴于vue2将在2023年第不再维护，以下我们将围绕vue3对插槽的具体使用方法进行展开。"
  }
}
```

```typescript
export const axios = {
  get <T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            setTimeout(() =>{
              resolve(JSON.parse(xhr.responseText))
            }, 2000)
          }
        }
        xhr.send('null')
    })
  }
}
// readyState
// 0 - 未初始化 还没有调用send方法
// 1 - 载入 已调用send方法，正在发送请求
// 2 - 载入完成 send执行完成 已经接收到全部响应信息
// 3 - 交互 解析响应内容
// 4 - 完成 响应内容解析完成 可以在客户端调用
```

2. 在子组件异步请求：

> 在 $setup$ 语法糖中：可以使用顶层 await 。结果代码会被编译为 `async setup() `

```ts
import { axios } from "@/server/axios"
interface Data {
  data: {
    nickName: string,
    status: string,
    url: string,
    content: string
  }
}
const { data } = await axios.get<Data>('/data.json')
```

3. 父组件异步导入子组件 Card.vue

> suspense 默认组件：
>
> 1. 有两个插槽，都只接收一个直接子节点。
> 2. default 插槽里的节点会尽可能的展示出来。如果不能就会展示 fallback 插槽中的节点。
> 3. `async setup()` 必须与 [Suspense ](https://cn.vuejs.org/guide/built-ins/suspense.html)内置组件组合使用，Suspense 目前还是处于实验阶段的特性，会在将来的版本中稳定。
>
> defineAsyncComponent：
>
> 1. 得到的 CardSync 是一个外层包装过的组件。仅在页面需要它渲染时才会调用加载内部实际组件的函数。
> 2. 它将接收到的 props 和 插槽传给内部组件，所以可以直接使用这个异步的包装组件无缝替换原始组件，
>    同时实现延迟加载。

```tsx
// 使用 defineAsyncComponent 加载异步配合 import 函数可以实现代码分包
const CardSync = defineAsyncComponent(() => import('./components/Card.vue'))
```

```html
<suspense>
  <template #default>
    <CardSync></CardSync>
  </template>
  <template #fallback>
    <Skeleton></Skeleton>
  </template> <!-- 在网络加载过程中展示的组件，也可以是loading图标之类的 -->
</suspense>
```

### 6.5 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)

Teleport标签必须写在待进入的元素后面，需要这个元素创建好了才能传输。

> 应用场景：全屏的模态框。
>
> 触发模态框的按钮在内部组件中可以使用其他的 data 以及 props，但是从视图的角度来看，在 Vue 应用的范围之外渲染它。
>
> Teleport 可以将模板渲染到指定 dom 节点，不受父级CSS的影响。

### 6.6 [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)

#### :wilted_flower: 1. [component](https://cn.vuejs.org/api/built-in-special-elements.html#component)

1. 不是真正的组件，和 slot 以及 template 一样也是模板语法的一部分。会在编译过程被编译掉。
2. 由 prop `is` 决定要渲染的真正组件。
3. [内置组件](https://cn.vuejs.org/api/built-in-components.html)都可以传递给 `is`，但是如果想通过名称传递则必须先对其进行注册。

一般使用`component`做动态组件。

#### :wilted_flower: 2.  keep-alive

```html
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

**默认情况下：**一个组件实例被替换掉会被销毁，会导致丢失所有已变化的状态。每次显示都是一个只有初始状态的新实例。

> 在这种情况下：有时不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。
>
> 而是希望组件可以缓存下来，维持当前的状态。这时候就需要用到`keep-alive`组件。

**生命周期：**相比普通组件，多了 `onActivated`  `onDeactivated`

1. 初次进入：onMounted  => onActivated

2. 退出时触发 onDeactivated

3. 再次进入时只会触发 onActivated。

   综上：对于事件挂载的方法只执行一次的放在 onMounted 中。每次都执行就 onActivated。

```typescript
onActivated(() => {
  console.log("keep-alive初始化") // 在onMounted之后执行
})
onDeactivated(() => {
  console.log("keep-alive卸载") // 每次切换就只会触发 onActivated 和 onDeactivated
                               // 不会去触发 onUnMounted() 卸载生命周期了
})
```

**include / exclude：**

前提：`KeepAlive`组件默认会缓存内部的所有组件实例。可以通过 include 和 exclude 来限制缓存的组件。

使用的是 Vue 文件名喔！

#### :wilted_flower: 3. [transition](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component)

**使用前提：**仅支持单个元素或组件作为插槽内容。

1. 由 `v-if` 和 `v-show` 触发的切换
2. 由 特殊元素 `component` 切换的动态组件
3. 改变特殊的 `key` 属性

**配置 [`animate.css`](https://animate.style/) 库使用：** 

```sh
yarn add animate.css --save
npm install animate.css --save
```

```html
 <transition :duration="20" enter-active-class="animate__animated animate__fadeIn">
   <!-- 每个使用都需要声明：animate__animated -->
 </transition>
<!-- 使用appear属性：页面一旦加载完成就会触发transition -->
<!-- 配套class属性：appear-from-class appear-active-class appear-to-class -->
```

**过渡过程中的钩子函数：**

```html
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

#### :wilted_flower: 4. [transition-group](https://cn.vuejs.org/guide/built-ins/transition-group.html)

是一个内置组件，用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。比如：dragList ?

```html
<transition-group tag="ul"> <!-- 意味着在子组件外渲染了ul列表 -->
  ...code
</transition-group>
```



### 6.7 [AntD](https://antdv.com/docs/vue/introduce-cn)

1. 下载

```sh
npm install ant-design-vue@4.x
npm install unplugin-vue-components -D # 用于vite项目按需导入
```

2. 官网链接：[自动按需引入组件 ](https://antdv.com/docs/vue/introduce-cn#%E8%87%AA%E5%8A%A8%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5%E7%BB%84%E4%BB%B6)

3. 在 vite.config.ts 中添加：Components 部分

```tsx
export default defineConfig({
  plugins: [
    vue(), // 支持Vue解析
    Components({ // 按需导入antD
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ]
})
```

4. 修改样式：[修改Antd默认样式总结 - 掘金 (juejin.cn)](https://juejin.cn/post/7211081639620198437#heading-2)

```css
:global(.ant-tabs > .ant-tabs-nav) {
  margin-bottom: 0 !important;
  height: 30px;
} 
```



### 6.8 [`provide / inject`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#provide)

依赖注入：当深度嵌套的组件需要父组件的属性时：provide 可以在祖先组件中指定我们想要**提供**给后代组件的数据或方法

而在任何后代组件中，我们都可以使用 inject 来接收 provide **提供**的数据或方法。 

```typescript
// 在祖先组件中声明 provide 两个参数 key 和 注入的值
provide('color', 'red') // provide 需要在 setup 同阶段使用

const colorVal = ref<string>('yellow')
provide('color', colorVal) // 可以是响应式的变量

// 也可以将Symbol作为key
```

```typescript
// 在后代组件中：
// 如果祖先组件传递的只是普通值，接收时需要通过ref或reactive来添加响应式
const color = inject<Ref<string>>('color') // 后面可以接默认值
```

后代组件接收值，修改会影响祖先组件中的该值。

可以通过 `readonly` 来控制只读：`provide('color', readonly(colorVal))`

## 7. 使用 [v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh/)

参考链接：

1. [Vue脚手架Typescript使用Markdown编辑器v-md-editor记录](https://blog.csdn.net/wobuxiangxin1314/article/details/129336928)
2. [基于v-md-editor的在线文档编辑实现](https://www.jianshu.com/p/6071dc9548f0)



## 8. 深入 `v-model`

v-model 其实是一个语法糖 通过 props 和 emit 结合而成的。

使用 `v-model` 和 `emit` 实现父子组件的双向数据流动。

1. 父组件

```vue
<!-- 在Vue3中 v-model默认绑定的props值为 modelValue -->
<Son v-model="show" v-model:content="content"></Son>
```

```typescript
const show = ref<Boolean>(true) // 默认true打开
const content = ref<string>("Vue3中可以传递多个v-model，默认props是modelValue；再传递的时候就得指定了，此刻我们指定的是content")
```

2. 子组件

```vue
<!-- Son子组件 -->
<h1> 使用defineProps接收父组件通过v-model传递过来的值: {{propsData.modelValue}} </h1>
<h1> {{propsData.content}} </h1>
```

```typescript
type Props = {
	modelValue: boolean, // 这个是默认的值
	content: string // 多个v-model自定义的
}
const propsData = defineProps<Props>()

// 以上实现了v-model从父组件到子组件的传递
const emit = defineEmits(['update:modelValue', 'update:content']) // 定义自定义事件
const close = () => { // 触发事件
  emit('update:modelValue', false) // 实现子组件内容向父组件传值
}
```



## 9. [自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html#custom-directives)

内置指令如：`v-show` `v-if`  `v-on` 等等

自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

一个自定义指令由一个包含**类似组件生命周期钩子**的对象来定义。

 ![image-20240114162808820](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20240114162808820.png)

Vue2 指令 `bind inserted update componentUpdated unbind`

> 只有当所需功能 <u>只能通过直接的 DOM 操作来实现</u> 时，才应该使用自定义指令。自定义指令属于破坏性更新。

### 9.1. 权限按钮控制

RBAC 模式：权限通过 userId 或者 token 来判断。

权限细化为：菜单 | 页面 | 按钮（此次的自定义指令） | 字段

一般按钮权限控制：是使用 `v-if` 或者 直接删除该节点。

 ![image-20240115213910988](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202401152139225.png)

```typescript
import type {Directive} from "vue"
const rolesInfo = reactive({
  roles: "admin",
  name: "管理员",
  authorities: [
    // "pos:category:list","s ystem:user:list", "system:menu:list", "system:role:list"
    // 模块:页面:操作
    "pos:product:edit",
    "pos:product:delete",
    "pos:product:create"
  ]
})
const vHasShow: Directive<HTMLElement, string> = (el, bindings) => {
  const {value} = bindings
  // 判断value的传值
  if (value && value instanceof Array && value.length > 0) {
    const hasAuthorities = rolesInfo.authorities.some(permission => {
      return value.includes(permission)
    })
    if (!hasAuthorities) {
      el.parentNode && el.parentNode.removeChild(el) // 直接移除dom元素。
    }
  }
}
```

```html
<!-- 传递给指令的bindings的value即为['']数组字符串 -->
<a-button v-has-show="['pos:product:edit']">创建</a-button>
<a-button v-has-show="['pos:sale:list']">编辑</a-button>
<a-button v-has-show="['pos:product:delete']">删除</a-button>
```

### 9.2. 列表拖拽指令

 ![image-20240118194249787](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202401181942991.png)

```typescript
type dragItem = { // 每一个拖拽项目的属性
  id: number,
  menuName: string,
  menuUrl: string,
  userId: string,
  sortNum: number
}
const dragList = ref<dragItem[]>([])
// 拖拽列表的容器
const parentNode = ref(null)
const getList = async () => {
  const {data} = await axios.get('/drag-list.json')
  dragList.value = data
}
getList()
```

```typescript
const vDrag: Directive = (el: HTMLElement) => {
  let dragEl: HTMLElement | null = null // 拖拽元素
  let targetEl: HTMLElement | null = null // 目标元素
  
  // _index: 判断该DOM元素在所有拖拽元素的索引
  const _index = (element: HTMLElement) => {
    const domData = Array.from(parentNode.value.childNodes)
    return domData.findIndex((dom: HTMLElement) => dom.innerText == element.innerText)
  }
  
  // 设置过渡的动画效果 - 对dom元素进行处理
  const _anim = (startPosition, dom) => {
    // 首先立即移动一个DOM元素，然后在其后的0.3秒内平滑地移动回其原始位置，创建一个插入或叠加的效果。
    // 在动画完成后，它会清除过渡效果并重置样式。
    const offset = startPosition - dom.getBoundingClientRect().top
    dom.style.transition = 'none' 								  // 禁用现有的过渡效果
    dom.style.transform = `translateY(${offset}px)` // 垂直移动

    dom.offsetWidth // 强制浏览器触发重绘；为了确保DOM已经移动到预期的位置。
    dom.style.transition = 'transform .3s'
    dom.style.transform = ``
    clearTimeout(dom.animated)

    // 动画完成后清除过渡效果并重置样式
    dom.animated = setTimeout(() => {
      dom.style.transition = ''
      dom.style.transform = ``
      dom.animated = false
    }, 300)
  }
  
  // 开始拖拽
  const dragStart = e => {
    dragEl = e.target
  }
  
  // 拖拽过程
  const dragOver = e => {
    // 1. 确保拖拽元素和目标元素的存在
    if (!e.target) return // 检查目标元素是否存在
    if (!dragEl) return // 检查拖拽元素是否存在
    targetEl = e.target
    const targetTop = e.target?.getBoundingClientRect()?.top
    const dragTop = dragEl?.getBoundingClientRect()?.top
    // 2. 检查目标元素是否li元素且不是拖拽元素
    if (targetEl?.nodeName === "LI" && targetEl !== dragEl) {
      if (targetEl && targetEl["animated"]) return
      // 3. 根据被拖拽元素和目标元素的顺序，决定插入位置
      if (_index(dragEl) < _index(targetEl)) {
        targetEl.parentNode.insertBefore(dragEl, targetEl.nextSibling)
      } else {
        targetEl.parentNode.insertBefore(dragEl, targetEl)
      }
      // 4. 动画处理 - 拖拽元素和目标元素
      _anim(targetTop, targetEl)
      _anim(dragTop, dragEl)
    }
  }
  // 结束拖拽: 主要是为了拿到新的list 否则可以不写
  const dragEnd = () => {}
  el.addEventListener('dragstart', dragStart)
  el.addEventListener('dragover', dragOver)
}
```

参考：[Drag-List (yuque.com)](https://www.yuque.com/toxic-19/develop/drag)

```html
<ul class="directives-list" ref="parentNode" v-drag>
  <li
      class="list-item" v-for="(item, index) in dragList"
      :key="item.id" draggable="true">
    <slot :item="item" :index="index">
      <div>{{ item.sortNum }} - {{ item.menuName }}</div>
    </slot>
  </li>
</ul>
```



### 9.3. 懒加载指令

```html
<div class="directives-images">
  <!-- 将实际的图片地址传递给 v-lazy 指令 -->
  <img v-lazy="img" v-for="img in imageArray" :key="img" alt="" width="394" />
</div>
```

```typescript
// import.meta.globEager: JavaScript 中的一个属性，用于获取当前模块的静态导入（static imports）信息
// Record<K, T>: 表示一个对象 该对象的键值对都是联合类型 K T 分别代表键值的类型
const imageList: Record<string, {default: string}> = import.meta.globEager('../../assets/lazy-images/*.*') // 静态资源加载 类似于 import XX from ""

const imageArray = Object.values(imageList).map(img => img.default)

const vLazy: Directive<HTMLImageElement, string> = async (el, bindings) => {
  // 可以在bindings中的value得到传递进来的值即 img
  const root = document.getElementsByClassName('directives-images')[0]
  const defaultImage = await import('../../assets/vue.svg')
  el.src = defaultImage.default // 还没出现的时候给默认图片地址
  
  // IntersectionObserver 接收两个参数 callback options
  const observer = new IntersectionObserver(entries => {
    if(entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
      el.src = bindings.value
    }
  }, {root}) // 在 options 中定义监听的根元素
  
  observer.observe(el)
}
```

可以观察随着滚动条滚动， 图片会慢慢加载出来：

![image-20240118223404911](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202401182234462.png)

## 10. Hook

> Vue3 自定义 Hook 主要用来处理复用代码逻辑的封装。
>
> 和 Vue2 的 Mixins 对比：
>
> 1. Mixins 将这些多个相同的逻辑抽离出来，各个组件只需要引入mixins，就能实现一次写代码，多组件受益的效果。
> 2. 涉及到 data methods 以及其他生命周期的同名覆盖。
> 3. 变量来源不明确。

### 10.1. URL 转 Base64

需要注意的是在 url 转 Base64 的时候，需要获取到该图片的 dom。为了获取到创建的 canvas 的宽高。

所以如果是需要已启动就获取 dom 元素的话，需要放在 onMounted 生命周期之中。

```js
// useUrlToBase64.js
type Options = {
  element: string
}

export default function (options: Options): Promise<{baseUrl: string | null}> {
  return new Promise(resolve => {
    
    const domData: HTMLImageElement = document.querySelector(options.element)
    // 只会获取到第一个符合的元素
    resolve(toBase64(domData))
    
    const toBase64 = (el: HTMLImageElement) => {
      const canvas: HTMLCanvasElement = document.createElement('canvas')
      const context: CanvasRenderingContext2D = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      console.log(canvas.width, canvas.height)
      context.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/jpg')
    }
  })
}
```

```vue
<script setup lang="ts">
import useUrlToBase64 from "@/hooks/useUrlToBase64"
import {ref} from "vue"
// 为什么 hooks 使用了 promise ?
// hooks 在 setup 下是同步执行的，用 Promise 可以用回调来接收 不阻塞 setup 代码块的执行
const base64 = ref('')
const transformBase64 = async () => {
  base64.value = await useUrlToBase64({element: '#hook-images'})
}
</script>

<template>
  <div class="hooks-container">
    <img id="hook-images" src="src/assets/lazy-images/lazy4.jpg" alt="">
    <a-button @click="transformBase64">转换</a-button>
    <a-textarea v-model:value="base64" :rows="18" showCount allowClear />
  </div>
</template>
```

### 10.2. 自定义`npm`包

参考：[`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) [`vite打包配置`](https://cn.vitejs.dev/config/) 

> `ResizeObserver`：监视 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 内容盒或边框盒或者 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 边界尺寸的变化。
>
> 1. [`ResizeObserver.disconnect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/disconnect)
>
> 2. [`ResizeObserver.observe()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe)
>
> 3. [`ResizeObserver.unobserve()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/unobserve)



实现在 `Vue3`中支持 `hook` 和 自定义指令去监听`dom`宽高的变化

**梗概：**

1. 监听 `dom` 宽高变化：**`resizeObserver`**
2. 使用构建工具 `vite` 进行打包
3. 发布到 `npm`

**步骤：**

1. 新建工程
```shell
1. npm init # 生成package.json
2. tsc --init # 生成tsconfig.json
3. create index.d.ts vite.config.ts # 手动创建
```

2. 下载依赖
```shell
npm install vue -D
npm install vite -D
```

3. 在 `src/index.ts` 中 编写代码并导出

```ts
import type {App, DirectiveBinding} from "vue"

/**
 * ResizeObserver 主要侦听元素的宽高变化
 * @param el 需要监听的元素
 * @param callback 对监听元素的回调操作
 */
function useResize(el: HTMLElement, callback: Function) {
  let resize = new ResizeObserver(entries => {
    callback(entries[0].contentRect) // contentRect 元素变化后的宽高
  })
  resize.observe(el)
}

/**
 * 自定义插件需要实现的install函数用于 Vue.use()
 * @param app Vue实例
 */
const install = (app: App) => {
  // 声明自定义指令 可以通过 v-resize 去绑定dom元素
  app.directive('resize', {
    mounted(el: HTMLElement, bindings: DirectiveBinding) {
      useResize(el, bindings.value)
    }
  })
}

useResize.install = install
export default useResize

```

3. 配置 `Vite `打包

```shell
build.lib # 配置入口和名字
build.rollupOptions # 配置除去依赖和全局变量
```

5. 添加执行脚本 `"build": "vite build"` 进行 `npm run build`打包

   生成  ` dist/v-resize-zz.mjs`    `dist/v-resize-zz.umd.js`

6. 添加声明文件 `index.d.ts`

7. 在`package.json`文件中配置
```shell
  "main": "dist/v-resize-zz.umd.js",
  "module": "dist/v-resize-zz.mjs",
  "files": [
    "dist",
    "index.d.ts"
  ],
```

8. 注册 npm 账号; 当前 npm 的镜像需要官方源 https://registry.npmjs.org/
```shell
# 查看当前源
npm config get registry
# 切换
npm config set registry="https://registry.npmjs.org/"
# 登录
npm login
# 发布公有包
npm publish --access public
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/202401312234042.png" alt="image-20240131223430862" style="zoom:80%;" />

在项目中下载 `npm install v-resize-zz`

## 11. `vue-router` 使用

1. 下载依赖

```shell
npm install vue-router@next -S
```



## 12. 自定义插件

类似 Vue2 的 `this.$message.success('发送成功')` 弹出全局小弹窗

插件在 `main.ts` 中是通过 `app.use()` 来使用的。归根结底是调用了插件的``install`方法。

```typescript
// 插件的编写
import type {App, VNode} from "vue"
import Loading from './index.vue'
import {createVNode, render} from "vue"
export default {
  install(app: App) { // Vue.use()时调用
    const vnode: VNode = createVNode(Loading) // 将已有的全局loading创建一个虚拟dom
    render(vnode, document.body) // 挂载到body上
    // console.log('install', vnode.component?.exposed) // 暴露出组件expose的值
    app.config.globalProperties.$loadings = {
      show: vnode.component?.exposed.show,
      hide: vnode.component?.exposed.hide
    }
   // app.config.globalProperties.$loadings.show()
  }
}
```

在 `main.ts` 中对 `$loadings` 进行智能提示： 

```ts
// 对全局属性 $loadings 声明文件和智能提示
type Lod = {
  show: () => void,
  hide: () => void
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loadings: Lod
  }
}
```

使用：在任意一个Vue文件中去调用`show`方法

```typescript
const instance = getCurrentInstance()
instance.proxy.$loadings.show()
```



## 13. 样式

**样式穿透：**

Vue2 使用 `/deep/`

Vue3 使用 `:deep()`



**插槽选择器**

```vue
<template>
  <div class="A">
    A组件中的内容，以下为插槽由父组件编写
  </div>
  <slot></slot>
</template>

<style scoped lang="scss">
.A {
  color: lightpink;
}
/* 父组件编写的结构 */
:slotted(.parent) {
  padding-top: 20px;
  font-weight: bolder;
  font-size: 24px;
}
</style>
```

**全局选择器**

无视`scoped`加入全局样式

```css
:global(div){
    color: red;
}
```



**动态CSS `v-bind`**

可以在CSS中使用JS中的变量：

如果该变量是对象形式的，需要使用引号：

```typescript
const width = ref<string>('200px')
const aboutColor = ref({
  color: '#ffffff',
  backgroundColor: 'lightgreen'
})
```

```css
.box {
  border: 1px solid red;
  width: v-bind(width);
  color: v-bind('aboutColor.color');
  background: v-bind('aboutColor.backgroundColor');
  height: 100px;
}
```

## 14. `electron` 

```shell
pnpm i electron e
```



## 15. 编译宏

版本：Vue3.3 +

### 1. `defineProps`

```typescript
const props = defineProps({
  name: {
    type: Array,
    required: true
  }
})
// 通过 props 属性来获取 name 等属性值
```

`PropType`：是一个 TypeScript 的类型，用于指定组件 props 的类型。



## 16. qiniu上传

```sh
npm install qiniu # 下载node依赖
```

在 https://portal.qiniu.com/developer/user/key 官网中获取AK和SK

| AK                                       | SK                                       |
| ---------------------------------------- | ---------------------------------------- |
| XVIK4dvlv8KY9XueldYH_DKJrFQZe_AbiSCAuJD0 | Mc2Wg_uN8n6eH5n_8Z1rFkwHUvr7UAa0mtUTfe9L |

存储空间：https://portal.qiniu.com/kodo/bucket/resource-v2?bucketName=toxic1901  名称toxic1901

图片：http://sddfn230x.hn-bkt.clouddn.com/images/%E4%B8%9B%E6%9E%97.jpg  在/images文件夹下。

文档：在docs文件夹下。

测试域名：http://sddfn230x.hn-bkt.clouddn.com

