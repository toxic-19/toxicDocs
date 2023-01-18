---
title: typescript项目(3)
date: 2022-12-8
tags:
 - ts
categories:
 - 前端
sidebar: 'auto'
---



## 1. 项目搭建

### 1.1 引入`less`插件

:facepunch: 以便于 `typescript` 可以对 `css,less` 进行处理

:page_with_curl::one: 安装`less`相关插件

```sh
npm install -D less less-loader css-loader style-loader
```

:two: `css-loader`：是用来处理`css`代码的。

​     `style-loader`：是用来将`css`代码引入到项目中的。

:three: 在`webpack.config.js`中指定要加载的规则中添加：

```js
{
    // 对css和less文件进行打包
    test:/\.less$/,
    use:[
        // 执行顺序的依赖是由下往上 先less后css再style
        "style-loader",
        "css-loader",
        "less-loader"
    ]
}
```



### 1.2 配置

:punch: 为解决`css`兼容问题：下载依赖

```sh
npm install -D postcss postcss-loader postcss-preset-env
```

`less`转换为`css`之后立马就处理兼容性问题。所以引入`postcss`在`css`之后。

```js
// 引入postcss
{
    loader:"postcss-loader",
    options:{
        postcssOptions:{
            plugins:[
                [
                    "postcss-preset-env",{
                        // 兼容浏览器的最新两个版本。
                        browsers:'last 2 versions'
                    }
                ]
            ]
        }
    }
},
"less-loader"
```

:punch: 引入`less`文件中有`display:flex`，打包完成之后：

![image-20230101132623498](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20230101132623498.png)

自动加上了兼容浏览器的前缀。



### 1.3 基本项目搭建已完成

#### `package.json`:

```json
{
  "name": "typescript",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack serve --open --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.20.5",
    "@babel/preset-env": "^7.20.2",
    "babel-loader": "^9.1.0",
    "clean-webpack-plugin": "^4.0.0",
    "core-js": "^3.26.1",
    "css-loader": "^6.7.3",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.3",
    "less-loader": "^11.1.0",
    "postcss": "^8.4.20",
    "postcss-loader": "^7.0.2",
    "postcss-preset-env": "^7.8.3",
    "style-loader": "^3.3.1",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
}
```

#### `webpack.config.js`

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
// webpack中所有的配置文件都已经写在module.exports中
module.exports = {
    // 指定项目入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, "dist/src"),  // 路径拼接
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件:对以.ts结尾的文件都进行打包
                test: /\.ts$/,
                use: [
                    // 谁写在后面谁先执行。
                    // babel配置
                    {
                        loader: "babel-loader",
                        // 配置选项
                        options: {
                            // 预设
                            presets: [
                                [
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "ie": "11"
                                        },
                                        // 指定core.js版本；使用按需导入
                                        "corejs": "3",
                                        "useBuiltIns": "usage"
                                    }
                                ]

                            ]
                        }
                    },
                    // ts配置
                    {
                        loader: "ts-loader"
                    }
                ],
                exclude: /node_modules/  // 将node_modules文件夹移除打包目录
            },
            {
                // 对css和less文件进行打包
                test: /\.less$/,
                use: [
                    // 执行顺序的依赖是由下往上 先less后css再style
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env", {
                                        // 兼容浏览器的最新两个版本。
                                        browsers: 'last 2 versions'
                                    }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    // 对插件的配置
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()  // 其中可以另外配置
    ],
    // 可以作为模块使用
    resolve: {
        extensions: [".ts", ".js"]
    },
}
```

#### `tsconfig.json`

```json
{
//  tsconfig.json是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
  "include": ["./src/**/*"],          //  用来指定哪些ts文件需要被编译
  "compilerOptions": {
    "module": "ES6",
    "target": "ES6",
    "outDir": "./dist/src",
    "noEmitOnError": true,  // 编译出错时不生成js文件
    "strict": true          // 开启严格模式
  }
}
```



## 2. 

### 2.1

### 2.2

### 2.3



## 3.

### 3.1

### 3.2

### 3.3



## 4.

### 4.1

### 4.2

### 4.3


## 5.

### 5.1

### 5.2

### 5.3