---
title: 记搭建VuePress个人网站
date: 2022-12-8
tags:
 - 教程
categories:
 - 教程
sidebar: 'auto'
sticky: 1
---

# 记搭建VuePress个人网站

## 1. 准备阶段

### 参考来源：
+ 官网链接：[VuePress中文网站](https://vuepress.vuejs.org/zh/)
+ 参考链接： [掘金博客：VuePress网站搭建](https://juejin.cn/post/6844903673672237069)    [CSDN搭建网站链接](https://blog.csdn.net/xiaoxianer321/article/details/119548202) 

### 初始项目准备

#### 新建

1. 新建一个目录  **`toxicDocs`** 用来存放我的所有；
2. 在目录下新建  **`docs`**  作为文档的根目录；
3. 在 `docs` 目录下就可以新建自己的  `markdown`  文档啦。

> **注意：**
>
> 1.  `mkdir` 是 新建目录 的命令
> 2.  `exho` 可以新建文档的内容

```sh
mkdir toxicDocs
mkdir docs
# 这是在toxicDocs目录下的命令，进入docs目录下，就不需要在md文档前加上前缀了。
echo '# Hello VuePress' > docs/README.md
```

```sh
PS D:\WebstormProjects\toixcDocs> cd docs
PS D:\WebstormProjects\toixcDocs\docs> echo "# Hello VuePress" > README.md
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206205027357.png" alt="image-20221206205027357" style="zoom: 80%;" />

4. 修改README.md文档：

```markdown
---
home: true
heroImage: /logo.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。

  footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

> `home:true` : 指的是应用默认主题
>
> `actionLink` : 指的是按钮点击跳转的链接

#### 安装

```sh
npm init -y # 加上-y可以免去确认这一步
npm install vuepress -D # 项目中安装 没有全局安装
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206201733818.png" alt="image-20221206201733818" style="zoom:80%;" />

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206201845805.png" alt="image-20221206201845805" style="zoom:67%;" />

#### 添加

在 `package.json` 中加入 两条运行打包语句：`docs:dev`   `docs:build`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
 },
```

#### 启动运行

```sh
npm run docs:dev 
# 或者点击 package.json 中 script节点出现 的绿色三角形 可以运行
# 在webstorm中
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206211341116.png" alt="image-20221206211341116" style="zoom: 67%;" />

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206220001149.png" alt="image-20221206220001149" style="zoom: 50%;" />

## 2. 配置阶段

### 基本配置

> 没有配置 整个网站将寸步难行。

1. 在  `docs` 目录下创建  `.vuepress` 目录：所有与 `VuePress`有关的文件都被放在里面

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206213755662.png" alt="image-20221206213755662" style="zoom:67%;" />

2. 在 `.vuepress` 目录下创建 `config.js` 文件：必要配置文件，应该导出一个JavaScript对象

```sh
touch config.js
```

```js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

3. 同一目录新建 `public` 文件夹：放置静态资源

 ### 导航栏

> 在 `config.js` 文件中 `themeConfig` 节点中设置

```js
themeConfig: {
    // 导航栏
    nav: [
        // 内部链接
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        // 外部链接
        { text: 'External', link: 'https://google.com' },
        // 下拉菜单
        {
            text: 'Languages',
            items: [
                { text: 'Chinese', link: '/language/chinese/' },
                { text: 'Japanese', link: '/language/japanese/' }
            ]
        }
    ]
}
```



### 侧边栏


## 报错解决
1. 运行之后显示乱码 https://blog.csdn.net/qq_45611841/article/details/115832233

2. 使用 `touch config.js`命令生成js文件的时候出现错误

<img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221206214039704.png" alt="image-20221206214039704" style="zoom:80%;" />



在vuepress中编译的图片全部无法显示：

[vuepress - Vuepress 图片资源中文路径问题_个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000022275001)

![image-20221208140216059](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221208140216059.png)
更改之前：

```js
        // 导航栏
        nav: [
            // 内部链接 根目录为/ 即为docs
            { text: 'Home', link: '/' },
            { text: 'Vue', link: '/webBlog/vueAbout/01. Vuex' },
            { text: 'Other', link: '/webBlog/other/git' },
            { text: 'JavaScript', link: '/webBlog/javaScript/',
                items: [
                    {text: '基础javascript',link: '/webBlog/javaScript/basic/ch01 javascript基础'},
                    {text: 'LeetCode算法',link: '/webBlog/javaScript/algorithm/'},
                    {text: '计算机网络',link: '/webBlog/javaScript/network/'},
                ]
            },
            // 下拉列表
            {
                text: '阅读',
                items: [
                    { text: '源码共读', link: 'https://juejin.cn/post/7079706017579139102#heading-3' },
                    { text: 'SourceCode', link: '/webBlog/sourceCode/' },
                    { text: 'BookStudy', link: '/webBlog/bookStudy/' },
                ]
            }
        ],
        // 侧边栏
        // sidebar: 'auto',
        sidebar:[
            {
                title:'前端笔记',
                collapsable:false,
                children:[
                    '/webBlog/vueAbout/01. VueX',
                    '/webBlog/vueAbout/02. 生命周期',
                    '/webBlog/vueAbout/03. Promise',
                    '/webBlog/vueAbout/04. 组件',
                ]
            },{
                title:'前端笔记',
                collapsable:false,
                children:[
                    '/webBlog/vueAbout/01. VueX',
                    '/webBlog/vueAbout/02. 生命周期',
                    '/webBlog/vueAbout/03. Promise',
                    '/webBlog/vueAbout/04. 组件',
                ]
            }
        ]
        // sidebar:{
        //     '/webBlog/vueAbout/':[
        //         '01. VueX',
        //         '02. Vue生命周期',
        //         '03. Promise',
        //         '04. 组件',
        //     ],
        //     '/webBlog/other/':[
        //         '01. 电脑系统修复之后。',
        //         'uniapp0',
        //         'uniapp1',
        //         'uniapp2',
        //         'uniapp3',
        //         'uniapp4',
        //         'html',
        //         'git',
        //     ],
        // }
```





先考试去了

[vuepress-theme-reco个人向优化 | vuepress-theme-reco (recoluan.com)](https://vuepress-theme-reco.recoluan.com/views/other/reco-optimization.html)

[目录导航 | 小弋の阅览室 (gitee.io)](https://lovelijunyi.gitee.io/blog/views/)

[lyy (ggot.top)](https://ggot.top/)

https://juejin.cn/post/7045168740643635237#heading-0

https://juejin.cn/post/6959403986495471647#heading-19

https://blog.csdn.net/xiaoxianer321/article/details/119548202

https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F
