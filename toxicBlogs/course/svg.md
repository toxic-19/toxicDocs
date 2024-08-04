---
title: 在vue中使用svg-icon
date: 2022-12-8
categories:
 - 项目
tags:
 - Vue-Admin
sidebar: 'auto'
---

参考链接：[Svg Icon 图标 | vue-element-admin (panjiachen.github.io)](https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/svg-icon.html)

> 全局`Svg Icon`图标组件
>
> 默认在`@/icons` 中注册到全局中，可以到任意地方进行使用
>
> ```html
> <!-- icon-class是icon的名字 class-name是自定义class -->
> <svg-icon icon-class="password" class-name="custom-class" />
> ```

参考教程：[手摸手，带你优雅的使用 icon - 掘金 (juejin.cn)](https://juejin.cn/post/6844903517564436493)

使用组件`SvgIcon`：

```html
<span class="svg-container">
  <svg-icon icon-class="password" />
</span>
```

```vue
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" /> <!--xlink:href来指定svg图片的地址-->
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
```

