---
title: typescript(1)
date: 2022-12-8
tags:
 - ts
categories:
 - 前端
sidebar: 'auto'
---



## 1. 简介

### 1.1 概念

:facepunch: `ts` 是以 `JavaScript` 为基础构建的语言。可以在任何支持 `JavaScript` 的平台上使用。

:facepunch: 属于 `javascript` 的超集；扩展了 `JavaScript` 、并添加了类型。

:warning: `TS`不能被 `JS` 解析器直接执行。**需要将ts编译为js再执行**

### 1.2 typescript增加了什么？

1. 类型

2. 支持`ES`的新特性

3. 添加`ES`不具备的新特性

4. 丰富的配置选项

5. 强大的开发工具

### 1.3 开发准备

1. 安装 `typescript`

```sh
npm install -g typescript
```

2. 编译命令

```sh
tsc xxx.ts
```

3. 所有的`js`代码都可以在`ts`中使用。

## 2. 类型

### 2.1 类型声明

:heavy_exclamation_mark: 类型声明是 `TS` 非常重要的一个特点。

```ts
// 声明并赋值
let num : number = 123;

let num = 123;  // 会自动检测出是number类型。

// 字面量声明
let num : 10; // num的值只能为10；类似常量
num = 11; // 会报错。
// 字面量声明：b的值可以是male也可以是female；可以是不同类型。
let b : "male" | "female";
b = "male";
b = "female";

// 对函数参数进行类型限制  函数返回值类型限制
let sum = function(a:number,b:number):number{
    return a + b;
}
```



:heavy_exclamation_mark: 类型声明给变量设置了类型，使得变量只能存储某种类型的值。

```ts
let a : number;
a = 10;          // 不报错
a = "hello";     // 红色波浪线：let a: number
				 // Type 'string' is not assignable to type 'number'.ts(2322)
```

**注意：有错误也会编译成功。但在编译过程中会有提示错误。没有信息就是编译成功**。针对此配置：

:heavy_check_mark: 可以将`ts`编译为任意版本的`js` 。配置：



### 2.2 类型

|  类型   |       例子        |              描述              |
| :-----: | :---------------: | :----------------------------: |
| number  |    1, -33, 2.5    |            任意数字            |
| string  | 'hi', "hi", `hi`  |           任意字符串           |
| boolean |    true、false    |       布尔值true或false        |
| 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
|   any   |         *         |            任意类型            |
| unknown |         *         |         类型安全的any          |
|  void   | 空值（undefined） |     没有值（或undefined）      |
|  never  |      没有值       |          不能是任何值          |
| object  |  {name:'孙悟空'}  |          任意的JS对象          |
|  array  |      [1,2,3]      |           任意JS数组           |
|  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
|  enum   |    enum{A, B}     |       枚举，TS中新增类型       |
#### 2.2.1 字面量

```ts
let num = 10;  // 限制num为number类型，且赋值为10
let num : 10;  // 限制num为10;不可以赋值给其他的。
let sex : "male" | "female"; // 限制sex为female或者male；不可以赋值给其他的。
```

#### 2.2.2 `any`

```ts
// any表示的是任意类型；一个变量设置类型为any后相当于对该变量关闭了 TS 的类型检测
let num : any;
num = 10;
num = "hello";
num = true;
// 都不报错。
// 在 TS 中对变量只定义不声明；也是一样的效果。

let num1; // 默认是any类型

let str : string;
str = num; // any类型可以赋值给任意变量；这样str就变成了any类型
```



#### 2.2.3 `unknown`

**实际上是一个类型安全的any**

```ts
// unknown 表示的是未知类型的值
let num : unknown;
num = 10;
num = true;
num = "hello";
// 都不报错；和上面的any类型效果一致。但是unknown类型不可以赋值给其他变量
let str : string;
str = num; // 报错;因为num是unknown类型
// 报错内容：不能将类型“unknown”分配给类型“string”。
```

**类型断言**：两种语法形式

```ts
let num : unknown;
num = "hello";
let str : string;
// 类型断言
str = num as string;  // 告诉解析器 num是string类型
str = <string>num;
```



#### 2.2.4 `void`  `never`

**void** ：表示为空值，以函数为例，就表示没有返回值。

```ts
function fn():void{
    // return null;报错
    // return undefined; 不报错
}
```

**never** : 表示永远不会返回结果。比如抛出异常

```ts
function fn():never{
    throw new Error("抛出异常");
}
```

