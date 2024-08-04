---
title: 实现前后端流式传输
date: 2023-07-08
tags:
 - node
categories:
 - 项目
sidebar: 'auto'
---

## 1. 安装express

```shell
mdkir myapp # 创建一个新的目录
cd myapp # 切换到当前目录
npm init # 在该目录下创建package.json
npm install express # 安装Express依赖并添加到依赖性列表dependencies
npm install express --no-save # 临时安装
```
## 2. 使用
> 安装完Express依赖就可以在JS文件中使用了。
>
> 最简单的使用方式: 使用 `node app.js` 进行运行
>
> 在浏览器加载 http://localhost:3000/ 即可查看
```js
const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(3000, () => {
    console.log('api server running at http://127.0.0.1:3000')
})
```
## 3. express生成器
```shell
# 较低版本的Node
npm i -g express-generator # 全局安装生成器
express # 启动express
express --view=pug myapp # 创建一个express的应用程序
cd myapp

# Node.js8.20+
npx express-generator # 在要使用的目录例myapp下执行

npm install # 安装依赖
SET DEBUG=api-stream:* & npm start # cmd上运行
$env:DEBUG='api_stream:*'; npm start # powershell上运行
npm run start # 实际上直接运行即可
```

![image-20230708175831464](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230708175831464.png)

 ![image-20230708183735353](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230708183735353.png)

## 4. 添加其他配置

1. `npm install nodemon`：监听服务器端程序是否被修改，若修改会自动重启。按两次 `ctrl+c` 停止服务。

   ```json
   // 在package.json中重新配置
   'script': {
       'dev': 'nodemon ./bin/www'
   }
   ```

   [什么是流式传输 ？ - 掘金 (juejin.cn)](https://juejin.cn/post/7241514309716803644#heading-1)