#### 2.2.5 `Object`：一切都是对象。

:one: 指定一个对象时，我们想要限制对象里有哪些类型，就可以：

**语法：** `{属性名:属性值}`

```ts
// 声明对象
let obj : object;
let obj : {};
// 声明对象里有哪些类型
let obj : {name:string,age?:number};// obj对象必须包含一个string类型的name属性;在属性后面加上？表示可选属性
obj = {name:"孙悟空"};
```

**表示任意属性**：`[propName:string]:any`

```ts
let obj = {name:string,[propName:string]:string};
// 想要添加任意属性名在name的后面。
// [propName:string]:表示string类型的属性名。
// 后面加上的string类型:限制了属性值必须为string类型。
```



:two: 函数也属于 `object` ；限制函数的参数类型和返回类型

**语法**：使用箭头函数；`(参数名:参数类型)=>函数返回类型`

:warning:：同时也限制了参数的数量。同上面对象类型：

```ts
let fn : (a:number,b:number) => number;
// 赋值
fn = function(n1,n2){
    return n1 + n2;
}
// 设置形参数量
let fn : (a:number,b:number,[propName]:any) => number;
```



#### 2.2.6 `Array` 数组

```ts
// 数组的类型声明：类型[]  Array<类型>
// 字符串数组
let array = string[];
// 数字数组
let array = Array<number>;
```



#### 2.2.7 新增类型：元组 `tuple`

元组：固定长度的数组。【限制长度，限制类型】

```ts
// 声明为长度为2的数组；且一个是string类型，一个是number类型。
let tuple = [string,number];
tuple = ["hello",123];
```



#### 2.2.8 新增类型：枚举 `enum`

```ts
// 定义一个枚举
enum Gender{
    Male,
    Female
}
let person = {gender: Gender; name: string};
person = {
    name:"孙悟空",
    gender:Gender.Male
}
console.log(person.gender === Gender.Male)
```

 <img src="https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221113043121.png" alt="image-20221221113043121" style="zoom:67%;" />

#### 2.2.9 类型别名

```ts
// 类型别名;如果这个类型重复被使用。可以简化类型的使用。
type MyType = 1 | 3 | 5;
let num1 : MyType;
num1 = 1;
```



## 3. 编译

### 3.1 命令

**自动编译修改后的内容**

```sh
tsc name.ts  # 编译单个文件
tsc name.ts -w  # 只能监视单个文件的修改
# 常用
tsc  # 可以编译该目录下的所有文件。前提是有一个ts的配置文件：tsconfig.json【没有内容也可以】
tsc -w # 监视该目录下的所有文件
```

​	`-w` 指的是 `watch` 自动监视模式，不用手动编译【会有时间间隔】



### 3.2 配置

​	**所需配置文件：`tsconfig.json`** 该json文件可以直接写注释。

|        属性        |                             解释                             |
| :----------------: | :----------------------------------------------------------: |
| **`"./src/**/*"`** |   **`src`**目录下的**任意目录`[**]`**下的**任意文件`[*]`**   |
|  **`"include"`**   |           数组中元素是**路径**：指定编译的文件路径           |
|    `"exclude"`     | 数组中元素是**路径**：指定不需要编译的文件路径，这样在编译的时候就会被排除掉。有默认值。 |
|     `"files"`      |      数组：指定被编译文件的列表。【不是目录，是文件名】      |



#### 3.2.1 项目选项

| `complierOptions`编译选项 |                             注释                             |
| :-----------------------: | :----------------------------------------------------------: |
|         `target`          | **默认编译转换为`ES3`**。可选值有：`es3,es5,es6,es2017,es2018,es2019,es2020,esnext[es最新版本]` |
|         `module`          | 使用哪种模块化的解决方案。可选值有：`none,commonjs,amd,system,umd,es6,es2015,es2020,esnext` |
|           `lib`           |          用来指定项目中需要使用的库，一般不需要写。          |
|         `outDir`          |        指定编译后的文件所在的目录 `"outDir":"./dist"`        |
|         `outFile`         |     将编译后的代码合并为一个文化中。`"./dist/hello.js"`      |
|    `allowJs` `checkJs`    | `allowJs` 是否对`js`文件进行编译，默认是false;<br />`checkJs`是否检查js文件的语法规范，默认是false； |
|     `removeComments`      |                编译后移除注释，默认是`false`                 |
|      `noEmit:false`       |             不生成编译后的文件。`false`时会生成              |
|   `noEmitOnError:false`   |          有错误的时候不生成编译文件。`false`会生成           |



#### 3.2.2 严格模式

|        属性        |               注释               |        默认值        |
| :----------------: | :------------------------------: | :------------------: |
|      `strict`      |   启动所有严格检查模式的总开关   | `true`：开启严格检查 |
|   `alwaysStrict`   | 编译后的文件是否使用严格检查模式 |   `false`: 不使用    |
|  `noImplicitAny`   |      不允许隐式的`any`类型       |       `false`        |
|  `noImplicitThis`  |       禁止类型不明确的this       |       `false`        |
| `strictNullChecks` |          严格地检查空格          |       `false`        |



### 3.3 `webpack`打包

#### 3.3.1 准备【基本开发环境】

**初始化：主要作用：创建`package.json`文件**

```sh
npm init -y
# -y表示默认选项，无需作答
```

生成的`package.json`:

```json
{
  "name": "ch01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**安装webpack需要的依赖**

```sh
npm install -D webpack webpack-cli typescript ts-loader
# webpack
# webpack-cli
# typescript
# ts-loader
```

**项目目录下配置`webpack.config.js`**

```js
// 在typescript目录下：
const path = require("path");
// webpack中所有的配置文件都已经写在module.exports中
module.exports = {
    // 指定项目入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, "dist/src"),  // 路径拼接
        filename: "bundle.js"
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件:对以.ts结尾的文件都进行打包
                test: /\.ts$/,
                use: {
                    loader: "ts-loader"
                },
                exclude: /node_modules/  // 将node_modules文件夹移除打包目录
            }
        ]
    }
}

```

**添加 `build` 到 `package.json`** 

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
     // 这里会报错，可以看一下
  },
```

**配置`tsconfig.json`**

```json
{
  "compilerOptions": {
    "module": "ES6",  // es6即为es2015
    "target": "ES6",
    "strict": true          // 开启严格模式
  }
}
```

以上为简单的配置。即可进行**打包：**

 ![image-20221221232533511](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221232533511.png)

 ![image-20221221233126778](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221233126778.png)



#### 3.3.2 `webpack`配置完善

 :facepunch:**需求1 ：**每次查看打包的js效果，需要引入到html文件中，很麻烦。

:page_with_curl: **解决1：** 下载`html-webpack-plugin`依赖；作用：自动生成html文件

```sh
npm install -D html-webpack-plugin
```

```js
// 在webpack.config.js中引入
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 配置该插件【根节点下】
plugins:[
    new HtmlWebpackPlugin({
        "title":"配置title",  // 可以对生成的html文件进行配置
    	"template":"./src/index.html"  // 可以自己设置模板，会根据模板自定义生成。
    });  // 即生效
]
```

 ![image-20221221234616569](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221234616569.png)



:facepunch: **需求2**：浏览器打开的`html`可以自动刷新。

:page_facing_up: **解决2：** 下载插件 `webpack-dev-server`; 作用：相当于项目的内置服务器，可以让项目直接在服务器上运行。可以实时监视

```sh
npm install -D webpack-dev-server
```

```json
// 在package.json上配置start
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack serve --open --mode production"
      // 自动打开默认浏览器
  },
```



:facepunch: **需求3：** 再次编译时，是使用新文件代替旧文件。希望在每次编译时先将旧文件清空，再将新生成的放进去。

:page_facing_up: **解决3**： 下载插件`clean-webpack-plugin`

```sh
npm install -D clean-webpack-plugin
```

```js
// 在webpack.config.js中配置
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
// 对插件的配置
plugins: [
    new CleanWebpackPlugin(),
]
```



:facepunch: **需求4：** `webpack`不知道`ts`结尾的也可以作为模块使用。所以在引入模块的打包就会出现错误。

```ts
// m1.ts
// 作为模块使用

export const hi = "hello"  // 向外暴露一个变量
```

```ts
// index.ts
// 在index.ts中引入这个m1这个模块
import {hi} from './m1';
let fn = function (a:number,b:number):number {
    return a+b;
}
console.log(fn(122, 123));
console.log(hi);  // 使用这个引入的变量
```

进行编译出现错误：

 ![image-20221222001427911](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222001427911.png)

:page_with_curl: **解决4**： 需要告诉webpack哪些文件可以作为模块

```js
// 可以作为模块使用
resolve: {
    extensions: [".ts", ".js"]
},
```

![image-20221222001642621](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222001642621.png)



### 3.4 `babel`解决 `webpack` 兼容

**除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器。**

:page_facing_up: **1. 下载依赖**

```sh
npm install -D @babel/core @babel/preset-env babel-loader core-js
```

- `@babel/core`

     babel的核心工具

- `@babel/preset-env`

  babel的预定义环境

- `@babel-loader`

  babel在webpack中的加载器

- `core-js`

  core-js用来使老版本的浏览器支持新版ES语法

 ![image-20221222141002629](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222141002629.png)

:page_facing_up: **2. babel配置**

在`webpack.config.js`中配置：

```js
// 规则：谁写在后面谁先执行。
use:{
    // babel的配置写在ts之前。后执行
    
    loader:"ts-loader"
}

// 变为：两个配置改为数组形式
use: [
    // 谁写在后面谁先执行。
    // babel配置
    {
        loader: "babel-loader",
        // 配置选项
        options: {
            // 预设
            presets: [
                // 注意这里有两对[]
                [
                    "@babel/preset-env",
                    // 配置信息
                    {
                        // 要兼容的目标浏览器
                        targets: {},
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
```

**`npm run build`打包成功**

![image-20221222143216682](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222143216682.png)

**但是在ie中仍然无法运行**   报错如下：`ie`浏览器中不支持箭头函数。但是`webpack`打包`bundle.js`为箭头函数自调用。

 ![](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222143317766.png)![image-20221222143507605](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222143507605.png)

:page_facing_up: **箭头函数配置：`webpack.config.js中`**添加`environment`节点

```js
// 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, "dist/src"),  // 路径拼接
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },
```






## 4. 报错

### 4.1 `tsc`编译单个文件出错

**错误描述：**

```sh
tsc : 无法加载文件 D:\nodeJs\node_globalnpm\tsc.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ tsc
+ ~~~
    + FullyQualifiedErrorId : UnauthorizedAccess
所在位置 行:1 字符: 1
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

![image-20221221200751527](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221200751527.png)

参考链接：[tsc : 无法加载文件 E:\node\node_global\tsc.ps1，因为在此系统上禁止运行脚本。 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/482879606)

解决方案：

```sh
PS D:\Desktop\typescript\ch01> get-ExecutionPolicy
Restricted
PS D:\Desktop\typescript\ch01> set-ExecutionPolicy -Scope CurrentUs
位于命令管道位置1的 cmdlet Set-ExecutionPolicy
请为以下参数提供值:
ExecutionPolicy:RemoteSigned
PS D:\Desktop\typescript\ch01> get-ExecutionPolicy             
RemoteSigned
PS D:\Desktop\typescript\ch01> tsc 01helloTs.ts
```



### 4.2 `tsc`编译该目录文件报错

报错描述：

```sh
PS D:\Desktop\typescript\ch01> tsc
error TS18003: No inputs were found in config file 'D:/Desktop/typescript/tsconfig.json'. Specified 'include' paths were '["./ch01/**/*"]' and 'exclude' paths were '["./ch01"]'.


Found 1 error.

```

解决：在`tsconfig.json`中的 `outDir` 没有弄好

```json
{  
    "include": ["./ch01/**/*"],          //  用来指定哪些ts文件需要被编译
    "compilerOptions": {
        "target": "ES6",
        "outDir": "./dist/ch01",
        "noEmitOnError": true,  // 编译出错时不生成js文件
        "strict": true          // 开启严格模式
    }
}
```

 ![image-20221221202234798](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221202234798.png)

### 4.3 `webpack`打包报错

```sh
> typescript@1.0.0 build
> webpack

asset bundle.js 40 bytes [compared for emit] [minimized] (name: main)
./src/index.ts 94 bytes [built] [code generated]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

webpack 5.75.0 compiled with 1 warning in 1878 ms

Process finished with exit code 0

```

 ![image-20221221232711804](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221221232711804.png)

参考链接：[ webpack打包提示The 'mode' option has not been set, webpack will fallback to 'production' for this value_Distance-X的博客-CSDN博客](https://blog.csdn.net/weixin_43582611/article/details/103581913)

解决：在`package.json`中修改：

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```



### 4.4 `babel`报错

```sh
ERROR in ./src/index.ts
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: [BABEL] D:\Desktop\typescript\src\index.ts: .targets is not allowed in preset options
```

![image-20221222142806211](https://gitee.com/zhizhu_wlz/image-for-md/raw/master/image-20221222142806211.png)

解决办法：在`webpack.config.js `中配置的时候，`presets`后有两对`[]`
